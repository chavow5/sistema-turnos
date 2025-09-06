import React, { useState, useEffect } from "react";

const TurnoForm = ({ onSubmit, turno }) => {
  const [form, setForm] = useState({ nombre: "", fecha: "", hora: "", patente: "" });

  useEffect(() => {
    if (turno) setForm(turno);
  }, [turno]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ nombre: "", fecha: "", hora: "", patente: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <input className="form-control mb-2" placeholder="Nombre cliente" name="nombre" value={form.nombre} onChange={handleChange} required />
      <input type="date" className="form-control mb-2" name="fecha" value={form.fecha} onChange={handleChange} required />
      <input type="time" className="form-control mb-2" name="hora" value={form.hora} onChange={handleChange} required />
      <input className="form-control mb-2" placeholder="Patente" name="patente" value={form.patente} onChange={handleChange} required />
      <button className="btn btn-primary w-100" type="submit">
        {turno ? "Actualizar turno" : "Agregar turno"}
      </button>
    </form>
  );
};

export default TurnoForm;
