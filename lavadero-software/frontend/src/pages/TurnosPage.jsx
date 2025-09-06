import React, { useEffect, useState } from "react";
import API from "../services/api";
import TurnoForm from "../components/TurnoForm";
import TurnosTable from "../components/TurnosTable";

const TurnosPage = () => {
  const [turnos, setTurnos] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    new Date().toISOString().slice(0, 10) // fecha de hoy
  );

  // Obtener turnos por fecha
  const getTurnos = async () => {
    try {
      const res = await API.get(`/turnos/${fechaSeleccionada}`);
      setTurnos(res.data);
    } catch (err) {
      console.error("Error al traer turnos", err);
    }
  };

  // Agregar turno
  const addTurno = async (turno) => {
    try {
      await API.post("/turnos", turno);
      getTurnos();
    } catch (err) {
      alert("Error al registrar turno");
    }
  };

  // Eliminar turno
  const deleteTurno = async (id) => {
    try {
      await API.delete(`/turnos/${id}`);
      getTurnos();
    } catch (err) {
      alert("Error al eliminar turno");
    }
  };

  useEffect(() => {
    getTurnos();
  }, [fechaSeleccionada]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">📅 Sacar Turno</h2>
      
      <TurnoForm onSubmit={addTurno} />

      <div className="mb-3">
        <h2 className="mb-3">📅 Registros por dias</h2>
        <label>Seleccionar fecha:</label>
        <input
          type="date"
          className="form-control"
          value={fechaSeleccionada}
          onChange={(e) => setFechaSeleccionada(e.target.value)}
        />
      </div>
      <TurnosTable turnos={turnos} onDelete={deleteTurno} />
    </div>
  );
};

export default TurnosPage;
