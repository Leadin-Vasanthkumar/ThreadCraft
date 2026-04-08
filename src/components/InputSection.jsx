export default function InputSection({ activeTab, setActiveTab, videoUrl, setVideoUrl, transcriptText, setTranscriptText }) {
  return (
    <div className="input-section">
      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === 'url' ? 'active' : ''}`}
          onClick={() => setActiveTab('url')}
        >
          YouTube URL
        </button>
        <button
          className={`tab-button ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => setActiveTab('text')}
        >
          Paste Transcript
        </button>
      </div>

      <div className="input-content">
        {activeTab === 'url' ? (
          <input
            type="text"
            className="input-field"
            placeholder="Paste YouTube video link here... (e.g. https://www.youtube.com/watch?v=...)"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        ) : (
          <textarea
            className="textarea-field"
            placeholder="Paste your video transcript text here..."
            value={transcriptText}
            onChange={(e) => setTranscriptText(e.target.value)}
          />
        )}
      </div>
    </div>
  );
}
