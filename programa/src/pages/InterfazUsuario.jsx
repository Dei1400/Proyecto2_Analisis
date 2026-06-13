import React from 'react';
import PanelConfiguracion from '../components/PanelConfiguracion';
import ItemsTable from '../components/ItemsTable';
import PanelAgente from '../components/PanelAgente';
import VisualizacionObjetos from '../components/VisualizacionObjetos';
import PanelEstadisticas from '../components/PanelEstadisticas';

export default function InterfazUsuario() {
  return (
    <div style={styles.appContainer}>
      <style>{`
        :root {
          --color-bg-girly: #F9F6FC;
          --color-card-bg: #FFFFFF;
          --color-primary-pastel: #D6C7FF; /* Lila Pastel Principal */
          --color-primary-dark: #6D52B1;   /* Texto lila oscuro para contraste */
          --color-accent-pink: #FCE4EC;    /* Rosa Pastel */
          --color-accent-pink-dark: #C2185B;
          --color-text-main: #4A3E56;
          --color-text-sub: #8A7A97;
          --color-border-soft: #E8E2EE;
          --border-radius-cute: 16px;
        }
        body {
          background-color: var(--color-bg-girly);
          color: var(--color-text-main);
          font-family: system-ui, -apple-system, sans-serif;
          margin: 0;
        }
      `}</style>

      {/* Header de la Aplicación */}
      <header style={styles.header}>
        <div style={styles.headerIcon}>
          <i className="ti ti-backpack" style={{ fontSize: '22px', color: 'var(--color-primary-dark)' }}></i>
        </div>
        <div>
          <h1 style={styles.title}>Knapsack Smart Router</h1>
          <p style={styles.subtitle}>Agente Inteligente de Enrutamiento</p>
        </div>
        <span style={styles.badge}>Deylin Salazar Alexa Fallas</span>
      </header>

      {/* Grid Principal (Configuración e Items del Problema) */}
      <div style={styles.grid2}>
        <PanelConfiguracion />
        <ItemsTable />
      </div>

      <hr style={styles.divider} />

      {/* Bloque de Decisión de la IA */}
      <PanelAgente />

      <hr style={styles.divider} />

      {/* Bloque de Objetos Seleccionados */}
      <VisualizacionObjetos />

      <hr style={styles.divider} />

      {/* Bloque del Panel Analítico de Tiempos y Complejidad */}
      <PanelEstadisticas />
    </div>
  );
}

const styles = {
  appContainer: {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '2rem',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid var(--color-border-soft)',
  },
  headerIcon: {
    width: '44px',
    height: '44px',
    background: 'var(--color-accent-pink)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 10px rgba(246, 212, 225, 0.4)',
  },
  title: {
    fontSize: '22px',
    fontWeight: '600',
    color: 'var(--color-primary-dark)',
    letterSpacing: '-0.3px',
  },
  subtitle: {
    fontSize: '13px',
    color: 'var(--color-text-sub)',
    marginTop: '2px',
  },
  badge: {
    fontSize: '11px',
    padding: '4px 10px',
    borderRadius: '20px',
    background: 'var(--color-primary-pastel)',
    color: 'var(--color-primary-dark)',
    fontWeight: '600',
    marginLeft: 'auto',
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid var(--color-border-soft)',
    margin: '2rem 0',
  },
};