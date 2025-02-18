import React, { useState } from "react";
import "./CepForm.css"; // Opcional para estilização

const CepForm = () => {
  const [cep, setCep] = useState("");
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const buscarCep = async () => {
    const cepNumerico = cep.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (!/^[0-9]{8}$/.test(cepNumerico)) {
      setErro("Formato de CEP inválido.");
      setDados(null);
      return;
    }

    setErro("");
    setLoading(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepNumerico}/json/`);
      const data = await response.json();

      if (data.erro) {
        setErro("CEP não encontrado.");
        setDados(null);
      } else {
        setDados(data);
      }
    } catch (error) {
      setErro("Erro ao buscar CEP.");
      setDados(null);
    }

    setLoading(false);
  };

  return (
    <div className="cep-container">
      <h2>Consulta de CEP</h2>
      <input
        type="text"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        placeholder="Digite o CEP"
        maxLength="9"
        className="cep-input"
      />
      <button onClick={buscarCep} className="cep-button">
        Buscar CEP
      </button>

      {loading && <p className="loading">🔄 Carregando...</p>}
      {erro && <p className="error">{erro}</p>}

      {dados && (
        <div className="cep-result">
          <p><strong>Rua:</strong> {dados.logradouro}</p>
          <p><strong>Bairro:</strong> {dados.bairro}</p>
          <p><strong>Cidade:</strong> {dados.localidade}</p>
          <p><strong>Estado:</strong> {dados.uf}</p>
          <p><strong>IBGE:</strong> {dados.ibge}</p>
        </div>
      )}
    </div>
  );
};

export default CepForm;
