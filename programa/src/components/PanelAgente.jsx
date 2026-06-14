import React from 'react';

export default function PanelAgente({ decision }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardTitle}>
        <i className="ti ti-brain"></i> Enrutador de Estrategia Cognitiva (IA)
      </div>
      
      <div style={{ ...styles.agentBox, ...(decision ? styles.agentBoxActive : {}) }}>
        <div style={styles.agentHeader}>
          <div style={{ ...styles.agentAvatar, background: decision ? 'var(--color-mint-pastel)' : 'var(--color-accent-pink)' }}>
            <i className={decision ? "ti ti-cpu" : "ti ti-robot"} style={{ color: decision ? 'var(--color-mint-dark)' : 'var(--color-accent-pink-dark)' }}></i>
          </div>
          <div style={styles.agentStatus}>
            {decision ? (
              <span><strong>Modelo Optimizado</strong> — Recomendación Estratégica Computacional</span>
            ) : (
              <span><strong>Módulo Cognitivo Inactivo</strong> — Esperando Metadatos</span>
            )}
          </div>
        </div>
        
        {decision ? (
          <div style={styles.responseContainer}>
            <div style={styles.decisionPill}>
              <i className="ti ti-adjustments-alt"></i> Usar: {decision.algoritmoRecomendado}
            </div>
            <div style={styles.justification}>
              {decision.justification}
            </div>
          </div>
        ) : (
          <div style={styles.waitingText}>
            El agente necesita que configures las restricciones de negocio antes de poder trazar la complejidad.
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#FFFFFF',
    border: '1px solid var(--color-border-soft)',
    borderRadius: 'var(--border-radius-cute)',
    padding: '1.25rem',
    boxShadow: '0 10px 25px rgba(110, 82, 177, 0.03)',
  },
  cardTitle: {
    fontSize: '9px',
    fontWeight: '700',
    color: 'var(--color-text-sub)',
    textTransform: 'uppercase',
    letterSpacing: '.8px',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  agentBox: {
    background: '#FAF8FC',
    border: '1px solid var(--color-border-soft)',
    borderRadius: '14px',
    padding: '1.25rem',
    transition: 'all 0.3s ease',
  },
  agentBoxActive: {
    background: 'linear-gradient(135deg, #F9F6FC 0%, #E8F8F5 100%)', // Gradiente pastel inteligente
    border: '1px solid #A3E4D7',
  },
  agentHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
  },
  agentAvatar: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
  },
  agentStatus: {
    fontSize: '10px',
    color: 'var(--color-text-main)',
  },
  responseContainer: {
    marginTop: '8px',
  },
  decisionPill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: '#FFFFFF',
    border: '2px solid var(--color-mint-dark)',
    borderRadius: '30px',
    padding: '6px 16px',
    fontSize: '12px',
    fontWeight: '700',
    color: 'var(--color-mint-dark)',
    marginBottom: '12px',
  },
  justification: {
    fontSize: '13px',
    color: 'var(--color-text-main)',
    lineHeight: '1.6',
    borderLeft: '4px solid #A3E4D7',
    paddingLeft: '12px',
  },
  waitingText: {
    fontSize: '10px',
    color: 'var(--color-text-sub)',
    fontStyle: 'italic',
  }
};