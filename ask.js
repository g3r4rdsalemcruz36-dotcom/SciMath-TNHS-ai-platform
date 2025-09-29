// ask.js
export async function askQuestion(query) {
  try {
    const res = await fetch(`/.netlify/functions/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    // Return first snippet if available
    if (data.organic_results && data.organic_results.length > 0) {
      return data.organic_results[0].snippet;
    } else {
      return "No answer found.";
    }
  } catch (err) {
    console.error(err);
    return "Error fetching answer.";
  }
}
