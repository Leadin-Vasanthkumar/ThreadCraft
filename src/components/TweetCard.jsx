import { useState } from 'react';

export default function TweetCard({ tweet, index, isThread, accountType }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(tweet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const charCount = tweet.length;
  const isFree = accountType === 'free';
  
  let charStatusClass = 'safe';
  if (isFree) {
      if (charCount > 280) charStatusClass = 'danger';
      else if (charCount > 260) charStatusClass = 'warning';
  } else {
      if (charCount > 4000) charStatusClass = 'danger'; // Verified limit
  }

  return (
    <div className="tweet-card">
      <div className="tweet-header">
        <div className="tweet-meta">
          {isThread && <div className="tweet-number">{index + 1}</div>}
          <div className={`char-count ${charStatusClass}`}>
            {charCount}{isFree ? '/280' : ''} chars
          </div>
        </div>
        <button className={`copy-button ${copied ? 'copied' : ''}`} onClick={handleCopy}>
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      </div>
      <div className="tweet-text">
        {tweet}
      </div>
    </div>
  );
}
