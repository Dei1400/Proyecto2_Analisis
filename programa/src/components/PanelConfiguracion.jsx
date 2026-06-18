import React, { useState } from 'react';

export default function PanelConfiguracion({
  N, setN,
  W, setW,
  priority, setPriority,
  maxTime, setMaxTime,
  apiKey, setApiKey,
  onGenerateRandom,
  onRunSystem,
  loading,
  onGenerateManual,
}) {
  const [showPass, setShowPass] = useState(false);

  return (
    <div style={styles.card}>
      <div style={styles.cardTitle}>
        <i className="ti ti-settings-2"></i> Configuración del problema
      </div>

      <label style={styles.label}>Cantidad de objetos (N)</label>
      <input
        type="number" 
        value={N} 
        min={4} 
        max={25} 
        onChange={(e) => {
          const valor = parseInt(e.target.value) || 4;
          setN(Math.min(Math.max(valor, 4), 25));
        }} 
        style={styles.input} 
      />

      <label style={styles.label}>Capacidad de la mochila (W)</label>
      <input 
          type="number" 
          value={W} 
          min={1}
          max={100}
          onChange={(e) => {
            const valor = parseInt(e.target.value) || 1;
            setW(Math.min(Math.max(valor, 1), 100));
          }} 
          style={styles.input} 
      />

      {/* ── Dos botones lado a lado ── */}
      <div style={styles.row}>
        <button onClick={onGenerateManual} style={styles.btnSecundario}>
          <i className="ti ti-plus"></i> Generar objetos
        </button>
        <button onClick={onGenerateRandom} style={styles.btnSecundario}>
          <i className="ti ti-refresh"></i> Aleatorio
        </button>
      </div>

      <div style={styles.sectionLabel}>Restricciones de negocio</div>

      <div style={styles.priorityGrid}>
        <div 
          style={{ ...styles.priorityBtn, ...(priority === 'accuracy' ? styles.priorityBtnActive : {}) }}
          onClick={() => setPriority('accuracy')}
        >
          <i className="ti ti-target" style={priority === 'accuracy' ? styles.iconActive : styles.iconInactive}></i>
          <span>Máxima exactitud</span>
        </div>
        <div 
          style={{ ...styles.priorityBtn, ...(priority === 'speed' ? styles.priorityBtnActive : {}) }}
          onClick={() => setPriority('speed')}
        >
          <i className="ti ti-bolt" style={priority === 'speed' ? styles.iconActive : styles.iconInactive}></i>
          <span>Máxima velocidad</span>
        </div>
      </div>

      <label style={styles.label}>Tiempo máximo tolerable (segundos)</label>
      <select
        value={maxTime}
        onChange={(e) => setMaxTime(Number(e.target.value))}
        style={styles.input}
      >
        <option value={0.1}>0.1 ms</option>
        <option value={0.5}>0.5 ms</option>
        <option value={1}>1 ms</option>
        <option value={2}>2 ms</option>
        <option value={3}>3 ms</option>
        <option value={5}>5 ms</option>
      </select>

      <label style={styles.label}>Gemini API Key</label>
      <div style={styles.apiRow}>
        <input 
          type={showPass ? "text" : "password"} 
          placeholder="API Key..." 
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          style={{ ...styles.input, marginBottom: 0, flex: 1 }} 
        />
        <button onClick={() => setShowPass(!showPass)} style={styles.btnEye}>
          <i className={showPass ? "ti ti-eye-off" : "ti ti-eye"}></i>
        </button>
      </div>

      <button 
        onClick={onRunSystem} 
        disabled={loading} 
        style={{ ...styles.btnPrincipal, opacity: loading ? 0.7 : 1 }}
      >
        <i className={loading ? "ti ti-loader spin" : "ti ti-player-play"}></i>
        {loading ? " Consultando IA..." : " Consultar agente"}
      </button>
    </div>
  );
}

const styles = {
  card: {
    background: 'var(--color-card-bg)',
    border: '1px solid var(--color-border-soft)',
    borderRadius: 'var(--border-radius-cute)',
    padding: '1.5rem',
    boxShadow: '0 8px 20px rgba(110, 82, 177, 0.03)',
    flex: 1,
  },
  cardTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--color-text-sub)',
    textTransform: 'uppercase',
    letterSpacing: '.8px',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--color-text-main)',
    marginBottom: '6px',
  },
  input: {
    width: '80%',
    padding: '10px 12px',
    border: '1px solid var(--color-border-soft)',
    borderRadius: '10px',
    fontSize: '13px',
    color: 'var(--color-text-main)',
    marginBottom: '12px',
    outline: 'none',
    background: '#FAF8FC',
  },
  row: {
    display: 'flex',
    gap: '8px',
    marginBottom: '14px',
  },
  btnSecundario: {
    flex: 1,
    background: '#FFFFFF',
    border: '1px solid var(--color-primary-pastel)',
    color: 'var(--color-primary-dark)',
    padding: '10px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
  },
  sectionLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: 'var(--color-text-sub)',
    textTransform: 'uppercase',
    letterSpacing: '.5px',
    marginBottom: '10px',
    marginTop: '6px',
  },
  priorityGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    marginBottom: '14px',
  },
  priorityBtn: {
    border: '1px solid var(--color-border-soft)',
    borderRadius: '12px',
    padding: '12px',
    textAlign: 'center',
    cursor: 'pointer',
    background: '#FFF',
    transition: 'all 0.2s ease',
    fontSize: '12px',
    color: 'var(--color-text-sub)',
  },
  priorityBtnActive: {
    border: '2px solid var(--color-primary-dark)',
    background: 'var(--color-accent-pink)',
    color: 'var(--color-primary-dark)',
    fontWeight: '600',
  },
  iconInactive: {
    fontSize: '20px',
    display: 'block',
    marginBottom: '4px',
    color: 'var(--color-text-sub)',
  },
  iconActive: {
    fontSize: '20px',
    display: 'block',
    marginBottom: '4px',
    color: 'var(--color-accent-pink-dark)',
  },
  apiRow: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    marginBottom: '16px',
  },
  btnEye: {
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1px solid var(--color-border-soft)',
    background: '#FFF',
    cursor: 'pointer',
    color: 'var(--color-text-sub)',
  },
  btnPrincipal: {
    width: '100%',
    background: 'var(--color-primary-dark)',
    color: '#FFF',
    border: 'none',
    padding: '14px',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: '13px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(110, 82, 177, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
  },
};