import { greedy } from "./algorithms/greedy.js";
import { backtracking } from "./algorithms/backtracking.js";
import { dynamicProgramming } from "./algorithms/dynamic.js";

function probarCaso(nombre, objetos, capacidad) {
  console.log("\n====================================");
  console.log(nombre);
  console.log("Capacidad:", capacidad);

  console.log("\nObjetos:");
  console.table(objetos);

  const resultadoGreedy = greedy(objetos, capacidad);
  const resultadoBacktracking = backtracking(objetos, capacidad);
  const resultadoDynamic = dynamicProgramming(objetos, capacidad);

  console.log("\nGREEDY");
  console.log(resultadoGreedy);

  console.log("\nBACKTRACKING");
  console.log(resultadoBacktracking);

  console.log("\nDYNAMIC");
  console.log(resultadoDynamic);

  console.log("\nComparación:");

  if (
    resultadoBacktracking.valorTotal ===
    resultadoDynamic.valorTotal
  ) {
    console.log(
      "Backtracking y Dynamic encontraron el mismo valor óptimo"
    );
  } else {
    console.log(
      "Diferencia encontrada entre Backtracking y Dynamic"
    );
  }
}

// CASO 1
probarCaso(
  "CASO 1",
  [
    { id: 1, name: "A", weight: 2, value: 6 },
    { id: 2, name: "B", weight: 2, value: 10 },
    { id: 3, name: "C", weight: 3, value: 12 },
  ],
  5
);

// CASO 2
probarCaso(
  "CASO 2",
  [
    { id: 1, name: "A", weight: 4, value: 20 },
    { id: 2, name: "B", weight: 3, value: 18 },
    { id: 3, name: "C", weight: 2, value: 14 },
    { id: 4, name: "D", weight: 5, value: 25 },
  ],
  7
);

// CASO 3
probarCaso(
  "CASO 3",
  [
    { id: 1, name: "A", weight: 5, value: 10 },
    { id: 2, name: "B", weight: 4, value: 40 },
    { id: 3, name: "C", weight: 6, value: 30 },
    { id: 4, name: "D", weight: 3, value: 50 },
  ],
  10
);

// CASO 4
probarCaso(
  "CASO 4",
  [
    { id: 1, name: "A", weight: 1, value: 1 },
    { id: 2, name: "B", weight: 2, value: 6 },
    { id: 3, name: "C", weight: 5, value: 18 },
    { id: 4, name: "D", weight: 6, value: 22 },
    { id: 5, name: "E", weight: 7, value: 28 },
  ],
  11
);