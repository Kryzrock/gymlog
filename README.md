# 🏋️ GymLog

Aplicación de seguimiento de entrenamientos en gimnasio. Mobile-first, dark theme.

## Stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (estilos)
- **shadcn/ui** (componentes base)
- **Recharts** (gráficos)
- **React Router v6** (navegación)

## Funcionalidades

- **Dashboard** — Stats rápidas, acciones directas, entrenamientos recientes
- **Rutinas** — Crear, editar, duplicar, eliminar. Asociar ejercicios reales
- **Ejercicios** — Biblioteca con 12+ ejercicios, filtros por músculo/equipo/dificultad, crear personalizados
- **Entrenamiento Activo** — Timer, registro de series (peso/reps), descanso automático, barra de progreso
- **Estadísticas** — Volumen mensual, frecuencia semanal, historial completo

## Setup

```bash
# Clonar
git clone https://github.com/Kryzrock/gymlog.git
cd gymlog

# Instalar dependencias
npm install

# Iniciar dev server
npm run dev
```

Abre `http://localhost:8080`

## Estructura del Proyecto

```
src/
├── app/                  # App, rutas, layouts
├── features/             # Módulos por dominio
│   ├── dashboard/
│   ├── routines/
│   ├── exercises/
│   ├── workout/
│   └── statistics/
├── components/
│   ├── ui/               # shadcn/ui
│   └── shared/           # Componentes reutilizables
├── data/                 # Ejercicios y rutinas seed
├── lib/                  # Utils, storage, constantes
├── types/                # TypeScript interfaces
└── hooks/                # Custom hooks globales
```

Ver [PLAN.md](./PLAN.md) para el plan de ejecución completo.

## Desarrollo

El proyecto se está migrando desde Lovable a una arquitectura modular propia. El plan de migración está documentado en `PLAN.md` con 9 fases desde setup hasta polish.

## Licencia

MIT
