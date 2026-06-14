import React from 'react';

export default function PanelEstadisticas({ metrics }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardTitle}>
        <i className="ti ti-chart-bar"></i> Monitoreo de Rendimiento Analítico
      </div>

      <div style={styles.flexLayout}>
        {/* Bloque Izquierdo: Métricas en Fila */}
        <div style={styles.metricsRow}>
          <div style={{ ...styles.metricCard, background: 'var(--color-primary-pastel)' }}>
            <div style={styles.metricLabel}>Tiempo est. (IA)</div>
            <div style={styles.metricVal}>{metrics ? metrics.tiempoIA : '--'}</div>
            <div style={{ ...styles.metricSub, color: 'var(--color-primary-dark)' }}>predicción</div>
          </div>
          
          <div style={{ ...styles.metricCard, background: 'var(--color-mint-pastel)' }}>
            <div style={styles.metricLabel}>Tiempo real</div>
            <div style={styles.metricVal}>{metrics ? metrics.tiempoReal : '--'}</div>
            <div style={{ ...styles.metricSub, color: 'var(--color-mint-dark)' }}>solución local</div>
          </div>
          
          <div style={{ ...styles.metricCard, background: 'var(--color-accent-pink)' }}>
            <div style={styles.metricLabel}>Operaciones</div>
            <div style={styles.metricVal}>{metrics ? metrics.operaciones : '--'}</div>
            <div style={{ ...styles.metricSub, color: 'var(--color-accent-pink-dark)' }}>complejidad</div>
          </div>
        </div>

        {/* Bloque Derecho: Placeholder del Gráfico (ocupa el espacio sobrante) */}
        <div style={styles.chartPlaceholder}>
          <i className="ti ti-chart-area-line" style={styles.chartIcon}></i>
          <span style={styles.chartText}>Dashboard Recharts en tiempo real</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#FFFFFF',
    border: '1px solid var(--color-border-soft)',
    borderRadius: 'var(--border-radius-cute)',
    padding: '0.85rem 1.25rem', // Reducido para compresión
    boxShadow: '0 8px 20px rgba(110, 82, 177, 0.03)',
  },
  cardTitle: {
    fontSize: '11px',
    fontWeight: '700',
    color: 'var(--color-text-sub)',
    textTransform: 'uppercase',
    letterSpacing: '.8px',
    marginBottom: '0.6rem',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  flexLayout: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metricsRow: {
    display: 'flex',
    gap: '10px',
    flex: '2', // Toma mayor espacio para alinearse a lo largo
  },
  metricCard: {
    flex: 1,
    borderRadius: '10px',
    padding: '6px 10px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: '115px',
  },
  metricLabel: {
    fontSize: '10px',
    color: 'var(--color-text-main)',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.2px',
  },
  metricVal: {
    fontSize: '18px',
    fontWeight: '800',
    color: 'var(--color-text-main)',
    margin: '2px 0',
  },
  metricSub: {
    fontSize: '9px',
    fontWeight: '600',
  },
  chartPlaceholder: {
    flex: '1.2', // Se adueña del extremo derecho sobrante de la pantalla
    background: 'linear-gradient(180deg, #FFFFFF 0%, #F5EEF8 100%)',
    border: '1.5px dashed var(--color-primary-medium)',
    borderRadius: '10px',
    height: '56px', // Súper bajito y compacto
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '0 10px',
  },
  chartIcon: {
    fontSize: '18px',
    color: 'var(--color-primary-dark)',
  },
  chartText: {
    fontSize: '11px',
    color: 'var(--color-primary-dark)',
    fontWeight: '600',
  },
};