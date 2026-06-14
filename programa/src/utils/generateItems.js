export function generateRandomItems(n) {
  const minItems = 4; //Hacer pruebas con valor intermedio**
  const maxItems = 25;

  const totalItems = Math.max(minItems, Math.min(n, maxItems));

  const items = [];

  for (let i = 1; i <= totalItems; i++) {
    const weight = Math.floor(Math.random() * 20) + 1;
    const value = Math.floor(Math.random() * 100) + 1;

    items.push({
      id: i,
      name: `Objeto ${i}`,
      weight,
      value,
      // Calcular la densidad como valor dividido por peso redondeado a 2 decimales
      // toFixed devuelve un string
      density: Number((value / weight).toFixed(2)),
    });
  }

  return items;
}