import React from 'react';

export default function SimuladorAlgoritmo({ simulating, progress, message }) {
  if (!simulating && progress === 0) { //Para no mostrar el componente si no se ha iniciado la simulación
    return null;
  }

  return (
    <div style={styles.container}>
      <div style={styles.cardTitle}>
        <i className="ti ti-player-play"></i> Simulación visual del algoritmo
      </div>

      <div style={styles.box}>
        <div style={styles.message}>
          {message || "Preparando simulación..."}
        </div>

        <div style={styles.progressOuter}>
          <div
            style={{
              ...styles.progressInner,
              width: `${progress}%`,
            }}
          />
        </div>

        <div style={styles.percent}>
          {progress}%
        </div>
      </div>
    </div>
  );
}

const styles = {
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
  box: {
    background: '#FFFFFF',
    border: '1px solid var(--color-border-soft)',
    borderRadius: '16px',
    padding: '1rem',
  },
  message: {
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--color-primary-dark)',
    marginBottom: '10px',
  },
  progressOuter: {
    width: '100%',
    height: '12px',
    background: '#F5EEF8',
    borderRadius: '20px',
    overflow: 'hidden',
  },
  progressInner: {
    height: '100%',
    background: 'var(--color-primary-dark)',
    borderRadius: '20px',
    transition: 'width 0.4s ease',
  },
  percent: {
    marginTop: '6px',
    fontSize: '12px',
    color: 'var(--color-text-sub)',
    textAlign: 'right',
  },
};