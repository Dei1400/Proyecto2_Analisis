
export default async function askAiAgent(N, W, priority, maxTime, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const promptText = `
    Actúas como un Agente Estratega Experto en Computación y Optimización Algorítmica.
    Tu objetivo es analizar los metadatos del problema de la Mochila (Knapsack) que te provee el usuario y seleccionar la mejor estrategia de resolución.

    Metadatos del escenario actual:
    - Cantidad de Objetos (N): ${N}
    - Capacidad Máxima de la Mochila (W): ${W}
    - Criterio de Prioridad del Negocio: "${priority === 'accuracy' ? 'Exactitud Matemática Absoluta' : 'Velocidad de Respuesta e Iteración'}"
    - Tiempo límite máximo configurado: ${maxTime} segundos

    Debes evaluar la complejidad computacional implícita:
    - Programación Dinámica: O(N * W) en tiempo y espacio.
    - Algoritmo Greedy (Ávido): O(N log N) por ordenamiento de densidad.
    - Backtracking (Fuerza Bruta): O(2^n) de exploración exponencial.

    REGLA ESTRICTA DE SALIDA: Debes responder ESTRICTAMENTE con un objeto JSON válido. 
    No incluyas introducciones, ni explicaciones previas, ni bloques de formato markdown (como \`\`\`json).
    El JSON debe cumplir exactamente con esta estructura:
    {
      "algoritmoRecomendado": "Programación Dinámica" o "Greedy" o "Backtracking",
      "tiempoEstimado": "un string breve estimando el tiempo de ejecución (ej: '< 1 ms', '1.5 s')",
      "justification": "Una explicación académica muy breve y puntual de por qué elegiste ese algoritmo basado en N, W y la prioridad."
    }`;

  // Petición estructurada limpia
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: promptText }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Fallo en la API: Status ${response.status}`);
  }

  const data = await response.json();
  
  let textResponse = data.candidates[0].content.parts[0].text.trim();
  
  if (textResponse.startsWith("```")) {
    textResponse = textResponse.replace(/^```json?/, "").replace(/```$/, "").trim();
  }

  return JSON.parse(textResponse);
}