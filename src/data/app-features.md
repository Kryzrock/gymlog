# 🏋️ GymTracker App — Documento de Funcionalidades

## Resumen General
Aplicación de seguimiento de entrenamientos en gimnasio construida con React + TypeScript + Tailwind CSS + shadcn/ui. Diseño mobile-first con navegación inferior. Actualmente usa datos mock (sin backend/persistencia).

---

## 1. 🏠 Dashboard (Página de Inicio `/`)

### Implementado ✅
- **Tarjetas de estadísticas rápidas**: Entrenamientos del mes, peso total semanal, récords personales, racha de días consecutivos (datos mock estáticos)
- **Acciones rápidas**: Botones de acceso directo a funcionalidades principales
- **Entrenamientos recientes**: Lista de últimos entrenamientos realizados (datos mock)

### Pendiente ❌
- Datos dinámicos conectados a base de datos real
- Widget de calendario con días entrenados
- Notificaciones y recordatorios
- Personalización del dashboard

---

## 2. 📋 Gestión de Rutinas (`/routines`)

### Implementado ✅
- **Listado de rutinas**: Vista con tarjetas separadas entre "Mis Rutinas" y "Plantillas"
- **Crear rutina**: Dialog con formulario (nombre, descripción, categoría, días, ejercicios estimados, duración, opción de plantilla)
- **Editar rutina**: Dialog pre-poblado con datos actuales para modificar cualquier campo
- **Eliminar rutina**: Dialog de confirmación antes de eliminar
- **Duplicar rutina**: Clonar rutina existente con sufijo "(Copia)"
- **Filtro por categoría**: Filtrar por Fuerza, Hipertrofia, Resistencia o ver todas
- **Categorías**: Fuerza, Hipertrofia, Resistencia con badges de colores
- **Información mostrada**: Nombre, descripción, categoría, días asignados, cantidad de ejercicios, duración estimada, último uso

### Pendiente ❌
- Asociar ejercicios reales a cada rutina (actualmente solo cuenta numérica)
- Reordenar ejercicios dentro de una rutina (drag & drop)
- Programación semanal visual
- Compartir rutinas entre usuarios
- Importar/exportar rutinas
- Persistencia de datos (todo se pierde al recargar)

---

## 3. 💪 Biblioteca de Ejercicios (`/exercises`)

### Implementado ✅
- **Base de datos de ejercicios**: 12 ejercicios predefinidos organizados por grupo muscular (Pecho, Espalda, Piernas, Hombros, Brazos, Core)
- **Tarjetas de ejercicio**: Muestran nombre, descripción, grupos musculares (primarios/secundarios), equipamiento, dificultad, categoría, series/reps objetivo, tiempo de descanso
- **Vista expandible**: Cada tarjeta se expande para mostrar técnica detallada, instrucciones, tips y variaciones
- **Búsqueda**: Campo de texto para buscar ejercicios por nombre o descripción
- **Filtro por grupo muscular**: Todos, Pecho, Espalda, Piernas, Hombros, Brazos, Core
- **Filtro por equipamiento**: Todos, Peso Corporal, Mancuernas, Barra, Máquinas, Poleas
- **Filtro por dificultad**: Todos, Principiante, Intermedio, Avanzado
- **Crear ejercicio personalizado**: Dialog con formulario completo (nombre, descripción, grupo muscular, dificultad, categoría, equipamiento, series, reps, descanso)
- **Contador de ejercicios**: Muestra total filtrado, personalizados vs predefinidos
- **Estado vacío**: Mensaje con opción de limpiar filtros cuando no hay resultados

### Pendiente ❌
- Imágenes/videos instructivos para cada ejercicio
- Completar base de datos (actualmente 12 de ~30 ejercicios documentados en `exercises-database.md`)
- Los ejercicios creados no se persisten en el estado de la app (solo console.log)
- Sistema de favoritos
- Ejercicios recientes
- Historial de uso por ejercicio
- Progresión automática basada en rendimiento

---

## 4. 🏃 Entrenamiento Activo (`/workout/:routineId`)

### Implementado ✅
- **Pantalla completa**: Sin navegación inferior para experiencia inmersiva
- **Temporizador de entrenamiento**: Duración total del workout con formato HH:MM:SS
- **Pausar/Reanudar**: Control del temporizador
- **Registro de series**: Input de repeticiones y peso por serie
- **Temporizador de descanso**: Se activa automáticamente entre series con el tiempo configurado del ejercicio
- **Barra de progreso**: Muestra series completadas vs totales
- **Navegación entre ejercicios**: Anterior/Siguiente con indicador de posición
- **Historial de series**: Vista en tiempo real de series registradas (completadas vs pendientes)
- **Toast de confirmación**: Notificación al completar cada serie
- **Botón finalizar**: Aparece en el último ejercicio con resumen de duración
- **Botón salir**: Volver a rutinas en cualquier momento

### Pendiente ❌
- Conectar con rutinas reales (actualmente usa ejercicios mock fijos)
- Guardar historial de entrenamientos
- Resumen post-entrenamiento (volumen total, PRs, comparación con sesión anterior)
- Editar series ya completadas
- Agregar/quitar series dinámicamente
- Notas por ejercicio
- Superset / circuitos
- Audio/vibración al terminar descanso

---

