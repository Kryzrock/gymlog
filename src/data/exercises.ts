// Mock data for exercises based on the database structure
export const exercisesData = [
  // PECHO
  {
    id: "1",
    name: "Press de Banca con Barra",
    description: "Ejercicio fundamental para el desarrollo del pecho, hombros y tríceps.",
    technique: [
      "Acuéstate en el banco con los pies firmes en el suelo",
      "Agarra la barra con un agarre ligeramente más ancho que los hombros",
      "Baja la barra controladamente hasta el pecho",
      "Empuja la barra hacia arriba hasta extender completamente los brazos"
    ],
    muscleGroups: {
      primary: ["Pectoral mayor"],
      secondary: ["Tríceps", "Deltoides anterior"]
    },
    equipment: ["Barra", "Banco", "Discos"],
    difficulty: "intermedio" as const,
    category: "fuerza" as const,
    instructions: [
      "Mantén los omóplatos retraídos durante todo el movimiento",
      "No rebotes la barra en el pecho",
      "Mantén el core contraído"
    ],
    tips: [
      "Exhala durante la fase de empuje",
      "No arquees excesivamente la espalda",
      "Usa un spotter para cargas pesadas"
    ],
    variations: ["Press inclinado", "Press declinado", "Press con agarre cerrado"],
    targetSets: 3,
    targetReps: "6-8",
    restTime: 120,
    isCustom: false
  },
  {
    id: "2",
    name: "Press de Banca con Mancuernas",
    description: "Variante del press de banca que permite mayor rango de movimiento.",
    technique: [
      "Siéntate en el banco con una mancuerna en cada mano",
      "Acuéstate y posiciona las mancuernas a los lados del pecho",
      "Empuja las mancuernas hacia arriba hasta que se toquen",
      "Baja controladamente hasta sentir estiramiento en el pecho"
    ],
    muscleGroups: {
      primary: ["Pectoral mayor"],
      secondary: ["Tríceps", "Deltoides anterior"]
    },
    equipment: ["Mancuernas", "Banco"],
    difficulty: "intermedio" as const,
    category: "hipertrofia" as const,
    instructions: [
      "Mayor rango de movimiento comparado con la barra",
      "Control el peso en todo momento",
      "No dejes que las mancuernas se vayan hacia atrás"
    ],
    tips: [
      "Rota ligeramente las muñecas hacia adentro en la parte superior",
      "Mantén los codos ligeramente por debajo de los hombros",
      "Usa un agarre neutral si sientes molestias en las muñecas"
    ],
    variations: ["Press inclinado con mancuernas", "Press declinado"],
    targetSets: 3,
    targetReps: "8-12",
    restTime: 90,
    isCustom: false
  },
  {
    id: "3",
    name: "Flexiones",
    description: "Ejercicio de peso corporal excelente para principiantes.",
    technique: [
      "Posición de plancha con manos debajo de los hombros",
      "Mantén el cuerpo recto desde la cabeza hasta los talones",
      "Baja el pecho hasta casi tocar el suelo",
      "Empuja hacia arriba hasta la posición inicial"
    ],
    muscleGroups: {
      primary: ["Pectoral mayor"],
      secondary: ["Tríceps", "Deltoides anterior", "Core"]
    },
    equipment: ["Peso corporal"],
    difficulty: "principiante" as const,
    category: "funcional" as const,
    instructions: [
      "No permitas que las caderas se hundan",
      "Mantén la cabeza en posición neutral",
      "Respira de manera controlada"
    ],
    tips: [
      "Si es muy difícil, apóyate en las rodillas",
      "Para mayor dificultad, eleva los pies",
      "Mantén los codos cerca del cuerpo"
    ],
    variations: ["Flexiones inclinadas", "Flexiones diamante", "Flexiones arqueadas"],
    targetSets: 3,
    targetReps: "10-15",
    restTime: 60,
    isCustom: false
  },

  // ESPALDA
  {
    id: "4",
    name: "Dominadas",
    description: "El rey de los ejercicios de tracción para la espalda.",
    technique: [
      "Cuélgate de la barra con agarre prono",
      "Manos ligeramente más anchas que los hombros",
      "Inicia el movimiento llevando los omóplatos hacia abajo",
      "Tira hasta que la barbilla pase por encima de la barra"
    ],
    muscleGroups: {
      primary: ["Dorsal ancho", "Romboides"],
      secondary: ["Bíceps", "Deltoides posterior"]
    },
    equipment: ["Barra de dominadas"],
    difficulty: "intermedio" as const,
    category: "fuerza" as const,
    instructions: [
      "No uses impulso con las piernas",
      "Baja controladamente hasta extensión completa",
      "Mantén el pecho hacia arriba"
    ],
    tips: [
      "Si no puedes hacer una dominada completa, usa bandas elásticas",
      "Enfócate en contraer la espalda, no solo en subir",
      "Evita balancearte"
    ],
    variations: ["Dominadas con agarre supino", "Dominadas neutras", "Dominadas lastradas"],
    targetSets: 3,
    targetReps: "5-10",
    restTime: 120,
    isCustom: false
  },
  {
    id: "5",
    name: "Remo con Barra",
    description: "Excelente ejercicio para el grosor de la espalda.",
    technique: [
      "De pie con pies separados al ancho de hombros",
      "Inclínate hacia adelante manteniendo la espalda recta",
      "Agarra la barra con agarre prono",
      "Tira de la barra hacia el abdomen bajo"
    ],
    muscleGroups: {
      primary: ["Dorsal ancho", "Romboides", "Trapecio medio"],
      secondary: ["Bíceps", "Deltoides posterior"]
    },
    equipment: ["Barra", "Discos"],
    difficulty: "intermedio" as const,
    category: "fuerza" as const,
    instructions: [
      "Mantén la posición inclinada durante todo el ejercicio",
      "No uses impulso para levantar el peso",
      "Aprieta los omóplatos en la parte superior"
    ],
    tips: [
      "Imagina que intentas partir la barra",
      "Mantén los codos cerca del cuerpo",
      "No redondees la espalda"
    ],
    variations: ["Remo con agarre supino", "Remo Pendlay", "Remo con mancuernas"],
    targetSets: 3,
    targetReps: "6-8",
    restTime: 120,
    isCustom: false
  },

  // PIERNAS
  {
    id: "6",
    name: "Sentadillas",
    description: "El ejercicio más importante para el tren inferior.",
    technique: [
      "Pies separados al ancho de hombros",
      "Barra apoyada en los trapecios",
      "Baja flexionando cadera y rodillas",
      "Baja hasta que los muslos estén paralelos al suelo"
    ],
    muscleGroups: {
      primary: ["Cuádriceps", "Glúteos"],
      secondary: ["Isquiotibiales", "Core", "Pantorrillas"]
    },
    equipment: ["Barra", "Rack", "Discos"],
    difficulty: "intermedio" as const,
    category: "fuerza" as const,
    instructions: [
      "Mantén el pecho hacia arriba",
      "No permitas que las rodillas se desplacen hacia adentro",
      "Distribuye el peso en toda la planta del pie"
    ],
    tips: [
      "Inicia el movimiento con la cadera",
      "Mantén las rodillas alineadas con los pies",
      "No tengas miedo de bajar profundo"
    ],
    variations: ["Sentadilla frontal", "Sentadilla sumo", "Sentadilla goblet"],
    targetSets: 3,
    targetReps: "6-10",
    restTime: 180,
    isCustom: false
  },
  {
    id: "7",
    name: "Peso Muerto Rumano",
    description: "Excelente para isquiotibiales y glúteos.",
    technique: [
      "De pie con pies al ancho de caderas",
      "Agarra la barra con agarre prono",
      "Empuja la cadera hacia atrás manteniendo las rodillas ligeramente flexionadas",
      "Baja hasta sentir estiramiento en isquiotibiales"
    ],
    muscleGroups: {
      primary: ["Isquiotibiales", "Glúteos"],
      secondary: ["Erector espinal", "Trapecios"]
    },
    equipment: ["Barra", "Discos"],
    difficulty: "intermedio" as const,
    category: "fuerza" as const,
    instructions: [
      "Mantén la barra cerca del cuerpo",
      "No redondees la espalda",
      "El movimiento viene de la cadera"
    ],
    tips: [
      "Imagina que empujas el suelo con los pies",
      "Contrae los glúteos en la parte superior",
      "Mantén la cabeza neutral"
    ],
    variations: ["Peso muerto convencional", "Peso muerto sumo", "Peso muerto con mancuernas"],
    targetSets: 3,
    targetReps: "8-10",
    restTime: 120,
    isCustom: false
  },

  // HOMBROS
  {
    id: "8",
    name: "Press Militar",
    description: "El ejercicio definitivo para hombros fuertes.",
    technique: [
      "De pie con pies al ancho de hombros",
      "Barra a la altura de los hombros",
      "Empuja la barra verticalmente por encima de la cabeza",
      "Baja controladamente a la posición inicial"
    ],
    muscleGroups: {
      primary: ["Deltoides anterior", "Deltoides medio"],
      secondary: ["Tríceps", "Core", "Trapecio superior"]
    },
    equipment: ["Barra", "Discos"],
    difficulty: "intermedio" as const,
    category: "fuerza" as const,
    instructions: [
      "Mantén el core contraído durante todo el movimiento",
      "No arquees excesivamente la espalda",
      "La barra debe viajar en línea recta"
    ],
    tips: [
      "Empuja la cabeza hacia adelante cuando la barra pase",
      "Mantén los codos ligeramente hacia adelante",
      "Aprieta los glúteos para estabilidad"
    ],
    variations: ["Press sentado", "Press con mancuernas", "Press tras nuca"],
    targetSets: 3,
    targetReps: "6-8",
    restTime: 120,
    isCustom: false
  },

  // BRAZOS
  {
    id: "9",
    name: "Curl de Bíceps con Barra",
    description: "Ejercicio básico para el desarrollo de los bíceps.",
    technique: [
      "De pie con pies al ancho de hombros",
      "Agarra la barra con agarre supino",
      "Mantén los codos pegados al cuerpo",
      "Flexiona los brazos llevando la barra hacia el pecho"
    ],
    muscleGroups: {
      primary: ["Bíceps"],
      secondary: ["Braquial", "Braquiorradial"]
    },
    equipment: ["Barra", "Discos"],
    difficulty: "principiante" as const,
    category: "hipertrofia" as const,
    instructions: [
      "No uses impulso con el cuerpo",
      "Controla tanto la subida como la bajada",
      "Mantén los codos estables"
    ],
    tips: [
      "Aprieta el bíceps en la parte superior",
      "No dejes que los codos se desplacen hacia adelante",
      "Usa un peso que te permita mantener la forma"
    ],
    variations: ["Curl con mancuernas", "Curl martillo", "Curl en predicador"],
    targetSets: 3,
    targetReps: "10-12",
    restTime: 60,
    isCustom: false
  },
  {
    id: "10",
    name: "Press Francés",
    description: "Ejercicio aislado para el desarrollo del tríceps.",
    technique: [
      "Acostado en banco con barra en manos",
      "Brazos extendidos perpendiculares al cuerpo",
      "Flexiona solo los antebrazos llevando la barra hacia la frente",
      "Extiende de vuelta a la posición inicial"
    ],
    muscleGroups: {
      primary: ["Tríceps"],
      secondary: []
    },
    equipment: ["Barra", "Banco", "Discos"],
    difficulty: "intermedio" as const,
    category: "hipertrofia" as const,
    instructions: [
      "Mantén los codos fijos durante todo el movimiento",
      "Solo se mueven los antebrazos",
      "Controla el peso en la bajada"
    ],
    tips: [
      "Usa una barra EZ para mayor comodidad en las muñecas",
      "No uses peso excesivo",
      "Mantén los codos ligeramente hacia adentro"
    ],
    variations: ["Press francés con mancuernas", "Extensiones en polea", "Dips"],
    targetSets: 3,
    targetReps: "10-12",
    restTime: 60,
    isCustom: false
  },

  // CORE
  {
    id: "11",
    name: "Plancha",
    description: "Ejercicio isométrico fundamental para el core.",
    technique: [
      "Posición de flexión apoyado en antebrazos",
      "Cuerpo recto desde cabeza hasta talones",
      "Mantén la posición sin permitir que las caderas se hundan",
      "Respira normalmente durante el ejercicio"
    ],
    muscleGroups: {
      primary: ["Recto abdominal", "Transverso abdominal"],
      secondary: ["Oblicuos", "Erectores espinales", "Glúteos"]
    },
    equipment: ["Peso corporal"],
    difficulty: "principiante" as const,
    category: "funcional" as const,
    instructions: [
      "Mantén la cabeza en posición neutral",
      "Contrae activamente el core",
      "No contengas la respiración"
    ],
    tips: [
      "Imagina que alguien te va a golpear en el estómago",
      "Mantén los glúteos contraídos",
      "Si es muy difícil, apóyate en las rodillas"
    ],
    variations: ["Plancha lateral", "Plancha con elevación de piernas", "Plancha con apoyo en una mano"],
    targetSets: 3,
    targetReps: "30-60s",
    restTime: 60,
    isCustom: false
  },
  {
    id: "12",
    name: "Russian Twists",
    description: "Ejercicio dinámico para los oblicuos.",
    technique: [
      "Sentado con rodillas flexionadas y pies elevados",
      "Inclínate ligeramente hacia atrás manteniendo la espalda recta",
      "Rota el torso de lado a lado",
      "Mantén el core contraído durante todo el movimiento"
    ],
    muscleGroups: {
      primary: ["Oblicuos"],
      secondary: ["Recto abdominal", "Transverso abdominal"]
    },
    equipment: ["Peso corporal", "Mancuerna (opcional)"],
    difficulty: "principiante" as const,
    category: "funcional" as const,
    instructions: [
      "No hagas el movimiento demasiado rápido",
      "Mantén el pecho hacia arriba",
      "El movimiento viene del core, no de los brazos"
    ],
    tips: [
      "Para mayor dificultad, sostén una mancuerna",
      "Enfócate en la calidad del movimiento",
      "Mantén los pies elevados todo el tiempo"
    ],
    variations: ["Russian twists con peso", "Oblicuos en máquina", "Plancha lateral con rotación"],
    targetSets: 3,
    targetReps: "20-30",
    restTime: 45,
    isCustom: false
  }
];