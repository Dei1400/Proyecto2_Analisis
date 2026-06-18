import readline from "readline"
import { greedy } from "./algorithms/greedy.js";
import { backtracking } from "./algorithms/backtracking.js";
import { dynamicProgramming } from "./algorithms/dynamic.js";
import { generateRandomItems } from "./utils/generateItems.js";

// Para pruebas en consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function preguntar(pregunta) {
  return new Promise((resolve) => {
    rl.question(pregunta, (respuesta) => {
      resolve(respuesta);
    });
  });
}

function mostrarResultado(resultado) {
  console.log("\nRESULTADO");

  // Para mostara resultados de forma clara 
  console.table([
    {
      algoritmo: resultado.algoritmo,
      valorTotal: resultado.valorTotal,
      pesoTotal: resultado.pesoTotal,
      operaciones: resultado.operaciones,
      tiempoMs: resultado.tiempoMs,
      cantidadObjetos: resultado.objetosSeleccionados.length,
    },
  ]);

  console.log("\nObjetos seleccionados:");
  console.table(resultado.objetosSeleccionados);
}

// Función para obtener conjuntos de objetos predefinidos para las pruebas
function obtenerConjunto(opcion) {
  switch (opcion) {
    case "1":
      return {
        nombre: "Caso simple",
        capacidad: 5,
        objetos: [
          { id: 1, name: "A", weight: 2, value: 6 },
          { id: 2, name: "B", weight: 2, value: 10 },
          { id: 3, name: "C", weight: 3, value: 12 },
        ],
      };

    case "2":
      return {
        nombre: "Caso donde Greedy falla",
        capacidad: 7,
        objetos: [
          { id: 1, name: "A", weight: 4, value: 20 },
          { id: 2, name: "B", weight: 3, value: 18 },
          { id: 3, name: "C", weight: 2, value: 14 },
          { id: 4, name: "D", weight: 5, value: 25 },
        ],
      };

    case "3":
      return {
        nombre: "Caso más grande",
        capacidad: 10,
        objetos: [
          { id: 1, name: "A", weight: 5, value: 10 },
          { id: 2, name: "B", weight: 4, value: 40 },
          { id: 3, name: "C", weight: 6, value: 30 },
          { id: 4, name: "D", weight: 3, value: 50 },
        ],
      };

    default:
      return null;
  }
}

function ejecutarAlgoritmo(opcion, objetos, capacidad) {
  switch (opcion) {
    case "1":
      return greedy(objetos, capacidad);

    case "2":
      return backtracking(objetos, capacidad);

    case "3":
      return dynamicProgramming(objetos, capacidad);

    default:
      return null;
  }
}

async function main() {
  console.clear();

  console.log("====================================");
  console.log("PRUEBAS DE ALGORITMOS DE MOCHILA");
  console.log("====================================");

  console.log("\nSeleccione algoritmo:");
  console.log("1. Greedy");
  console.log("2. Backtracking");
  console.log("3. Programación Dinámica");

  const algoritmo = await preguntar("\nOpción: ");

  console.log("\nSeleccione conjunto de objetos:");
  console.log("1. Caso simple");
  console.log("2. Caso donde Greedy falla");
  console.log("3. Caso más grande");
  console.log("4. Generar aleatoriamente");

  const conjunto = await preguntar("\nOpción: ");

  let datos;

  if (conjunto === "4") {
    const cantidad = Number(
      await preguntar("\nCantidad de objetos: ")
    );

    const capacidad = Number(
      await preguntar("Capacidad de la mochila: ")
    );

    datos = {
      nombre: "Conjunto Aleatorio",
      capacidad,
      objetos: generateRandomItems(cantidad),
    };
  } else {
    datos = obtenerConjunto(conjunto);
  }

  if (!datos) {
    console.log("\nOpción inválida.");
    rl.close();
    return;
  }

  const resultado = ejecutarAlgoritmo(
    algoritmo,
    datos.objetos,
    datos.capacidad
  );

  if (!resultado) {
    console.log("\nAlgoritmo inválido.");
    rl.close();
    return;
  }

  console.log("\n====================================");
  console.log("CONJUNTO:", datos.nombre);
  console.log("CAPACIDAD:", datos.capacidad);

  console.log("\nOBJETOS DISPONIBLES");
  console.table(datos.objetos);

  mostrarResultado(resultado);

  rl.close();
}

main();