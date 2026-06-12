# MiRenta Web

Aplicacion web de MiRenta para administrar propiedades, rentas e inquilinos.

El proyecto esta construido con Next.js 16, React 19, TypeScript y Tailwind CSS 4. Consume la API de .NET desde `NEXT_PUBLIC_API_URL`.

## Requisitos

- Node.js 20.9 o superior
- npm
- MiRenta API ejecutandose localmente o en un ambiente accesible

## Configuracion local

Crea un archivo `.env.local` en la raiz del proyecto:

```env
NEXT_PUBLIC_API_URL=https://localhost:7095/api
```

Para desarrollo local, la API .NET normalmente se ejecuta en:

```text
https://localhost:7095/api
```

Si la API usa otro puerto o dominio, ajusta `NEXT_PUBLIC_API_URL`.

## Instalacion

Desde la raiz del repositorio:

```powershell
npm install
```

## Ejecutar en desarrollo

```powershell
npm run dev
```

La aplicacion queda disponible en:

```text
http://localhost:3000
```

## Scripts disponibles

```powershell
npm run dev
npm run build
npm run start
npm run lint
```

- `dev`: inicia Next.js en modo desarrollo.
- `build`: genera el build de produccion.
- `start`: ejecuta el build de produccion.
- `lint`: valida el codigo con ESLint.

## Rutas principales

- `/login`: inicio de sesion.
- `/dashboard`: panel principal protegido.
- `/properties`: listado y creacion de propiedades.

Las rutas privadas usan el token almacenado en cookie y redirigen a `/login` cuando no hay sesion activa.

## Integracion con API

La app consume estos endpoints principales:

- `POST /api/auth/login`
- `GET /api/properties`
- `POST /api/properties`

Los endpoints privados requieren token Bearer.

## Verificacion

Antes de subir cambios, ejecuta:

```powershell
npm run lint
npm run build
```

## Notas de seguridad

- No subas `.env.local` ni archivos `.env*` con valores reales.
- `NEXT_PUBLIC_*` queda expuesto al navegador; no guardes secretos en variables publicas.
- El token actual se guarda en cookie para que Next pueda proteger rutas desde `src/proxy.ts`.
