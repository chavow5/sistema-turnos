import React from "react";

const TurnosTable = ({ turnos, onDelete }) => {
  return (
    <table className="table table-striped mt-4">
      <thead>
        <tr>
          <th>#</th>
          <th>DNI</th>
          <th>Cliente</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {turnos.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center">No hay turnos</td>
          </tr>
        ) : (
          turnos.map((t, i) => (
            <tr key={t.id}>
              <td>{i + 1}</td>
              <td>{t.dni}</td>
              <td>{t.nombre} {t.apellido}</td>
              <td>{t.fecha}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(t.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default TurnosTable;
