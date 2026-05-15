<div align="center">

<img width="220" src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png" />

# 🏢 Rental System Management

### Plataforma moderna para gestión de rentas y comunicación inmobiliaria 🚀

<p align="center">
  <b>Rental System Management</b> es una plataforma Full Stack desarrollada con Next.js para optimizar la administración de propiedades, inquilinos, pagos y comunicación entre propietarios y arrendatarios.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-FullStack-black?style=for-the-badge&logo=next.js&logoColor=white">
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
  <img src="https://img.shields.io/badge/TailwindCSS-ModernUI-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/OpenSource-Platform-success?style=for-the-badge">
</p>

<p align="center">
  <a href="#-acerca-del-proyecto">Acerca</a> •
  <a href="#-características">Características</a> •
  <a href="#-tecnologías-utilizadas">Tecnologías</a> •
  <a href="#-instalación">Instalación</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

</div>

---

# 🌌 Acerca del proyecto

**Rental System Management** es una plataforma web enfocada en la administración moderna de propiedades y la comunicación entre propietarios e inquilinos.

El sistema fue diseñado para centralizar:

- 🏢 Gestión de propiedades
- 👥 Administración de inquilinos
- 💬 Comunicación landlord-tenant
- 💰 Seguimiento de pagos
- 📄 Control de registros
- 🔐 Administración segura
- 📊 Dashboards operativos
- 🏠 Gestión de vacantes

La plataforma implementa una arquitectura Full Stack moderna utilizando:

- ⚡ Next.js App Router
- 🧠 API Routes
- 🗄️ MongoDB + Mongoose
- 🎨 Tailwind CSS
- 🔐 Autenticación segura

---

# ✨ Características

## 💬 Comunicación landlord–tenant

- 🔒 Mensajería segura
- 📩 Comunicación centralizada
- 📢 Anuncios y avisos
- 🧾 Historial de conversaciones
- 📬 Notificaciones administrativas

---

## 🏠 Gestión inmobiliaria

- 🏢 Administración de propiedades
- 🚪 Gestión de habitaciones
- 👤 Registro de inquilinos
- 📍 Asociación tenant-property
- 📊 Estado de ocupación

---

## 💰 Gestión de rentas

- 💳 Seguimiento de pagos
- 📅 Control de mensualidades
- ⚠️ Indicadores de adeudos
- 📈 Historial financiero
- 🧾 Registro de rentas

---

## 🔐 Autenticación y seguridad

- 🔑 Login seguro
- 🛡️ Middleware de protección
- 👨‍💼 Roles administrativos
- 👥 Acceso landlord / tenant
- 🔒 Rutas protegidas

---

## 📊 Dashboard administrativo

- 📈 Paneles dinámicos
- 📋 Resumen operativo
- 📊 Estadísticas del sistema
- 🧠 Información centralizada
- 📱 Diseño responsive

---

## 🌐 Plataforma moderna

- ⚡ Next.js App Router
- 🎨 Componentes reutilizables
- 📱 Responsive Design
- 🖥️ Server & Client Components
- 🚀 Arquitectura escalable

---

# 🛠️ Tecnologías utilizadas

## ⚛️ Frontend

<p>
  <img src="https://skillicons.dev/icons?i=nextjs,react,tailwind,ts,js" />
</p>

- Next.js
- React
- TypeScript
- JavaScript
- Tailwind CSS

---

## 🌐 Backend

<p>
  <img src="https://skillicons.dev/icons?i=nodejs" />
</p>

- Next.js API Routes
- Node.js Runtime
- Middleware
- Server Actions

---

## 🗄️ Base de datos

<p>
  <img src="https://skillicons.dev/icons?i=mongodb" />
</p>

- MongoDB
- Mongoose ODM
- Prisma ORM
- Modelos reutilizables

---

## ⚙️ Herramientas

<p>
  <img src="https://skillicons.dev/icons?i=git,github,vscode" />
</p>

- Git
- GitHub
- ESLint
- Variables de entorno

---

# 📂 Estructura del proyecto

```bash
GestionRentas/
│
├── app/
│
├── components/
│
├── lib/
│   └── db.ts
│
├── models/
│
├── api/
│
├── middleware/
│
├── public/
│
├── prisma/
│
├── .env
├── package.json
│
└── README.md
```

