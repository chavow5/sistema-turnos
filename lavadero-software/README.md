# 🚗💦 Sistema de Turnos - Lavadero

Este proyecto es un **software de turnos para un lavadero**, hecho con:

- **Backend** → Node.js + Express + MySQL  
- **Frontend** → React + Bootstrap  

---

## 📌 Requisitos
- Node.js instalado  
- MySQL o XAMPP con phpMyAdmin  
- npm (ya viene con Node.js)  

---

## ⚙️ Configuración Backend

1. Crear base de datos en MySQL:
```sql
CREATE DATABASE lavadero;
USE lavadero;

CREATE TABLE turnos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  patente VARCHAR(20) NOT NULL,
  UNIQUE(fecha, hora)
);
```

2. Instalar dependencias:
```bash
cd backend
npm install
```

3. Configurar `.env` (ya viene un ejemplo):
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=lavadero
PORT=4000
```

4. Iniciar servidor:
```bash
node server.js
```
Servidor en 👉 [http://localhost:4000](http://localhost:4000)

---

## 🎨 Configuración Frontend

1. Instalar dependencias:
```bash
cd frontend
npm install
```

2. Iniciar React:
```bash
npm run dev
```
Frontend en 👉 [http://localhost:5173](http://localhost:5173)

---

## 📂 Estructura del proyecto
```
lavadero-software/
│
├── backend/     (API Express + MySQL)
│   ├── server.js
│   ├── .env
│
└── frontend/    (React + Bootstrap)
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── services/api.js
    │   └── components/
    │       ├── TurnosTable.jsx
    │       └── TurnoForm.jsx
```

---

## ✅ Funciones
- Agregar turnos (nombre, fecha, hora, patente)  
- Editar turnos existentes  
- Eliminar turnos  
- Validación de horarios (no se pueden repetir)  

---

Hecho para que puedas personalizarlo y usarlo en tu lavadero 🚀
