export function medirTiempoEstable(algoritmo, objetos, capacidad) {
  const repeticiones = objetos.length >= 25 ? 10 : 50;
  const calentamiento = objetos.length >= 25 ? 3 : 5;

  for (let i = 0; i < calentamiento; i++) {
    algoritmo(objetos, capacidad);
  }

  let resultadoFinal;

  const inicio = performance.now();

  for (let i = 0; i < repeticiones; i++) {
    resultadoFinal = algoritmo(objetos, capacidad);
  }

  const fin = performance.now();

  return {
    ...resultadoFinal,
    tiempoMs: Number(((fin - inicio) / repeticiones).toFixed(4)),
  };
}