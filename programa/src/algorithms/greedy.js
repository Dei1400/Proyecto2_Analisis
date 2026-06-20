export function greedy(objetos, capacidad, tiempoMaximoMs = Infinity) {
  let operaciones = 0; // Contador de operaciones para análisis de complejidad

  let pesoTotal = 0;
  let valorTotal = 0;

  const objetosSeleccionados = []; // Lista para almacenar los objetos seleccionados
  const inicio = performance.now();

  const objetosOrdenados = [...objetos].sort((a, b) => { // Ordenar por densidad (valor/peso) de mayor a menor
    operaciones++;

    const densidadA = a.value / a.weight;
    const densidadB = b.value / b.weight;

    return densidadB - densidadA;
  });

  for (const objeto of objetosOrdenados) { //Se necesita recorrer todos los objetos para seleccionar los que se pueden incluir en la mochila
    operaciones++;

    if (performance.now() - inicio >= tiempoMaximoMs) {
      break;
    }

    // mochila llena
    if (pesoTotal >= capacidad) {
      break;
    }

    const espacioDisponible = capacidad - pesoTotal; //Para calcular el espacio disponible en la mochila 
                                                    // y determinar si el objeto cabe completo o se debe tomar una fracción

    // caso 1: el objeto cabe completo
    if (objeto.weight <= espacioDisponible) {
      objetosSeleccionados.push({...objeto,fraccionTomada: 1, pesoTomado: objeto.weight, valorTomado: objeto.value, }); //Para almacenar el objeto seleccionado
                                                              //se incluye la fracción tomada (1 para indicar que se tomó completo), el peso tomado y el valor tomado

      pesoTotal += objeto.weight;
      valorTotal += objeto.value;
    }

    // caso 2: el objeto NO cabe completo, pero se toma una fracción
    else {
      const fraccion = espacioDisponible / objeto.weight;
      const valorFraccion = objeto.value * fraccion;

      objetosSeleccionados.push({
        ...objeto,
        fraccionTomada: fraccion,
        pesoTomado: espacioDisponible,
        valorTomado: valorFraccion,
      });

      pesoTotal += espacioDisponible;
      valorTotal += valorFraccion;

      // Como ya se llenó la mochila, se detiene
      break;
    }
  }

  return {
    algoritmo: "greedy-Fraccionario",
    objetosSeleccionados,
    pesoTotal,
    valorTotal,
    operaciones,
  };
}

/* Cambio para mochila fraccionaria*/