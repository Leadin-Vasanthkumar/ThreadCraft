const FormatSelector = ({ outputFormat, setOutputFormat }) => {
  return (
    <div className="selector-group">
      <label className="selector-label">Format</label>
      <div className="pill-container">
        <button 
          className={`pill-button ${outputFormat === 'single' ? 'active' : ''}`}
          onClick={() => setOutputFormat('single')}
        >
          Single
        </button>
        <button 
          className={`pill-button ${outputFormat === 'thread' ? 'active' : ''}`}
          onClick={() => setOutputFormat('thread')}
        >
          Thread
        </button>
      </div>
    </div>
  );
};

export default FormatSelector;
