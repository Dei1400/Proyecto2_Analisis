export function dynamic(objetos, capacidad) {
  let operaciones = 0;

  // Arreglo para almacenar el valor máximo para cada capacidad desde 0 hasta la capacidad dada
  const valores = Array(capacidad + 1).fill(0);
  const seleccionados = Array(capacidad + 1)
    .fill(null)
    .map(() => []);

// se actualizan los valores máximos para cada capacidad posible
  for (const objeto of objetos) {
    for (let peso = capacidad; peso >= objeto.weight; peso--) {
      operaciones++;

      const valorConObjeto =
        valores[peso - objeto.weight] + objeto.value;

      const valorSinObjeto = valores[peso];

      if (valorConObjeto > valorSinObjeto) {
        valores[peso] = valorConObjeto;

        seleccionados[peso] = [
          ...seleccionados[peso - objeto.weight],
          objeto,
        ];
      }
    }
  }

  const objetosSeleccionados = seleccionados[capacidad]; // Los objetos seleccionados para la capacidad máxima

  let pesoTotal = 0;
  let valorTotal = 0;

  for (const objeto of objetosSeleccionados) {
    // Se acumulan el peso y valor total de la mochila con los objetos seleccionados
    pesoTotal += objeto.weight;
    valorTotal += objeto.value;
  }

  return {
    algoritmo: "dynamic",
    objetosSeleccionados,
    pesoTotal,
    valorTotal,
    operaciones,
  };
}