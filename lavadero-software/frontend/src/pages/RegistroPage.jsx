import React, { useState, useEffect } from "react";
import API from "../services/api";

const RegistroPage = () => {
  const [registro, setRegistro] = useState([]);

  const getRegistro = async () => {
    const res = await API.get("/registro");
    setRegistro(res.data);
  };

  useEffect(() => {
    getRegistro();
  }, []);

  return (
    <div className="container mt-4">
      <h2>📖 Registro completo de turnos</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>DNI</th>
            <th>Cliente</th>
            <th>Fecha turno</th>
            <th>Registrado el</th>
          </tr>
        </thead>
        <tbody>
          {registro.map((r, i) => (
            <tr key={r.id}>
              <td>{i + 1}</td>
              <td>****{r.dni.slice(-4)}</td>
              <td>{r.nombre} {r.apellido}</td>
              <td>{r.fecha}</td>
              <td>{new Date(r.creado).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistroPage;
