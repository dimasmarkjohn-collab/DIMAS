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
          <a href="#workspace" className="primary-button">Start for free ↗</a>
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
                style={{ border: 0, cursor: 'pointer', marginTop: 15 }}
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
              <div
                style={{
                  marginTop: 25,
                  padding: 22,
                  border: '1px solid rgba(150, 120, 255, 0.3)',
                  borderRadius: 18,
                  background: 'rgba(120, 90, 200, 0.08)',
                  textAlign: 'left'
                }}
              >
                <div style={{ marginBottom: 8, fontWeight: 700 }}>
                  ✦ DIMAS AI CLIPPER
                </div>

                <h3 style={{ marginBottom: 8 }}>
                  Turn long videos into engaging Shorts.
                </h3>

                <p style={{ marginBottom: 18, opacity: 0.75 }}>
                  Upload a long-form video or paste a video link.
                  DIMAS will eventually analyze it and identify the best moments.
                </p>

                <div style={{ marginBottom: 12, fontWeight: 600 }}>
                  ① Upload from your device
                </div>

                <label
                  htmlFor="dimas-video-upload"
                  style={{
                    display: 'block',
                    padding: '25px 15px',
                    border: '1px dashed rgba(170, 145, 255, 0.65)',
                    borderRadius: 14,
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: 'rgba(130, 100, 220, 0.07)'
                  }}
                >
                  <div style={{ fontSize: 30, marginBottom: 10 }}>↑</div>
                  <strong>Choose a video from your device</strong>
                  <p style={{ fontSize: 13, opacity: 0.7, marginTop: 8 }}>
                    MP4, MOV, WebM, MKV and other video formats
                  </p>

                  <input
                    id="dimas-video-upload"
                    type="file"
                    accept="video/*,.mkv,.avi,.m4v"
                    onChange={handleVideoChange}
                    style={{
                      position: 'absolute',
                      width: 1,
                      height: 1,
                      opacity: 0,
                      overflow: 'hidden'
                    }}
                  />
                </label>

                {uploadError && (
                  <p style={{ color: '#ff7777', marginTop: 12 }}>
                    {uploadError}
                  </p>
                )}

                {videoFile && (
                  <div
                    style={{
                      marginTop: 18,
                      padding: 14,
                      borderRadius: 12,
                      background: 'rgba(120, 100, 180, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                      flexWrap: 'wrap'
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <strong style={{ overflowWrap: 'anywhere' }}>
                        🎬 {videoFile.name}
                      </strong>
                      <p style={{ fontSize: 13, opacity: 0.7 }}>
                        {formatFileSize(videoFile.size)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={clearVideo}
                      className="secondary-button"
                      style={{ cursor: 'pointer' }}
                    >
                      Remove
                    </button>
                  </div>
                )}

                {videoFile && !uploadResult && (
                  <button
                    type="button"
                    className="primary-button"
                    onClick={handleVideoUpload}
                    disabled={uploading}
                    style={{
                      border: 0,
                      cursor: uploading ? 'wait' : 'pointer',
                      marginTop: 15,
                      opacity: uploading ? 0.65 : 1
                    }}
                  >
                    {uploading ? 'Uploading...' : 'Upload to DIMAS ↑'}
                  </button>
                )}

                {uploadResult && (
                  <div
                    style={{
                      marginTop: 16,
                      padding: 14,
                      borderRadius: 12,
                      background: 'rgba(40, 180, 110, 0.12)',
                      border: '1px solid rgba(40, 180, 110, 0.35)',
                      overflowWrap: 'anywhere'
                    }}
                  >
                    <strong>✓ Video uploaded successfully!</strong>
                    <p style={{ fontSize: 13, marginTop: 8 }}>
                      Filename: {uploadResult.filename}
                    </p>
                    <p style={{ fontSize: 13 }}>
                      File ID: {uploadResult.id}
                    </p>
                    <p style={{ fontSize: 13 }}>
                      Size: {formatFileSize(uploadResult.size)}
                    </p>
                  </div>
                )}

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    margin: '25px 0',
                    opacity: 0.6
                  }}
                >
                  <div style={{ flex: 1, height: 1, background: 'currentColor' }} />
                  <span style={{ fontSize: 12 }}>OR</span>
                  <div style={{ flex: 1, height: 1, background: 'currentColor' }} />
                </div>

                <div style={{ marginBottom: 12, fontWeight: 600 }}>
                  ② Paste a video link
                </div>

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <input
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
                    style={{
                      flex: '1 1 220px',
                      minWidth: 0,
                      padding: '14px 15px',
                      borderRadius: 10,
                      border: '1px solid rgba(170, 145, 255, 0.35)',
                      background: 'rgba(20, 20, 35, 0.65)',
                      color: 'inherit',
                      outline: 'none',
                      fontSize: 14
                    }}
                  />

                  <button
                    type="button"
                    className="primary-button"
                    onClick={handleUrlSubmit}
                    style={{ border: 0, cursor: 'pointer', padding: '12px 18px' }}
                  >
                    Add link ↗
                  </button>
                </div>

                {urlError && (
                  <p style={{ color: '#ff7777', marginTop: 12 }}>{urlError}</p>
                )}

                {submittedUrl && (
                  <div
                    style={{
                      marginTop: 16,
                      padding: 14,
                      borderRadius: 12,
                      background: 'rgba(120, 100, 180, 0.15)',
                      overflowWrap: 'anywhere'
                    }}
                  >
                    <strong>✓ Video link added</strong>
                    <p style={{ fontSize: 13, marginTop: 8, opacity: 0.8 }}>
                      {submittedUrl}
                    </p>
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={clearUrl}
                      style={{ marginTop: 12, cursor: 'pointer' }}
                    >
                      Remove link
                    </button>
                  </div>
                )}

                <p style={{ fontSize: 12, opacity: 0.6, marginTop: 18 }}>
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
