import React from 'react';

export default function ItemsTable({ items = [], isManual = false, onItemChange }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardTitle}>
        <i className="ti ti-list-details"></i> Objetos del problema
      </div>
      <div style={styles.tableWrapper}>
        {items.length === 0 ? (
          <div style={styles.emptyState}>No hay objetos generados. Usa el panel de configuración.</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Objeto</th>
                <th style={styles.th}>Peso (w)</th>
                <th style={styles.th}>Valor (v) <span style={styles.rangeHint}>4–25</span></th>
                <th style={styles.th}>v/w</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={styles.tr}>
                  <td style={styles.td}>
                    <div style={styles.itemNum}>{item.id}</div>
                  </td>
                  <td style={{ ...styles.td, fontWeight: '500' }}>{item.name}</td>

                  {/* Peso */}
                  <td style={styles.td}>
                    {isManual ? (
                      <input
                        type="number"
                        min={1}
                        value={item.weight}
                        onChange={(e) => onItemChange(item.id, 'weight', parseInt(e.target.value) || 1)}
                        style={styles.cellInput}
                      />
                    ) : (
                      item.weight
                    )}
                  </td>

                  {/* Valor — rango estricto 4-25 */}
                  <td style={styles.td}>
                    {isManual ? (
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={item.value}
                        onChange={(e) => onItemChange(item.id, 'value', parseInt(e.target.value) || 1)}
                        style={{
                          ...styles.cellInput,
                          // borde rojo si el valor está fuera del rango
                          borderColor: (item.value < 1 || item.value > 100)
                            ? '#E53935'
                            : 'var(--color-border-soft)',
                        }}
                      />
                    ) : (
                      item.value
                    )}
                  </td>

                  <td style={{ ...styles.td, color: 'var(--color-primary-dark)', fontWeight: '600' }}>
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
  rangeHint: {
    fontSize: '10px',
    fontWeight: '500',
    color: 'var(--color-primary-dark)',
    background: 'var(--color-primary-pastel)',
    borderRadius: '6px',
    padding: '1px 5px',
    marginLeft: '4px',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  emptyState: {
    textAlign: 'center',
    padding: '2rem 1rem',
    color: 'var(--color-text-sub)',
    fontSize: '13px',
    fontStyle: 'italic',
  },
  table: {
    width: '100%',
    fontSize: '13px',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    fontWeight: '600',
    color: 'var(--color-text-sub)',
    padding: '8px 10px',
    borderBottom: '1px solid var(--color-border-soft)',
    fontSize: '12px',
  },
  tr: {
    transition: 'background 0.2s ease',
  },
  td: {
    padding: '10px 10px',
    borderBottom: '1px solid var(--color-border-soft)',
    color: 'var(--color-text-main)',
    verticalAlign: 'middle',
  },
  itemNum: {
    width: '26px',
    height: '26px',
    borderRadius: '50%',
    background: '#FAF8FC',
    border: '1px solid var(--color-border-soft)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: '600',
    color: 'var(--color-text-sub)',
  },
  cellInput: {
    width: '70px',
    padding: '5px 8px',
    border: '1px solid var(--color-border-soft)',
    borderRadius: '8px',
    fontSize: '12px',
    color: 'var(--color-text-main)',
    background: '#FAF8FC',
    outline: 'none',
  },
};