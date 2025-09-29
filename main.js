// main.js
import { askQuestion } from './ask.js';

document.querySelector("#askBtn").addEventListener("click", async () => {
  const question = document.querySelector("#question").value;
  if (!question) return;

  document.querySelector("#answer").innerText = "Thinking...";
  const answer = await askQuestion(question);
  document.querySelector("#answer").innerText = answer;
});
