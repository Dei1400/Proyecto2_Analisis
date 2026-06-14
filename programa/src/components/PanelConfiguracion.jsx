import React, { useState } from 'react';

export default function PanelConfiguracion({
  N, setN,
  W, setW,
  priority, setPriority,
  maxTime, setMaxTime,
  apiKey, setApiKey,
  onGenerateRandom,
  onRunSystem,
  loading
}) {
  const [showPass, setShowPass] = useState(false);

  return (
    <div style={styles.card}>
      <div style={styles.cardTitle}>
        <i className="ti ti-settings-2"></i> Configuración del problema
      </div>

      {/* N y W en fila */}
      <div style={styles.rowInputs}>
        <div style={{ flex: 1 }}>
          <label style={styles.label}>Objetos (N)</label>
          <input type="number" value={N} min={2} max={25}
            onChange={(e) => setN(parseInt(e.target.value) || 0)}
            style={styles.input} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={styles.label}>Capacidad (W)</label>
          <input type="number" value={W} min={1}
            onChange={(e) => setW(parseInt(e.target.value) || 0)}
            style={styles.input} />
        </div>
      </div>

      <button onClick={onGenerateRandom} style={styles.btnSecundario}>
        <i className="ti ti-refresh"></i> Generar objetos aleatorios
      </button>

      <div style={styles.sectionLabel}>Prioridad</div>
      <div style={styles.priorityGrid}>
        <div
          style={{ ...styles.priorityBtn, ...(priority === 'accuracy' ? styles.priorityBtnActive : {}) }}
          onClick={() => setPriority('accuracy')}
        >
          <i className="ti ti-target" style={priority === 'accuracy' ? styles.iconActive : styles.iconInactive}></i>
          <span>Exactitud</span>
        </div>
        <div
          style={{ ...styles.priorityBtn, ...(priority === 'speed' ? styles.priorityBtnActive : {}) }}
          onClick={() => setPriority('speed')}
        >
          <i className="ti ti-bolt" style={priority === 'speed' ? styles.iconActive : styles.iconInactive}></i>
          <span>Velocidad</span>
        </div>
      </div>

      {/* Tiempo límite y API Key en fila */}
      <div style={styles.rowInputs}>
        <div style={{ flex: 1 }}>
          <label style={styles.label}>Tiempo límite (s)</label>
          <input type="number" value={maxTime}
            onChange={(e) => setMaxTime(parseInt(e.target.value) || 5)}
            style={styles.input} />
        </div>
        <div style={{ flex: 2 }}>
          <label style={styles.label}>Gemini API Key</label>
          <div style={styles.apiRow}>
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="API Key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              style={{ ...styles.input, marginBottom: 0 }}
            />
            <button onClick={() => setShowPass(!showPass)} style={styles.btnEye}>
              <i className={showPass ? 'ti ti-eye-off' : 'ti ti-eye'}></i>
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={onRunSystem}
        disabled={loading}
        style={{ ...styles.btnPrincipal, opacity: loading ? 0.7 : 1 }}
      >
        <i className={loading ? 'ti ti-loader spin' : 'ti ti-player-play'}></i>
        {loading ? ' Procesando con IA...' : ' Consultar agente y ejecutar'}
      </button>
    </div>
  );
}

const styles = {
  card: {
    background: 'var(--color-card-bg)',
    border: '1px solid var(--color-border-soft)',
    borderRadius: 'var(--border-radius-cute)',
    padding: '1rem',
    boxShadow: '0 4px 14px rgba(110,82,177,0.04)',
    height: '100%',
  },
  cardTitle: {
    fontSize: '9px',
    fontWeight: '700',
    color: 'var(--color-text-sub)',
    textTransform: 'uppercase',
    letterSpacing: '.8px',
    marginBottom: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  rowInputs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '8px',
  },
  label: {
    display: 'block',
    fontSize: '11px',
    fontWeight: '600',
    color: 'var(--color-text-main)',
    marginBottom: '4px',
  },
  input: {
    width: '70%',
    padding: '7px 10px',
    border: '1px solid var(--color-border-soft)',
    borderRadius: '9px',
    fontSize: '10px',
    color: 'var(--color-text-main)',
    background: '#FAF8FC',
    outline: 'none',
    
  },
  btnSecundario: {
    width: '100%',
    background: '#FFF',
    border: '1px solid var(--color-primary-pastel)',
    color: 'var(--color-primary-dark)',
    padding: '7px',
    borderRadius: '9px',
    cursor: 'pointer',
    fontSize: '10px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    marginBottom: '8px',
  },
  sectionLabel: {
    fontSize: '10px',
    fontWeight: '700',
    color: 'var(--color-text-sub)',
    textTransform: 'uppercase',
    letterSpacing: '.5px',
    marginBottom: '6px',
  },
  priorityGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
    marginBottom: '8px',
  },
  priorityBtn: {
    border: '1px solid var(--color-border-soft)',
    borderRadius: '4px',
    padding: '3px',
    textAlign: 'center',
    cursor: 'pointer',
    background: '#FFF',
    fontSize: '11px',
    color: 'var(--color-text-sub)',
    transition: 'all 0.15s',
  },
  priorityBtnActive: {
    border: '2px solid var(--color-primary-dark)',
    background: 'var(--color-accent-pink)',
    color: 'var(--color-primary-dark)',
    fontWeight: '700',
  },
  iconInactive: { fontSize: '16px', display: 'block', marginBottom: '2px', color: 'var(--color-text-sub)' },
  iconActive:   { fontSize: '16px', display: 'block', marginBottom: '2px', color: 'var(--color-accent-pink-dark)' },
  apiRow: {
    display: 'flex',
    gap: '6px',
    alignItems: 'center',
  },
  btnEye: {
    padding: '7px 10px',
    borderRadius: '9px',
    border: '1px solid var(--color-border-soft)',
    background: '#FFF',
    cursor: 'pointer',
    color: 'var(--color-text-sub)',
    flexShrink: 0,
  },
  btnPrincipal: {
    width: '100%',
    background: 'var(--color-primary-dark)',
    color: '#FFF',
    border: 'none',
    padding: '5px',
    borderRadius: '5px',
    fontWeight: '700',
    fontSize: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    marginTop: '2px',
  },
};