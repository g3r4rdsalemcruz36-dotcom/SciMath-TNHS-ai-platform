import fetch from "node-fetch";

export async function handler(event, context) {
  const query = event.queryStringParameters.q;
  const apiKey = process.env.SERPAPI_KEY;

  if (!query) {
    return { statusCode: 400, body: JSON.stringify({ error: "No query provided" }) };
  }

  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&engine=google&api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const text = await response.text(); // Read raw response
    console.log("SerpAPI response:", text); // For debugging

    let data;
    try {
      data = JSON.parse(text); // Attempt to parse JSON
    } catch (err) {
      console.error("Failed to parse JSON:", err);
      return { statusCode: 500, body: JSON.stringify({ error: "Invalid JSON from SerpAPI", raw: text }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data" }),
    };
  }
}
