export const fetchTranscript = async (videoUrl) => {
  const response = await fetch('/.netlify/functions/get-transcript', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ videoUrl }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch transcript');
  }

  return data.transcript;
};

export const generateTweets = async (transcript, format, accountType) => {
  const response = await fetch('/.netlify/functions/generate-tweets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transcript, format, accountType }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to generate tweets');
  }

  return data.tweets;
};
