export function dynamicProgramming(objetos, capacidad) {
  let operaciones = 0;

  const n = objetos.length;

  const dp = Array.from({ length: n + 1 }, () =>
    Array(capacidad + 1).fill(0)
  );

  for (let i = 1; i <= n; i++) {
    const objeto = objetos[i - 1];

    for (let peso = 0; peso <= capacidad; peso++) {
      operaciones++;

      dp[i][peso] = dp[i - 1][peso];

      if (objeto.weight <= peso) {
        const valorConObjeto =
          dp[i - 1][peso - objeto.weight] + objeto.value;

        if (valorConObjeto > dp[i][peso]) {
          dp[i][peso] = valorConObjeto;
        }
      }
    }
  }

  const objetosSeleccionados = [];
  let pesoActual = capacidad;

  for (let i = n; i > 0; i--) {
    if (dp[i][pesoActual] !== dp[i - 1][pesoActual]) {
      const objeto = objetos[i - 1];
      objetosSeleccionados.push(objeto);
      pesoActual -= objeto.weight;
    }
  }

  objetosSeleccionados.reverse();

  const pesoTotal = objetosSeleccionados.reduce(
    (suma, objeto) => suma + objeto.weight,
    0
  );

  const valorTotal = dp[n][capacidad];
  
  return {
    algoritmo: "dynamic",
    objetosSeleccionados,
    pesoTotal,
    valorTotal,
    operaciones,
  };
}