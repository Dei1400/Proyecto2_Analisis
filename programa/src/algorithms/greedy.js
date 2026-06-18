export function greedy(objetos, capacidad) {
    const inicio = performance.now(); // Para medir el tiempo de ejecución del algoritmo

  let operaciones = 0; // Contador de operaciones para análisis de complejidad

  let pesoTotal = 0;
  let valorTotal = 0;

  const objetosSeleccionados = []; // Lista para almacenar los objetos seleccionados

  const objetosOrdenados = [...objetos].sort((a, b) => { // Ordenar por densidad (valor/peso) de mayor a menor
    operaciones++;

    const densidadA = a.value / a.weight;
    const densidadB = b.value / b.weight;

    return densidadB - densidadA;
  });

  for (const objeto of objetosOrdenados) {
    operaciones++;

    if (pesoTotal + objeto.weight <= capacidad) {
      objetosSeleccionados.push(objeto);
      pesoTotal += objeto.weight;
      valorTotal += objeto.value;
    }
  }

    const fin = performance.now(); // Fin de la medición del tiempo de ejecución
  return {
    tiempoMs: Number((fin - inicio).toFixed(4)),
    algoritmo: "greedy",
    objetosSeleccionados,
    pesoTotal,
    valorTotal,
    operaciones,
  };
}