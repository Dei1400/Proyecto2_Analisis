import React from 'react';
import {ResponsiveContainer,BarChart,Bar,XAxis,YAxis,Tooltip,CartesianGrid,Legend,RadarChart,PolarGrid,PolarAngleAxis,PolarRadiusAxis,Radar,
} from 'recharts';

export default function GraficaMetricas({ metrics }) {
  const tiempoIA = parseFloat(metrics.tiempoIA) || 0;
  const tiempoReal = parseFloat(metrics.tiempoReal) || 0;

  const dataTiempos = [
    { nombre: 'IA', tiempo: tiempoIA },
    { nombre: 'Real', tiempo: tiempoReal },
  ];

  const dataOperaciones = [
    { nombre: 'IA', operaciones: metrics.operacionesEstimadas || 0 },
    { nombre: 'Real', operaciones: metrics.operaciones || 0 },
  ];

  const algoritmo = metrics.algoritmo || '';

  const radarData = obtenerRadarData(algoritmo);

  return (
    <div style={styles.container}>
      <div style={styles.chartBox}>
        <h4 style={styles.title}>Tiempo IA vs Tiempo real</h4>

        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={dataTiempos}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="tiempo"
              name="Tiempo (ms)"
              fill="#BBADFF"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={styles.chartBox}>
        <h4 style={styles.title}>Operaciones IA vs Operaciones reales</h4>

        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={dataOperaciones}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="operaciones"
              name="Operaciones"
              fill="#F8BBD0"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={styles.chartBox}>
        <h4 style={styles.title}>Perfil del algoritmo seleccionado</h4>

        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metrica" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar
              name="Perfil del algoritmo"
              dataKey="valor"
              stroke="#5B3F96"
              fill="#5B3F96"
              fillOpacity={0.35}
            />
            <Tooltip />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function obtenerRadarData(algoritmo) {
  if (algoritmo.includes('greedy') || algoritmo.includes('Greedy')) {
    return [
      { metrica: 'Velocidad', valor: 95 },
      { metrica: 'Exactitud', valor: 70 },
      { metrica: 'Escalabilidad', valor: 95 },
      { metrica: 'Memoria', valor: 90 },
      { metrica: 'Costo', valor: 20 },
    ];
  }

  if (algoritmo.includes('backtracking') || algoritmo.includes('Backtracking')) {
    return [
      { metrica: 'Velocidad', valor: 20 },
      { metrica: 'Exactitud', valor: 100 },
      { metrica: 'Escalabilidad', valor: 15 },
      { metrica: 'Memoria', valor: 45 },
      { metrica: 'Costo', valor: 95 },
    ];
  }

  return [
    { metrica: 'Velocidad', valor: 70 },
    { metrica: 'Exactitud', valor: 100 },
    { metrica: 'Escalabilidad', valor: 75 },
    { metrica: 'Memoria', valor: 60 },
    { metrica: 'Costo', valor: 55 },
  ];
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem',
  },
  chartBox: {
    background: '#FFFFFF',
    border: '1px solid var(--color-border-soft)',
    borderRadius: '16px',
    padding: '1rem',
  },
  title: {
    marginTop: 0,
    marginBottom: '12px',
    color: 'var(--color-primary-dark)',
    fontSize: '14px',
  },
};