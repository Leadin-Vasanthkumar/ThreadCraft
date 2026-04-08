import TweetCard from './TweetCard';

export default function OutputSection({ tweets, format, accountType }) {
  if (!tweets || tweets.length === 0) return null;

  const isThread = format === 'thread' && tweets.length > 1;

  const handleCopyAll = () => {
    const threadText = tweets.join('\n\n');
    navigator.clipboard.writeText(threadText).then(() => {
      alert('Thread copied to clipboard!');
    });
  };

  return (
    <div className="output-section">
      <div className="output-header">
        <h2 className="output-title">Your Generated {isThread ? 'Thread' : 'Tweet'}</h2>
        {isThread && (
          <button className="copy-all-button" onClick={handleCopyAll}>
            📋 Copy All
          </button>
        )}
      </div>

      <div className={isThread ? 'thread-container' : 'single-container'}>
        {tweets.map((tweet, index) => (
          <TweetCard 
            key={index} 
            tweet={tweet} 
            index={index} 
            isThread={isThread} 
            accountType={accountType} 
          />
        ))}
      </div>
    </div>
  );
}
