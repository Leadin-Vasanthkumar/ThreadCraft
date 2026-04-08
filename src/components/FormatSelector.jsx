export default function FormatSelector({ outputFormat, setOutputFormat }) {
  return (
    <div className="selector-group">
      <div className="selector-label">Output Format</div>
      <div className="pill-container">
        <button
          className={`pill-button ${outputFormat === 'single' ? 'active' : ''}`}
          onClick={() => setOutputFormat('single')}
        >
          Single Tweet
        </button>
        <button
          className={`pill-button ${outputFormat === 'thread' ? 'active' : ''}`}
          onClick={() => setOutputFormat('thread')}
        >
          Thread (5-8 Tweets)
        </button>
      </div>
    </div>
  );
}
