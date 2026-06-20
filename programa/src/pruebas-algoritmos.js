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

function ejecutarConTiempo(algoritmo, objetos, capacidad) {
  const inicio = performance.now();
  const resultado = algoritmo(objetos, capacidad);
  const fin = performance.now();

  return {
    ...resultado,
    tiempoMs: (fin - inicio).toFixed(4),
  };
}

function mostrarResultado(resultado) {
  console.log("\nRESULTADO");

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

function obtenerConjunto(opcion) {
  switch (opcion) {
    case "1":
      return {
        nombre: "Caso 1 - Greedy fraccionario clásico",
        capacidad: 50,
        objetos: [
          { id: 1, name: "A", weight: 10, value: 60 },
          { id: 2, name: "B", weight: 20, value: 100 },
          { id: 3, name: "C", weight: 30, value: 120 },
        ],
      };

    case "2":
      return {
        nombre: "Caso 2 - Greedy por densidad",
        capacidad: 30,
        objetos: [
          { id: 1, name: "A", weight: 50, value: 100 },
          { id: 2, name: "B", weight: 10, value: 60 },
          { id: 3, name: "C", weight: 20, value: 80 },
        ],
      };

    case "3":
      return {
        nombre: "Caso 3 - Bueno para Backtracking",
        capacidad: 50,
        objetos: [
          { id: 1, name: "A", weight: 10, value: 60 },
          { id: 2, name: "B", weight: 20, value: 100 },
          { id: 3, name: "C", weight: 30, value: 120 },
          { id: 4, name: "D", weight: 25, value: 90 },
        ],
      };

    case "4":
      return {
        nombre: "Caso 4 - Bueno para Programación Dinámica",
        capacidad: 11,
        objetos: [
          { id: 1, name: "A", weight: 1, value: 1 },
          { id: 2, name: "B", weight: 2, value: 6 },
          { id: 3, name: "C", weight: 5, value: 18 },
          { id: 4, name: "D", weight: 6, value: 22 },
          { id: 5, name: "E", weight: 7, value: 28 },
          { id: 6, name: "F", weight: 8, value: 30 },
        ],
      };

    case "5":
      return {
        nombre: "Caso 5 - Muchos objetos",
        capacidad: 100,
        objetos: [
          { id: 1, name: "Objeto 1", weight: 5, value: 20 },
          { id: 2, name: "Objeto 2", weight: 8, value: 15 },
          { id: 3, name: "Objeto 3", weight: 7, value: 35 },
          { id: 4, name: "Objeto 4", weight: 12, value: 25 },
          { id: 5, name: "Objeto 5", weight: 4, value: 18 },
          { id: 6, name: "Objeto 6", weight: 9, value: 30 },
          { id: 7, name: "Objeto 7", weight: 15, value: 50 },
          { id: 8, name: "Objeto 8", weight: 6, value: 22 },
          { id: 9, name: "Objeto 9", weight: 11, value: 40 },
          { id: 10, name: "Objeto 10", weight: 13, value: 45 },
          { id: 11, name: "Objeto 11", weight: 3, value: 12 },
          { id: 12, name: "Objeto 12", weight: 10, value: 38 },
          { id: 13, name: "Objeto 13", weight: 14, value: 48 },
          { id: 14, name: "Objeto 14", weight: 2, value: 8 },
          { id: 15, name: "Objeto 15", weight: 16, value: 55 },
          { id: 16, name: "Objeto 16", weight: 7, value: 26 },
          { id: 17, name: "Objeto 17", weight: 5, value: 21 },
          { id: 18, name: "Objeto 18", weight: 9, value: 33 },
          { id: 19, name: "Objeto 19", weight: 4, value: 16 },
          { id: 20, name: "Objeto 20", weight: 12, value: 44 },
          { id: 21, name: "Objeto 21", weight: 6, value: 24 },
          { id: 22, name: "Objeto 22", weight: 8, value: 31 },
          { id: 23, name: "Objeto 23", weight: 10, value: 37 },
          { id: 24, name: "Objeto 24", weight: 13, value: 47 },
          { id: 25, name: "Objeto 25", weight: 15, value: 52 },
        ],
      };

    default:
      return null;
  }
}

async function seleccionarConjunto() {
  console.log("\nSeleccione conjunto de objetos:");
  console.log("1. Caso 1 - Greedy fraccionario clásico");
  console.log("2. Caso 2 - Greedy por densidad");
  console.log("3. Caso 3 - Backtracking");
  console.log("4. Caso 4 - Programación Dinámica");
  console.log("5. Caso 5 - Muchos objetos");
  console.log("6. Generar aleatoriamente");

  const opcionConjunto = (await preguntar("\nOpción: ")).trim();

  if (opcionConjunto === "6") {
    const cantidad = Number(
      await preguntar("\nCantidad de objetos entre 4 y 25: ")
    );

    const capacidad = Number(await preguntar("Capacidad de la mochila: "));

    return {
      nombre: "Conjunto aleatorio",
      capacidad,
      objetos: generateRandomItems(cantidad),
    };
  }

  return obtenerConjunto(opcionConjunto);
}

function ejecutarAlgoritmo(opcion, objetos, capacidad) {
  switch (opcion) {
    case "1":
      return ejecutarConTiempo(greedy, objetos, capacidad);

    case "2":
      return ejecutarConTiempo(backtracking, objetos, capacidad);

    case "3":
      return ejecutarConTiempo(dynamicProgramming, objetos, capacidad);

    default:
      return null;
  }
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
  } else if (modo === "2") {
    const resultadoGreedy = ejecutarConTiempo(
      greedy,
      datos.objetos,
      datos.capacidad
    );

    const resultadoBacktracking = ejecutarConTiempo(
      backtracking,
      datos.objetos,
      datos.capacidad
    );

    const resultadoDynamic = ejecutarConTiempo(
      dynamicProgramming,
      datos.objetos,
      datos.capacidad
    );

    mostrarComparacion([
      resultadoGreedy,
      resultadoBacktracking,
      resultadoDynamic,
    ]);

    console.log("\nOBJETOS SELECCIONADOS POR CADA ALGORITMO");

    console.log("\nGREEDY");
    console.table(resultadoGreedy.objetosSeleccionados);

    console.log("\nBACKTRACKING");
    console.table(resultadoBacktracking.objetosSeleccionados);

    console.log("\nDYNAMIC");
    console.table(resultadoDynamic.objetosSeleccionados);
  } else {
    console.log("\nModo inválido.");
  }

  rl.close();
}

main();