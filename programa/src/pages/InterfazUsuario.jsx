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

export default function InterfazUsuario() {
  const [N, setN] = useState(4);
  const [W, setW] = useState(10);
  const [priority, setPriority] = useState('accuracy'); 
  const [maxTime, setMaxTime] = useState(5);
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [decision, setDecision] = useState(null);
  const [metrics, setMetrics] = useState(null);

  const handleGenerateRandom = () => {
    const newItems = [];
    for (let i = 1; i <= N; i++) {
      newItems.push({
        id: i,
        name: `Objeto ${i}`,
        weight: Math.floor(Math.random() * 15) + 2,
        value: Math.floor(Math.random() * 25) + 5
      });
    }
    setItems(newItems);
    setSelectedIds([]);
    setDecision(null);
    setMetrics(null);
  };

  const handleRunSystem = async () => {
    if (items.length === 0) {
      alert("Por favor, genera primero los objetos aleatorios.");
      return;
    }
    if (!apiKey) {
      alert("Por favor, introduce tu Gemini API Key.");
      return;
    }

    setLoading(true);
    try {
      const aiResponse = await askAiAgent(N, W, priority, maxTime, apiKey);
      setDecision(aiResponse);

      const algoritmoRecomendado = aiResponse.algoritmoRecomendado;
      let resultadoAlgoritmo;
      
      const tiempoInicial = performance.now();

      if (algoritmoRecomendado?.includes("Dinámica") || algoritmoRecomendado?.includes("Dynamic")) {
        resultadoAlgoritmo = dynamicProgramming(items, W);
      } else if (algoritmoRecomendado?.includes("Greedy") || algoritmoRecomendado?.includes("Codicioso")) {
        resultadoAlgoritmo = greedy(items, W);
      } else if (algoritmoRecomendado?.includes("Backtracking")) {
        resultadoAlgoritmo = backtracking(items, W);
      } else {
        // Estrategia por defecto segura en caso de un retorno inesperado
        resultadoAlgoritmo = greedy(items, W);
      }

      const tiempoFinal = performance.now();

      const idsSeleccionados = resultadoAlgoritmo.objetosSeleccionados.map(objeto => objeto.id);
      setSelectedIds(idsSeleccionados);
      
      setMetrics({
        tiempoIA: aiResponse.tiempoEstimado || "0 ms",
        tiempoReal: `${(tiempoFinal - tiempoInicial).toFixed(2)} ms`,
        operaciones: resultadoAlgoritmo.operaciones
      });

    } catch (error) {
      alert(`Error de ejecución: ${error.message}`);
    } finally {
      setLoading(false);
    }
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
            onRunSystem={handleRunSystem}
            loading={loading}
          />
          <ItemsTable items={items} />
        </div>

        {/* COLUMNA DERECHA */}
        <div style={styles.columnOutput}>
          <PanelAgente decision={decision} />
          <VisualizacionObjetos items={items} selectedIds={selectedIds} />
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