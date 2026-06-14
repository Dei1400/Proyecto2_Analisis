import React from 'react';

export default function ItemsTable({ items = [] }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardTitle}>
        <i className="ti ti-list-details"></i> Set de Datos Cargados
      </div>
      <div style={styles.tableWrapper}>
        {items.length === 0 ? (
          <div style={styles.emptyState}>No hay datos en memoria. Genera un lote aleatorio arriba.</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.thRow}>
                <th style={styles.th}># ID</th>
                <th style={styles.th}>Identificador</th>
                <th style={styles.th}>Peso (w)</th>
                <th style={styles.th}>Valor (v)</th>
                <th style={styles.th}>Densidad (v/w)</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={styles.tr}>
                  <td style={styles.td}>
                    <div style={styles.itemNum}>{item.id}</div>
                  </td>
                  <td style={{ ...styles.td, fontWeight: '600' }}>{item.name}</td>
                  <td style={styles.td}>{item.weight} kg</td>
                  <td style={styles.td}>${item.value}</td>
                  <td style={{ ...styles.td, color: 'var(--color-primary-dark)', fontWeight: '700' }}>
                    {(item.value / item.weight).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    padding: '1.5rem',
    boxShadow: '0 10px 25px rgba(110, 82, 177, 0.03)',
  },
  cardTitle: {
    fontSize: '10px',
    fontWeight: '700',
    color: 'var(--color-text-sub)',
    textTransform: 'uppercase',
    letterSpacing: '.8px',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  tableWrapper: {
    maxHeight: '340px',
    overflowY: 'auto',
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem 1rem',
    color: 'var(--color-text-sub)',
    fontSize: '11px',
    fontStyle: 'italic',
    background: 'var(--color-bg-girly)',
    borderRadius: '12px',
  },
  table: {
    width: '100%',
    fontSize: '13px',
    borderCollapse: 'collapse',
  },
  thRow: {
    background: 'var(--color-primary-pastel)',
  },
  th: {
    textAlign: 'left',
    fontWeight: '700',
    color: 'var(--color-primary-dark)',
    padding: '10px 12px',
    fontSize: '12px',
  },
  tr: {
    borderBottom: '1px solid var(--color-border-soft)',
    transition: 'background 0.2s',
    ':hover': { background: '#FAF8FC' }
  },
  td: {
    padding: '10px 12px',
    color: 'var(--color-text-main)',
  },
  itemNum: {
    width: '24px',
    height: '24px',
    borderRadius: '8px',
    background: '#FFFFFF',
    border: '1px solid var(--color-primary-medium)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: '700',
    color: 'var(--color-primary-dark)',
  },
};