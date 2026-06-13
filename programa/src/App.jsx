import React from 'react';
import InterfazUsuario from './pages/InterfazUsuario'; // Importamos tu vista principal lila

function App() {
  return (
    <>
      {/* Cargamos los iconos de Tabler Icons que usa tu diseño (las etiquetas className="ti ti-...") */}
      <link 
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" 
      />
      
      {/* Renderizamos tu página principal */}
      <InterfazUsuario />
    </>
  );
}

export default App;