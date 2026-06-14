export function backtracking(objetos, capacidad) {

  let operaciones = 0; // Contador de operaciones para análisis de complejidad

  let mejorValor = 0;
  let mejorPeso = 0;

  let mejoresObjetos = []; //para almacenar los objetos seleccionados que dan el mejor valor

  function buscar(indice, pesoActual, valorActual, objetosActuales) { //funcion auxiliar recursiva que hace la busqueda de combinaciones de objetos
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
        mejoresObjetos = [...objetosActuales]; //puntos suspensivos para crear una copia del arreglo de objetos actuales
      }

      return;
    }

    const objeto = objetos[indice];

    // Caso 1: Incluir el objeto actual
    buscar(
      indice + 1,
      // Se suma el peso y valor del objeto actual a los acumulados
      pesoActual + objeto.weight,
      valorActual + objeto.value,
      [...objetosActuales, objeto]
    );
    // Caso 2: No incluir el objeto actual
    buscar(
      // Se avanza al siguiente objeto sin modificar el peso y valor acumulados
      indice + 1,
      pesoActual,
      valorActual,
      objetosActuales
    );
  }

  buscar(0, 0, 0, []); // llamada inicial a la función de búsqueda

  return {
    algoritmo: "backtracking",
    objetosSeleccionados: mejoresObjetos,
    pesoTotal: mejorPeso,
    valorTotal: mejorValor,
    operaciones,
  };
}

/* 1. Revisa si se pasó de la capacidad.
2. Si ya llegó al final, compara si encontró mejor solución.
3. Prueba incluir el objeto.
4. Prueba no incluir el objeto.
5. Guarda la mejor combinación.*/