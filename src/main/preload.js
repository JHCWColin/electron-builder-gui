const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("builderApi", {
  getPlatformContext: (payload) => ipcRenderer.invoke("system:get-platform-context", payload),
  chooseProjectDirectory: (payload) => ipcRenderer.invoke("dialog:choose-project-directory", payload),
  chooseIconFile: (payload) => ipcRenderer.invoke("dialog:choose-icon-file", payload),
  confirmMirrorSwitch: (payload) => ipcRenderer.invoke("dialog:confirm-mirror-switch", payload),
  writeProjectFilesOnly: (payload) => ipcRenderer.invoke("project:write-files-only", payload),
  runBuild: (payload) => ipcRenderer.invoke("build:run", payload),
  openPath: (targetPath) => ipcRenderer.invoke("shell:open-path", targetPath)
});
