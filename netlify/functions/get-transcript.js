exports.handler = async function (event, context) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { videoUrl } = JSON.parse(event.body);

    if (!videoUrl) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Video URL is required' }),
      };
    }

    const accessKey = process.env.SOCIALKIT_API_KEY;

    if (!accessKey || accessKey === 'your_api_key_here') {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'SOCIALKIT_API_KEY is not configured on the server.' }),
      };
    }

    // Call SocialKit YouTube Transcript API
    const apiUrl = `https://api.socialkit.dev/youtube/transcript?access_key=${encodeURIComponent(accessKey)}&url=${encodeURIComponent(videoUrl)}`;

    const apiResponse = await fetch(apiUrl);
    const apiData = await apiResponse.json();

    if (!apiResponse.ok || !apiData.success) {
      const errorMsg = apiData.error || apiData.message || 'SocialKit API returned an error.';
      console.error('SocialKit API error:', apiData);
      return {
        statusCode: apiResponse.status || 500,
        body: JSON.stringify({ error: errorMsg }),
      };
    }

    const transcript = apiData.data?.transcript;

    if (!transcript) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'No transcript found for this video. It might not have captions.' }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transcript }),
    };
  } catch (error) {
    console.error('Error fetching transcript:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch transcript. Please check the URL and try again.' }),
    };
  }
};
