
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
            <span className="mini-logo">▶</span>
            DIMAS AI STUDIO
          </div>
          <span className="live-status">
            <i /> AI PROCESSING
          </span>
        </div>

        <div className="editing-layout">

          <div className="video-panel">
            <div className="panel-label">
              <span>ORIGINAL VIDEO</span>
              <span>16:9 SOURCE</span>
            </div>

            <div className="video-screen">
              <div className="video-scene">
                <div className="scene-glow" />
                <div className="scene-person">▶</div>
                <div className="scene-caption">
                  ORIGINAL VIDEO PREVIEW
                </div>
              </div>

              <div className="scan-line" />

              <div className="video-play">▶</div>
              <span className="video-duration">12:48</span>
            </div>

            <div className="video-controls">
              <span>▶</span>
              <div className="video-progress">
                <i />
              </div>
              <span>02:34 / 12:48</span>
            </div>
          </div>

          <div className="analysis-panel">
            <div className="panel-label">
              <span>DIMAS AI ANALYSIS</span>
              <span className="analysis-icon">✦</span>
            </div>

            <div className="analysis-content">
              <div className="ai-orb">✦</div>
              <h3>Finding the best moments</h3>
              <p>
                AI analyzes the video and identifies
                potential highlights.
              </p>

              <div className="analysis-step">
                <span>Video analysis</span>
                <strong>Complete</strong>
              </div>
              <div className="analysis-step">
                <span>Highlight detection</span>
                <strong>Complete</strong>
              </div>
              <div className="analysis-step">
                <span>Clip generation</span>
                <strong className="processing">Processing...</strong>
              </div>

              <div className="analysis-bar">
                <i />
              </div>
            </div>
          </div>
        </div>

        <div className="timeline-panel">
          <div className="timeline-heading">
            <span>AI EDITING TIMELINE</span>
            <span>GENERATED HIGHLIGHTS</span>
          </div>

          <div className="timeline-track">
            <div className="timeline-base" />
            <div className="timeline-progress" />
            <div className="timeline-playhead" />
            <div className="timeline-segment one" />
            <div className="timeline-segment two" />
            <div className="timeline-segment three" />
            <div className="timeline-segment four" />
          </div>

          <div className="timeline-time">
            <span>00:00</span>
            <span>03:00</span>
            <span>06:00</span>
            <span>09:00</span>
            <span>12:48</span>
          </div>
        </div>

        <div className="generated-heading">
          <div>
            <span>✦ AI GENERATED</span>
            <h3>Your clips are ready</h3>
          </div>
          <span className="clip-count">04 CLIPS</span>
        </div>

        <div className="generated-clips">
          {clips.map((clip, index) => (
            <article className="generated-card" key={clip.time}>
              <div className={`clip-thumbnail clip-${index + 1}`}>
                <span className="clip-play">▶</span>
                <span className="clip-time">{clip.time}</span>
              </div>
              <div className="clip-details">
                <strong>{clip.label}</strong>
                <span>Highlight score · {clip.score}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="showcase-footer">
          <span>✦ One video. Multiple possibilities.</span>
          <span>POWERED BY DIMAS</span>
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
      setMessage('Describe what you want DIMAS to create.');
      return;
    }

    setMessage(
      'DIMAS AI will be connected in a future development phase.'
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
            </div>

            <button className="send-button" onClick={handleSubmit}>
              ✦
            </button>

            <div className="tool-shortcuts">
              {tools.map((tool) => (
                <button
                  key={tool.name}
                  className={activeTool === tool.name ? 'tool active' : 'tool'}
                  onClick={() => {
                    setActiveTool(tool.name);
                    setMessage(`${tool.name} selected`);
                  }}
                >
                  {tool.icon} {tool.name}
                </button>
              ))}
            </div>

            <p className="workspace-message">{message}</p>
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
