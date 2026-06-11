const metrics = [
  ["65", "UI records"],
  ["72", "registry records"],
  ["40+", "ornaments"],
  ["8", "template routes"],
];

const axes = [
  ["Ink", "black border mass, focus rings, and hard separation"],
  ["Pressure", "offset shadows and press-down motion"],
  ["Collision", "square, rounded, and pill shapes sharing a room"],
  ["Signal", "loud accents with named roles"],
  ["Surface", "dots, stripes, checks, and texture fills"],
  ["Tilt", "small rotations that do not break layout"],
  ["Density", "compact, default, and chunky surfaces"],
];

const templates = ["SaaS", "Dashboard", "Docs", "Blog", "Ecommerce", "Agency", "AI Chat", "Changelog"];

function App() {
  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#top" aria-label="feral ui home"><span />feral/ui</a>
        <div className="navlinks">
          <a href="#grammar">Grammar</a>
          <a href="#lab">Style Lab</a>
          <a href="#templates">Templates</a>
          <a href="https://github.com/HarrowHaus/feral-ui">GitHub</a>
        </div>
      </nav>

      <section id="top" className="hero section">
        <p className="eyebrow">Controlled Variance UI · pre-release</p>
        <h1>Interfaces with the manners of a sticker bomb and the receipts of a tax folder.</h1>
        <p className="lede">Feral UI is a React component-system basis for shadcn-style projects: ink borders, pressure shadows, clashing radii, texture fills, small rotations, and honest status labels. No fake registry séance. No imaginary install command. The goblin is being documented.</p>
        <div className="actions">
          <a className="button primary" href="#preview">View preview</a>
          <a className="button" href="https://github.com/HarrowHaus/feral-ui">Open repo</a>
        </div>
      </section>

      <section id="preview" className="collage section" aria-label="component preview collage">
        <div className="card login press tilt-left">
          <h2>Preview card</h2>
          <p>Border mass, color pressure, hostile friendliness.</p>
          <label>Email</label>
          <input value="goblin@feral.dev" readOnly />
          <button>Commit tiny chaos</button>
        </div>
        <div className="card alert press pill">Registry status: local receipts only. Public install waits for hosted smoke tests.</div>
        <div className="card tabs press">
          <div className="tabbar"><span>Ink</span><span>Pressure</span><span>Surface</span></div>
          <p>The variance is tokenized, not random. It only looks unsupervised.</p>
        </div>
        <div className="card receipt press tilt-right"><b>Accessibility thesis</b><br />Visual layer: feral. Semantic layer: boring on purpose.</div>
      </section>

      <section id="grammar" className="section grid-section">
        <div>
          <p className="eyebrow">Design grammar</p>
          <h2>Seven axes. One leash.</h2>
          <p>Feral UI is not a color skin. It is a controlled-variance grammar for making components disagree without collapsing into decorative oatmeal.</p>
        </div>
        <div className="axis-grid">
          {axes.map(([name, desc]) => <article className="axis" key={name}><b>{name}</b><span>{desc}</span></article>)}
        </div>
      </section>

      <section id="lab" className="section lab">
        <p className="eyebrow">Style Lab target</p>
        <h2>Theme generator, not mood board soup.</h2>
        <div className="sliders">
          <label>Border mass <input type="range" min="2" max="8" defaultValue="5" /></label>
          <label>Press depth <input type="range" min="2" max="12" defaultValue="7" /></label>
          <label>Pattern intensity <input type="range" min="0" max="10" defaultValue="4" /></label>
        </div>
        <pre>{`:root {
  --feral-ink: #0a0a0a;
  --feral-paper: #fff4e0;
  --feral-border: 5px;
  --feral-press: 7px;
}`}</pre>
      </section>

      <section id="templates" className="section">
        <p className="eyebrow">Template targets</p>
        <h2>Eight preview routes, then real full-page builds.</h2>
        <div className="template-grid">
          {templates.map((template, index) => <article className="template press" key={template}><span>0{index + 1}</span><b>{template}</b><p>Route target locked. Depth pass comes next.</p></article>)}
        </div>
      </section>

      <section className="section metrics">
        {metrics.map(([value, label]) => <div className="metric" key={label}><b>{value}</b><span>{label}</span></div>)}
      </section>

      <footer className="footer">MIT. Rude docs, honest receipts, source-owned components. If the words say registry, the code has to show up wearing pants.</footer>
    </main>
  );
}

export default App;