---

# ⚡ Instalación

## 📋 Requisitos

- Node.js
- npm
- MongoDB
- Git

---

# 🚀 Configuración del proyecto

## 1️⃣ Clonar repositorio

```bash
git clone https://github.com/isairey/GestionRentas
```

---

## 2️⃣ Entrar al proyecto

```bash
cd GestionRentas
```

---

## 3️⃣ Instalar dependencias

```bash
npm install
```

---

## 4️⃣ Configurar variables de entorno

Crear archivo:

```bash
.env
```

Agregar:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
JWT_SECRET=your_secret_key
ADMIN_ID=your_admin_id
ADMIN_PASSWORD=your_password
```

---

## 5️⃣ Ejecutar servidor

```bash
npm run dev
```

Aplicación disponible en:

```bash
http://localhost:3000
```

---

# 🔐 Acceso administrativo

## 👨‍💼 Credenciales admin

```txt
ADMIN ID: admin
PASSCODE: qwertyuiop
```

---

# 🧠 Flujo del sistema

## 🔑 Administración de tenants

### 1️⃣ Iniciar sesión como administrador

- Acceso al dashboard principal
- Gestión completa del sistema

---

### 2️⃣ Crear tenant

- Asignar habitación
- Crear credenciales
- Registrar información

---

### 3️⃣ Acceso tenant

- Inicio de sesión individual
- Dashboard personalizado
- Comunicación con landlord

---

> ⚠️ Los tenants no pueden registrarse manualmente. Todas las cuentas son creadas por el administrador.

---

# 🗄️ Gestión de base de datos

## 🔗 MongoDB + Mongoose

La plataforma utiliza una conexión reutilizable para evitar múltiples conexiones activas durante el desarrollo.

Características:

- ⚡ Conexión cacheada
- 🔒 Variables de entorno
- 🧠 Arquitectura optimizada
- 📦 Gestión centralizada

---

# 🧩 Modelos del sistema

## 📄 Schemas reutilizables

El sistema incluye modelos para:

- 👤 Usuarios
- 🏢 Propiedades
- 💬 Mensajes
- 💰 Rentas
- 🔐 Roles
- 📊 Actividades

---

# 📡 API Endpoints

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/users` | Obtener usuarios |
| POST | `/api/users` | Crear usuario |
| PUT | `/api/users/:id` | Actualizar usuario |
| DELETE | `/api/users/:id` | Eliminar usuario |

---

# 📸 Vista previa

<div align="center">

<img width="1000" src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop" />

</div>

---

# 🧠 Principios del proyecto

## 🎯 Arquitectura moderna

- Separación de responsabilidades
- Componentes reutilizables
- Arquitectura escalable
- Seguridad por defecto
- Código mantenible
- Diseño responsive

---

# 🚧 Roadmap

## 🔮 Próximas mejoras

- 💬 Chat en tiempo real
- 🔔 Notificaciones push
- 📧 Emails automáticos
- 📎 Subida de archivos
- 🛠️ Solicitudes de mantenimiento
- 📊 Logs administrativos
- 💳 Automatización de pagos

---

# 🤝 Contribuciones

Las contribuciones son bienvenidas ❤️

## Cómo contribuir

1. Fork del proyecto

```bash
git checkout -b feature/nueva-funcionalidad
```

2. Commit

```bash
git commit -m "✨ Nueva funcionalidad"
```

3. Push

```bash
git push origin feature/nueva-funcionalidad
```

4. Pull Request 🚀

---

# 👨‍💻 Comunidad

<div align="center">

## Isai Reyes — Full Stack Developer

Plataforma moderna enfocada en administración inmobiliaria, comunicación y gestión de rentas 🏢

</div>

---

# 🌟 Apoya el proyecto

⭐ Dale una estrella  
🍴 Haz fork  
📢 Comparte el proyecto

---

# 📜 Licencia

Proyecto open source bajo licencia MIT para fines educativos, administrativos y de aprendizaje Full Stack.

---

<div align="center">

### 🏢 Rental System Management — administración inteligente de propiedades 🚀

</div>