## 5. 📊 Estadísticas (`/statistics`)

### Implementado ✅
- **Tarjetas resumen**: Días activo, entrenamientos totales, tiempo total, consistencia (%)
- **Gráfico de progreso mensual**: LineChart dual (peso total y repeticiones) con filtro temporal (3m, 6m, 1 año)
- **Gráfico de frecuencia semanal**: BarChart de entrenamientos por día de la semana
- **Gráfico de distribución**: PieChart (donut) por categoría de entrenamiento (Push, Pull, Piernas, Cardio)
- **Panel de tendencias**: Volumen total, consistencia y duración promedio con comparación vs mes anterior
- **Historial de entrenamientos**: Lista de sesiones con fecha, rutina, duración, ejercicios, series y estado (completado/incompleto)
- **Botones de exportar y filtrar** (UI presente, sin funcionalidad)

### Pendiente ❌
- Datos reales (todo es mock)
- Funcionalidad de exportar datos
- Filtros funcionales por rango de fecha
- PRs (récords personales) por ejercicio
- Comparación entre períodos
- Gráfico de volumen por grupo muscular
- Heatmap de actividad tipo GitHub

---

## 6. 🧭 Navegación y Layout

### Implementado ✅
- **Navegación inferior (mobile)**: 4 tabs — Inicio, Rutinas, Ejercicios, Estadísticas
- **AppLayout**: Layout wrapper con Outlet para rutas anidadas
- **Rutas**: `/`, `/routines`, `/exercises`, `/statistics`, `/workout/:routineId`
- **Página 404**: NotFound para rutas no existentes
- **Diseño responsive**: Optimizado para mobile con soporte básico desktop

### Pendiente ❌
- Navegación lateral para desktop
- Perfil de usuario / configuración
- Tema oscuro/claro toggle
- Onboarding para nuevos usuarios
- PWA (Progressive Web App) para uso offline

---

## 7. 🔧 Infraestructura Técnica

### Implementado ✅
- **Stack**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Estado**: useState local por componente (sin estado global)
- **Routing**: React Router v6 con rutas anidadas
- **UI**: shadcn/ui components (Button, Card, Dialog, Badge, Tabs, Input, etc.)
- **Gráficos**: Recharts (LineChart, BarChart, PieChart)
- **Iconos**: Lucide React
- **Toasts**: Sistema de notificaciones (shadcn + Sonner)
- **Formularios**: Controlados con useState
- **Datos**: Mock data en archivos TypeScript

### Pendiente ❌
- **Backend/Base de datos**: No hay persistencia (todo se pierde al recargar)
- **Autenticación**: No hay sistema de login/usuarios
- **Estado global**: No hay store centralizado (Context, Zustand, etc.)
- **Tests**: No hay tests unitarios ni e2e
- **PWA**: No configurado para uso offline
- **i18n**: Interfaz solo en español, sin sistema de internacionalización
- **Accesibilidad**: No auditada formalmente

---

## 📐 Arquitectura de Archivos

```
src/
├── pages/                    # Páginas principales
│   ├── Index.tsx             # Dashboard
│   ├── Routines.tsx          # Gestión de rutinas
│   ├── Exercises.tsx         # Biblioteca de ejercicios
│   ├── ActiveWorkout.tsx     # Entrenamiento en curso
│   ├── Statistics.tsx        # Estadísticas y gráficos
│   └── NotFound.tsx          # Página 404
├── components/
│   ├── dashboard/            # Componentes del dashboard
│   │   ├── StatsCard.tsx
│   │   ├── RecentWorkouts.tsx
│   │   └── QuickActions.tsx
│   ├── routines/             # Componentes de rutinas
│   │   ├── RoutineCard.tsx
│   │   ├── CreateRoutineDialog.tsx
│   │   ├── EditRoutineDialog.tsx
│   │   └── DeleteConfirmDialog.tsx
│   ├── exercises/            # Componentes de ejercicios
│   │   ├── ExerciseCard.tsx
│   │   └── CreateExerciseDialog.tsx
│   ├── workout/              # Componentes de entrenamiento activo
│   │   ├── WorkoutTimer.tsx
│   │   └── ExerciseLogger.tsx
│   ├── layout/               # Layout y navegación
│   │   ├── AppLayout.tsx
│   │   └── BottomNavigation.tsx
│   └── ui/                   # shadcn/ui components
├── data/
│   ├── exercises.ts          # Base de datos mock de ejercicios (12)
│   ├── exercises-database.md # Documentación completa (~30 ejercicios)
│   └── app-features.md       # Este documento
├── hooks/                    # Custom hooks
└── lib/                      # Utilidades
```

---

## 🚀 Próximos Pasos Sugeridos

### Prioridad Alta
1. **Conectar backend** (Lovable Cloud/Supabase) para persistencia de datos
2. **Autenticación** de usuarios
3. **Vincular ejercicios reales a rutinas** (actualmente desconectados)
4. **Guardar historial de entrenamientos** completados

### Prioridad Media
5. Completar base de datos de ejercicios (30+ ejercicios)
6. Resumen post-entrenamiento
7. Sistema de récords personales (PRs)
8. Agregar imágenes/videos a ejercicios

### Prioridad Baja
9. PWA para uso offline
10. Compartir rutinas
11. Tema oscuro/claro
12. Exportar datos
