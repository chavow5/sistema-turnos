import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// ✅ Listar turnos
app.get("/turnos", (req, res) => {
  db.query("SELECT * FROM turnos ORDER BY fecha, hora", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ✅ Crear turno
app.post("/turnos", (req, res) => {
  const { nombre, fecha, hora, patente } = req.body;
  db.query(
    "INSERT INTO turnos (nombre, fecha, hora, patente) VALUES (?, ?, ?, ?)",
    [nombre, fecha, hora, patente],
    (err, result) => {
      if (err) return res.status(400).json({ error: "Ese horario ya está ocupado" });
      res.json({ message: "Turno creado" });
    }
  );
});

// ✅ Editar turno
app.put("/turnos/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, fecha, hora, patente } = req.body;
  db.query(
    "UPDATE turnos SET nombre=?, fecha=?, hora=?, patente=? WHERE id=?",
    [nombre, fecha, hora, patente, id],
    (err, result) => {
      if (err) return res.status(400).json(err);
      res.json({ message: "Turno actualizado" });
    }
  );
});

// ✅ Eliminar turno
app.delete("/turnos/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM turnos WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Turno eliminado" });
  });
});

app.listen(process.env.PORT, () =>
  console.log(`✅ Servidor en http://localhost:${process.env.PORT}`)
);
