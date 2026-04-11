const InputSection = ({ activeTab, setActiveTab, videoUrl, setVideoUrl, transcriptText, setTranscriptText }) => {
  return (
    <div className="input-section animate-in stagger-2">
      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === 'youtube' ? 'active' : ''}`}
          onClick={() => setActiveTab('youtube')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.42 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.42-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>
          YouTube
        </button>
        <button
          className={`tab-button ${activeTab === 'instagram' ? 'active' : ''}`}
          onClick={() => setActiveTab('instagram')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          Instagram
        </button>
        <button
          className={`tab-button ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => setActiveTab('text')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          Text Paste
        </button>
      </div>

      <div className="input-content">
        {(activeTab === 'youtube' || activeTab === 'instagram') ? (
          <input
            type="text"
            className="input-field"
            placeholder={activeTab === 'youtube' ? "Paste YouTube video link here..." : "Paste Instagram Reel link here..."}
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        ) : (
          <textarea
            className={`textarea-field ${transcriptText ? 'has-content' : ''}`}
            placeholder="Paste your video transcript text here..."
            value={transcriptText}
            onChange={(e) => setTranscriptText(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};

export default InputSection;

