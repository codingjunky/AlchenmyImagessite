const Anthropic = require("@anthropic-ai/sdk");
const busboy = require("busboy");

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MAX_FILE_SIZE = parseInt(process.env.ALLOWED_IMAGE_MAX_MB || "10") * 1024 * 1024;

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse multipart form data
    const fileData = await parseMultipart(event);
    
    if (!fileData) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'No file provided' }),
      };
    }

    if (fileData.size > MAX_FILE_SIZE) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: `File size must be ${process.env.ALLOWED_IMAGE_MAX_MB || 10}MB or less` 
        }),
      };
    }

    if (!fileData.mimeType.startsWith("image/")) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'File must be an image' }),
      };
    }

    const base64Image = fileData.data.toString("base64");

    const analysisPrompt = `Analyze this image and extract detailed information about the subject(s) and scene. Return ONLY valid JSON with this exact structure:
{
  "subjects": [{
    "type": "person|animal|object",
    "gender": "female|male|nonbinary|unspecified",
    "ethnicity": "Black|White|Latinx|South Asian|East Asian|Middle Eastern|Indigenous|Mixed|Other",
    "hair_color": "black|brown|blonde|red|white|bold_color",
    "eye_color": "brown|hazel|green|blue|gray|other",
    "age_range": "teen|20s|30s|40s|50s|60+"
  }],
  "environment": { "type": "indoor|outdoor|studio|city|nature|fantasy", "notes": "" },
  "lighting": { "type": "cinematic|natural|soft|hard|neon|studio", "temperature": "warm|neutral|cool" },
  "camera": { "lens": "35mm|50mm|85mm|tele|wide", "angle": "eye|low|high|top", "motion": "static" },
  "color_palette": ["#hexcode", "#hexcode"],
  "style_preset": "cinematic_noir",
  "aspect_ratio": "1:1",
  "ampd_meter": 5,
  "notes": "salient objects, mood words, textures"
}
CRITICAL: ethnicity, hair_color, and eye_color are LOCKED identity attributes that must never be changed.
Be specific and accurate. Return only the JSON, no additional text.`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: fileData.mimeType,
                data: base64Image,
              },
            },
            {
              type: "text",
              text: analysisPrompt,
            },
          ],
        },
      ],
    });

    const responseText = message.content[0].type === "text" ? message.content[0].text : "";
    
    let profile;
    try {
      const jsonMatch = responseText.match(/```json\n?([\s\S]*?)\n?```/) || responseText.match(/\{[\s\S]*\}/);
      const jsonText = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : responseText;
      profile = JSON.parse(jsonText);
    } catch (parseError) {
      console.error("Failed to parse Claude response:", responseText);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to parse analysis results' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        profile,
        message: "Image analyzed successfully",
      }),
    };

  } catch (error) {
    console.error("Analysis error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to analyze image' }),
    };
  }
};

// Helper function to parse multipart form data
function parseMultipart(event) {
  return new Promise((resolve, reject) => {
    const bb = busboy({ 
      headers: {
        'content-type': event.headers['content-type'] || event.headers['Content-Type']
      }
    });

    let fileData = null;

    bb.on('file', (fieldname, file, info) => {
      const { filename, encoding, mimeType } = info;
      const chunks = [];
      
      file.on('data', (data) => {
        chunks.push(data);
      });
      
      file.on('end', () => {
        fileData = {
          fieldname,
          filename,
          encoding,
          mimeType,
          data: Buffer.concat(chunks),
          size: Buffer.concat(chunks).length
        };
      });
    });

    bb.on('finish', () => {
      resolve(fileData);
    });

    bb.on('error', (err) => {
      reject(err);
    });

    bb.write(Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8'));
    bb.end();
  });
}