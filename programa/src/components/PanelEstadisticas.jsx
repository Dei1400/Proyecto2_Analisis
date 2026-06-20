import React from 'react';
import GraficaMetricas from './GraficaMetricas';

export default function PanelEstadisticas({ metrics }) {
  const tiempoIA = metrics ? parseFloat(metrics.tiempoIA) || 0 : 0;
  const tiempoReal = metrics ? parseFloat(metrics.tiempoReal) || 0 : 0;

  const errorTiempo = metrics
    ? Math.abs(tiempoReal - tiempoIA).toFixed(2)
    : '--';

  const errorOperaciones = metrics
    ? Math.abs(metrics.operaciones - metrics.operacionesEstimadas)
    : '--';

  return (
    <div style={styles.container}>
      <div style={styles.cardTitle}>
        <i className="ti ti-chart-bar"></i> Panel de estadísticas de rendimiento
      </div>

      <div style={styles.metricsRow}>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>Tiempo IA</div>
          <div style={styles.metricVal}>{metrics ? metrics.tiempoIA : '--'}</div>
          <div style={styles.metricSub}>Predicción del agente</div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>Tiempo real</div>
          <div style={styles.metricVal}>{metrics ? metrics.tiempoReal : '--'}</div>
          <div style={styles.metricSub}>Ejecución local</div>
        </div>
      </div>

      <div style={styles.metricsRow}>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>Operaciones IA</div>
          <div style={styles.metricVal}>
            {metrics ? metrics.operacionesEstimadas : '--'}
          </div>
          <div style={styles.metricSub}>Estimación del agente</div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>Operaciones reales</div>
          <div style={styles.metricVal}>
            {metrics ? metrics.operaciones : '--'}
          </div>
          <div style={styles.metricSub}>Medición local</div>
        </div>
      </div>

      {metrics ? (
        <GraficaMetricas metrics={metrics} />
      ) : (
        <div style={styles.chartPlaceholder}>
          <i className="ti ti-chart-area-line" style={styles.chartIcon}></i>
          <span style={styles.chartText}>
            Ejecuta el algoritmo para generar estadísticas.
          </span>
        </div>
      )}

      {metrics && (
        <div style={styles.summaryBox}>
          <div style={styles.summaryHeader}>
            <i className="ti ti-backpack"></i>
            <span>Resumen final de la mochila</span>
          </div>

          <div style={styles.summaryGrid}>
            <div style={styles.summaryCard}>
              <span style={styles.summaryLabel}>Capacidad total</span>
              <strong style={styles.summaryValue}>{metrics.capacidadTotal}</strong>
            </div>

            <div style={styles.summaryCard}>
              <span style={styles.summaryLabel}>Peso utilizado</span>
              <strong style={styles.summaryValue}>{metrics.pesoTotal}</strong>
            </div>

            <div style={styles.summaryCard}>
              <span style={styles.summaryLabel}>Capacidad restante</span>
              <strong style={styles.summaryValue}>{metrics.capacidadRestante}</strong>
            </div>

            <div style={styles.summaryCard}>
              <span style={styles.summaryLabel}>Valor obtenido</span>
              <strong style={styles.summaryValue}>{metrics.valorTotal}</strong>
            </div>
          </div>

          <div style={styles.selectedBox}>
            <strong>Objetos seleccionados:</strong>
            <div style={styles.selectedList}>
              {metrics.objetosSeleccionados?.length > 0
                ? metrics.objetosSeleccionados.map((objeto) => (
                    <span key={objeto.id} style={styles.selectedPill}>
                      {objeto.name}
                    </span>
                  ))
                : <span style={styles.noObjects}>No se seleccionaron objetos</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


const styles = {
  summaryBox: {
  marginTop: '1rem',
  background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8FC 100%)',
  border: '1px solid var(--color-border-soft)',
  borderRadius: '16px',
  padding: '1rem',
},

summaryHeader: {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '13px',
  fontWeight: '700',
  color: 'var(--color-primary-dark)',
  marginBottom: '12px',
},

summaryGrid: {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '10px',
},

summaryCard: {
  background: '#FFFFFF',
  border: '1px solid var(--color-border-soft)',
  borderRadius: '12px',
  padding: '10px',
},

summaryLabel: {
  display: 'block',
  fontSize: '11px',
  color: 'var(--color-text-sub)',
  marginBottom: '4px',
},

summaryValue: {
  fontSize: '18px',
  color: 'var(--color-primary-dark)',
},

selectedBox: {
  marginTop: '12px',
  background: '#FFFFFF',
  border: '1px solid var(--color-border-soft)',
  borderRadius: '12px',
  padding: '10px',
  fontSize: '13px',
},

selectedList: {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
  marginTop: '8px',
},

selectedPill: {
  background: 'var(--color-accent-pink)',
  color: 'var(--color-accent-pink-dark)',
  border: '1px solid #F8BBD0',
  borderRadius: '20px',
  padding: '4px 10px',
  fontSize: '12px',
  fontWeight: '600',
},

noObjects: {
  color: '#B71C1C',
  background: '#FFEBEE',
  border: '1px solid #FFCDD2',
  borderRadius: '8px',
  padding: '6px 10px',
  fontSize: '12px',
},
  tablaBox: {
    marginTop: '1rem',
    background: '#FFFFFF',
    border: '1px solid var(--color-border-soft)',
    borderRadius: '12px',
    padding: '1rem',
  },  
  tableTitle: {
    fontSize: '13px',
    fontWeight: '700',
    color: 'var(--color-primary-dark)',
    marginBottom: '8px',
  },
  comparisonBox: {
    marginTop: '1rem',
    background: '#FFFFFF',
    border: '1px solid var(--color-border-soft)',
    borderRadius: '12px',
    padding: '1rem',
  },
  comparisonTitle: {
    fontSize: '13px',
    fontWeight: '700',
    color: 'var(--color-primary-dark)',
    marginBottom: '8px',
  },

  comparisonGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
    fontSize: '13px',
    color: 'var(--color-text-main)',
  },
  summaryBox: {
  marginTop: '1rem',
  background: '#FFFFFF',
  border: '1px solid var(--color-border-soft)',
  borderRadius: '12px',
  padding: '1rem',
  fontSize: '13px',
  color: 'var(--color-text-main)',
  lineHeight: '1.8',
  },

warningText: {
  marginTop: '10px',
  color: '#B71C1C',
  background: '#FFEBEE',
  border: '1px solid #FFCDD2',
  borderRadius: '8px',
  padding: '8px',
  },
  container: {
    marginTop: '0.5rem',
  },
  cardTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--color-text-sub)',
    textTransform: 'uppercase',
    letterSpacing: '.8px',
    marginBottom: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  metricsRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '12px',
    marginTop: '12px',
  },
  metricCard: {
    background: '#FFFFFF',
    border: '1px solid var(--color-border-soft)',
    borderRadius: '12px',
    padding: '1rem',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(110, 82, 177, 0.01)',
  },
  metricLabel: {
    fontSize: '11px',
    color: 'var(--color-text-sub)',
    fontWeight: '600',
    marginBottom: '4px',
  },
  metricVal: {
    fontSize: '22px',
    fontWeight: '700',
    color: 'var(--color-primary-dark)',
  },
  metricSub: {
    fontSize: '11px',
    color: 'var(--color-text-sub)',
    marginTop: '2px',
  },
  chartPlaceholder: {
    background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8FC 100%)',
    border: '1px dashed var(--color-primary-pastel)',
    borderRadius: 'var(--border-radius-cute)',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '6px',
    marginTop: '1rem',
  },
  chartIcon: {
    fontSize: '24px',
    color: 'var(--color-text-sub)',
  },
  chartText: {
    fontSize: '12px',
    color: 'var(--color-text-sub)',
    fontWeight: '500',
  },
};