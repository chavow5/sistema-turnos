import React, { useEffect, useState } from "react";
import API from "./services/api";
// import TurnosTable from "./components/TurnosTable";
// import TurnoForm from "./components/TurnoForm";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TurnosPage from "./pages/TurnosPage";
import RegistroPage from "./pages/RegistroPage";

function App() {
  const [turnos, setTurnos] = useState([]);
  const [editTurno, setEditTurno] = useState(null);

   const getTurnos = async () => {
    try {
      const res = await API.get(`/turnos/${fechaSeleccionada}`);
      setTurnos(res.data);
    } catch (err) {
      console.error("Error al traer turnos", err);
    }
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
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Software de Turnos</Link>
          <div className="navbar-nav">
            <Link className="nav-link d-inline-block" to="/">Turnos</Link>
            <Link className="nav-link d-inline-block" to="/registro">Registros completos</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<TurnosPage />} />
        <Route path="/registro" element={<RegistroPage />} />
      </Routes>
    </Router>
    


  );
}

export default App;
