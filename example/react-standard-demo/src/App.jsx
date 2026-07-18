export default function App() {
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">React + Vite 示例</p>
        <h1>electron-builder-UI React Demo</h1>
        <p className="summary">
          这是一个标准 React 演示项目，用来测试当前 Electron 打包向导对 React 前端项目的识别、
          预构建和桌面打包流程。
        </p>
        <div className="chips">
          <span>React</span>
          <span>Vite</span>
          <span>Electron Packaging</span>
        </div>
      </section>

      <section className="card-grid">
        <article className="card">
          <h2>如何使用</h2>
          <p>先在这个目录执行 npm install。</p>
          <p>然后在 electron-builder-UI 里选择本目录。</p>
          <p>向导会识别为 React + Vite 项目，并先执行 npm run build。</p>
        </article>

        <article className="card">
          <h2>检测点</h2>
          <ul>
            <li>项目类型识别是否正确</li>
            <li>产物目录 dist 是否被正确打包</li>
            <li>Electron 主窗口是否正常加载前端构建产物</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
