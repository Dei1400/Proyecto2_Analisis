import React from 'react';
import readyAgent from '../assets/ready-agent.png';
import successAgent from '../assets/success-agent.png';
import errorAgent from '../assets/error-agent.png';

export default function PanelAgente({ decision, loading = false, error = null}) {
  return (
    <div style={styles.container}>
      <div style={styles.cardTitle}>
        <i className="ti ti-brain"></i> Decisión del agente IA
      </div>

      <div style={styles.agentBox}>
        <div style={styles.agentHeader}>
          <div style={styles.agentAvatar}>
            <i
              className={
                loading
                  ? "ti ti-loader spin"
                  : error
                    ? "ti ti-alert-triangle"
                    : decision
                      ? "ti ti-cpu"
                      : "ti ti-robot"
              }
            ></i>
          </div>

          <div style={styles.agentStatus}>
            {loading ? (
              <span><strong>Analizando problema</strong> — consultando al agente IA</span>
            ) : error ? (
              <span><strong>Error del agente</strong> — no se pudo completar el análisis</span>
            ) : decision ? (
              <span><strong>Análisis completo</strong> — estrategia seleccionada</span>
            ) : (
              <span><strong>Agente listo</strong> — esperando configuración y ejecución</span>
            )}
          </div>
        </div>

        {loading ? (
          <>
            <div style={styles.loadingBox}>
              <div style={styles.spinner}></div>
              <div style={styles.loadingTitle}>Analizando metadatos del problema</div>
              <div style={styles.loadingText}>
                El agente está evaluando N, W, prioridad y tiempo máximo tolerable.
              </div>
            </div>
          </>
        ) : error ? (
          <>
            <div style={styles.imageContainer}>
              <img
                src={errorAgent}
                alt="Error del agente"
                style={styles.agentImage}
              />
            </div>

            <div style={styles.errorBox}>
              {error}
            </div>
          </>
        ) : decision ? (
          <>
            <div style={styles.imageContainer}>
              <img
                src={successAgent}
                alt="Análisis completado"
                style={styles.agentImage}
              />
            </div>

            <div style={styles.decisionPill}>
              <i className="ti ti-chart-dots"></i> {decision.algoritmoRecomendado}
            </div>

            <div style={styles.justification}>
              {decision.justification}
            </div>
          </>
        ) : (
          <>
            <div style={styles.imageContainer}>
              <img
                src={readyAgent}
                alt="Agente listo"
                style={styles.agentImage}
              />
            </div>

            <div style={styles.waitingText}>
              Presiona "Consultar agente y ejecutar" para enviar los parámetros al modelo de IA.
            </div>
          </>
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
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '14px',
  },
  agentImage: {
    width: '160px',
    maxWidth: '100%',
  },
  loadingBox: {
    border: '1px dashed var(--color-primary-pastel)',
    borderRadius: '16px',
    padding: '1.25rem',
    textAlign: 'center',
    background: '#FAF8FC',
  },
  spinner: {
    width: '36px',
    height: '36px',
    border: '4px solid var(--color-primary-pastel)',
    borderTop: '4px solid var(--color-primary-dark)',
    borderRadius: '50%',
    margin: '0 auto 12px',
    animation: 'spin 1s linear infinite',
  },
  loadingTitle: {
    fontSize: '13px',
    fontWeight: '700',
    color: 'var(--color-primary-dark)',
    marginBottom: '4px',
  },
  loadingText: {
    fontSize: '12px',
    color: 'var(--color-text-sub)',
    lineHeight: '1.5',
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
  },
  errorBox: {
    fontSize: '13px',
    color: '#B71C1C',
    background: '#FFEBEE',
    border: '1px solid #FFCDD2',
    borderRadius: '12px',
    padding: '12px',
    lineHeight: '1.5',
  },
};