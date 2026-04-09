export const fetchTranscript = async (videoUrl) => {
  const response = await fetch('/.netlify/functions/get-transcript', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ videoUrl }),
  });

  // Guard: parse JSON safely
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    // The server returned a non-JSON response (e.g. HTML 404 page)
    // This usually means the Netlify Functions aren't running locally.
    // Run `netlify dev` instead of `npm run dev`.
    console.error('Non-JSON response from get-transcript:', text.slice(0, 300));
    throw new Error(
      response.status === 404
        ? 'Netlify Functions not found. Run `netlify dev` instead of `npm run dev` for local testing.'
        : `Server error (${response.status}): unexpected response format.`
    );
  }

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch transcript');
  }

  return data.transcript;
};

export const fetchInstagramTranscript = async (videoUrl) => {
  const response = await fetch('/.netlify/functions/get-instagram-transcript', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ videoUrl }),
  });

  // Guard: parse JSON safely
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    console.error('Non-JSON response from get-instagram-transcript:', text.slice(0, 300));
    throw new Error(
      response.status === 404
        ? 'Netlify Functions not found. Run `netlify dev` instead of `npm run dev` for local testing.'
        : `Server error (${response.status}): unexpected response format.`
    );
  }

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch Instagram transcript');
  }

  return data.transcript;
};

export const generateTweets = async (transcript, format, accountType) => {
  const response = await fetch('/.netlify/functions/generate-tweets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transcript, format, accountType }),
  });

  // Guard: parse JSON safely
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    console.error('Non-JSON response from generate-tweets:', text.slice(0, 300));
    throw new Error(
      response.status === 404
        ? 'Netlify Functions not found. Run `netlify dev` instead of `npm run dev` for local testing.'
        : `Server error (${response.status}): unexpected response format.`
    );
  }

  if (!response.ok) {
    throw new Error(data.error || 'Failed to generate tweets');
  }

  return data.tweets;
};
