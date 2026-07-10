// Illustrative deploy console (v3 developer-native signature). Pure markup +
// CSS animation (lines type in, cursor blinks) — NO client JS, so it stays a
// server component. Reads as a *product illustration* of what the studio does
// (build → provision → wire AI → live), not a claim of live production stats.
const stages = ["build", "test", "infra", "deploy", "live"];

export function DeployConsole() {
  return (
    <div className="bz-console">
      <div className="bz-cbar">
        <i style={{ background: "#ff5f56" }} />
        <i style={{ background: "#ffbd2e" }} />
        <i style={{ background: "#27c93f" }} />
        <span>bezacore — ship --prod</span>
      </div>
      <div className="bz-term">
        <span className="ln">
          <span className="bz-p">$</span> bezacore ship --prod
        </span>
        <span className="ln">
          <span className="bz-dim">→</span> build image <span className="bz-dim">········</span>{" "}
          <span className="bz-ok">done</span>
        </span>
        <span className="ln">
          <span className="bz-dim">→</span> provision infra <span className="bz-dim">·····</span>{" "}
          <span className="bz-ok">done</span>
        </span>
        <span className="ln">
          <span className="bz-dim">→</span> wire agents + RAG <span className="bz-dim">···</span>{" "}
          <span className="bz-ok">done</span>
        </span>
        <span className="ln">
          <span className="bz-ok">✓</span> live · <span className="bz-w">bezacore.com</span>{" "}
          <span className="bz-dim">· 200 OK · 42ms</span>
        </span>
        <span className="ln">
          <span className="bz-p">$</span> <span className="bz-cur" />
        </span>
      </div>
      <div className="bz-pipe">
        {stages.map((s, i) => (
          <span key={s} className="contents">
            <span className="bz-stage on">
              <span className="dot" />
              {s}
            </span>
            {i < stages.length - 1 ? <span className="bz-sep" /> : null}
          </span>
        ))}
      </div>
    </div>
  );
}
