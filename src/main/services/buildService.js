const fs = require("fs/promises");
const path = require("path");
const os = require("os");
const { spawn } = require("child_process");

const LATEST_STABLE_VERSION = "43.1.1";
const LATEST_STABLE_DATE = "2026-07-14";
const ELECTRON_BUILDER_VERSION = "^26.11.1";
const ELECTRON_WORKDIR = ".electron-builder-ui";

const MIRROR_ENV = {
  npm_config_registry: "https://registry.npmmirror.com",
  ELECTRON_MIRROR: "https://npmmirror.com/mirrors/electron/",
  ELECTRON_BUILDER_BINARIES_MIRROR: "https://npmmirror.com/mirrors/electron-builder-binaries/"
};

function getWindowsDefaultVersion() {
  const release = os.release();
  if (release.startsWith("6.1") || release.startsWith("6.2") || release.startsWith("6.3")) {
    return "22.3.27";
  }

  return LATEST_STABLE_VERSION;
}

function getBuildContext() {
  if (process.platform === "win32") {
    return {
      nodeVersion: process.versions.node,
      currentPlatform: process.platform,
      currentArch: process.arch,
      homeDirectory: os.homedir(),
      platformKey: "windows",
      builderPlatformKey: "win",
      label: "Windows",
      buildTargets: ["nsis", "portable"],
      defaultElectronVersion: getWindowsDefaultVersion(),
      latestStableVersion: LATEST_STABLE_VERSION,
      latestStableDate: LATEST_STABLE_DATE,
      versionChoices: [
        { value: LATEST_STABLE_VERSION, label: `Electron ${LATEST_STABLE_VERSION}`, note: `最新稳定版，${LATEST_STABLE_DATE} 发布。` },
        { value: "42.7.0", label: "Electron 42.7.0", note: "当前活跃维护线。" },
        { value: "41.10.2", label: "Electron 41.10.2", note: "成熟维护线。" },
        { value: "39.8.9", label: "Electron 39.8.9", note: "较老但仍常见的现代版本。" },
        { value: "35.7.5", label: "Electron 35.7.5", note: "较早的现代版本。" },
        { value: "28.3.3", label: "Electron 28.3.3", note: "适合 Windows 10/11 的保守选择。" },
        { value: "22.3.27", label: "Electron 22.3.27", note: "适合需要兼容 Windows 7/8/8.1 的场景。" }
      ],
      compatibilityNotes: [
        `截至 ${LATEST_STABLE_DATE}，最新 Electron 正式版为 ${LATEST_STABLE_VERSION}。`,
        "如果目标用户包含 Windows 7 或 Windows 8，请优先选择 Electron 22.3.27；Electron 23 及以上不再支持 Windows 7/8/8.1。",
        "如果只面向 Windows 10/11，可以优先考虑 43.1.1、42.7.0 或 41.10.2。"
      ]
    };
  }

  if (process.platform === "darwin") {
    return {
      nodeVersion: process.versions.node,
      currentPlatform: process.platform,
      currentArch: process.arch,
      homeDirectory: os.homedir(),
      platformKey: "mac",
      builderPlatformKey: "mac",
      label: "macOS",
      buildTargets: ["dmg", "zip"],
      defaultElectronVersion: LATEST_STABLE_VERSION,
      latestStableVersion: LATEST_STABLE_VERSION,
      latestStableDate: LATEST_STABLE_DATE,
      versionChoices: [
        { value: LATEST_STABLE_VERSION, label: `Electron ${LATEST_STABLE_VERSION}`, note: `最新稳定版，${LATEST_STABLE_DATE} 发布。` },
        { value: "42.7.0", label: "Electron 42.7.0", note: "当前活跃维护线。" },
        { value: "41.10.2", label: "Electron 41.10.2", note: "成熟维护线。" },
        { value: "39.8.9", label: "Electron 39.8.9", note: "较老但仍常见的现代版本。" },
        { value: "35.7.5", label: "Electron 35.7.5", note: "较早的现代版本。" },
        { value: "28.3.3", label: "Electron 28.3.3", note: "适合作为 Intel 与 Apple Silicon 的平衡选择。" },
        { value: "22.3.27", label: "Electron 22.3.27", note: "兼容范围更老。" }
      ],
      compatibilityNotes: [
        `截至 ${LATEST_STABLE_DATE}，最新 Electron 正式版为 ${LATEST_STABLE_VERSION}。`,
        "macOS 可生成 DMG 和 ZIP，但正式分发通常还需要签名与公证。",
        "Apple ID 邮箱不是本地打包的硬性前提，但如果后续做 notarization，通常会用到开发者账号信息。"
      ]
    };
  }

  return {
    nodeVersion: process.versions.node,
    currentPlatform: process.platform,
    currentArch: process.arch,
    homeDirectory: os.homedir(),
    platformKey: "linux",
    builderPlatformKey: "linux",
    label: "Linux",
    buildTargets: ["AppImage", "deb", "rpm"],
    defaultElectronVersion: LATEST_STABLE_VERSION,
    latestStableVersion: LATEST_STABLE_VERSION,
    latestStableDate: LATEST_STABLE_DATE,
    versionChoices: [
      { value: LATEST_STABLE_VERSION, label: `Electron ${LATEST_STABLE_VERSION}`, note: `最新稳定版，${LATEST_STABLE_DATE} 发布。` },
      { value: "42.7.0", label: "Electron 42.7.0", note: "当前活跃维护线。" },
      { value: "41.10.2", label: "Electron 41.10.2", note: "成熟维护线。" },
      { value: "39.8.9", label: "Electron 39.8.9", note: "较老但仍常见的现代版本。" },
      { value: "35.7.5", label: "Electron 35.7.5", note: "较早的现代版本。" },
      { value: "28.3.3", label: "Electron 28.3.3", note: "适合作为 Linux 桌面发行版的平衡选择。" },
      { value: "22.3.27", label: "Electron 22.3.27", note: "适合保守兼容策略。" }
    ],
    compatibilityNotes: [
      `截至 ${LATEST_STABLE_DATE}，最新 Electron 正式版为 ${LATEST_STABLE_VERSION}。`,
      "Linux 默认输出 AppImage、deb、rpm 三种格式。",
      "不同发行版的 glibc、桌面环境和依赖库差异会影响兼容性。"
    ]
  };
}

