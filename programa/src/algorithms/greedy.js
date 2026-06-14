export function greedy(items, capacity) {
  // Contar para medir la carga del algoritmo
  let operations = 0;
  //se acumulan el peso y valor total de la mochila
  let totalWeight = 0;
  let totalValue = 0;

  const selectedItems = [];

  // Se crea una copia del arreglo original para no modificar los datos originales. Se ordenan por densidad: valor / peso
  const sortedItems = [...items].sort((a, b) => {
    operations++;
    const densityA = a.value / a.weight;
    const densityB = b.value / b.weight;

    return densityB - densityA; // Orden descendente por densidad
  });

  // Se recorren los objetos ya ordenados por densidad
  for (const item of sortedItems) {
    operations++;

    // Si el objeto cabe en la mochila
    if (totalWeight + item.weight <= capacity) {
      selectedItems.push(item);
      totalWeight += item.weight;
      totalValue += item.value;
    }
  }

  return {
    algorithm: "greedy",
    selectedItems,
    totalWeight,
    totalValue,
    operations,
  };
}