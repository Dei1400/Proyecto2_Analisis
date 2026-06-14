export function validateInput({ n, capacity, items }) {
    // AQUI SOLO SE VALIDA LA ENTRAD
  const errors = [];

  if (!Number.isInteger(n) || n < 4 || n > 25) {
    errors.push("La cantidad de objetos debe estar entre 4 y 25.");
  }

  if (!Number.isInteger(capacity) || capacity <= 0) {
    errors.push("La capacidad de la mochila debe ser mayor que 0.");
  }

  if (!Array.isArray(items) || items.length === 0) {
    errors.push("Debe existir una lista de objetos.");
  }

  if (Array.isArray(items)) {
    items.forEach((item, index) => {
      if (!item.id) {
        errors.push(`El objeto ${index + 1} no tiene ID.`);
      }

      if (!item.name) {
        errors.push(`El objeto ${index + 1} no tiene nombre.`);
      }

      if (!Number.isInteger(item.weight) || item.weight <= 0) {
        errors.push(`El objeto ${index + 1} debe tener un peso mayor que 0.`);
      }

      if (!Number.isInteger(item.value) || item.value <= 0) {
        errors.push(`El objeto ${index + 1} debe tener un valor mayor que 0.`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}