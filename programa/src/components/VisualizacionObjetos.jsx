import React from 'react';

export default function VisualizacionObjetos({ items = [], selectedIds = [] }) {
  const totalValue  = items.filter(i => selectedIds.includes(i.id)).reduce((s, i) => s + i.value, 0);
  const totalWeight = items.filter(i => selectedIds.includes(i.id)).reduce((s, i) => s + i.weight, 0);

  return (
    <div style={styles.card}>
      {/* Encabezado en una sola línea con los totales integrados */}
      <div style={styles.headerInline}>
        <div style={styles.cardTitle}>
          <i className="ti ti-backpack"></i> Distribución de la Mochila
        </div>
        
        {selectedIds.length > 0 && (
          <div style={styles.barTotals}>
            <span style={styles.badgeSummary}>📦 {selectedIds.length} Objetos</span>
            <span style={styles.badgeSummary}>⚖️ Peso: <strong>{totalWeight} kg</strong></span>
            <span style={styles.badgeSummary}>💎 Valor: <strong>${totalValue}</strong></span>
          </div>
        )}
      </div>

      <div style={styles.itemsVisual}>
        {items.length === 0 ? (
          <div style={styles.empty}>Mochila sin procesar. Ejecuta el enrutador analítico.</div>
        ) : (
          items.map((item) => {
            const selected = selectedIds.includes(item.id);
            return (
              <div key={item.id} style={{ ...styles.itemBox, ...(selected ? styles.itemBoxSelected : {}) }}>
                {selected && <div style={styles.check}>✓</div>}
                <div style={{ ...styles.iname, ...(selected ? styles.inameSelected : {}) }}>{item.name}</div>
                <div style={styles.idata}>⚖️{item.weight} 💎{item.value}</div>
              </div>
            );
          })
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
    padding: '0.85rem 1.25rem',
    boxShadow: '0 8px 20px rgba(110, 82, 177, 0.03)',
  },
  headerInline: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.6rem',
    flexWrap: 'wrap',
    gap: '8px',
  },
  cardTitle: {
    fontSize: '10px',
    fontWeight: '700',
    color: 'var(--color-text-sub)',
    textTransform: 'uppercase',
    letterSpacing: '.8px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  barTotals: {
    display: 'flex',
    gap: '8px',
  },
  badgeSummary: {
    fontSize: '11px',
    background: 'var(--color-bg-girly)',
    padding: '3px 10px',
    borderRadius: '20px',
    color: 'var(--color-primary-dark)',
    border: '1px solid var(--color-border-soft)',
  },
  itemsVisual: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
  empty: {
    width: '100%',
    textAlign: 'center',
    fontSize: '12px',
    color: 'var(--color-text-sub)',
    fontStyle: 'italic',
    padding: '4px 0',
  },
  itemBox: {
    position: 'relative',
    border: '1px solid var(--color-border-soft)',
    borderRadius: '10px',
    padding: '4px 8px',
    fontSize: '11px',
    textAlign: 'center',
    flex: '1 1 calc(12.5% - 6px)', // Distribución horizontal de hasta 8 elementos por fila
    minWidth: '85px',
    background: '#FFFFFF',
    transition: 'all 0.2s ease',
    opacity: 0.4,
  },
  itemBoxSelected: {
    background: 'linear-gradient(135deg, #FFF0F5 0%, var(--color-accent-pink) 100%)',
    border: '2px solid var(--color-accent-pink-dark)',
    boxShadow: '0 4px 10px rgba(194, 24, 91, 0.08)',
    opacity: 1,
    transform: 'scale(1.02)',
  },
  check: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    width: '14px',
    height: '14px',
    background: 'var(--color-accent-pink-dark)',
    color: '#fff',
    borderRadius: '50%',
    fontSize: '9px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
  },
  iname: {
    fontWeight: '700',
    color: 'var(--color-text-main)',
    fontSize: '11px',
  },
  inameSelected: { color: 'var(--color-accent-pink-dark)' },
  idata: { color: 'var(--color-text-sub)', fontSize: '10px', marginTop: '1px' },
};