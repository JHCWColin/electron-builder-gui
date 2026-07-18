# React Standard Demo

这是给 `electron-builder-UI` 测试用的标准 React + Vite 示例项目。

## 使用方式

1. 在本目录执行 `npm install`
2. 可选：执行 `npm run build` 确认前端可构建
3. 打开 `electron-builder-UI`
4. 选择本目录作为待打包项目
5. 向导会识别为 `React + Vite 项目`
6. 构建时会先执行前端构建，再在 `.electron-builder-ui` 目录中生成 Electron 打包工程

## 预期结果

- 前端构建产物输出到 `dist`
- Electron 工作目录输出到 `.electron-builder-ui`
- 安装包输出到 `.electron-builder-ui/release`
