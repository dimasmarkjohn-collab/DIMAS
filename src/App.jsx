
import React, { useState } from 'react';

const tools = [
  { icon: '✦', name: 'AI Assistant' },
  { icon: '▣', name: 'AI Clipper' },
  { icon: '✂', name: 'AI Editor' },
  { icon: '◉', name: 'Creative Studio' },
  { icon: '▥', name: 'Ranking Editor' },
  { icon: '✧', name: 'Motion Studio' },
  { icon: '➤', name: 'Auto Publisher' }
];

const clips = [
  { time: '00:12', score: '98%', label: 'Best moment' },
  { time: '00:38', score: '96%', label: 'Highlight' },
  { time: '01:04', score: '94%', label: 'Key moment' },
  { time: '01:29', score: '99%', label: 'Top moment' }
];

function EditingShowcase() {
  return (
    <section className="showcase-section">
      <div className="section-heading">
        <span>✦ EXPERIENCE DIMAS AI</span>
        <h2>From long videos to amazing content.</h2>
        <p>
          Watch how DIMAS transforms your creative workflow.
        </p>
      </div>

      <div className="editing-showcase">
        <div className="showcase-topbar">
          <div className="showcase-brand">
            <span className="showcase-brand-icon">▶</span>
            DIMAS AI STUDIO
          </div>
          <span className="live-status">AI PROCESSING</span>
        </div>

        <div className="editing-layout">
          <div className="video-panel">
            <div className="video-glow" />
            <div className="video-orb" />
            <div className="video-scan" />
            <div className="video-caption">
              ORIGINAL VIDEO PREVIEW
            </div>
            <div className="video-time">12:48</div>
          </div>

          <div className="analysis-panel">
            <div className="panel-label">
              DIMAS AI ANALYSIS ✦
            </div>
            <div className="analysis-title">
              Finding the best moments
            </div>
            <p className="analysis-description">
              AI analyzes the video and identifies
              potential highlights.
            </p>

            <div className="analysis-progress">
              <span />
            </div>

            <div className="analysis-stats">
              <div className="analysis-stat">
                <strong>98%</strong>
                <span>Video analysis</span>
              </div>
              <div className="analysis-stat">
                <strong>24</strong>
                <span>Moments detected</span>
              </div>
            </div>
          </div>
        </div>

        <div className="timeline-panel">
          <div className="timeline-header">
            <strong>AI EDITING TIMELINE</strong>
            <span>GENERATED HIGHLIGHTS</span>
          </div>

          <div className="timeline-track">
            <div className="timeline-clip" />
            <div className="timeline-clip" />
            <div className="timeline-clip" />
            <div className="timeline-clip" />
            <div className="timeline-playhead" />
          </div>
        </div>

        <div className="panel-label" style={{ marginTop: 18 }}>
          ✦ AI GENERATED CLIPS
        </div>

        <div className="generated-clips">
          {clips.map((clip, index) => (
            <article className="generated-card" key={clip.time}>
              <div className="generated-thumb" />
              <strong>{clip.label}</strong>
              <span>{clip.time} · Score {clip.score}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function App() {
  const [activeTool, setActiveTool] = useState('AI Assistant');
  const [prompt, setPrompt] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!prompt.trim()) {
      setMessage('Please describe what you want DIMAS to create.');
      return;
    }

    setMessage(
      `${activeTool} request received by the DIMAS interface. AI execution will be connected in a future step.`
    );
  };

  return (
    <div className="app">
      <header className="navbar">
        <a className="logo" href="#home">
          <span className="logo-icon">▶</span>
          DIMAS
        </a>

        <nav>
          <a href="#tools">Creator Platform</a>
          <a href="#workspace">AI</a>
          <a href="#tools">Tools</a>
          <a href="#about">About</a>
        </nav>

        <div className="nav-actions">
          <a href="#login" className="login-link">Log in</a>
          <a href="#workspace" className="primary-button">
            Start for free ↗
          </a>
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <div className="eyebrow">
            ✦ YOUR ALL-IN-ONE CREATOR ECOSYSTEM
          </div>

          <h1>
            <span>ALL-IN-ONE AI</span>
            <br />
            CREATIVE STUDIO
          </h1>

          <p className="hero-description">
            Empowering creators with powerful tools.
            Plan, create, edit and publish — all in one place.
          </p>

          <div className="hero-buttons">
            <a href="#workspace" className="primary-button">
              Get started free →
            </a>
            <a href="#tools" className="secondary-button">
              Explore DIMAS tools
            </a>
          </div>

          <p className="free-note">
            Free for everyone ✦ No subscriptions ✦ One creative workspace
          </p>

          <section className="workspace" id="workspace">
            <div className="prompt-box">
              <label htmlFor="prompt">
                What would you like to create today?
              </label>

              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your idea or the task you want DIMAS to help with..."
              />

              <div className="prompt-footer">
                <span>✧ Ask DIMAS to bring your idea to life</span>
                <span>{activeTool}</span>
              </div>

              <button
                type="button"
                className="primary-button"
                style={{
                  border: 0,
                  cursor: 'pointer',
                  marginTop: 15
                }}
                onClick={handleSubmit}
              >
                Generate with DIMAS ✦
              </button>
            </div>

            <div className="tool-shortcuts">
              {tools.map((tool) => (
                <button
                  key={tool.name}
                  className={
                    activeTool === tool.name
                      ? 'tool active'
                      : 'tool'
                  }
                  onClick={() => {
                    setActiveTool(tool.name);
                    setMessage(`${tool.name} selected.`);
                  }}
                >
                  {tool.icon} {tool.name}
                </button>
              ))}
            </div>

            <p className="workspace-message" aria-live="polite">
              {message}
            </p>
          </section>

          <div className="trust-section">
            <h3>One workspace for every kind of creator</h3>
            <div className="trust-items">
              <span>CREATE</span>
              <span>EDIT</span>
              <span>DESIGN</span>
              <span>RANK</span>
              <span>PUBLISH</span>
              <span>GROW</span>
            </div>
          </div>
        </section>

        <EditingShowcase />

        <section className="tools-section" id="tools">
          <div className="section-heading">
            <span>THE DIMAS ECOSYSTEM</span>
            <h2>Everything you need to create</h2>
            <p>
              A growing collection of creator tools,
              designed to work together in one unified platform.
            </p>
          </div>

          <div className="tools-grid">
            {tools.slice(1).map((tool) => (
              <article className="tool-card" key={tool.name}>
                <div className="card-icon">{tool.icon}</div>
                <h3>{tool.name}</h3>
                <p>
                  Powerful creative tools designed
                  to make your workflow easier.
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer id="about">
        DIMAS · Create more. Do more. Together.
      </footer>
    </div>
  );
}

export default App;
