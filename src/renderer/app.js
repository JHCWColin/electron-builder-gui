(function () {
  const STORAGE_KEY = "electron-builder-ui-draft-v2";

  const messages = {
    "zh-CN": {
      title: "Electron Builder UI",
      brandEyebrow: "Electron 打包向导",
      brandSummary: "从静态 HTML 项目到桌面安装包，按步骤完成。",
      settingsTitle: "界面设置",
      settingsSummary: "主题与语言会自动保存。",
      languageLabel: "语言",
      themeLabel: "主题",
      themes: {
        system: "跟随系统",
        light: "浅色",
        dark: "深色"
      },
      sideSteps: [
        ["选择项目", "检测 index.html 与图标资源"],
        ["填写信息", "生成 package.json 与 main.js"],
        ["确认构建", "选择 Electron 版本并开始打包"]
      ],
      heroEyebrow: "当前流程",
      stepTitles: {
        1: "选择 HTML 项目目录",
        2: "填写应用信息与窗口参数",
        3: "确认 Electron 版本并开始构建"
      },
      buttons: {
        back: "上一步",
        next: "下一步",
        stay: "留在此步",
        chooseDirectory: "选择项目目录",
        chooseIcon: "选择图标",
        generateFiles: "仅生成 package.json 和 main.js",
        build: "开始构建",
        openRelease: "打开 release 目录"
      },
      sectionTitles: {
        chooseDir: "第一步：选择目录",
        chooseDirDesc: "请选择包含 index.html 的项目目录。",
        scan: "自动检测结果",
        scanDesc: "会优先识别 logo.png，否则识别 favicon.ico。",
        meta: "应用信息",
        metaDesc: "这些信息会写入目标目录下的 package.json。",
        window: "窗口与图标",
        windowDesc: "默认窗口大小为 1200 × 800。",
        version: "Electron 版本与兼容提示",
        versionDesc: "这里会根据当前系统给出默认推荐版本，并补充最新稳定版。",
        build: "构建执行",
        buildDesc: "只会构建当前运行系统对应的产物。"
      },
      labels: {
        name: "包名 name",
        productName: "显示名 productName",
        version: "版本 version",
        description: "描述 description",
        authorName: "作者 author",
        authorEmail: "邮箱 email",
        license: "许可证 license",
        homepage: "主页 homepage",
        appId: "应用 ID appId",
        windowWidth: "窗口宽度",
        windowHeight: "窗口高度",
        showMenuBar: "显示顶部工具栏（默认关闭）",
        contextIsolation: "启用上下文隔离（默认开启）",
        iconPath: "图标文件"
      },
      placeholders: {
        name: "my-electron-app",
        productName: "我的桌面应用",
        description: "一个基于 HTML 的桌面应用",
        authorName: "作者名",
        authorEmail: "name@example.com",
        homepage: "https://example.com",
        appId: "com.example.desktopapp"
      },
      platformCardTitle: "当前运行环境",
      platformTargetPrefix: "当前构建目标：",
      platformLatestPrefix: "最新稳定版：",
      emptySelectedDirectory: "尚未选择目录",
      emptyIcon: "尚未选择图标",
      emptyScan: "选择目录后显示检测结果。",
      buildLogPlaceholder: "构建日志会显示在这里。",
      scanFoundIndex: "已找到 index.html。",
      scanMissingIndex: "未找到 index.html，当前目录不能继续。",
      scanDetectedIcon: "检测到图标：{path}",
      scanMissingIcon: "未检测到 logo.png 或 favicon.ico，需要手动选择图标。",
      scanDetectedFiles: "同级文件：{files}",
      iconHintSelected: "已选择图标。若目标平台后续需要更严格的图标格式，可以再替换。",
      iconHintEmpty: "建议优先提供 PNG。Windows 常见为 ICO，macOS 常见为 ICNS；当前版本先允许直接使用你选择的文件路径。",
      summary: {
        directory: "项目目录：",
        productName: "应用名：",
        name: "包名：",
        electron: "Electron：",
        outputs: "输出格式：",
        window: "窗口："
      },
      alerts: {
        nameRequired: "请填写包名 name。",
        nameFormat: "包名 name 只允许小写字母、数字和连字符。",
        productRequired: "请填写显示名 productName。",
        versionFormat: "版本号需要使用 x.y.z 格式，例如 1.0.0。",
        appIdFormat: "应用 ID appId 建议使用 com.example.app 这种格式。",
        chooseDirectory: "请先选择有效的 HTML 项目目录。",
        chooseIcon: "请先确认图标文件。",
        invalidEmail: "邮箱格式不正确。",
        chooseIndexDirectory: "请选择包含 index.html 的目录。"
      },
      status: {
        filesWritten: "已写入文件：",
        fileWriteFailed: "写入文件失败。",
        building: "正在执行 npm install 和 electron-builder，请稍候...",
        buildFinished: "构建已完成。",
        buildSucceeded: "构建成功，输出目录：{path}",
        mirrorReason: "依赖安装或二进制下载阶段疑似无法访问默认源。",
        mirrorRetry: "用户已同意切换软件内部镜像，开始重试...",
        buildFailed: "构建失败。",
        stage: "阶段：",
        exitCode: "退出码：",
        exception: "构建异常：{message}"
      }
    },
    "zh-TW": {
      title: "Electron Builder UI",
      brandEyebrow: "Electron 打包精靈",
      brandSummary: "從靜態 HTML 專案到桌面安裝包，依步驟完成。",
      settingsTitle: "介面設定",
      settingsSummary: "主題與語言會自動儲存。",
      languageLabel: "語言",
      themeLabel: "主題",
      themes: {
        system: "跟隨系統",
        light: "淺色",
        dark: "深色"
      },
      sideSteps: [
        ["選擇專案", "偵測 index.html 與圖示資源"],
        ["填寫資訊", "產生 package.json 與 main.js"],
        ["確認建置", "選擇 Electron 版本並開始打包"]
      ],
      heroEyebrow: "目前流程",
      stepTitles: {
        1: "選擇 HTML 專案目錄",
        2: "填寫應用資訊與視窗參數",
        3: "確認 Electron 版本並開始建置"
      },
      buttons: {
        back: "上一步",
        next: "下一步",
        stay: "停留在此步",
        chooseDirectory: "選擇專案目錄",
        chooseIcon: "選擇圖示",
        generateFiles: "僅產生 package.json 與 main.js",
        build: "開始建置",
        openRelease: "開啟 release 目錄"
      },
      sectionTitles: {
        chooseDir: "第一步：選擇目錄",
        chooseDirDesc: "請選擇包含 index.html 的專案目錄。",
        scan: "自動偵測結果",
        scanDesc: "會優先識別 logo.png，否則識別 favicon.ico。",
        meta: "應用資訊",
        metaDesc: "這些資訊會寫入目標目錄下的 package.json。",
        window: "視窗與圖示",
        windowDesc: "預設視窗大小為 1200 × 800。",
        version: "Electron 版本與相容提示",
        versionDesc: "會依目前系統提供推薦版本，並補上最新穩定版。",
        build: "建置執行",
        buildDesc: "只會建置目前執行系統對應的產物。"
      },
      labels: {
        name: "套件名 name",
        productName: "顯示名 productName",
        version: "版本 version",
        description: "描述 description",
        authorName: "作者 author",
        authorEmail: "電子郵件 email",
        license: "授權 license",
        homepage: "首頁 homepage",
        appId: "應用 ID appId",
        windowWidth: "視窗寬度",
        windowHeight: "視窗高度",
        showMenuBar: "顯示頂部工具列（預設關閉）",
        contextIsolation: "啟用內容隔離（預設開啟）",
        iconPath: "圖示檔案"
      },
      placeholders: {
        name: "my-electron-app",
        productName: "我的桌面應用",
        description: "一個基於 HTML 的桌面應用",
        authorName: "作者名稱",
        authorEmail: "name@example.com",
        homepage: "https://example.com",
        appId: "com.example.desktopapp"
      },
      platformCardTitle: "目前執行環境",
      platformTargetPrefix: "目前建置目標：",
      platformLatestPrefix: "最新穩定版：",
      emptySelectedDirectory: "尚未選擇目錄",
      emptyIcon: "尚未選擇圖示",
      emptyScan: "選擇目錄後顯示偵測結果。",
      buildLogPlaceholder: "建置日誌會顯示在這裡。",
      scanFoundIndex: "已找到 index.html。",
      scanMissingIndex: "未找到 index.html，目前目錄不能繼續。",
      scanDetectedIcon: "偵測到圖示：{path}",
      scanMissingIcon: "未偵測到 logo.png 或 favicon.ico，需要手動選擇圖示。",
      scanDetectedFiles: "同層檔案：{files}",
      iconHintSelected: "已選擇圖示。若目標平台之後需要更嚴格的圖示格式，可以再替換。",
      iconHintEmpty: "建議優先提供 PNG。Windows 常見為 ICO，macOS 常見為 ICNS；目前版本先允許直接使用你選擇的檔案路徑。",
      summary: {
        directory: "專案目錄：",
        productName: "應用名：",
        name: "套件名：",
        electron: "Electron：",
        outputs: "輸出格式：",
        window: "視窗："
      },
      alerts: {
        nameRequired: "請填寫套件名 name。",
        nameFormat: "套件名 name 只允許小寫字母、數字與連字號。",
        productRequired: "請填寫顯示名 productName。",
        versionFormat: "版本號需要使用 x.y.z 格式，例如 1.0.0。",
        appIdFormat: "應用 ID appId 建議使用 com.example.app 這種格式。",
        chooseDirectory: "請先選擇有效的 HTML 專案目錄。",
        chooseIcon: "請先確認圖示檔案。",
        invalidEmail: "電子郵件格式不正確。",
        chooseIndexDirectory: "請選擇包含 index.html 的目錄。"
      },
      status: {
        filesWritten: "已寫入檔案：",
        fileWriteFailed: "寫入檔案失敗。",
        building: "正在執行 npm install 和 electron-builder，請稍候...",
        buildFinished: "建置已完成。",
        buildSucceeded: "建置成功，輸出目錄：{path}",
        mirrorReason: "依賴安裝或二進位下載階段疑似無法存取預設來源。",
        mirrorRetry: "使用者已同意切換軟體內部鏡像，開始重試...",
        buildFailed: "建置失敗。",
        stage: "階段：",
        exitCode: "退出碼：",
        exception: "建置異常：{message}"
      }
    },
    en: {
      title: "Electron Builder UI",
      brandEyebrow: "Electron Packaging Wizard",
      brandSummary: "Go from a static HTML project to desktop installers step by step.",
      settingsTitle: "Interface Settings",
      settingsSummary: "Theme and language are saved automatically.",
      languageLabel: "Language",
      themeLabel: "Theme",
      themes: {
        system: "System",
        light: "Light",
        dark: "Dark"
      },
      sideSteps: [
        ["Choose Project", "Detect index.html and icon assets"],
        ["Fill Metadata", "Generate package.json and main.js"],
        ["Confirm Build", "Choose an Electron version and package"]
      ],
      heroEyebrow: "Current Flow",
      stepTitles: {
        1: "Choose the HTML project directory",
        2: "Fill metadata and window settings",
        3: "Confirm the Electron version and build"
      },
      buttons: {
        back: "Back",
        next: "Next",
        stay: "Stay here",
        chooseDirectory: "Choose project directory",
        chooseIcon: "Choose icon",
        generateFiles: "Generate package.json and main.js only",
        build: "Start build",
        openRelease: "Open release directory"
      },
      sectionTitles: {
        chooseDir: "Step 1: Choose directory",
        chooseDirDesc: "Choose a project directory that contains index.html.",
        scan: "Auto-detection result",
        scanDesc: "logo.png is preferred; otherwise favicon.ico is used.",
        meta: "Application metadata",
        metaDesc: "These fields will be written into package.json in the target directory.",
        window: "Window and icon",
        windowDesc: "The default window size is 1200 × 800.",
        version: "Electron version and compatibility notes",
        versionDesc: "Recommendations are based on the current platform and include the latest stable release.",
        build: "Build execution",
        buildDesc: "Only artifacts for the current operating system will be built."
      },
      labels: {
        name: "Package name",
        productName: "Display name",
        version: "Version",
        description: "Description",
        authorName: "Author",
        authorEmail: "Email",
        license: "License",
        homepage: "Homepage",
        appId: "Application ID",
        windowWidth: "Window width",
        windowHeight: "Window height",
        showMenuBar: "Show top menu bar",
        contextIsolation: "Enable context isolation",
        iconPath: "Icon file"
      },
      placeholders: {
        name: "my-electron-app",
        productName: "My Desktop App",
        description: "A desktop app based on HTML",
        authorName: "Author name",
        authorEmail: "name@example.com",
        homepage: "https://example.com",
        appId: "com.example.desktopapp"
      },
      platformCardTitle: "Current runtime environment",
      platformTargetPrefix: "Current build targets:",
      platformLatestPrefix: "Latest stable:",
      emptySelectedDirectory: "No directory selected",
      emptyIcon: "No icon selected",
      emptyScan: "Detection results appear after a directory is selected.",
      buildLogPlaceholder: "Build logs will appear here.",
      scanFoundIndex: "index.html was found.",
      scanMissingIndex: "index.html was not found, so this directory cannot continue.",
      scanDetectedIcon: "Detected icon: {path}",
      scanMissingIcon: "Neither logo.png nor favicon.ico was found. Please choose an icon manually.",
      scanDetectedFiles: "Sibling files: {files}",
      iconHintSelected: "An icon is selected. You can still replace it later if a stricter platform-specific format is needed.",
      iconHintEmpty: "PNG is preferred. ICO is common on Windows and ICNS on macOS. For now, this version accepts the file path you choose directly.",
      summary: {
        directory: "Project directory:",
        productName: "App name:",
        name: "Package name:",
        electron: "Electron:",
        outputs: "Output formats:",
        window: "Window:"
      },
      alerts: {
        nameRequired: "Please fill in the package name.",
        nameFormat: "The package name may only contain lowercase letters, numbers, and hyphens.",
        productRequired: "Please fill in the display name.",
        versionFormat: "The version must use x.y.z format, for example 1.0.0.",
        appIdFormat: "The application ID should look like com.example.app.",
        chooseDirectory: "Please choose a valid HTML project directory first.",
        chooseIcon: "Please confirm the icon file first.",
        invalidEmail: "The email format is invalid.",
        chooseIndexDirectory: "Please choose a directory that contains index.html."
      },
      status: {
        filesWritten: "Files written:",
        fileWriteFailed: "Failed to write files.",
        building: "Running npm install and electron-builder. Please wait...",
        buildFinished: "Build completed.",
        buildSucceeded: "Build succeeded. Output directory: {path}",
        mirrorReason: "The dependency install or binary download phase could not reach the default source.",
        mirrorRetry: "The user approved the internal mirror switch. Retrying...",
        buildFailed: "Build failed.",
        stage: "Stage:",
        exitCode: "Exit code:",
        exception: "Build exception: {message}"
      }
    },
    ja: {
      title: "Electron Builder UI",
      brandEyebrow: "Electron パッケージングウィザード",
      brandSummary: "静的 HTML プロジェクトからデスクトップ向けインストーラまで、手順ごとに進めます。",
      settingsTitle: "表示設定",
      settingsSummary: "テーマと言語は自動保存されます。",
      languageLabel: "言語",
      themeLabel: "テーマ",
      themes: {
        system: "システムに合わせる",
        light: "ライト",
        dark: "ダーク"
      },
      sideSteps: [
        ["プロジェクト選択", "index.html とアイコン資産を検出"],
        ["情報入力", "package.json と main.js を生成"],
        ["ビルド確認", "Electron バージョンを選んで開始"]
      ],
      heroEyebrow: "現在のフロー",
      stepTitles: {
        1: "HTML プロジェクトのディレクトリを選択",
        2: "アプリ情報とウィンドウ設定を入力",
        3: "Electron バージョンを確認してビルド"
      },
      buttons: {
        back: "戻る",
        next: "次へ",
        stay: "このまま",
        chooseDirectory: "プロジェクトディレクトリを選択",
        chooseIcon: "アイコンを選択",
        generateFiles: "package.json と main.js だけ生成",
        build: "ビルド開始",
        openRelease: "release ディレクトリを開く"
      },
      sectionTitles: {
        chooseDir: "手順 1: ディレクトリ選択",
        chooseDirDesc: "index.html を含むプロジェクトディレクトリを選択してください。",
        scan: "自動検出結果",
        scanDesc: "logo.png を優先し、なければ favicon.ico を使用します。",
        meta: "アプリ情報",
        metaDesc: "これらの項目は対象ディレクトリ内の package.json に書き込まれます。",
        window: "ウィンドウとアイコン",
        windowDesc: "既定のウィンドウサイズは 1200 × 800 です。",
        version: "Electron バージョンと互換性の注意",
        versionDesc: "現在のプラットフォームに基づいて候補を提示し、最新安定版も含めます。",
        build: "ビルド実行",
        buildDesc: "現在の OS 向けの成果物のみをビルドします。"
      },
      labels: {
        name: "パッケージ名",
        productName: "表示名",
        version: "バージョン",
        description: "説明",
        authorName: "作者",
        authorEmail: "メールアドレス",
        license: "ライセンス",
        homepage: "ホームページ",
        appId: "アプリ ID",
        windowWidth: "ウィンドウ幅",
        windowHeight: "ウィンドウ高さ",
        showMenuBar: "上部メニューバーを表示",
        contextIsolation: "context isolation を有効にする",
        iconPath: "アイコンファイル"
      },
      placeholders: {
        name: "my-electron-app",
        productName: "My Desktop App",
        description: "HTML ベースのデスクトップアプリ",
        authorName: "作者名",
        authorEmail: "name@example.com",
        homepage: "https://example.com",
        appId: "com.example.desktopapp"
      },
      platformCardTitle: "現在の実行環境",
      platformTargetPrefix: "現在のビルド対象:",
      platformLatestPrefix: "最新安定版:",
      emptySelectedDirectory: "ディレクトリ未選択",
      emptyIcon: "アイコン未選択",
      emptyScan: "ディレクトリを選択すると検出結果が表示されます。",
      buildLogPlaceholder: "ビルドログはここに表示されます。",
      scanFoundIndex: "index.html が見つかりました。",
      scanMissingIndex: "index.html が見つからないため、このディレクトリでは続行できません。",
      scanDetectedIcon: "検出されたアイコン: {path}",
      scanMissingIcon: "logo.png も favicon.ico も見つかりませんでした。手動でアイコンを選択してください。",
      scanDetectedFiles: "同階層のファイル: {files}",
      iconHintSelected: "アイコンは選択済みです。より厳密なプラットフォーム形式が必要なら後で差し替えられます。",
      iconHintEmpty: "PNG を推奨します。Windows では ICO、macOS では ICNS が一般的です。現段階では選択したファイルパスをそのまま使えます。",
      summary: {
        directory: "プロジェクトディレクトリ:",
        productName: "アプリ名:",
        name: "パッケージ名:",
        electron: "Electron:",
        outputs: "出力形式:",
        window: "ウィンドウ:"
      },
      alerts: {
        nameRequired: "パッケージ名を入力してください。",
        nameFormat: "パッケージ名には小文字、数字、ハイフンのみ使用できます。",
        productRequired: "表示名を入力してください。",
        versionFormat: "バージョンは 1.0.0 のような x.y.z 形式にしてください。",
        appIdFormat: "アプリ ID は com.example.app のような形式を推奨します。",
        chooseDirectory: "先に有効な HTML プロジェクトディレクトリを選択してください。",
        chooseIcon: "先にアイコンファイルを確認してください。",
        invalidEmail: "メールアドレスの形式が正しくありません。",
        chooseIndexDirectory: "index.html を含むディレクトリを選択してください。"
      },
      status: {
        filesWritten: "書き込まれたファイル:",
        fileWriteFailed: "ファイルの書き込みに失敗しました。",
        building: "npm install と electron-builder を実行しています。しばらくお待ちください...",
        buildFinished: "ビルドが完了しました。",
        buildSucceeded: "ビルド成功。出力先: {path}",
        mirrorReason: "依存関係のインストールまたはバイナリのダウンロード時に既定の配布元へ接続できなかった可能性があります。",
        mirrorRetry: "内部ミラーへの切り替えが承認されたため、再試行します...",
        buildFailed: "ビルドに失敗しました。",
        stage: "段階:",
        exitCode: "終了コード:",
        exception: "ビルド例外: {message}"
      }
    }
  };

  const state = {
    currentStep: 1,
    platformContext: null,
    selectedDirectory: "",
    projectScan: null,
    iconPath: "",
    releaseDirectory: "",
    buildLog: "",
    settings: {
      language: "zh-CN",
      theme: "system"
    },
    formData: {
      name: "",
      productName: "",
      version: "1.0.0",
      description: "",
      authorName: "",
      authorEmail: "",
      license: "MIT",
      homepage: "",
      appId: "",
      windowWidth: 1200,
      windowHeight: 800,
      showMenuBar: false,
      contextIsolation: true,
      electronVersion: ""
    }
  };

  const elements = {
    languageSelect: document.getElementById("language-select"),
    themeSelect: document.getElementById("theme-select"),
    stepTitle: document.getElementById("step-title"),
    backButton: document.getElementById("back-button"),
    nextButton: document.getElementById("next-button"),
    chooseDirectoryButton: document.getElementById("choose-directory-button"),
    selectedDirectory: document.getElementById("selected-directory"),
    scanResult: document.getElementById("scan-result"),
    projectKind: document.getElementById("project-kind"),
    metadataForm: document.getElementById("metadata-form"),
    chooseIconButton: document.getElementById("choose-icon-button"),
    iconPath: document.getElementById("icon-path"),
    iconHint: document.getElementById("icon-hint"),
    platformCard: document.getElementById("platform-card"),
    compatibilityBox: document.getElementById("compatibility-box"),
    versionOptions: document.getElementById("version-options"),
    buildSummary: document.getElementById("build-summary"),
    generateFilesButton: document.getElementById("generate-files-button"),
    buildButton: document.getElementById("build-button"),
    buildLog: document.getElementById("build-log"),
    openReleaseButton: document.getElementById("open-release-button")
  };

  const darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function getText() {
    return messages[state.settings.language] || messages["zh-CN"];
  }

  function t(path, params) {
    const text = getText();
    const parts = path.split(".");
    let value = text;

    for (const part of parts) {
      value = value?.[part];
    }

    if (typeof value !== "string") {
      return "";
    }

    if (!params) {
      return value;
    }

    return Object.entries(params).reduce((result, [key, replacement]) => {
      return result.replaceAll(`{${key}}`, String(replacement));
    }, value);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function slugifyName(input) {
    return input
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-{2,}/g, "-");
  }

  function resolveTheme() {
    if (state.settings.theme === "system") {
      return darkMediaQuery.matches ? "dark" : "light";
    }

    return state.settings.theme;
  }

  function applyTheme() {
    document.documentElement.dataset.theme = resolveTheme();
  }

  function saveDraft() {
    const payload = {
      selectedDirectory: state.selectedDirectory,
      projectScan: state.projectScan,
      iconPath: state.iconPath,
      releaseDirectory: state.releaseDirectory,
      buildLog: state.buildLog,
      settings: state.settings,
      formData: state.formData
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }

  function restoreDraft() {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }

    try {
      const draft = JSON.parse(raw);
      state.selectedDirectory = draft.selectedDirectory || "";
      state.projectScan = draft.projectScan || null;
      state.iconPath = draft.iconPath || "";
      state.releaseDirectory = draft.releaseDirectory || "";
      state.buildLog = draft.buildLog || "";
      state.settings = {
        ...state.settings,
        ...(draft.settings || {})
      };
      state.formData = {
        ...state.formData,
        ...(draft.formData || {})
      };
    } catch (_error) {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  function applyFormValues() {
    for (const [key, value] of Object.entries(state.formData)) {
      const field = elements.metadataForm.elements.namedItem(key);
      if (!field || field instanceof RadioNodeList) {
        continue;
      }

      if (field instanceof HTMLInputElement && field.type === "checkbox") {
        field.checked = Boolean(value);
        continue;
      }

      if (field instanceof HTMLInputElement) {
        field.value = value == null ? "" : String(value);
      }
    }
  }

  async function refreshPlatformContext() {
    const previousVersion = state.formData.electronVersion;
    state.platformContext = await window.builderApi.getPlatformContext({
      language: state.settings.language
    });

    const validValues = new Set(state.platformContext.versionChoices.map((item) => item.value));
    if (previousVersion && validValues.has(previousVersion)) {
      state.formData.electronVersion = previousVersion;
      return;
    }

    state.formData.electronVersion = state.platformContext.defaultElectronVersion;
  }

  function setTextContent(id, value) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
  }

  function applyLanguage() {
    document.documentElement.lang = state.settings.language;
    document.title = getText().title;

    setTextContent("brand-eyebrow", getText().brandEyebrow);
    setTextContent("brand-summary", getText().brandSummary);
    setTextContent("settings-title", getText().settingsTitle);
    setTextContent("settings-summary", getText().settingsSummary);
    setTextContent("language-label", getText().languageLabel);
    setTextContent("theme-label", getText().themeLabel);
    setTextContent("hero-eyebrow", getText().heroEyebrow);
    setTextContent("step-side-1-title", getText().sideSteps[0][0]);
    setTextContent("step-side-1-desc", getText().sideSteps[0][1]);
    setTextContent("step-side-2-title", getText().sideSteps[1][0]);
    setTextContent("step-side-2-desc", getText().sideSteps[1][1]);
    setTextContent("step-side-3-title", getText().sideSteps[2][0]);
    setTextContent("step-side-3-desc", getText().sideSteps[2][1]);
    setTextContent("choose-dir-title", getText().sectionTitles.chooseDir);
    setTextContent("choose-dir-desc", getText().sectionTitles.chooseDirDesc);
    setTextContent("scan-title", getText().sectionTitles.scan);
    setTextContent("scan-desc", getText().sectionTitles.scanDesc);
    setTextContent("meta-title", getText().sectionTitles.meta);
    setTextContent("meta-desc", getText().sectionTitles.metaDesc);
    setTextContent("window-title", getText().sectionTitles.window);
    setTextContent("window-desc", getText().sectionTitles.windowDesc);
    setTextContent("version-title", getText().sectionTitles.version);
    setTextContent("version-desc", getText().sectionTitles.versionDesc);
    setTextContent("build-title", getText().sectionTitles.build);
    setTextContent("build-desc", getText().sectionTitles.buildDesc);

    setTextContent("label-name", getText().labels.name);
    setTextContent("label-productName", getText().labels.productName);
    setTextContent("label-version", getText().labels.version);
    setTextContent("label-description", getText().labels.description);
    setTextContent("label-authorName", getText().labels.authorName);
    setTextContent("label-authorEmail", getText().labels.authorEmail);
    setTextContent("label-license", getText().labels.license);
    setTextContent("label-homepage", getText().labels.homepage);
    setTextContent("label-appId", getText().labels.appId);
    setTextContent("label-windowWidth", getText().labels.windowWidth);
    setTextContent("label-windowHeight", getText().labels.windowHeight);
    setTextContent("label-showMenuBar", getText().labels.showMenuBar);
    setTextContent("label-contextIsolation", getText().labels.contextIsolation);
    setTextContent("label-iconPath", getText().labels.iconPath);

    document.getElementById("field-name").placeholder = getText().placeholders.name;
    document.getElementById("field-productName").placeholder = getText().placeholders.productName;
    document.getElementById("field-description").placeholder = getText().placeholders.description;
    document.getElementById("field-authorName").placeholder = getText().placeholders.authorName;
    document.getElementById("field-authorEmail").placeholder = getText().placeholders.authorEmail;
    document.getElementById("field-homepage").placeholder = getText().placeholders.homepage;
    document.getElementById("field-appId").placeholder = getText().placeholders.appId;

    elements.backButton.textContent = getText().buttons.back;
    elements.chooseDirectoryButton.textContent = getText().buttons.chooseDirectory;
    elements.chooseIconButton.textContent = getText().buttons.chooseIcon;
    elements.generateFilesButton.textContent = getText().buttons.generateFiles;
    elements.buildButton.textContent = getText().buttons.build;
    elements.openReleaseButton.textContent = getText().buttons.openRelease;
    elements.languageSelect.value = state.settings.language;
    elements.themeSelect.value = state.settings.theme;
    elements.themeSelect.options[0].textContent = getText().themes.system;
    elements.themeSelect.options[1].textContent = getText().themes.light;
    elements.themeSelect.options[2].textContent = getText().themes.dark;

    if (!state.selectedDirectory) {
      elements.selectedDirectory.textContent = getText().emptySelectedDirectory;
      elements.selectedDirectory.classList.add("empty");
    }

    if (!state.buildLog) {
      elements.buildLog.textContent = getText().buildLogPlaceholder;
    }
  }

  function updateStepUi() {
    document.querySelectorAll(".panel").forEach((panel) => {
      panel.classList.toggle("active", Number(panel.dataset.stepPanel) === state.currentStep);
    });

    document.querySelectorAll(".step-item").forEach((item) => {
      item.classList.toggle("active", Number(item.dataset.stepMarker) === state.currentStep);
    });

    elements.stepTitle.textContent = getText().stepTitles[state.currentStep];
    elements.backButton.disabled = state.currentStep === 1;

    if (state.currentStep === 1) {
      elements.nextButton.textContent = getText().buttons.next;
      elements.nextButton.disabled =
        !state.selectedDirectory || !state.projectScan?.projectType?.canPackage;
      return;
    }

    if (state.currentStep === 2) {
      elements.nextButton.textContent = getText().buttons.next;
      elements.nextButton.disabled = !validateForm(false);
      return;
    }

    elements.nextButton.textContent = getText().buttons.stay;
    elements.nextButton.disabled = true;
  }

  function renderPlatformCard() {
    const context = state.platformContext;
    elements.platformCard.innerHTML = `
      <h3>${escapeHtml(getText().platformCardTitle)}</h3>
      <p><strong>${escapeHtml(context.label)}</strong> / ${escapeHtml(context.currentArch)}</p>
      <p>Node.js ${escapeHtml(context.nodeVersion)}</p>
      <p>${escapeHtml(getText().platformTargetPrefix)} ${escapeHtml(context.buildTargets.join(" / "))}</p>
      <p>${escapeHtml(getText().platformLatestPrefix)} ${escapeHtml(context.latestStableVersion)} (${escapeHtml(context.latestStableDate)})</p>
    `;
  }

  function renderCompatibility() {
    const context = state.platformContext;

    elements.compatibilityBox.innerHTML = context.compatibilityNotes
      .map((note) => `<p>${escapeHtml(note)}</p>`)
      .join("");

    elements.versionOptions.innerHTML = context.versionChoices
      .map((choice) => {
        const checked = state.formData.electronVersion === choice.value;

        return `
          <label class="radio-option">
            <input type="radio" name="electronVersion" value="${escapeHtml(choice.value)}" ${checked ? "checked" : ""} />
            <div>
              <strong>${escapeHtml(choice.label)}</strong>
              <p>${escapeHtml(choice.note)}</p>
            </div>
          </label>
        `;
      })
      .join("");
  }

  function renderScanResult() {
    if (!state.projectScan) {
      elements.scanResult.textContent = getText().emptyScan;
      elements.scanResult.classList.add("muted");
      elements.projectKind.innerHTML = "<p>未检测到项目类型。</p>";
      return;
    }

    const lines = [];
    if (state.projectScan.projectType?.type === "static-html") {
      lines.push(getText().scanFoundIndex);
    } else if (state.projectScan.projectType?.needsFrontendBuild) {
      lines.push(`已识别为 ${state.projectScan.projectType.displayName}。`);
      lines.push(`构建前会先执行前端构建，产物目录：${state.projectScan.projectType.outputDirectory}`);
    } else {
      lines.push(getText().scanMissingIndex);
    }

    if (state.projectScan.iconCandidates?.recommended) {
      lines.push(t("scanDetectedIcon", { path: state.projectScan.iconCandidates.recommended }));
    } else {
      lines.push(getText().scanMissingIcon);
    }

    if (Array.isArray(state.projectScan.detectedFiles) && state.projectScan.detectedFiles.length > 0) {
      lines.push(
        t("scanDetectedFiles", {
          files: state.projectScan.detectedFiles.join("、")
        })
      );
    }

    elements.scanResult.innerHTML = lines.map((line) => `<p>${escapeHtml(line)}</p>`).join("");
    elements.scanResult.classList.remove("muted");
    elements.projectKind.innerHTML = `<p><strong>项目类型：</strong>${escapeHtml(
      state.projectScan.projectType?.displayName || "未知项目"
    )}</p>`;
  }

  function renderIconState() {
    if (state.iconPath) {
      elements.iconPath.textContent = state.iconPath;
      elements.iconPath.classList.remove("empty");
      elements.iconHint.innerHTML = `<p>${escapeHtml(getText().iconHintSelected)}</p>`;
      return;
    }

    elements.iconPath.textContent = getText().emptyIcon;
    elements.iconPath.classList.add("empty");
    elements.iconHint.innerHTML = `<p>${escapeHtml(getText().iconHintEmpty)}</p>`;
  }

  function collectFormData() {
    const formData = new FormData(elements.metadataForm);
    const result = {
      name: (formData.get("name") || "").toString().trim(),
      productName: (formData.get("productName") || "").toString().trim(),
      version: (formData.get("version") || "").toString().trim(),
      description: (formData.get("description") || "").toString().trim(),
      authorName: (formData.get("authorName") || "").toString().trim(),
      authorEmail: (formData.get("authorEmail") || "").toString().trim(),
      license: (formData.get("license") || "").toString().trim(),
      homepage: (formData.get("homepage") || "").toString().trim(),
      appId: (formData.get("appId") || "").toString().trim(),
      windowWidth: Number(formData.get("windowWidth") || 1200),
      windowHeight: Number(formData.get("windowHeight") || 800),
      showMenuBar: formData.get("showMenuBar") === "on",
      contextIsolation: formData.get("contextIsolation") === "on",
      iconPath: state.iconPath,
      electronVersion:
        document.querySelector('input[name="electronVersion"]:checked')?.value || state.formData.electronVersion
    };

    state.formData = result;
    saveDraft();
    return result;
  }

  function renderBuildSummary() {
    const data = collectFormData();
    const context = state.platformContext;

    elements.buildSummary.innerHTML = `
      <p><strong>${escapeHtml(getText().summary.directory)}</strong>${escapeHtml(state.selectedDirectory || getText().emptySelectedDirectory)}</p>
      <p><strong>项目类型：</strong>${escapeHtml(state.projectScan?.projectType?.displayName || "-")}</p>
      <p><strong>${escapeHtml(getText().summary.productName)}</strong>${escapeHtml(data.productName || "-")}</p>
      <p><strong>${escapeHtml(getText().summary.name)}</strong>${escapeHtml(data.name || "-")}</p>
      <p><strong>${escapeHtml(getText().summary.electron)}</strong>${escapeHtml(data.electronVersion || "-")}</p>
      <p><strong>${escapeHtml(getText().summary.outputs)}</strong>${escapeHtml(context.buildTargets.join(" / "))}</p>
      <p><strong>${escapeHtml(getText().summary.window)}</strong>${escapeHtml(String(data.windowWidth))} × ${escapeHtml(String(data.windowHeight))}</p>
    `;
  }

  function fillFormDefaultsFromDirectory(directoryPath) {
    const parts = directoryPath.split(/[/\\]/).filter(Boolean);
    const folderName = parts[parts.length - 1] || "my-app";
    const slug = slugifyName(folderName) || "my-app";

    if (!elements.metadataForm.name.value) {
      elements.metadataForm.name.value = slug;
    }

    if (!elements.metadataForm.productName.value) {
      elements.metadataForm.productName.value = folderName;
    }

    if (!elements.metadataForm.appId.value) {
      elements.metadataForm.appId.value = `com.example.${slug}`;
    }
  }

  function validateForm(showAlert) {
    const data = collectFormData();
    const errors = [];

    if (!data.name) {
      errors.push(getText().alerts.nameRequired);
    }

    if (!/^[a-z0-9-]+$/.test(data.name)) {
      errors.push(getText().alerts.nameFormat);
    }

    if (!data.productName) {
      errors.push(getText().alerts.productRequired);
    }

    if (!data.version || !/^\d+\.\d+\.\d+$/.test(data.version)) {
      errors.push(getText().alerts.versionFormat);
    }

    if (!data.appId || data.appId.split(".").length < 3) {
      errors.push(getText().alerts.appIdFormat);
    }

    if (!state.selectedDirectory || !state.projectScan?.projectType?.canPackage) {
      errors.push(getText().alerts.chooseDirectory);
    }

    if (!state.iconPath) {
      errors.push(getText().alerts.chooseIcon);
    }

    if (data.authorEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.authorEmail)) {
      errors.push(getText().alerts.invalidEmail);
    }

    if (showAlert && errors.length > 0) {
      window.alert(errors.join("\n"));
    }

    return errors.length === 0;
  }

  async function chooseDirectory() {
    const result = await window.builderApi.chooseProjectDirectory({
      language: state.settings.language
    });
    if (result.canceled) {
      return;
    }

    state.selectedDirectory = result.directory;
    state.projectScan = result.projectScan;
    state.iconPath = result.projectScan.iconCandidates.recommended || "";
    state.releaseDirectory = "";

    elements.selectedDirectory.textContent = result.directory;
    elements.selectedDirectory.classList.remove("empty");

    fillFormDefaultsFromDirectory(result.directory);
    renderScanResult();
    renderIconState();
    renderBuildSummary();
    saveDraft();
    updateStepUi();
  }

  async function chooseIcon() {
    const result = await window.builderApi.chooseIconFile({
      language: state.settings.language
    });
    if (result.canceled) {
      return;
    }

    state.iconPath = result.filePath;
    renderIconState();
    renderBuildSummary();
    saveDraft();
    updateStepUi();
  }

  async function generateFilesOnly() {
    if (!validateForm(true)) {
      return;
    }

    const result = await window.builderApi.writeProjectFilesOnly({
      targetDirectory: state.selectedDirectory,
      formData: collectFormData(),
      projectScan: state.projectScan,
      language: state.settings.language
    });

    if (result.ok) {
      state.buildLog = `${getText().status.filesWritten}\n${result.writtenFiles.join("\n")}`;
      elements.buildLog.textContent = state.buildLog;
      state.currentStep = 3;
      renderBuildSummary();
      saveDraft();
      updateStepUi();
      return;
    }

    state.buildLog = getText().status.fileWriteFailed;
    elements.buildLog.textContent = state.buildLog;
  }

  async function tryBuild(useMirror) {
    const payload = {
      targetDirectory: state.selectedDirectory,
      formData: collectFormData(),
      projectScan: state.projectScan,
      language: state.settings.language,
      useMirror
    };

    elements.buildButton.disabled = true;
    state.buildLog = `${getText().status.building}\n`;
    elements.buildLog.textContent = state.buildLog;

    try {
      const result = await window.builderApi.runBuild(payload);
      state.buildLog = [result.stdout, result.stderr].filter(Boolean).join("\n\n") || getText().status.buildFinished;
      elements.buildLog.textContent = state.buildLog;

      if (result.ok) {
        state.releaseDirectory = result.outputDirectory;
        elements.openReleaseButton.disabled = false;
        state.buildLog = `${t("status.buildSucceeded", { path: result.outputDirectory })}\n\n${state.buildLog}`;
        elements.buildLog.textContent = state.buildLog;
        saveDraft();
        return;
      }

      if (result.suggestedMirrorSwitch) {
        const decision = await window.builderApi.confirmMirrorSwitch({
          language: state.settings.language,
          reason: getText().status.mirrorReason
        });

        if (decision.confirmed) {
          state.buildLog += `\n\n${getText().status.mirrorRetry}\n`;
          elements.buildLog.textContent = state.buildLog;
          await tryBuild(true);
          return;
        }
      }

      state.buildLog = `${getText().status.buildFailed}\n${getText().status.stage} ${result.stage}\n${getText().status.exitCode} ${result.code}\n\n${state.buildLog}`;
      elements.buildLog.textContent = state.buildLog;
      saveDraft();
    } catch (error) {
      state.buildLog = t("status.exception", { message: error.message });
      elements.buildLog.textContent = state.buildLog;
    } finally {
      elements.buildButton.disabled = false;
    }
  }

  function goNext() {
    if (state.currentStep === 1) {
      if (!state.selectedDirectory || !state.projectScan?.projectType?.canPackage) {
        window.alert(getText().alerts.chooseIndexDirectory);
        return;
      }

      state.currentStep = 2;
      updateStepUi();
      return;
    }

    if (state.currentStep === 2) {
      if (!validateForm(true)) {
        return;
      }

      state.currentStep = 3;
      renderBuildSummary();
      updateStepUi();
    }
  }

  function goBack() {
    if (state.currentStep > 1) {
      state.currentStep -= 1;
      updateStepUi();
    }
  }

  async function openReleaseDirectory() {
    if (!state.releaseDirectory) {
      return;
    }

    await window.builderApi.openPath(state.releaseDirectory);
  }

  async function handleLanguageChange() {
    state.settings.language = elements.languageSelect.value;
    await refreshPlatformContext();
    applyLanguage();
    renderPlatformCard();
    renderCompatibility();
    renderScanResult();
    renderIconState();
    renderBuildSummary();
    updateStepUi();
    saveDraft();
  }

  function handleThemeChange() {
    state.settings.theme = elements.themeSelect.value;
    applyTheme();
    saveDraft();
  }

  async function init() {
    restoreDraft();
    applyTheme();
    await refreshPlatformContext();

    if (!state.selectedDirectory) {
      elements.selectedDirectory.textContent = getText().emptySelectedDirectory;
      elements.selectedDirectory.classList.add("empty");
    }

    if (!state.buildLog) {
      state.buildLog = getText().buildLogPlaceholder;
    }

    elements.buildLog.textContent = state.buildLog;
    applyFormValues();
    applyLanguage();
    renderPlatformCard();
    renderCompatibility();
    renderScanResult();
    renderIconState();
    renderBuildSummary();
    updateStepUi();

    elements.chooseDirectoryButton.addEventListener("click", chooseDirectory);
    elements.chooseIconButton.addEventListener("click", chooseIcon);
    elements.generateFilesButton.addEventListener("click", generateFilesOnly);
    elements.backButton.addEventListener("click", goBack);
    elements.nextButton.addEventListener("click", goNext);
    elements.buildButton.addEventListener("click", () => {
      if (!validateForm(true)) {
        return;
      }

      tryBuild(false);
    });
    elements.openReleaseButton.addEventListener("click", openReleaseDirectory);
    elements.languageSelect.addEventListener("change", handleLanguageChange);
    elements.themeSelect.addEventListener("change", handleThemeChange);

    elements.metadataForm.addEventListener("input", () => {
      collectFormData();
      renderBuildSummary();
      updateStepUi();
    });

    elements.versionOptions.addEventListener("change", (event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement && target.name === "electronVersion") {
        state.formData.electronVersion = target.value;
        renderBuildSummary();
        saveDraft();
      }
    });

    darkMediaQuery.addEventListener("change", () => {
      if (state.settings.theme === "system") {
        applyTheme();
      }
    });
  }

  init();
})();
