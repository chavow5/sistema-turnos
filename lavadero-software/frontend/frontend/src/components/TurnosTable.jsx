import React from "react";

const TurnosTable = ({ turnos, onEdit, onDelete }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Patente</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {turnos.map((t) => (
          <tr key={t.id}>
            <td>{t.nombre}</td>
            <td>{t.fecha}</td>
            <td>{t.hora}</td>
            <td>{t.patente}</td>
            <td>
              <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(t)}>Editar</button>
              <button className="btn btn-danger btn-sm" onClick={() => onDelete(t.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TurnosTable;
