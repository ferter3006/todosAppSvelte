# Front-App

Front-App es una aplicación web construida con SvelteKit, TanStack Query y PocketBase como backend. Su objetivo principal es la gestión de proyectos y tareas (todos) de manera colaborativa y eficiente.

## Características principales
- **Gestión de proyectos**: Crea, edita y elimina proyectos personales o colaborativos.
- **Gestión de tareas (todos)**: Añade, edita, elimina y organiza tareas dentro de cada proyecto.
- **Colaboración**: Invita a otros usuarios a tus proyectos y gestiona colaboradores.
- **Autenticación**: Inicio de sesión seguro y gestión de usuarios.
- **Interfaz moderna y responsiva**: Navegación adaptada a dispositivos móviles y escritorio, con componentes accesibles y visualmente atractivos.
- **Actualización en tiempo real**: Los datos se mantienen actualizados automáticamente gracias a TanStack Query y eventos de PocketBase.
- **Filtros inteligentes**: Solo se muestran proyectos y tareas activos (no eliminados) en la interfaz.

## Tecnologías utilizadas
- **SvelteKit**: Framework principal para la construcción de la interfaz de usuario.
- **TanStack Query**: Manejo eficiente de datos y caché en el frontend.
- **PocketBase**: Backend ligero para autenticación, almacenamiento y lógica de negocio.
- **bits-ui**: Librería de componentes UI accesibles y personalizables.
- **Tailwind CSS**: Utilidad para estilos rápidos y responsivos.
- **TypeScript**: Tipado estático para mayor robustez y mantenibilidad.

## Estructura del proyecto
- `/src/routes`: Rutas principales de la aplicación (autenticación, proyectos, tareas, etc).
- `/src/lib`: Componentes reutilizables, stores y utilidades.
- `/static`: Archivos estáticos.

## Instalación y uso
1. Instala las dependencias:
	```bash
	npm install
	```
2. Inicia la aplicación en modo desarrollo:
	```bash
	npm run dev
	```
3. Accede a la app en `http://localhost:5173` (o el puerto configurado).

## Notas
- Asegúrate de tener una instancia de PocketBase corriendo y configurada correctamente.
- El proyecto está en desarrollo activo y puede recibir nuevas funcionalidades y mejoras.

---

Desarrollado por ferter, 2026.
# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
