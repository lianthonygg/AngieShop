# EnviosYaStore – Frontend

![Status](https://img.shields.io/badge/status-en%20desarrollo-yellow)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green)

Este frontend está desarrollado con **Next.js** y **TypeScript**, y forma parte de un sistema completo cuyo backend está implementado en **.NET** (en otro repositorio).

> 🛠 **Estado:** En desarrollo. Actualmente no está desplegado públicamente, pero incluye un Dockerfile listo para producción.

---

## 🚀 Tecnologías utilizadas

- **Next.js** 15
- **TypeScript**
- **pnpm** como gestor de paquetes
- **TailwindCSS** para estilos
- **Docker** para despliegue

---

## 📌 Funcionalidades destacadas

- **Autenticación con JWT** (almacenado en cookies)
- **Carrito de compras persistente**
- **Vista de tienda con listado de productos**
- **Página de detalle de producto**
- Integración con backend en **.NET** (API REST)
- Arquitectura modular y mantenible

---

## ⚙️ Instalación y ejecución local

1. **Clonar el repositorio:**

```bash
git clone https://github.com/cyberscript-pro/EnviosYa-Frontend.git
cd EnviosYa-Frontend
```

2. **Instalar dependencias:**

```bash
pnpm install
```

3. **Ejecutar en modo desarrollo:**

```bash
pnpm dev
```

4. **Build para producción:**

```bash
pnpm build
pnpm start
```

5. **🐳 Ejecución con Docker**

```bash
docker build -t enviosya-frontend .
docker run -p 3000:3000 enviosya-frontend
```

🔗 Repositorio backend

- <a href="https://github.com/cyberscript-pro/EnviosYa-Backend">EnviosYa – Backend en .NET</a>

**📜 Licencia**

Este proyecto se distribuye bajo la licencia _MIT_.
