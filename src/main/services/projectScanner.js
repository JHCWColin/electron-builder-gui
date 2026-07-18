const fs = require("fs/promises");
const path = require("path");

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch (_error) {
    return false;
  }
}

async function readJsonIfExists(filePath) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch (_error) {
    return null;
  }
}

async function listSiblingFiles(directoryPath) {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));
}

async function detectProjectType(directoryPath) {
  const packageJsonPath = path.join(directoryPath, "package.json");
  const packageJson = await readJsonIfExists(packageJsonPath);
  const indexFilePath = path.join(directoryPath, "index.html");
  const srcMainJsx = path.join(directoryPath, "src", "main.jsx");
  const srcMainTsx = path.join(directoryPath, "src", "main.tsx");
  const publicIndexHtml = path.join(directoryPath, "public", "index.html");
  const viteConfigJs = path.join(directoryPath, "vite.config.js");
  const viteConfigTs = path.join(directoryPath, "vite.config.ts");

  const hasIndexHtml = await exists(indexFilePath);
  const hasSrcMainJsx = await exists(srcMainJsx);
  const hasSrcMainTsx = await exists(srcMainTsx);
  const hasPublicIndexHtml = await exists(publicIndexHtml);
  const hasViteConfig = (await exists(viteConfigJs)) || (await exists(viteConfigTs));

  if (!packageJson) {
    return {
      type: hasIndexHtml ? "static-html" : "unknown",
      displayName: hasIndexHtml ? "静态 HTML 项目" : "未知项目",
      buildCommand: null,
      outputDirectory: directoryPath,
      entryHtmlPath: hasIndexHtml ? indexFilePath : null,
      needsFrontendBuild: false,
      canPackage: hasIndexHtml
    };
  }

  const dependencies = {
    ...(packageJson.dependencies || {}),
    ...(packageJson.devDependencies || {})
  };
  const scripts = packageJson.scripts || {};
  const hasReact = Boolean(dependencies.react);
  const hasReactDom = Boolean(dependencies["react-dom"]);
  const hasVite = Boolean(dependencies.vite);
  const hasReactScripts = Boolean(dependencies["react-scripts"]);

  if (hasReact && hasReactDom && hasVite && (hasSrcMainJsx || hasSrcMainTsx || hasViteConfig)) {
    return {
      type: "react-vite",
      displayName: "React + Vite 项目",
      buildCommand: scripts.build || "vite build",
      outputDirectory: path.join(directoryPath, "dist"),
      entryHtmlPath: path.join(directoryPath, "dist", "index.html"),
      needsFrontendBuild: true,
      canPackage: true
    };
  }

  if (hasReact && hasReactDom && hasReactScripts && hasPublicIndexHtml) {
    return {
      type: "react-cra",
      displayName: "React CRA 项目",
      buildCommand: scripts.build || "react-scripts build",
      outputDirectory: path.join(directoryPath, "build"),
      entryHtmlPath: path.join(directoryPath, "build", "index.html"),
      needsFrontendBuild: true,
      canPackage: true
    };
  }

  return {
    type: hasIndexHtml ? "static-html" : "unknown",
    displayName: hasIndexHtml ? "静态 HTML 项目" : "未知项目",
    buildCommand: null,
    outputDirectory: directoryPath,
    entryHtmlPath: hasIndexHtml ? indexFilePath : null,
    needsFrontendBuild: false,
    canPackage: hasIndexHtml
  };
}

async function scanProjectDirectory(directoryPath) {
  const siblingFiles = await listSiblingFiles(directoryPath);
  const logoFilePath = path.join(directoryPath, "logo.png");
  const faviconFilePath = path.join(directoryPath, "favicon.ico");
  const packageJsonPath = path.join(directoryPath, "package.json");

  const hasLogo = await exists(logoFilePath);
  const hasFavicon = await exists(faviconFilePath);
  const hasPackageJson = await exists(packageJsonPath);
  const projectType = await detectProjectType(directoryPath);

  let recommendedIconPath = null;
  if (hasLogo) {
    recommendedIconPath = logoFilePath;
  } else if (hasFavicon) {
    recommendedIconPath = faviconFilePath;
  }

  return {
    hasIndexHtml: projectType.type === "static-html",
    hasPackageJson,
    packageJsonPath: hasPackageJson ? packageJsonPath : null,
    detectedFiles: siblingFiles,
    iconCandidates: {
      logo: hasLogo ? logoFilePath : null,
      favicon: hasFavicon ? faviconFilePath : null,
      recommended: recommendedIconPath
    },
    projectType
  };
}

module.exports = {
  scanProjectDirectory
};
