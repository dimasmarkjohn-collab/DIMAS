
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

function App() {
  const [activeTool, setActiveTool] = useState('AI Assistant');
  const [prompt, setPrompt] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!prompt.trim()) {
      setMessage('Describe what you want DIMAS to create.');
      return;
    }

    setMessage('DIMAS AI will be connected in a future development phase.');
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
