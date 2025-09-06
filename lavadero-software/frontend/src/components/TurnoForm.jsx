import React, { useState, useEffect } from "react";

const TurnoForm = ({ onSubmit, turno }) => {
  // obtener fecha de hoy en formato YYYY-MM-DD
  const hoy = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState({
    dni: "",
    nombre: "",
    apellido: "",
    fecha: hoy,
  });

  // estado para la alerta estilo Bootstrap
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (turno) {
      setForm(turno);
    } else {
      setForm({ dni: "", nombre: "", apellido: "", fecha: hoy });
    }
  }, [turno]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = turno ? "actualizado" : "agregado";
    const submitted = { ...form }; // capturar antes de limpiar
    // mostrar alerta Bootstrap
    setAlert({
      variant: turno ? "info" : "success",
      title: `Turno ${action}`,
      message: `${submitted.nombre} ${submitted.apellido} — DNI: ${submitted.dni} • Fecha: ${submitted.fecha}`,
    });
    onSubmit(form);
    setForm({ dni: "", nombre: "", apellido: "", fecha: hoy });
    // autodescartar después de 3s
    setTimeout(() => setAlert(null), 10000);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      {alert && (
        <div
          className={`alert alert-${alert.variant} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{alert.title}</strong>
          <div>{alert.message}</div>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setAlert(null)}
          />
        </div>
      )}
      <input
        type="text"
        className="form-control mb-2"
        placeholder="DNI"
        name="dni"
        value={form.dni}
        onChange={(e) => {
          // solo números y máximo 10 dígitos
          const valor = e.target.value.replace(/\D/g, "").slice(0, 10);
          setForm({ ...form, dni: valor });
        }}
        required
      />

      <input
        className="form-control mb-2"
        placeholder="Nombre"
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        required
      />
      <input
        className="form-control mb-2"
        placeholder="Apellido"
        name="apellido"
        value={form.apellido}
        onChange={handleChange}
        required
      />
      <h6>Turnos por dias, no se puede modificar la fecha :C</h6>
      <input
        type="date"
        className="form-control mb-2"
        name="fecha"
        value={form.fecha}
        disabled // desactivar por si quiero que sea fijo
      />
      <button className="btn btn-primary w-100" type="submit">
        {turno ? "Actualizar turno" : "Agregar turno"}
      </button>
    </form>
  );
};

export default TurnoForm;
