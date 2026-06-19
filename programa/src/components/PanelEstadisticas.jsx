import React from 'react';
import GraficaMetricas from './GraficaMetricas';

export default function PanelEstadisticas({ metrics }) {
  return (
      <div style={styles.container}>
        <div style={styles.cardTitle}>
          <i className="ti ti-chart-bar"></i> Panel de estadísticas de rendimiento
        </div>

        <div style={styles.metricsRow}>
          <div style={styles.metricCard}>
            <div style={styles.metricLabel}>Tiempo estimado (IA)</div>
            <div style={styles.metricVal}>
              {metrics ? metrics.tiempoIA : '--'}
            </div>
            <div style={styles.metricSub}>predicción del agente</div>
          </div>
          {metrics && (
      <div style={styles.comparisonBox}>
        <div style={styles.comparisonTitle}>
          Comparación IA vs ejecución local
        </div>

        <div style={styles.comparisonGrid}>
          <div>
            <strong>Tiempo IA:</strong> {metrics.tiempoIA}
          </div>
          <div>
            <strong>Tiempo real:</strong> {metrics.tiempoReal}
          </div>
          <div>
            <strong>Operaciones IA:</strong> {metrics.operacionesEstimadas}
          </div>
          <div>
            <strong>Operaciones reales:</strong> {metrics.operaciones}
          </div>
        </div>
      </div>
    )}

          <div style={styles.metricCard}>
            <div style={styles.metricLabel}>Operaciones IA</div>
            <div style={styles.metricVal}>
              {metrics ? metrics.operacionesEstimadas : '--'}
            </div>
            <div style={styles.metricSub}>estimación del agente</div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricLabel}>Operaciones</div>
            <div style={styles.metricVal}>
              {metrics ? metrics.operaciones : '--'}
            </div>
            <div style={styles.metricSub}>Carga algorítmica</div>
          </div>
        </div>
        {metrics && (
          <GraficaMetricas metrics={metrics} />
        )}

        {metrics && (
          <div style={styles.summaryBox}>

            <div>
              <strong>Capacidad total:</strong> {metrics.capacidadTotal}
            </div>

            <div>
              <strong>Peso utilizado:</strong> {metrics.pesoTotal}
            </div>

            <div>
              <strong>Capacidad restante:</strong> {metrics.capacidadRestante}
            </div>

            <div>
              <strong>Valor obtenido:</strong> {metrics.valorTotal}
            </div>

            {metrics.objetosSeleccionados?.length > 0 ? (
              <div style={{ marginTop: '8px' }}>
                <strong>Objetos seleccionados:</strong>
                <br />

                {metrics.objetosSeleccionados
                  .map((objeto) => objeto.name)
                  .join(', ')}
              </div>
            ) : (
              <div style={styles.warningText}>
                No se seleccionaron objetos para la mochila.
              </div>
            )}

          </div>
        )}
      </div>
    );
}


const styles = {
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