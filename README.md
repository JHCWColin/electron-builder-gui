# electron-builder-gui

`electron-builder-gui` is a desktop wizard for turning a static HTML project or a simple frontend project into an Electron app package.

It provides a visual flow for:

- selecting a project directory
- detecting `index.html`, icon files, and supported project types
- filling app metadata such as `name`, `productName`, `version`, and `appId`
- generating the Electron wrapper files used for packaging
- running `npm install` and `electron-builder`
- switching to mainland China mirrors when default downloads fail

## Supported project types

- Static HTML projects
- React + Vite projects
- React CRA projects

For frontend projects that require a build step, the app will run the frontend build first and then package the built output.

## Current stack

- Electron `43.1.1`
- electron-builder `26.11.1`
- Plain HTML, CSS, and JavaScript renderer

## Features

- Multi-step packaging wizard
- Project scanning and icon recommendation
- Multi-language interface
- Platform-aware Electron version recommendations
- One-click generation of `package.json` and `main.js` for the generated Electron project
- Build log output inside the app
- Auto retry path with `npmmirror` for Electron and electron-builder downloads

## Project structure

```text
src/
  main/
    main.js
    preload.js
    services/
      buildService.js
      projectScanner.js
  renderer/
    app.js
    index.html
    styles.css
example/
  react-standard-demo/
```

## Local development

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm start
```

## How packaging works

1. Choose a target project directory.
2. The app detects project type and icon candidates.
3. Fill package metadata and window settings.
4. The app generates a temporary Electron packaging workspace in `.electron-builder-ui`.
5. It installs dependencies and runs `electron-builder`.
6. Build output is written under the generated workspace `release` directory.

## Notes

- The current build flow packages artifacts for the current operating system only.
- Windows targets are `nsis` and `portable`.
- The generated Electron packaging workspace is created inside the selected target project, not inside this repo.

## License

MIT
