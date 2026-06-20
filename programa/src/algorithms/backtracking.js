export function backtracking(objetos, capacidad) {
  //const inicio = performance.now();

  let operaciones = 0; // Contador de operaciones para análisis de complejidad

  let mejorValor = 0;
  let mejorPeso = 0;

  let mejoresObjetos = []; //para almacenar los objetos seleccionados que dan el mejor valor

  const objetosActuales = [];

  function buscar(indice, pesoActual, valorActual) { //funcion auxiliar recursiva que hace la busqueda de combinaciones de objetos
    operaciones++;

    // Si el peso actual excede la capacidad, es mayor que la capacidad
    if (pesoActual > capacidad) {
      return;
    }

    // Si se han considerado todos los objetos
    if (indice === objetos.length) {
        // Si el valor actual es mejor que el mejor valor encontrado hasta ahora
      if (valorActual > mejorValor) {
        mejorValor = valorActual;
        mejorPeso = pesoActual;
        mejoresObjetos = [...objetosActuales].slice(); //puntos suspensivos para crear una copia del arreglo de objetos actuales
      }

      return;
    }

    const objeto = objetos[indice];
    
    // Incluir objeto
    objetosActuales.push(objeto); //Para incluir el objeto actual en la combinación
    
    objetosActuales.push(objeto);

    buscar(
      indice + 1,
      pesoActual + objeto.weight,
      valorActual + objeto.value,
      objetosActuales
    );

    objetosActuales.pop();

    // No incluir objeto
    buscar(indice + 1, pesoActual, valorActual);
  }

  

  buscar(0, 0, 0); // llamada inicial a la función de búsqueda
  //const fin = performance.now();

  return {
    algoritmo: "backtracking",
    objetosSeleccionados: mejoresObjetos,
    pesoTotal: mejorPeso,
    valorTotal: mejorValor,
    operaciones,
  };
}
