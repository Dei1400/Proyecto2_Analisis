import React from 'react';
import {ResponsiveContainer, BarChart,Bar,XAxis,YAxis,Tooltip,CartesianGrid,Legend} from 'recharts';

export default function GraficaMetricas({ metrics }) {

  const data = [
    {
      nombre: 'Tiempo',
      IA: parseFloat(metrics.tiempoIA) || 0,
      Real: parseFloat(metrics.tiempoReal) || 0,
    },
    {
      nombre: 'Operaciones',
      IA: metrics.operacionesEstimadas || 0,
      Real: metrics.operaciones || 0,
    },
  ];

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--color-border-soft)',
        borderRadius: '16px',
        padding: '1rem',
        height: '320px',
      }}
    >
      <h4
        style={{
          marginTop: 0,
          color: 'var(--color-primary-dark)',
        }}
      >
        IA vs Ejecución Real
      </h4>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="nombre" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="IA"
            name="Predicción IA"
            fill="#BBADFF"
          />

          <Bar
            dataKey="Real"
            name="Resultado Real"
            fill="#F8BBD0"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}