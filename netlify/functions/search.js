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
    const data = await response.json();

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
