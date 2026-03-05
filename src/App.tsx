import './App.css'

function App() {
  return (
    <div className="app-shell">
      <div className="app-shell__frame">
        {/* Top Bar */}
        <header className="app-shell__topbar">
          <div className="app-shell__topbar-left">Job Notification App</div>
          <div className="app-shell__topbar-center">Step 1 / 4</div>
          <div className="app-shell__topbar-right">
            <span className="status-badge status-badge--not-started">Not started</span>
          </div>
        </header>

        {/* Context Header */}
        <section className="context-header">
          <h1 className="context-header__title">Define your notification workflow foundations</h1>
          <p className="context-header__subtitle">
            This workspace focuses only on the design system primitives used across notification-related
            flows. No product logic is configured here.
          </p>
        </section>

        {/* Primary workspace + secondary panel */}
        <main className="layout-main">
          <section className="card card--workspace">
            <div>
              <h2 className="card__title">Primary workspace surface</h2>
              <p className="helper-text">
                Use this area for structured forms, lists, or configuration views. Components should feel
                calm, predictable, and spacious.
              </p>
            </div>

            <div className="field-group">
              <div className="field-group__label-row">
                <label className="field-group__label" htmlFor="example-input">
                  Example input
                </label>
                <span className="field-group__hint">Single-line text field</span>
              </div>
              <input
                id="example-input"
                className="input"
                placeholder="Inputs use a consistent radius, border, and focus ring."
              />
            </div>

            <div className="field-group">
              <div className="field-group__label-row">
                <label className="field-group__label" htmlFor="example-notes">
                  Example long-form field
                </label>
                <span className="field-group__hint">Multiline text area</span>
              </div>
              <textarea
                id="example-notes"
                className="input input--multiline"
                placeholder="Longer content respects max-width and relaxed line-height for comfortable reading."
              />
            </div>

            <div className="empty-state">
              <div className="empty-state__title">No configuration added yet</div>
              <p className="empty-state__body">
                Use the primary and secondary actions below to introduce your first elements. Empty states
                should calmly explain what is missing and suggest a next step.
              </p>
              <div className="button-row">
                <button className="button button--primary" type="button">
                  Primary action
                </button>
                <button className="button button--secondary" type="button">
                  Secondary action
                </button>
              </div>
            </div>

            <div className="error-panel">
              <div className="error-panel__title">We could not save your latest changes</div>
              <p className="error-panel__body">
                The connection to the server was interrupted before your updates were stored. Your current
                inputs are still visible in this workspace.
              </p>
              <p className="error-panel__action">
                Please check your connection and select “Try again” to repeat the last action.
              </p>
              <div className="button-row">
                <button className="button button--primary" type="button">
                  Try again
                </button>
                <button className="button button--ghost" type="button">
                  Dismiss
                </button>
              </div>
            </div>
          </section>

          <aside className="card card--sidepanel">
            <div>
              <h2 className="card__title">Step context and system guidance</h2>
              <p className="helper-text">
                The secondary panel explains why this step exists, how to approach it, and what “complete”
                looks like. Language is direct and practical.
              </p>
            </div>

            <div className="copy-box">
              <div className="copy-box__meta">
                <span className="copy-box__label">Copyable prompt</span>
                <button className="button button--secondary" type="button">
                  Copy text
                </button>
              </div>
              <div className="copy-box__inner">
                Keep this panel focused on short, actionable guidance that can be reused across steps. Avoid
                hype language and prefer clear intent.
              </div>
            </div>

            <div className="field-group">
              <div className="field-group__label-row">
                <div className="field-group__label">Status examples</div>
              </div>
              <div className="button-row">
                <span className="status-badge status-badge--not-started">Not started</span>
                <span className="status-badge status-badge--in-progress">In progress</span>
                <span className="status-badge status-badge--shipped">Shipped</span>
              </div>
            </div>
          </aside>
        </main>

        {/* Proof footer */}
        <footer className="proof-footer">
          <div className="proof-footer__label">Proof checklist</div>
          <div className="proof-footer__list">
            <div className="proof-footer__item">
              <span className="checkbox" aria-hidden="true" /> <span>UI Built</span>
            </div>
            <div className="proof-footer__item">
              <span className="checkbox" aria-hidden="true" /> <span>Logic Working</span>
            </div>
            <div className="proof-footer__item">
              <span className="checkbox" aria-hidden="true" /> <span>Test Passed</span>
            </div>
            <div className="proof-footer__item">
              <span className="checkbox" aria-hidden="true" /> <span>Deployed</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
