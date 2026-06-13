import React from 'react';

export default function PanelAgente({ decision }) {
  return (
    <div style={styles.container}>
      <div style={styles.cardTitle}>
        <i className="ti ti-brain"></i> Decisión del agente IA
      </div>
      
      <div style={styles.agentBox}>
        <div style={styles.agentHeader}>
          <div style={styles.agentAvatar}>
            <i className={decision ? "ti ti-cpu" : "ti ti-robot"}></i>
          </div>
          <div style={styles.agentStatus}>
            {decision ? (
              <span><strong>Análisis completo</strong> — Estrategia óptima seleccionada</span>
            ) : (
              <span><strong>Agente listo</strong> — esperando configuración y ejecución</span>
            )}
          </div>
        </div>
        
        {decision ? (
          <>
            <div style={styles.decisionPill}>
              <i className="ti ti-chart-dots"></i> {decision.algoritmoRecomendado}
            </div>
            <div style={styles.justification}>
              {decision.justification}
            </div>
          </>
        ) : (
          <div style={styles.waitingText}>
            Presiona "Consultar agente y ejecutar" para enviar los parámetros al modelo de IA.
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: '1.5rem',
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
  agentBox: {
    background: '#FFFFFF',
    border: '1px solid var(--color-border-soft)',
    borderRadius: 'var(--border-radius-cute)',
    padding: '1.5rem',
    boxShadow: '0 4px 15px rgba(110, 82, 177, 0.02)',
  },
  agentHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '14px',
  },
  agentAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'var(--color-primary-pastel)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-primary-dark)',
  },
  agentStatus: {
    fontSize: '13px',
    color: 'var(--color-text-main)',
  },
  decisionPill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: 'var(--color-accent-pink)',
    border: '1px solid #F8BBD0',
    borderRadius: '20px',
    padding: '6px 14px',
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--color-accent-pink-dark)',
    marginBottom: '12px',
  },
  justification: {
    fontSize: '13px',
    color: 'var(--color-text-main)',
    lineHeight: '1.6',
    borderLeft: '3px solid var(--color-primary-pastel)',
    paddingLeft: '12px',
  },
  waitingText: {
    fontSize: '13px',
    color: 'var(--color-text-sub)',
    fontStyle: 'italic',
  }
};