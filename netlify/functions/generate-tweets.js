const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.handler = async function (event, context) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { transcript, format, accountType } = JSON.parse(event.body);

    if (!transcript || !format || !accountType) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required parameters' }),
      };
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'your_api_key_here') {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'GEMINI_API_KEY is not configured on the server.' }),
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Use gemini-2.0-flash - current stable model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    let prompt = '';

    if (format === 'single') {
        if (accountType === 'free') {
            prompt = `You are an expert social media copywriter. Given the following YouTube video transcript, write exactly ONE punchy, engaging tweet that summarizes the main value.
CRITICAL: The tweet MUST be under 280 characters in length. Do not include hashtags unless they fit naturally. Do not use emojis excessively. Respond ONLY with the tweet text, nothing else.

Transcript:
${transcript}`;
        } else {
            prompt = `You are an expert social media copywriter. Given the following YouTube video transcript, write exactly ONE impactful, engaging tweet that summarizes the main value.
Since this is for a verified X/Twitter account, you can make it a "long-form" tweet (aiming for 100-300 words). Make it highly readable with good formatting, spacing, and a strong hook. Respond ONLY with the tweet text, nothing else.

Transcript:
${transcript}`;
        }
    } else if (format === 'thread') {
        if (accountType === 'free') {
            prompt = `You are an expert Twitter thread writer. Given the following YouTube video transcript, write a highly engaging 5 to 8 tweet thread.
CRITICAL: EACH individual tweet MUST be under 280 characters.
Structure the thread as follows:
- Tweet 1: A strong, undeniable hook that makes people want to read more.
- Middle Tweets: Deliver the core value, insights, or steps from the transcript clearly.
- Final Tweet: A strong conclusion or Call-to-Action (CTA).

Output the thread as a JSON array of strings, where each string is a single tweet's text.
Example format:
["Tweet 1 text", "Tweet 2 text", "Tweet 3 text"]

Respond ONLY with the JSON array. Do not include markdown formatting like \`\`\`json.

Transcript:
${transcript}`;
        } else {
            prompt = `You are an expert Twitter thread writer for premium/verified accounts. Given the following YouTube video transcript, write a highly engaging 5 to 8 tweet thread.
Since this is for a verified X/Twitter account, individual tweets can be longer than 280 characters if needed (up to 400-500 chars per tweet is fine, allowing for deeper exploration per tweet).
Structure the thread as follows:
- Tweet 1: A strong, undeniable hook that makes people want to read more.
- Middle Tweets: Deliver the core value, insights, or steps from the transcript clearly. Use spacing and formatting to make it highly readable.
- Final Tweet: A strong conclusion or Call-to-Action (CTA).

Output the thread as a JSON array of strings, where each string is a single tweet's text.
Example format:
["Tweet 1 text", "Tweet 2 text", "Tweet 3 text"]

Respond ONLY with the JSON array. Do not include markdown formatting like \`\`\`json.

Transcript:
${transcript}`;
        }
    }

    const result = await model.generateContent(prompt);
    let outputText = result.response.text().trim();

    let tweets = [];

    if (format === 'single') {
        tweets = [outputText];
    } else {
        // Parse the JSON array for thread format
        try {
            // Strip markdown block if it was added despite instructions
            if (outputText.startsWith('```json')) {
                outputText = outputText.replace(/^```json\n/, '').replace(/\n```$/, '');
            } else if (outputText.startsWith('```')) {
                outputText = outputText.replace(/^```\n/, '').replace(/\n```$/, '');
            }
            
            tweets = JSON.parse(outputText);
        } catch (e) {
            console.error('Failed to parse Gemini output as JSON:', outputText);
            // Fallback: split by double newlines if it looks like plain text
            tweets = outputText.split('\n\n').filter(t => t.trim().length > 0);
        }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tweets }),
    };
  } catch (error) {
    console.error('Error generating tweets:', error);
    const errMsg = error?.message || error?.toString() || 'Unknown error';
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Failed to generate tweets: ${errMsg}` }),
    };
  }
};
