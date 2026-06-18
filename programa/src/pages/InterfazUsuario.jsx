import React, { useState } from 'react';
import PanelConfiguracion from '../components/PanelConfiguracion';
import ItemsTable from '../components/ItemsTable';
import PanelAgente from '../components/PanelAgente';
import VisualizacionObjetos from '../components/VisualizacionObjetos';
import PanelEstadisticas from '../components/PanelEstadisticas';
import askAiAgent from '../components/AgenteIA';

import { greedy } from '../algorithms/greedy';
import { dynamicProgramming } from '../algorithms/dynamic';
import { backtracking } from '../algorithms/backtracking';

import SimuladorAlgoritmo from '../components/SimuladorAlgoritmo';

// Valor mínimo y máximo permitido para el valor de cada objeto
const VALOR_MIN = 4;
const VALOR_MAX = 100;

// Clampea un número entre min y max
const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

// Genera un entero aleatorio entre min y max (inclusive)
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function InterfazUsuario() {
  const [N, setN] = useState(4);
  const [W, setW] = useState(10);
  const [priority, setPriority] = useState('accuracy'); 
  const [maxTime, setMaxTime] = useState(1);
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState([]);
  const [isManual, setIsManual] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [decision, setDecision] = useState(null);
  const [metrics, setMetrics] = useState(null);

  const [agentError, setAgentError] = useState(null);
  const [executed, setExecuted] = useState(false);

  const [simulating, setSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [simulationMessage, setSimulationMessage] = useState("");
  const [currentObjectId, setCurrentObjectId] = useState(null);

  // ── Genera objetos con valores aleatorios dentro del rango permitido ──
  const handleGenerateRandom = () => {
    const newItems =  Array.from({ length: Math.min(Math.max(N, 4), 25) }, (_, i) => ({
      id: i + 1,
      name: `Objeto ${i + 1}`,
      weight: randInt(VALOR_MIN, VALOR_MAX),
      value: randInt(VALOR_MIN, VALOR_MAX),
    }));
    setItems(newItems);
    setIsManual(false);
    setSelectedIds([]);
    setDecision(null);
    setMetrics(null);

    setAgentError(null);
    setExecuted(false);
    setSimulating(false);
    setProgress(0);
    setSimulationMessage("");
    setCurrentObjectId(null);
  };

  // ── Genera objetos con valor inicial mínimo para que el usuario los edite ──
  const handleGenerateManual = () => {
    const newItems = Array.from({ length: Math.min(Math.max(N, 4), 25) }, (_, i) => ({
      id: i + 1,
      name: `Objeto ${i + 1}`,
      weight: 1,
      value: 1, // empieza en el mínimo permitido (4)
    }));
    setItems(newItems);
    setIsManual(true);
    setSelectedIds([]);
    setDecision(null);
    setMetrics(null);

    setAgentError(null);
    setExecuted(false);

    setSimulating(false);
    setProgress(0);
    setSimulationMessage("");
    setCurrentObjectId(null);
  };

  // ── Actualiza un campo de un objeto, aplicando restricciones si es "value" ──
  const handleItemChange = (id, field, val) => {
    const sanitized =
    field === 'value'
      ? clamp(val, 1, 100)
      : clamp(val, 1, 100);                // peso mínimo 1
      setItems(prev =>
        prev.map(item => item.id === id ? { ...item, [field]: sanitized } : item)
      );
    };

  const handleAskSystem = async () => {
    if (items.length === 0) {
      alert("Por favor, genera primero los objetos.");
      return;
    }
    if (!apiKey) {
      alert("Por favor, introduce tu Gemini API Key.");
      return;
    }
    setAgentError(null);
    setDecision(null);
    setSelectedIds([]);
    setMetrics(null);

    setExecuted(false);
    setLoading(true);
    setSimulating(false);
    setProgress(0);
    setSimulationMessage("");
    setCurrentObjectId(null);
    try {
      const aiResponse = await askAiAgent(items.length, W, priority, maxTime, apiKey);
      setDecision(aiResponse);

      }
      catch (error) {
        let mensajeError = error.message;

        if (mensajeError.includes("high demand")) {
          mensajeError =
            "Gemini está experimentando una alta demanda en este momento. Intenta nuevamente en unos minutos.";
        }

        if (mensajeError.includes("quota")) {
          mensajeError =
            "Se alcanzó el límite de uso de la API de Gemini. Debes esperar a que se reinicie la cuota o utilizar otra API Key.";
        }

        setAgentError(mensajeError);

        setDecision(null);
        setSelectedIds([]);
        setMetrics(null);
    }
    finally {
      setLoading(false);
    }
  };

  const esperar = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleExecuteAlgorithm = async() => {
  if (!decision) {
    return;
  }
  setSimulating(true);
  setProgress(0);
  setSimulationMessage("Preparando datos del problema...");
  await esperar(600);

  setProgress(25);
  setSimulationMessage("Leyendo algoritmo recomendado por la IA...");
  await esperar(600);

  setProgress(50);
  setSimulationMessage("Ejecutando estrategia seleccionada...");
  await esperar(600);
  
  const algoritmoRecomendado = decision.algoritmoRecomendado;
  let resultadoAlgoritmo;
  const tiempoInicial = performance.now();
  if (
    algoritmoRecomendado?.includes("Dinámica") ||
    algoritmoRecomendado?.includes("Dynamic")
  ) {
    resultadoAlgoritmo = dynamicProgramming(items, W);

  } else if (
    algoritmoRecomendado?.includes("Greedy") ||
    algoritmoRecomendado?.includes("Codicioso")
  ) {
    resultadoAlgoritmo = greedy(items, W);

  } else if (
    algoritmoRecomendado?.includes("Backtracking")
  ) {

    // protección navegador
    if (items.length > 20) {
      setAgentError(
        "Backtracking no se ejecuta con más de 20 objetos."
      );
      return;
    }

    resultadoAlgoritmo = backtracking(items, W);

  } else {

    resultadoAlgoritmo = greedy(items, W);
  }

  const tiempoFinal = performance.now();

  const idsSeleccionados =
    resultadoAlgoritmo.objetosSeleccionados.map(
      objeto => objeto.id
    );
    let seleccionadosVisuales = [];

for (const objeto of items) {
  setCurrentObjectId(objeto.id);

  setSimulationMessage(
    `Evaluando ${objeto.name}...`
  );

  await esperar(250); //Pequeña pausa para simular evaluación

  if (idsSeleccionados.includes(objeto.id)) {

    seleccionadosVisuales = [
      ...seleccionadosVisuales,
      objeto.id
    ];

    setSelectedIds(seleccionadosVisuales);

    setSimulationMessage(
      `${objeto.name} fue seleccionado`
    );

    await esperar(300);
  }
}

  setCurrentObjectId(null);
  setMetrics({
    tiempoIA: decision.tiempoEstimado || "0 ms",
    tiempoReal: `${(tiempoFinal - tiempoInicial).toFixed(2)} ms`,

    operacionesEstimadas: decision.operacionesEstimadas || 0,
    operaciones: resultadoAlgoritmo.operaciones,

    pesoTotal: resultadoAlgoritmo.pesoTotal,
    valorTotal: resultadoAlgoritmo.valorTotal,
    capacidadTotal: W,
    capacidadRestante: W - resultadoAlgoritmo.pesoTotal,
    objetosSeleccionados: resultadoAlgoritmo.objetosSeleccionados,
  });

  setProgress(85);
  setSimulationMessage("Procesando objetos seleccionados...");

  await esperar(600);

  setProgress(100);
  setSimulationMessage("Simulación completada.");
  await esperar(500);

  setSimulating(false);

  setExecuted(true);
};

  return (
    <div style={styles.appContainer}>
      <style>{`
        :root {
          --color-bg-girly: #F5EEF8; 
          --color-card-bg: #FFFFFF;
          --color-primary-pastel: #E8DFFF; 
          --color-primary-medium: #BBADFF;
          --color-primary-dark: #5B3F96;   
          --color-accent-pink: #FCE4EC;    
          --color-accent-pink-dark: #C2185B;
          --color-mint-pastel: #E8F8F5;
          --color-mint-dark: #117864;
          --color-text-main: #3D314A;
          --color-text-sub: #7B6B87;
          --color-border-soft: #E2D9EC;
          --border-radius-cute: 20px;
        }
        body {
          background: linear-gradient(135deg, #F5EEF8 0%, #E8F0FE 100%);
          color: var(--color-text-main);
          font-family: system-ui, -apple-system, sans-serif;
          margin: 0;
          min-height: 100vh;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spin {
          display: inline-block;
          animation: spin 1s linear infinite;
        }
      `}</style>

      {/* Header Panorámico */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.headerIcon}>
            <i className="ti ti-backpack" style={{ fontSize: '25px', color: 'var(--color-primary-dark)' }}></i>
          </div>
          <div style={styles.titleGroup}>
            <h1 style={styles.title}>Knapsack Smart Router</h1>
            <span style={styles.dividerPipe}>|</span>
            <p style={styles.subtitle}>Agente Inteligente de Enrutamiento</p>
          </div>
        </div>
        <span style={styles.badge}>Deylin Salazar · Alexa Fallas</span>
      </header>

      <div style={styles.workspaceGrid}>
        {/* COLUMNA IZQUIERDA */}
        <div style={styles.columnInput}>
          <PanelConfiguracion 
            N={N} setN={setN}
            W={W} setW={setW}
            priority={priority} setPriority={setPriority}
            maxTime={maxTime} setMaxTime={setMaxTime}
            apiKey={apiKey} setApiKey={setApiKey}
            onGenerateRandom={handleGenerateRandom}
            onGenerateManual={handleGenerateManual}
            onRunSystem={handleAskSystem}
            loading={loading}
          />
          <ItemsTable
            items={items}
            isManual={isManual}
            onItemChange={handleItemChange}
          />
        </div>

        {/* COLUMNA DERECHA */}
        <div style={styles.columnOutput}>
          <PanelAgente
              decision={decision}
              loading={loading}
              error={agentError}
            />
            
              {decision && !executed && (
              <button
                onClick={handleExecuteAlgorithm}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#5B3F96',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Ejecutar algoritmo recomendado
              </button>
            )}
            <SimuladorAlgoritmo
              simulating={simulating}
              progress={progress}
              message={simulationMessage}
            />
          <VisualizacionObjetos items={items}
            selectedIds={selectedIds}
            currentObjectId={currentObjectId} />
          <PanelEstadisticas metrics={metrics} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  appContainer: { maxWidth: '1450px', margin: '0 auto', padding: '1.5rem 2rem' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '0.4rem 0.75rem', background: 'var(--color-card-bg)', borderBottom: '1px solid var(--color-border-soft)', borderRadius: '10px', marginBottom: '0.5rem', flexShrink: 0 },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '8px' },
  headerIcon: { width: '30px', height: '30px', background: 'var(--color-accent-pink)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  titleGroup: { display: 'flex', alignItems: 'center', gap: '10px' },
  title: { fontSize: '16px', fontWeight: '700', color: 'var(--color-primary-dark)', whiteSpace: 'nowrap' },
  dividerPipe: { color: 'var(--color-border-soft)', fontSize: '13px', fontWeight: '300' },
  subtitle: { fontSize: '12px', color: 'var(--color-text-sub)', whiteSpace: 'nowrap' },
  badge: { fontSize: '12px', padding: '2px 8px', borderRadius: '20px', background: 'var(--color-primary-pastel)', color: 'var(--color-primary-dark)', fontWeight: '600', whiteSpace: 'nowrap' },
  workspaceGrid: { display: 'grid', gridTemplateColumns: '43% 55%', gap: '2%', alignItems: 'start' },
  columnInput: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  columnOutput: { display: 'flex', flexDirection: 'column', gap: '1.5rem' }
};