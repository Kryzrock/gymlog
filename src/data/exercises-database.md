# Base de Datos de Ejercicios

## Estructura de Datos

### Interfaz Exercise
```typescript
interface Exercise {
  id: string;
  name: string;
  description: string;
  technique: string[];
  muscleGroups: {
    primary: string[];
    secondary: string[];
  };
  equipment: string[];
  difficulty: 'principiante' | 'intermedio' | 'avanzado';
  category: 'fuerza' | 'hipertrofia' | 'resistencia' | 'funcional';
  instructions: string[];
  tips: string[];
  variations: string[];
  targetSets: number;
  targetReps: string; // e.g., "8-12", "15-20", "hasta fallo"
  restTime: number; // seconds
  isCustom: boolean;
  createdBy?: string; // for custom exercises
  imageUrl?: string;
  videoUrl?: string;
}
```

## Ejercicios por Grupo Muscular

### PECHO
1. **Press de Banca con Barra**
   - Equipo: Barra, banco
   - Primario: Pectoral mayor
   - Secundario: Tríceps, deltoides anterior
   - Dificultad: Intermedio

2. **Press de Banca con Mancuernas**
   - Equipo: Mancuernas, banco
   - Primario: Pectoral mayor
   - Secundario: Tríceps, deltoides anterior
   - Dificultad: Intermedio

3. **Flexiones**
   - Equipo: Peso corporal
   - Primario: Pectoral mayor
   - Secundario: Tríceps, deltoides anterior
   - Dificultad: Principiante

4. **Press Inclinado con Mancuernas**
   - Equipo: Mancuernas, banco inclinado
   - Primario: Pectoral superior
   - Secundario: Deltoides anterior
   - Dificultad: Intermedio

5. **Aperturas con Mancuernas**
   - Equipo: Mancuernas, banco
   - Primario: Pectoral mayor
   - Secundario: Deltoides anterior
   - Dificultad: Intermedio

### ESPALDA
1. **Dominadas**
   - Equipo: Barra de dominadas
   - Primario: Dorsal ancho, romboides
   - Secundario: Bíceps
   - Dificultad: Intermedio

2. **Remo con Barra**
   - Equipo: Barra
   - Primario: Dorsal ancho, romboides
   - Secundario: Bíceps, deltoides posterior
   - Dificultad: Intermedio

3. **Remo con Mancuerna**
   - Equipo: Mancuerna, banco
   - Primario: Dorsal ancho
   - Secundario: Bíceps, deltoides posterior
   - Dificultad: Principiante

4. **Peso Muerto**
   - Equipo: Barra
   - Primario: Erector espinal, glúteos
   - Secundario: Isquiotibiales, trapecios
   - Dificultad: Avanzado

5. **Jalones al Pecho**
   - Equipo: Máquina de poleas
   - Primario: Dorsal ancho
   - Secundario: Bíceps, romboides
   - Dificultad: Principiante

### PIERNAS
1. **Sentadillas**
   - Equipo: Barra
   - Primario: Cuádriceps, glúteos
   - Secundario: Isquiotibiales, core
   - Dificultad: Intermedio

2. **Peso Muerto Rumano**
   - Equipo: Barra
   - Primario: Isquiotibiales, glúteos
   - Secundario: Erector espinal
   - Dificultad: Intermedio

3. **Zancadas**
   - Equipo: Mancuernas (opcional)
   - Primario: Cuádriceps, glúteos
   - Secundario: Isquiotibiales, core
   - Dificultad: Principiante

4. **Prensa de Piernas**
   - Equipo: Máquina de prensa
   - Primario: Cuádriceps, glúteos
   - Secundario: Isquiotibiales
   - Dificultad: Principiante

5. **Curl de Isquiotibiales**
   - Equipo: Máquina de curl
   - Primario: Isquiotibiales
   - Secundario: Ninguno
   - Dificultad: Principiante

### HOMBROS
1. **Press Militar**
   - Equipo: Barra
   - Primario: Deltoides anterior y medio
   - Secundario: Tríceps, core
   - Dificultad: Intermedio

2. **Press con Mancuernas Sentado**
   - Equipo: Mancuernas, banco
   - Primario: Deltoides anterior y medio
   - Secundario: Tríceps
   - Dificultad: Principiante

3. **Elevaciones Laterales**
   - Equipo: Mancuernas
   - Primario: Deltoides medio
   - Secundario: Deltoides anterior
   - Dificultad: Principiante

4. **Elevaciones Posteriores**
   - Equipo: Mancuernas
   - Primario: Deltoides posterior
   - Secundario: Romboides
   - Dificultad: Principiante

5. **Face Pulls**
   - Equipo: Máquina de poleas
   - Primario: Deltoides posterior
   - Secundario: Romboides, trapecio medio
   - Dificultad: Principiante

### BRAZOS
1. **Curl de Bíceps con Barra**
   - Equipo: Barra
   - Primario: Bíceps
   - Secundario: Braquial
   - Dificultad: Principiante

2. **Press Francés**
   - Equipo: Barra, banco
   - Primario: Tríceps
   - Secundario: Ninguno
   - Dificultad: Intermedio

3. **Curl con Mancuernas**
   - Equipo: Mancuernas
   - Primario: Bíceps
   - Secundario: Braquial
   - Dificultad: Principiante

4. **Extensiones de Tríceps**
   - Equipo: Mancuerna
   - Primario: Tríceps
   - Secundario: Ninguno
   - Dificultad: Principiante

5. **Dips**
   - Equipo: Barras paralelas
   - Primario: Tríceps
   - Secundario: Pectoral, deltoides anterior
   - Dificultad: Intermedio

### CORE
1. **Plancha**
   - Equipo: Peso corporal
   - Primario: Core completo
   - Secundario: Hombros, glúteos
   - Dificultad: Principiante

2. **Crunches**
   - Equipo: Peso corporal
   - Primario: Recto abdominal
   - Secundario: Oblicuos
   - Dificultad: Principiante

3. **Russian Twists**
   - Equipo: Peso corporal/mancuerna
   - Primario: Oblicuos
   - Secundario: Recto abdominal
   - Dificultad: Principiante

4. **Dead Bug**
   - Equipo: Peso corporal
   - Primario: Core profundo
   - Secundario: Estabilizadores
   - Dificultad: Principiante

5. **Mountain Climbers**
   - Equipo: Peso corporal
   - Primario: Core completo
   - Secundario: Hombros, cardio
   - Dificultad: Intermedio

## Categorías de Equipo
- **Peso corporal**: Sin equipo necesario
- **Mancuernas**: Mancuernas ajustables o fijas
- **Barra**: Barra olímpica con discos
- **Máquinas**: Equipamiento de gimnasio
- **Poleas**: Sistema de poleas y cables
- **Banco**: Banco ajustable
- **Funcional**: Kettlebells, bandas, balones medicinales

## Niveles de Dificultad
- **Principiante**: Ejercicios básicos, técnica simple
- **Intermedio**: Requiere experiencia previa y técnica correcta
- **Avanzado**: Ejercicios complejos, alto riesgo si se ejecutan mal

## Implementación Futura
- Conectar con Supabase para almacenamiento persistente
- Añadir imágenes/videos instructivos
- Sistema de favoritos y ejercicios recientes
- Progresión automática basada en rendimiento
- Comunidad para compartir ejercicios personalizados