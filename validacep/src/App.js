import React from "react";
import CepForm from "./components/CepForm";
import "./App.css"; // Opcional para estilização

const App = () => {
  return (
    <div className="app-container">
      <h1>🔍 Consulta de CEP</h1>
      <CepForm />
    </div>
  );
};

export default App;
