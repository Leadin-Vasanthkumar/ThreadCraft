import TweetCard from './TweetCard';

const OutputSection = ({ tweets, format, accountType }) => {
  if (!tweets || tweets.length === 0) return null;

  const handleCopyAll = () => {
    const allText = tweets.map(t => t.text).join('\n\n---\n\n');
    navigator.clipboard.writeText(allText);
    alert('All pieces copied to clipboard.');
  };

  return (
    <div className="output-section">
      <div className="output-header">
        <h2 className="output-title">Refined Output</h2>
        <button className="copy-all-button" onClick={handleCopyAll}>
          Copy Full Collection
        </button>
      </div>

      <div className="thread-container">
        {tweets.map((tweet, index) => (
          <div 
            key={index} 
            className="animate-in" 
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <TweetCard 
              tweet={tweet} 
              index={index} 
              isThread={format === 'thread'}
              accountType={accountType}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutputSection;
