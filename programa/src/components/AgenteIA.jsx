export const askAiAgent = async (N, W, priority, maxTime, apiKey) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  //Prompt para asegurar una respuesta parseable
  const prompt = `
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
    }
  `;

  // Configuración de la petición HTTP
  const requestBody = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ],
    // Forzamos a la API a responder en formato estructurado JSON a nivel de servidor
    generationConfig: {
      responseMimeType: "application/json"
    }
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Error desconocido en la API de Gemini.");
    }

    const data = await response.json();
    
    // Extraemos el texto crudo del JSON devuelto por el modelo
    const rawText = data.candidates[0].content.parts[0].text;
    
    // Parseamos a objeto JavaScript nativo y lo retornamos
    return JSON.parse(rawText.trim());

  } catch (error) {
    console.error("Error en askAiAgent:", error);
    throw new Error(`Fallo en la consulta de IA: ${error.message}`);
  }
};