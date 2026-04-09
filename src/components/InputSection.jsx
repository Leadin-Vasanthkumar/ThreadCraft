export default function InputSection({ activeTab, setActiveTab, videoUrl, setVideoUrl, transcriptText, setTranscriptText }) {
  return (
    <div className="input-section">
      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === 'youtube' ? 'active' : ''}`}
          onClick={() => setActiveTab('youtube')}
        >
          YouTube URL
        </button>
        <button
          className={`tab-button ${activeTab === 'instagram' ? 'active' : ''}`}
          onClick={() => setActiveTab('instagram')}
        >
          Instagram Reel
        </button>
        <button
          className={`tab-button ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => setActiveTab('text')}
        >
          Paste Transcript
        </button>
      </div>

      <div className="input-content">
        {(activeTab === 'youtube' || activeTab === 'instagram') ? (
          <input
            type="text"
            className="input-field"
            placeholder={activeTab === 'youtube' ? "Paste YouTube video link here... (e.g. https://www.youtube.com/watch?v=...)" : "Paste Instagram Reel link here... (e.g. https://www.instagram.com/reel/...)"}
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
