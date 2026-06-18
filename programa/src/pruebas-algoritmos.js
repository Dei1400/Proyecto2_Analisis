import readline from "readline";
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

function mostrarComparacion(resultados) {
  console.log("\nCOMPARACION DE ALGORITMOS");

  console.table(
    resultados.map((resultado) => ({
      algoritmo: resultado.algoritmo,
      valorTotal: resultado.valorTotal,
      pesoTotal: resultado.pesoTotal,
      operaciones: resultado.operaciones,
      tiempoMs: resultado.tiempoMs,
      cantidadObjetos: resultado.objetosSeleccionados.length,
    }))
  );
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

async function seleccionarConjunto() {
  console.log("\nSeleccione conjunto de objetos:");
  console.log("1. Caso simple");
  console.log("2. Caso donde Greedy puede fallar");
  console.log("3. Caso más grande");
  console.log("4. Generar aleatoriamente");

  const opcionConjunto = (await preguntar("\nOpción: ")).trim();

  if (opcionConjunto === "4") {
    const cantidad = Number(
      await preguntar("\nCantidad de objetos entre 4 y 25: ")
    );

    const capacidad = Number(
      await preguntar("Capacidad de la mochila: ")
    );

    return {
      nombre: "Conjunto aleatorio",
      capacidad,
      objetos: generateRandomItems(cantidad),
    };
  }

  return obtenerConjunto(opcionConjunto);
}

function ejecutarAlgoritmo(opcion, objetos, capacidad) {
  if (opcion === "1") {
    return greedy(objetos, capacidad);
  }

  if (opcion === "2") {
    return backtracking(objetos, capacidad);
  }

  if (opcion === "3") {
    return dynamicProgramming(objetos, capacidad);
  }

  return null;
}

async function main() {
  console.clear();

  console.log("====================================");
  console.log("PRUEBAS DE ALGORITMOS DE MOCHILA");
  console.log("====================================");

  console.log("\nSeleccione modo de prueba:");
  console.log("1. Probar un solo algoritmo");
  console.log("2. Comparar los 3 algoritmos");

  const modo = (await preguntar("\nOpción: ")).trim();

  const datos = await seleccionarConjunto();

  if (!datos) {
    console.log("\nConjunto inválido.");
    rl.close();
    return;
  }

  console.log("\n====================================");
  console.log("CONJUNTO:", datos.nombre);
  console.log("CAPACIDAD:", datos.capacidad);

  console.log("\nOBJETOS DISPONIBLES");
  console.table(datos.objetos);

  // MODO 1
  if (modo === "1") {

    console.log("\nSeleccione algoritmo:");
    console.log("1. Greedy");
    console.log("2. Backtracking");
    console.log("3. Programación Dinámica");

    const algoritmo = (await preguntar("\nOpción: ")).trim();

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

    mostrarResultado(resultado);
  }

  // MODO 2
  else if (modo === "2") {

    const resultadoGreedy =
      greedy(datos.objetos, datos.capacidad);

    const resultadoBacktracking =
      backtracking(datos.objetos, datos.capacidad);

    const resultadoDynamic =
      dynamicProgramming(
        datos.objetos,
        datos.capacidad
      );

    mostrarComparacion([
      resultadoGreedy,
      resultadoBacktracking,
      resultadoDynamic,
    ]);

    console.log(
      "\nOBJETOS SELECCIONADOS POR CADA ALGORITMO"
    );

    console.log("\nGREEDY");
    console.table(
      resultadoGreedy.objetosSeleccionados
    );

    console.log("\nBACKTRACKING");
    console.table(
      resultadoBacktracking.objetosSeleccionados
    );

    console.log("\nDYNAMIC");
    console.table(
      resultadoDynamic.objetosSeleccionados
    );
  }

  else {
    console.log("\nModo inválido.");
  }

  rl.close();
}

main();