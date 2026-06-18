
export default async function askAiAgent(N, W, priority, maxTime, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const promptText = `Actúas como un Agente Estratega Experto en Computación y Optimización Algorítmica.
    Tu objetivo es analizar los metadatos del problema de la Mochila 0/1 y seleccionar la mejor estrategia de resolución.

    Metadatos del escenario actual:
    - Cantidad de Objetos (N): ${N}
    - Capacidad Máxima de la Mochila (W): ${W}
    - Criterio de Prioridad del Negocio: "${priority === 'accuracy' ? 'Exactitud Matemática Absoluta' : 'Velocidad de Respuesta e Iteración'}"
    
    Considera la tolerancia de tiempo:
      - 0.1 ms a 0.5 ms: favorecer algoritmos muy rápidos como Greedy.
      - 1 ms a 2 ms: considerar Programación Dinámica cuando mejore la calidad de la solución.
      - 3 ms a 5 ms: si N es pequeño y se requiere exactitud absoluta, Backtracking puede ser recomendable.

    Algoritmos disponibles:
    1. Programación Dinámica:
      - Exacta.
      - Complejidad O(N * W).
      - Recomendada cuando se requiere exactitud y W es razonable.

    2. Greedy:
      - Heurística.
      - Complejidad O(N log N).
      - Recomendada cuando la prioridad principal es velocidad.
      - Puede no encontrar la solución óptima, pero responde más rápido.

    3. Backtracking:
      - Exacto.
      - Complejidad O(2^N).
      - Recomendada cuando N es pequeño y se busca exactitud.

    Reglas de decisión obligatorias:
    - Si la prioridad es "Velocidad de Respuesta e Iteración", recomienda Greedy, especialmente si N >= 15 o el tiempo máximo es muy bajo.
    - Si la prioridad es "Exactitud Matemática Absoluta" y N <= 8, recomienda Backtracking.
    - Si la prioridad es "Exactitud Matemática Absoluta" y N > 8, recomienda Programación Dinámica.
    - No recomiendes Programación Dinámica cuando el usuario haya priorizado velocidad, excepto si N es muy pequeño.
    - No recomiendes Backtracking si N > 15.

    REGLA ESTRICTA DE SALIDA:
    Debes responder ESTRICTAMENTE con un objeto JSON válido.
    No incluyas introducciones, explicaciones previas ni bloques markdown.

    El JSON debe cumplir exactamente con esta estructura:
    {
      "algoritmoRecomendado": "Programación Dinámica" o "Greedy" o "Backtracking",
      "tiempoEstimado": "un string breve estimando el tiempo de ejecución (ej: '< 1 ms', '1.5 s')",
      "justification": "Una explicación académica muy breve y puntual de por qué elegiste ese algoritmo basado en N, W, prioridad y tiempo máximo."
    }
    `;

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