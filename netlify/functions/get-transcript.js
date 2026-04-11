const { YoutubeTranscript } = require('youtube-transcript');

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

    const transcriptArray = await YoutubeTranscript.fetchTranscript(videoUrl);
    const transcript = transcriptArray.map(t => t.text).join(' ');

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
