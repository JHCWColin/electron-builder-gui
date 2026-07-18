const path = require("path");
const { app, BrowserWindow, dialog, ipcMain, shell } = require("electron");
const { scanProjectDirectory } = require("./services/projectScanner");
const {
  getBuildContext,
  runBuildPipeline,
  writeProjectFilesOnly
} = require("./services/buildService");

const DIALOG_TEXT = {
  "zh-CN": {
    chooseProjectDirectory: "选择需要打包的 HTML 项目目录",
    chooseIconFile: "选择应用图标",
    iconFilter: "图标文件",
    mirrorTitle: "确认切换国内镜像",
    mirrorMessage: "构建前需要切换软件内部下载源",
    mirrorButtons: ["切换并继续", "取消"],
    mirrorReasonPrefix: "触发原因：",
    mirrorLines: [
      "检测到默认下载源可能不可用。",
      "切换后只对本次软件内部构建流程生效，不会修改你的系统全局 npm 配置。",
      "",
      "将尝试切换的镜像：",
      "- npm registry: npmmirror",
      "- Electron 二进制源: npmmirror",
      "- electron-builder 二进制源: npmmirror"
    ]
  },
  "zh-TW": {
    chooseProjectDirectory: "選擇需要打包的 HTML 專案目錄",
    chooseIconFile: "選擇應用圖示",
    iconFilter: "圖示檔案",
    mirrorTitle: "確認切換國內鏡像",
    mirrorMessage: "建置前需要切換軟體內部下載源",
    mirrorButtons: ["切換並繼續", "取消"],
    mirrorReasonPrefix: "觸發原因：",
    mirrorLines: [
      "偵測到預設下載源可能不可用。",
      "切換後只對本次軟體內部建置流程生效，不會修改你的系統全域 npm 設定。",
      "",
      "將嘗試切換的鏡像：",
      "- npm registry: npmmirror",
      "- Electron 二進位來源: npmmirror",
      "- electron-builder 二進位來源: npmmirror"
    ]
  },
  en: {
    chooseProjectDirectory: "Choose the HTML project directory to package",
    chooseIconFile: "Choose application icon",
    iconFilter: "Icon files",
    mirrorTitle: "Confirm mirror switch",
    mirrorMessage: "The build needs to switch internal download mirrors before continuing",
    mirrorButtons: ["Switch and continue", "Cancel"],
    mirrorReasonPrefix: "Reason:",
    mirrorLines: [
      "The default download source may be unavailable.",
      "This switch only affects the build pipeline inside this app and will not modify your global npm configuration.",
      "",
      "Mirrors to switch:",
      "- npm registry: npmmirror",
      "- Electron binaries: npmmirror",
      "- electron-builder binaries: npmmirror"
    ]
  },
  ja: {
    chooseProjectDirectory: "パッケージ化する HTML プロジェクトのディレクトリを選択",
    chooseIconFile: "アプリケーションアイコンを選択",
    iconFilter: "アイコンファイル",
    mirrorTitle: "国内ミラーへの切り替え確認",
    mirrorMessage: "ビルド前にアプリ内部のダウンロード元を切り替える必要があります",
    mirrorButtons: ["切り替えて続行", "キャンセル"],
    mirrorReasonPrefix: "理由:",
    mirrorLines: [
      "既定のダウンロード元が利用できない可能性があります。",
      "この切り替えはこのアプリ内部のビルド処理にのみ適用され、グローバルな npm 設定は変更しません。",
      "",
      "切り替え対象ミラー:",
      "- npm registry: npmmirror",
      "- Electron バイナリ: npmmirror",
      "- electron-builder バイナリ: npmmirror"
    ]
  }
};

let mainWindow = null;

function getDialogText(language) {
  return DIALOG_TEXT[language] || DIALOG_TEXT["zh-CN"];
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1360,
    height: 900,
    minWidth: 1100,
    minHeight: 760,
    backgroundColor: "#f4efe5",
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("system:get-platform-context", async (_event, payload) => {
  return getBuildContext(payload?.language);
});

ipcMain.handle("dialog:choose-project-directory", async (_event, payload) => {
  if (!mainWindow) {
    return { canceled: true };
  }

  const text = getDialogText(payload?.language);
  const result = await dialog.showOpenDialog(mainWindow, {
    title: text.chooseProjectDirectory,
    properties: ["openDirectory"]
  });

  if (result.canceled || result.filePaths.length === 0) {
    return { canceled: true };
  }

  const targetDirectory = result.filePaths[0];
  const projectScan = await scanProjectDirectory(targetDirectory);
  return {
    canceled: false,
    directory: targetDirectory,
    projectScan
  };
});

ipcMain.handle("dialog:choose-icon-file", async (_event, payload) => {
  if (!mainWindow) {
    return { canceled: true };
  }

  const text = getDialogText(payload?.language);
  const result = await dialog.showOpenDialog(mainWindow, {
    title: text.chooseIconFile,
    properties: ["openFile"],
    filters: [
      {
        name: text.iconFilter,
        extensions: ["png", "ico", "icns"]
      }
    ]
  });

  if (result.canceled || result.filePaths.length === 0) {
    return { canceled: true };
  }

  return {
    canceled: false,
    filePath: result.filePaths[0]
  };
});

ipcMain.handle("dialog:confirm-mirror-switch", async (_event, payload) => {
  if (!mainWindow) {
    return { confirmed: false };
  }

  const text = getDialogText(payload?.language);
  const detailLines = [...text.mirrorLines];

  if (payload?.reason) {
    detailLines.unshift(`${text.mirrorReasonPrefix} ${payload.reason}`);
  }

  const result = await dialog.showMessageBox(mainWindow, {
    type: "warning",
    buttons: text.mirrorButtons,
    defaultId: 0,
    cancelId: 1,
    title: text.mirrorTitle,
    message: text.mirrorMessage,
    detail: detailLines.join("\n")
  });

  return { confirmed: result.response === 0 };
});

ipcMain.handle("project:write-files-only", async (_event, payload) => {
  return writeProjectFilesOnly(payload);
});

ipcMain.handle("build:run", async (_event, payload) => {
  return runBuildPipeline(payload);
});

ipcMain.handle("shell:open-path", async (_event, targetPath) => {
  if (!targetPath) {
    return { opened: false };
  }

  await shell.openPath(targetPath);
  return { opened: true };
});
