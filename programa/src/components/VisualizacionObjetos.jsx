import React from 'react';

export default function VisualizacionObjetos() {
  // Datos de ejemplo para representar el estado visual de la mochila
  const items = [

  ];

  return (
    <div style={styles.container}>
      <div style={styles.cardTitle}>
        <i className="ti ti-backpack"></i> Objetos seleccionados
      </div>
      <div style={styles.itemsVisual}>
        {items.map((item, index) => {
          const isSelected = item.selected;
          return (
            <div 
              key={index} 
              style={{ 
                ...styles.itemBox, 
                ...(isSelected ? styles.itemBoxSelected : {}) 
              }}
            >
              <div style={{ ...styles.iname, ...(isSelected ? styles.inameSelected : {}) }}>
                {item.name}
              </div>
              <div style={styles.idata}>
                w:{item.weight} v:{item.value}
              </div>
            </div>
          );
        })}
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
  itemsVisual: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '8px',
  },
  itemBox: {
    border: '1px solid var(--color-border-soft)',
    borderRadius: '12px',
    padding: '8px 14px',
    fontSize: '12px',
    textAlign: 'center',
    minWidth: '75px',
    background: '#FFFFFF',
    transition: 'all 0.2s ease',
  },
  itemBoxSelected: {
    background: 'var(--color-accent-pink)',
    border: '2px solid var(--color-primary-dark)',
  },
  iname: {
    fontWeight: '600',
    color: 'var(--color-text-main)',
    marginBottom: '2px',
  },
  inameSelected: {
    color: 'var(--color-accent-pink-dark)',
  },
  idata: {
    color: 'var(--color-text-sub)',
    fontSize: '11px',
  },
};