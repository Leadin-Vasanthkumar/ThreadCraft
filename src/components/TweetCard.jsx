import { useState } from 'react';

const TweetCard = ({ tweet, index, isThread, accountType }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(tweet.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCharLimit = () => accountType === 'verified' ? 25000 : 280;
  const currentLen = tweet.text.length;
  const limit = getCharLimit();
  
  const statusClass = currentLen > limit ? 'danger' : (currentLen > limit * 0.9 ? 'warning' : 'safe');

  return (
    <div className="tweet-card">
      <div className="tweet-header">
        <span className="tweet-number">Entry {index + 1}</span>
        <span className={`char-count ${statusClass}`}>
          {currentLen} characters
        </span>
      </div>
      
      <div className="tweet-text">{tweet.text}</div>
      
      <button 
        className={`copy-button ${copied ? 'copied' : ''}`} 
        onClick={handleCopy}
      >
        {copied ? '✓ Copied to Clipboard' : 'Copy Entry'}
      </button>
    </div>
  );
};

export default TweetCard;
