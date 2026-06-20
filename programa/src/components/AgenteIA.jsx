
export default async function askAiAgent(N, W, priority, maxTime, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const promptText = `Actúas como un Agente Estratega Experto en Computación y Optimización Algorítmica.
    Tu objetivo es analizar los metadatos del problema de la Mochila 0/1 y seleccionar la mejor estrategia de resolución.

    Metadatos del escenario actual:
    - Cantidad de Objetos (N): ${N}
    - Capacidad Máxima de la Mochila (W): ${W}
    - Criterio de Prioridad del Negocio: "${priority === 'accuracy' ? 'Exactitud Matemática Absoluta' : 'Velocidad de Respuesta e Iteración'}"
    - Tiempo máximo tolerable: ${maxTime} ms

    IMPORTANTE:
    El sistema tiene tres estrategias disponibles:
      1. Greedy para Mochila Fraccionaria.
      2. Backtracking para Mochila 0/1.
      3. Programación Dinámica para Mochila 0/1.

    Algoritmos disponibles:
    1. Programación Dinámica:
      - Exacta.
      - Complejidad O(N * W).
      - Recomendada cuando se requiere exactitud y W es razonable.

    2. Greedy Fraccionario:
      - Permite tomar fracciones de objetos.
      - Ordena los objetos por densidad valor/peso.
      - Complejidad O(N log N).
      - Es óptimo para mochila fraccionaria.
      - Recomendado cuando se prioriza velocidad o cuando se acepta dividir objetos.

    3. Backtracking:
      - Exacto.
      - Complejidad O(2^N).
      - Recomendada cuando N es pequeño y se busca exactitud.

      Reglas:
        - Si la prioridad es "Velocidad de Respuesta e Iteración", recomienda Greedy.
        - Si la prioridad es "Exactitud Matemática Absoluta" y N <= 8, recomienda Backtracking.
        - Si la prioridad es "Exactitud Matemática Absoluta" y N > 8, recomienda Programación Dinámica.
        - No recomiendes Backtracking si N > 15, porque su crecimiento es exponencial.
        - Si N está entre 4 y 8 y se busca exactitud total, Backtracking es aceptable.
        - Si N está entre 9 y 25 y se busca exactitud total, recomienda Programación Dinámica.
        - Si la capacidad es muy alta, por ejemplo cercana a 1000, y la prioridad es velocidad, recomienda Greedy.
        - Si la capacidad es hasta 1000 y la prioridad es exactitud, Programación Dinámica
        - Si recomiendas Greedy, siempre aclara que puede tomar fracciones de objetos.
        - Si recomiendas Backtracking o Programación Dinámica, siempre aclara que los objetos se toman completos o no se toman.

    REGLA ESTRICTA DE SALIDA:
    Debes responder ESTRICTAMENTE con un objeto JSON válido.
    No incluyas introducciones, explicaciones previas ni bloques markdown.

    Estimar operaciones aproximadas según la complejidad:
      - Greedy: aproximadamente N log2(N) + N operaciones.
      - Programación Dinámica: aproximadamente N * W operaciones.
      - Backtracking: aproximadamente 2^N operaciones.

    El campo operacionesEstimadas debe ser numérico, sin comillas.

    Luego estima el tiempo en milisegundos usando esta fórmula aproximada:

    tiempoEstimadoMs = operacionesEstimadas / 50000

    Reglas para tiempoEstimado:
    - Sebe ser una aproximacion del tiempo que puede tardar el algoritmo con los aprametros dados.
    - Si tiempoEstimadoMs < 0.01, responde "0.01 ms"
    - Si tiempoEstimadoMs está entre 0.01 y 1, responde con 2 decimales, ejemplo "0.26 ms"
    - Si tiempoEstimadoMs es mayor o igual a 1, responde con 2 decimales, ejemplo "3.45 ms"

    No respondas siempre "< 0.1 ms". Debes calcular el tiempo con base en operacionesEstimadas.


    El JSON debe cumplir exactamente con esta estructura:
    {
      "algoritmoRecomendado": "Programación Dinámica" o "Greedy" o "Backtracking",
      "tipoMochila": "Fraccionaria" o "0/1",
      "tiempoEstimado": "un string breve estimando el tiempo de ejecución en milisegundos, ejemplo: '< 0.1 ms', '0.5 ms', '2 ms'",
      "operacionesEstimadas": un número entero aproximado de operaciones esperadas para el algoritmo seleccionado,
      "justification": "Una explicación académica breve indicando por qué se eligió ese algoritmo, qué tipo de mochila resuelve y cómo influyen N, W, prioridad, tiempo tolerable y operaciones estimadas."
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