function normalizeAuthor(formData) {
  const authorName = (formData.authorName || "").trim();
  const authorEmail = (formData.authorEmail || "").trim();

  if (authorName && authorEmail) {
    return {
      name: authorName,
      email: authorEmail
    };
  }

  if (authorName) {
    return authorName;
  }

  return undefined;
}

function buildPackageJson(formData, platformContext) {
  const iconPath = formData.iconPath || undefined;
  const author = normalizeAuthor(formData);
  const packageJson = {
    name: formData.name,
    productName: formData.productName,
    version: formData.version,
    description: formData.description,
    main: "main.js",
    author,
    license: formData.license,
    homepage: formData.homepage || undefined,
    scripts: {
      start: "electron .",
      build: "electron-builder"
    },
    devDependencies: {
      electron: formData.electronVersion,
      "electron-builder": ELECTRON_BUILDER_VERSION
    },
    build: {
      appId: formData.appId,
      directories: {
        output: "release"
      },
      files: ["**/*", "!release/**/*"],
      extraMetadata: {
        main: "main.js"
      }
    }
  };

  packageJson.build[platformContext.builderPlatformKey] = {
    target: platformContext.buildTargets
  };

  if (iconPath) {
    packageJson.build[platformContext.builderPlatformKey].icon = iconPath;
  }

  if (platformContext.platformKey === "mac") {
    packageJson.build.mac.category = "public.app-category.utilities";
  }

  if (platformContext.platformKey === "linux") {
    packageJson.build.linux.category = "Utility";
  }

  return JSON.parse(JSON.stringify(packageJson));
}

