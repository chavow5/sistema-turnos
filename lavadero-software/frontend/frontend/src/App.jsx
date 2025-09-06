import React, { useEffect, useState } from "react";
import API from "./services/api";
import TurnosTable from "./components/TurnosTable";
import TurnoForm from "./components/TurnoForm";

function App() {
  const [turnos, setTurnos] = useState([]);
  const [editTurno, setEditTurno] = useState(null);

  const getTurnos = async () => {
    const res = await API.get("/turnos");
    setTurnos(res.data);
  };

  const addOrEditTurno = async (turno) => {
    if (turno.id) {
      await API.put(`/turnos/${turno.id}`, turno);
    } else {
      await API.post("/turnos", turno).catch(() => alert("Ese horario ya está ocupado"));
    }
    setEditTurno(null);
    getTurnos();
  };

  const deleteTurno = async (id) => {
    await API.delete(`/turnos/${id}`);
    getTurnos();
  };

  useEffect(() => {
    getTurnos();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">📅 Sistema de Turnos - Lavadero</h1>
      <TurnoForm onSubmit={addOrEditTurno} turno={editTurno} />
      <TurnosTable turnos={turnos} onEdit={setEditTurno} onDelete={deleteTurno} />
    </div>
  );
}

export default App;
