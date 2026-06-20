# Proyecto2_Analisis

# Knapsack Smart Router

Sistema inteligente para la resolución del Problema de la Mochila mediante el uso de algoritmos clásicos de optimización y un agente de inteligencia artificial encargado de recomendar la estrategia más adecuada según las características del problema.

## Descripción

Knapsack Smart Router es una aplicación desarrollada en React que permite generar instancias del problema de la mochila, analizar sus características y seleccionar automáticamente el algoritmo más conveniente utilizando un agente basado en Gemini.

El sistema implementa tres estrategias diferentes:

- Greedy (Mochila Fraccionaria)
- Backtracking (Mochila 0/1)
- Programación Dinámica Bottom-Up (Mochila 0/1)

Además, incorpora simulación visual, comparación de métricas, medición experimental de tiempos y visualización gráfica de resultados.

---

## Características

### Generación de Objetos

- Generación automática de objetos.
- Edición manual de pesos y valores.
- Cantidad configurable entre 4 y 25 objetos.
- Capacidad de mochila configurable.

### Agente Inteligente

El agente analiza:

- Cantidad de objetos (N).
- Capacidad de la mochila (W).
- Prioridad del usuario.
- Tiempo máximo tolerable.

Posteriormente consulta Gemini y recomienda la estrategia de resolución más adecuada.

### Simulación Visual

Durante la ejecución:

- Se muestra el progreso del algoritmo.
- Se resaltan los objetos evaluados.
- Se visualizan los objetos seleccionados.

### Estadísticas y Comparación

El sistema muestra:

- Tiempo estimado por la IA.
- Tiempo real de ejecución.
- Operaciones estimadas.
- Operaciones reales.
- Peso total utilizado.
- Valor total obtenido.
- Capacidad restante.

---

## Algoritmos Implementados

### Greedy Fraccionario

Selecciona los objetos según la relación valor/peso.

Permite tomar fracciones de objetos para maximizar el valor obtenido.

**Complejidad temporal:** O(n log n)

**Complejidad espacial:** O(n)

### Backtracking

Explora todas las combinaciones posibles de objetos.

Garantiza encontrar la solución óptima para la mochila 0/1.

**Complejidad temporal:** O(2ⁿ)

**Complejidad espacial:** O(n)

### Programación Dinámica

Implementada mediante tabulación Bottom-Up.

Construye soluciones parciales para evitar resolver subproblemas repetidos.

**Complejidad temporal:** O(n × W)

**Complejidad espacial:** O(n × W)

---

## Medición de Tiempo

Se implementó una función denominada `medirTiempoEstable()` para obtener tiempos de ejecución más consistentes.

La función realiza:

1. Calentamiento previo del algoritmo.
2. Múltiples ejecuciones consecutivas.
3. Cálculo del tiempo promedio.

Esto permite reducir el impacto de:

- Compilación Just-In-Time (JIT).
- Caché del procesador.
- Variaciones del navegador.
- Administración automática de memoria.

---

## Arquitectura General

```text
Usuario
   │
   ▼
Panel de Configuración
   │
   ▼
Generación de Objetos
   │
   ▼
Agente IA (Gemini)
   │
   ▼
Selección de Algoritmo
   │
   ├── Greedy
   ├── Backtracking
   └── Programación Dinámica
   │
   ▼
Simulación Visual
   │
   ▼
Panel de Estadísticas
   │
   ▼
Gráficas y Resultados
```

## Tecnologías Utilizadas

- React
- JavaScript (ES6+)
- Gemini API
- Recharts
- CSS

---

## Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Ingresar al proyecto:

```bash
cd programa
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el proyecto:

```bash
npm run dev
```

---

## Enlace : https://dei1400.github.io/Proyecto2_Analisis/
