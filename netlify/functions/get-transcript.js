const YouTubeTranscriptApi = require('youtube-transcript-api').default;

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

    // Extract video ID from URL
    const videoIdMatch = videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : videoUrl;

    const transcriptClient = new YouTubeTranscriptApi();
    const transcriptArray = await transcriptClient.getTranscript(videoId);
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
