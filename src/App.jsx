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

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function EditingShowcase() {
  return (
    <section className="showcase-section">
      <div className="section-heading">
        <span>✦ EXPERIENCE DIMAS AI</span>
        <h2>From long videos to amazing content.</h2>
        <p>Watch how DIMAS transforms your creative workflow.</p>
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
            <div className="video-caption">ORIGINAL VIDEO PREVIEW</div>
            <div className="video-time">12:48</div>
          </div>

          <div className="analysis-panel">
            <div className="panel-label">DIMAS AI ANALYSIS ✦</div>
            <div className="analysis-title">Finding the best moments</div>
            <p className="analysis-description">
              AI analyzes the video and identifies potential highlights.
            </p>
            <div className="analysis-progress"><span /></div>
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
          {clips.map((clip) => (
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
  const [menuOpen, setMenuOpen] = useState(false);

  const [videoFile, setVideoFile] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);

  const [videoUrl, setVideoUrl] = useState('');
  const [submittedUrl, setSubmittedUrl] = useState('');
  const [urlError, setUrlError] = useState('');

  const handleSubmit = () => {
    if (!prompt.trim()) {
      setMessage('Please describe what you want DIMAS to create.');
      return;
    }

    setMessage(
      `${activeTool} request received. AI execution will be connected in a future step.`
    );
  };

  const handleVideoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validVideo =
      file.type.startsWith('video/') ||
      /\.(mp4|mov|webm|mkv|avi|m4v)$/i.test(file.name);

    if (!validVideo) {
      setUploadError('Please select a valid video file.');
      setVideoFile(null);
      event.target.value = '';
      return;
    }

    setUploadError('');
    setUploadResult(null);
    setVideoFile(file);
    setSubmittedUrl('');
    setVideoUrl('');
    setMessage('Video selected. Ready to upload to DIMAS.');
  };

  const clearVideo = () => {
    setVideoFile(null);
    setUploadError('');
    setUploadResult(null);

    const input = document.getElementById('dimas-video-upload');
    if (input) input.value = '';
  };

  // Improved upload diagnostics: safely reads text before attempting JSON parsing.
  const handleVideoUpload = async () => {
    if (!videoFile || uploading) return;

    setUploading(true);
    setUploadError('');
    setUploadResult(null);
    setMessage('Uploading your video to DIMAS...');

    try {
      const formData = new FormData();
      formData.append('video', videoFile);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const responseText = await response.text();

      if (!responseText.trim()) {
        throw new Error(
          `Backend returned an empty response. HTTP status: ${response.status}`
        );
      }

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          `Backend returned an invalid response. HTTP ${response.status}: ${responseText.slice(0, 250)}`
        );
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || `Upload failed. HTTP status: ${response.status}`
        );
      }

      if (!data.video) {
        throw new Error('Upload response is missing video information.');
      }

      setUploadResult(data.video);
      setMessage('Your video was successfully received by DIMAS!');
    } catch (error) {
      console.error('DIMAS upload error:', error);
      setUploadError(
        error.message || 'Could not connect to the DIMAS backend.'
      );
      setMessage('Video upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    const trimmedUrl = videoUrl.trim();

    if (!trimmedUrl) {
      setUrlError('Please paste a video link first.');
      return;
    }

    try {
      const parsedUrl = new URL(trimmedUrl);

      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        throw new Error('Invalid protocol');
      }

      setUrlError('');
      setSubmittedUrl(parsedUrl.href);
      setVideoFile(null);
      setUploadResult(null);
      setMessage('Video link accepted. Source retrieval is not connected yet.');
    } catch {
      setUrlError('Please enter a valid video URL starting with https://');
      setSubmittedUrl('');
    }
  };

  const clearUrl = () => {
    setVideoUrl('');
    setSubmittedUrl('');
    setUrlError('');
  };

  return (
    <div className="app">
      <div className="ambient" aria-hidden="true">
        <i /><i /><i /><b />
      </div>

      <header className={menuOpen ? 'navbar is-open' : 'navbar'}>
        <a className="logo" href="#home">
          <span className="logo-icon">▶</span>
          DIMAS
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>

        <div className="nav-menu" id="primary-nav" onClick={() => setMenuOpen(false)}>
          <nav>
            <a href="#tools">Creator Platform</a>
            <a href="#workspace">AI</a>
            <a href="#tools">Tools</a>
            <a href="#about">About</a>
          </nav>

          <div className="nav-actions">
            <a href="#login" className="login-link">Log in</a>
            <a href="#workspace" className="primary-button">Start for free ↗</a>
          </div>
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <div className="eyebrow">✦ YOUR ALL-IN-ONE CREATOR ECOSYSTEM</div>

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
            <a href="#workspace" className="primary-button">Get started free →</a>
            <a href="#tools" className="secondary-button">Explore DIMAS tools</a>
          </div>

          <p className="free-note">
            Free for everyone ✦ No subscriptions ✦ One creative workspace
          </p>

          <section className="workspace" id="workspace">
            <div className="prompt-box">
              <label htmlFor="prompt">What would you like to create today?</label>
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
                onClick={handleSubmit}
              >
                Generate with DIMAS ✦
              </button>
            </div>

            <div className="tool-shortcuts">
              {tools.map((tool) => (
                <button
                  key={tool.name}
                  className={activeTool === tool.name ? 'tool active' : 'tool'}
                  onClick={() => {
                    setActiveTool(tool.name);
                    setMessage(`${tool.name} selected.`);
                  }}
                >
                  {tool.icon} {tool.name}
                </button>
              ))}
            </div>

            {activeTool === 'AI Clipper' && (
              <div className="clipper">
                <div className="clipper-kicker">✦ DIMAS AI CLIPPER</div>
                <h3 className="clipper-title">Turn long videos into engaging Shorts.</h3>
                <p className="clipper-lead">
                  Upload a long-form video or paste a video link.
                  DIMAS will eventually analyze it and identify the best moments.
                </p>

                <div className="step-label"><b>1</b> Upload from your device</div>

                <label htmlFor="dimas-video-upload" className="dropzone">
                  <span className="dropzone-icon" aria-hidden="true">↑</span>
                  <strong>Choose a video from your device</strong>
                  <span className="dropzone-hint">
                    MP4, MOV, WebM, MKV and other video formats
                  </span>
                  <input
                    id="dimas-video-upload"
                    className="file-input"
                    type="file"
                    accept="video/*,.mkv,.avi,.m4v"
                    onChange={handleVideoChange}
                  />
                </label>

                {uploadError && <p className="form-error" role="alert">{uploadError}</p>}

                {videoFile && (
                  <div className="file-chip">
                    <div className="file-meta">
                      <strong className="file-name">🎬 {videoFile.name}</strong>
                      <span className="file-size">{formatFileSize(videoFile.size)}</span>
                    </div>
                    <button type="button" onClick={clearVideo} className="secondary-button">
                      Remove
                    </button>
                  </div>
                )}

                {videoFile && !uploadResult && (
                  <button
                    type="button"
                    className="primary-button upload-button"
                    onClick={handleVideoUpload}
                    disabled={uploading}
                  >
                    {uploading ? (
                      <><span className="spinner" aria-hidden="true" />Uploading...</>
                    ) : (
                      'Upload to DIMAS ↑'
                    )}
                  </button>
                )}

                {uploading && (
                  <div className="upload-progress" role="status" aria-label="Uploading">
                    <span />
                  </div>
                )}

                {uploadResult && (
                  <div className="upload-success" role="status">
                    <strong>✓ Video uploaded successfully!</strong>
                    <p>Filename: {uploadResult.filename}</p>
                    <p>File ID: {uploadResult.id}</p>
                    <p>Size: {formatFileSize(uploadResult.size)}</p>
                  </div>
                )}

                <div className="divider"><span>OR</span></div>

                <div className="step-label"><b>2</b> Paste a video link</div>

                <div className="link-row">
                  <input
                    className="url-input"
                    type="url"
                    value={videoUrl}
                    onChange={(e) => {
                      setVideoUrl(e.target.value);
                      setUrlError('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleUrlSubmit();
                    }}
                    placeholder="https://www.youtube.com/watch?v=..."
                    aria-label="Video URL"
                  />
                  <button type="button" className="primary-button" onClick={handleUrlSubmit}>
                    Add link ↗
                  </button>
                </div>

                {urlError && <p className="form-error" role="alert">{urlError}</p>}

                {submittedUrl && (
                  <div className="link-chip">
                    <strong>✓ Video link added</strong>
                    <p>{submittedUrl}</p>
                    <button type="button" className="secondary-button" onClick={clearUrl}>
                      Remove link
                    </button>
                  </div>
                )}

                <p className="clipper-note">
                  Local video uploads now connect to the development backend.
                  Video link retrieval and AI processing are not connected yet.
                </p>
              </div>
            )}

            <p className="workspace-message" aria-live="polite">{message}</p>
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
                  Powerful creative tools designed to make your workflow easier.
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
