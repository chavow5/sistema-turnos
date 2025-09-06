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
  const { dni, nombre, apellido, fecha } = req.body;
  db.query(
    "INSERT INTO turnos (dni, nombre, apellido, fecha) VALUES (?, ?, ?, ?)",
    [dni, nombre, apellido, fecha],
    (err, result) => {
      if (err) return res.status(400).json(err);
      res.json({ message: "Turno registrado con éxito" });
    }
  );
});

// Turnos por Dia
app.get("/turnos/:fecha", (req, res) => {
  const { fecha } = req.params;
  db.query(
    "SELECT * FROM turnos WHERE fecha=? ORDER BY creado ASC",
    [fecha],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

// ✅ Editar turno
app.put("/turnos/:id", (req, res) => {
  const { id } = req.params;
  const {dni, nombre, apellido, fecha } = req.body;
  db.query(
    "UPDATE turnos SET dni=?, nombre=?, apellido=?, fecha=? WHERE id=?",
    [dni, nombre, apellido, fecha, id],
    (err, result) => {
      if (err) return res.status(400).json(err);  
      res.json({ message: "Turno actualizado" });
    }
  );
});

// Resgitro Completo
app.get("/registro", (req, res) => {
  db.query(
    "SELECT * FROM turnos ORDER BY creado DESC",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
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
