import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import Exa from "exa-js";

console.log("🚀 Inicializando el investigador...");

const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o-mini";
const githubToken = "";
const exaApiKey = "";

const openai = createOpenAI({
  baseURL: endpoint,
  apiKey: githubToken,
  compatibility: "compatible",
});
const exa = new Exa(exaApiKey);

const query = "evolucion de la inteligencia artificial";
console.log(`🔍 Buscando información sobre: "${query}"`);

console.log("📚 Realizando búsqueda en Exa...");
const searchResults = await exa.searchAndContents(query, {
  type: "auto",
  model: "exa-pro",
  category: "research paper",
  numResults: 4,
  text: {
    maxCharacters: 1000,
  },
  summary: true,
  subpages: 2,
  subpageTarget: "2",
  extras: {
    links: 2,
  },
});

console.log(
  `✅ Búsqueda completada! Encontrados ${
    searchResults?.results?.length || 0
  } resultados`
);

const resultsArray =
  searchResults && searchResults.results && Array.isArray(searchResults.results)
    ? searchResults.results
    : [];

const sources = resultsArray.map((result) => ({
  id: result.url,
  title: result.title,
  author: result.author,
  summary: result.summary,
  publishedDate: result.publishedDate
    ? new Date(result.publishedDate).toLocaleDateString()
    : null,
}));

console.log("📋 Fuentes encontradas:", sources);

console.log("🧠 Generando respuesta con IA...");
const { text } = await generateText({
  model: openai(modelName),
  messages: [
    {
      role: "system",
      content:
        "Eres un asistente de investigación avanzado. Sintetiza la información de las fuentes proporcionadas en una respuesta estructurada que incluya: (1) introducción directa al tema, (2) secciones con subtítulos apropiados, (3) citas claras usando [Fuente], (4) extractos relevantes cuando sea necesario, (5) múltiples perspectivas si existen, y (6) conclusión que resuma los hallazgos principales. Mantén un tono objetivo y académico, señalando cualquier contradicción entre fuentes.",
    },
    {
      role: "user",
      content: `"Pregunta del usuario: ${query},  Fuentes encontradas  ${JSON.stringify(
        sources
      )}"`,
    },
  ],
});

console.log("🎯 Respuesta final:");
console.log("-------------------");
console.log(text);
console.log("-------------------");
console.log("✨ Proceso completado ✨");