function buildMainJs(formData, runtimeConfig) {
  const width = Number(formData.windowWidth) || 1200;
  const height = Number(formData.windowHeight) || 800;
  const menuBarVisible = Boolean(formData.showMenuBar);
  const contextIsolationEnabled = formData.contextIsolation !== false;
  const loadPath = runtimeConfig.loadPath.replaceAll("\\", "\\\\");

  return `const path = require("path");
const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: ${width},
    height: ${height},
    autoHideMenuBar: ${menuBarVisible ? "false" : "true"},
    webPreferences: {
      contextIsolation: ${contextIsolationEnabled ? "true" : "false"},
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, "${loadPath}"));
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
`;
}

async function ensureWritableDirectory(targetDirectory) {
  await fs.access(targetDirectory);
}

async function ensureDirectory(directoryPath) {
  await fs.mkdir(directoryPath, { recursive: true });
}

async function copyDirectory(sourceDir, targetDir) {
  await ensureDirectory(targetDir);
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, targetPath);
    } else if (entry.isFile()) {
      await fs.copyFile(sourcePath, targetPath);
    }
  }
}

async function rewriteFileProtocolHtml(indexHtmlPath) {
  try {
    const html = await fs.readFile(indexHtmlPath, "utf8");
    const rewritten = html
      .replace(/(href|src)=["']\/(?!\/)/g, '$1="./')
      .replace(/url\((["']?)\/(?!\/)/g, "url($1./");

    if (rewritten !== html) {
      await fs.writeFile(indexHtmlPath, rewritten, "utf8");
    }
  } catch (_error) {
    // Ignore rewrite failures and let the build surface the real runtime issue.
  }
}

async function safeRemove(directoryPath) {
  await fs.rm(directoryPath, { recursive: true, force: true });
}

function buildWorkPaths(targetDirectory) {
  const electronProjectDir = path.join(targetDirectory, ELECTRON_WORKDIR);
  const appContentDir = path.join(electronProjectDir, "app");
  const releaseDir = path.join(electronProjectDir, "release");

  return {
    electronProjectDir,
    appContentDir,
    releaseDir
  };
}

function resolveProjectMode(payload) {
  const projectType = payload.projectScan?.projectType;
  if (!projectType) {
    return {
      mode: "static-html",
      needsFrontendBuild: false,
      sourceAppDir: payload.targetDirectory
    };
  }

  return {
    mode: projectType.type,
    needsFrontendBuild: Boolean(projectType.needsFrontendBuild),
    buildCommand: projectType.buildCommand || null,
    frontendOutputDir: projectType.outputDirectory || payload.targetDirectory,
    sourceAppDir: payload.targetDirectory
  };
}

async function generateElectronProject(payload) {
  const { targetDirectory, formData } = payload;
  const platformContext = getBuildContext();
  const mode = resolveProjectMode(payload);
  const paths = buildWorkPaths(targetDirectory);

  await ensureWritableDirectory(targetDirectory);
  await safeRemove(paths.electronProjectDir);
  await ensureDirectory(paths.appContentDir);

  const appSourceDir = mode.needsFrontendBuild ? mode.frontendOutputDir : targetDirectory;
  await copyDirectory(appSourceDir, paths.appContentDir);
  await rewriteFileProtocolHtml(path.join(paths.appContentDir, "index.html"));

  const packageJson = buildPackageJson(formData, platformContext);
  packageJson.build.directories.output = "release";
  const mainJs = buildMainJs(formData, { loadPath: path.join("app", "index.html") });

  await fs.writeFile(
    path.join(paths.electronProjectDir, "package.json"),
    `${JSON.stringify(packageJson, null, 2)}\n`,
    "utf8"
  );
  await fs.writeFile(path.join(paths.electronProjectDir, "main.js"), mainJs, "utf8");

  return {
    ok: true,
    writtenFiles: [
      path.join(paths.electronProjectDir, "package.json"),
      path.join(paths.electronProjectDir, "main.js")
    ],
    electronProjectDir: paths.electronProjectDir,
    appContentDir: paths.appContentDir,
    releaseDirectory: paths.releaseDir
  };
}

function spawnWithLogs(command, args, options) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      ...options,
      shell: true
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", (error) => {
      reject(error);
    });

    child.on("close", (code) => {
      resolve({
        code,
        stdout,
        stderr
      });
    });
  });
}

function likelyNeedsMirrorSwitch(buildLogs) {
  const text = `${buildLogs.stdout || ""}\n${buildLogs.stderr || ""}`.toLowerCase();
  const indicators = [
    "github.com",
    "timed out",
    "econnreset",
    "unable to get local issuer certificate",
    "connect etimedout",
    "getaddrinfo",
    "certificate",
    "download failed",
    "socket hang up"
  ];

  return indicators.some((indicator) => text.includes(indicator));
}

async function runFrontendBuild(payload, env) {
  const mode = resolveProjectMode(payload);
  if (!mode.needsFrontendBuild || !mode.buildCommand) {
    return {
      code: 0,
      stdout: "",
      stderr: "",
      stage: "frontend-skip"
    };
  }

  return {
    stage: "frontend-build",
    ...(await spawnWithLogs("npm", ["run", "build"], {
      cwd: payload.targetDirectory,
      env
    }))
  };
}

async function installDependenciesAndBuild(electronProjectDir, useMirror) {
  const mergedEnv = {
    ...process.env,
    ...(useMirror ? MIRROR_ENV : {})
  };

  const installResult = await spawnWithLogs("npm", ["install"], {
    cwd: electronProjectDir,
    env: mergedEnv
  });

  if (installResult.code !== 0) {
    return {
      stage: "install",
      ...installResult
    };
  }

  const buildResult = await spawnWithLogs("npx", ["electron-builder", "--publish", "never"], {
    cwd: electronProjectDir,
    env: mergedEnv
  });

  return {
    stage: "build",
    ...buildResult
  };
}

async function writeProjectFilesOnly(payload) {
  return generateElectronProject(payload);
}

async function runBuildPipeline(payload) {
  const { targetDirectory, useMirror = false } = payload;
  const platformContext = getBuildContext();

  await ensureWritableDirectory(targetDirectory);

  const mergedEnv = {
    ...process.env,
    ...(useMirror ? MIRROR_ENV : {})
  };

  const frontendBuild = await runFrontendBuild(payload, mergedEnv);
  if (frontendBuild.code !== 0) {
    return {
      ok: false,
      stage: frontendBuild.stage,
      code: frontendBuild.code,
      stdout: frontendBuild.stdout,
      stderr: frontendBuild.stderr,
      suggestedMirrorSwitch: !useMirror && likelyNeedsMirrorSwitch(frontendBuild),
      mirrorEnv: !useMirror && likelyNeedsMirrorSwitch(frontendBuild) ? MIRROR_ENV : undefined,
      outputDirectory: buildWorkPaths(targetDirectory).releaseDir,
      platform: platformContext.label
    };
  }

  const generationResult = await generateElectronProject(payload);
  const buildAttempt = await installDependenciesAndBuild(generationResult.electronProjectDir, useMirror);
  const shouldSuggestMirror = !useMirror && buildAttempt.code !== 0 && likelyNeedsMirrorSwitch(buildAttempt);
  const combinedStdout = [frontendBuild.stdout, buildAttempt.stdout].filter(Boolean).join("\n\n");
  const combinedStderr = [frontendBuild.stderr, buildAttempt.stderr].filter(Boolean).join("\n\n");

  return {
    ok: buildAttempt.code === 0,
    stage: buildAttempt.stage,
    code: buildAttempt.code,
    stdout: combinedStdout,
    stderr: combinedStderr,
    suggestedMirrorSwitch: shouldSuggestMirror,
    mirrorEnv: shouldSuggestMirror ? MIRROR_ENV : undefined,
    outputDirectory: generationResult.releaseDirectory,
    electronProjectDir: generationResult.electronProjectDir,
    platform: platformContext.label
  };
}

module.exports = {
  getBuildContext,
  writeProjectFilesOnly,
  runBuildPipeline
};
