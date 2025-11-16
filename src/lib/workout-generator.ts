import { TrainingLevel, Goal, WorkoutPlan, WorkoutDay, Exercise } from './types';

// Base de dados de exercícios
export const exerciseDatabase: Exercise[] = [
  // PEITO
  {
    id: 'bench_press',
    name: 'Supino Reto',
    category: 'strength',
    muscleGroup: 'Peito',
    difficulty: 'intermediate',
    instructions: [
      'Deite no banco com os pés firmes no chão',
      'Segure a barra com pegada média (largura dos ombros)',
      'Desça controladamente até o peito',
      'Empurre explosivamente para cima'
    ]
  },
  {
    id: 'incline_press',
    name: 'Supino Inclinado',
    category: 'strength',
    muscleGroup: 'Peito Superior',
    difficulty: 'intermediate',
    instructions: [
      'Ajuste o banco em 30-45 graus',
      'Mesma técnica do supino reto',
      'Foque na contração do peito superior'
    ]
  },
  {
    id: 'dumbbell_press',
    name: 'Supino com Halteres',
    category: 'strength',
    muscleGroup: 'Peito',
    difficulty: 'beginner',
    instructions: [
      'Deite no banco com halteres',
      'Empurre para cima até extensão completa',
      'Desça controladamente'
    ]
  },
  {
    id: 'cable_fly',
    name: 'Crucifixo no Cross',
    category: 'strength',
    muscleGroup: 'Peito',
    difficulty: 'intermediate',
    instructions: [
      'Posicione-se no centro do cross',
      'Braços levemente flexionados',
      'Traga as mãos à frente em movimento de abraço'
    ]
  },
  {
    id: 'pushup',
    name: 'Flexão de Braço',
    category: 'strength',
    muscleGroup: 'Peito',
    difficulty: 'beginner',
    instructions: [
      'Posição de prancha com mãos na largura dos ombros',
      'Desça até o peito quase tocar o chão',
      'Empurre para cima'
    ]
  },
  {
    id: 'dips',
    name: 'Paralelas',
    category: 'strength',
    muscleGroup: 'Peito e Tríceps',
    difficulty: 'advanced',
    instructions: [
      'Segure nas barras paralelas',
      'Incline o tronco para frente',
      'Desça até 90 graus e empurre para cima'
    ]
  },

  // COSTAS
  {
    id: 'pullup',
    name: 'Barra Fixa',
    category: 'strength',
    muscleGroup: 'Costas',
    difficulty: 'advanced',
    instructions: [
      'Pegada pronada na largura dos ombros',
      'Puxe até o queixo passar a barra',
      'Desça controladamente'
    ]
  },
  {
    id: 'barbell_row',
    name: 'Remada Curvada',
    category: 'strength',
    muscleGroup: 'Costas',
    difficulty: 'intermediate',
    instructions: [
      'Incline o tronco a 45 graus',
      'Puxe a barra até o abdômen',
      'Contraia as escápulas'
    ]
  },
  {
    id: 'lat_pulldown',
    name: 'Puxada Frontal',
    category: 'strength',
    muscleGroup: 'Dorsais',
    difficulty: 'beginner',
    instructions: [
      'Sente-se e ajuste as coxas',
      'Puxe a barra até o peito',
      'Controle a subida'
    ]
  },
  {
    id: 'seated_row',
    name: 'Remada Sentado',
    category: 'strength',
    muscleGroup: 'Costas',
    difficulty: 'beginner',
    instructions: [
      'Sente-se com pés apoiados',
      'Puxe o cabo até o abdômen',
      'Mantenha as costas retas'
    ]
  },
  {
    id: 'deadlift',
    name: 'Levantamento Terra',
    category: 'strength',
    muscleGroup: 'Costas e Posterior',
    difficulty: 'advanced',
    instructions: [
      'Pés na largura dos ombros',
      'Segure a barra com pegada mista ou pronada',
      'Levante mantendo as costas retas',
      'Empurre pelos calcanhares'
    ]
  },
  {
    id: 'face_pull',
    name: 'Puxada Alta para o Rosto',
    category: 'strength',
    muscleGroup: 'Trapézio e Ombros',
    difficulty: 'beginner',
    instructions: [
      'Use corda no cabo alto',
      'Puxe em direção ao rosto',
      'Abra os cotovelos para os lados'
    ]
  },

  // PERNAS
  {
    id: 'squat',
    name: 'Agachamento Livre',
    category: 'strength',
    muscleGroup: 'Pernas',
    difficulty: 'intermediate',
    instructions: [
      'Barra nas costas, pés na largura dos ombros',
      'Desça até coxas paralelas ao chão',
      'Empurre pelos calcanhares'
    ]
  },
  {
    id: 'leg_press',
    name: 'Leg Press 45°',
    category: 'strength',
    muscleGroup: 'Pernas',
    difficulty: 'beginner',
    instructions: [
      'Pés na largura dos ombros',
      'Desça até 90 graus',
      'Empurre explosivamente'
    ]
  },
  {
    id: 'leg_extension',
    name: 'Cadeira Extensora',
    category: 'strength',
    muscleGroup: 'Quadríceps',
    difficulty: 'beginner',
    instructions: [
      'Sente-se e ajuste o apoio',
      'Estenda as pernas completamente',
      'Contraia o quadríceps no topo'
    ]
  },
  {
    id: 'leg_curl',
    name: 'Mesa Flexora',
    category: 'strength',
    muscleGroup: 'Posterior de Coxa',
    difficulty: 'beginner',
    instructions: [
      'Deite de bruços',
      'Flexione as pernas trazendo calcanhares aos glúteos',
      'Contraia no topo'
    ]
  },
  {
    id: 'lunges',
    name: 'Afundo',
    category: 'strength',
    muscleGroup: 'Pernas',
    difficulty: 'intermediate',
    instructions: [
      'Dê um passo à frente',
      'Desça até joelho traseiro quase tocar o chão',
      'Empurre pela perna da frente'
    ]
  },
  {
    id: 'calf_raise',
    name: 'Panturrilha em Pé',
    category: 'strength',
    muscleGroup: 'Panturrilha',
    difficulty: 'beginner',
    instructions: [
      'Fique na ponta dos pés',
      'Suba o máximo possível',
      'Desça controladamente'
    ]
  },
  {
    id: 'romanian_deadlift',
    name: 'Levantamento Terra Romeno',
    category: 'strength',
    muscleGroup: 'Posterior de Coxa',
    difficulty: 'intermediate',
    instructions: [
      'Segure a barra com pegada pronada',
      'Desça a barra deslizando pelas pernas',
      'Mantenha joelhos levemente flexionados'
    ]
  },

  // OMBROS
  {
    id: 'shoulder_press',
    name: 'Desenvolvimento com Halteres',
    category: 'strength',
    muscleGroup: 'Ombros',
    difficulty: 'intermediate',
    instructions: [
      'Sentado, halteres na altura dos ombros',
      'Empurre para cima até extensão completa',
      'Desça controladamente'
    ]
  },
  {
    id: 'military_press',
    name: 'Desenvolvimento Militar',
    category: 'strength',
    muscleGroup: 'Ombros',
    difficulty: 'intermediate',
    instructions: [
      'Em pé ou sentado com barra',
      'Empurre a barra acima da cabeça',
      'Desça até a altura do queixo'
    ]
  },
  {
    id: 'lateral_raise',
    name: 'Elevação Lateral',
    category: 'strength',
    muscleGroup: 'Ombros Laterais',
    difficulty: 'beginner',
    instructions: [
      'Braços ao lado do corpo',
      'Eleve lateralmente até altura dos ombros',
      'Desça controladamente'
    ]
  },
  {
    id: 'front_raise',
    name: 'Elevação Frontal',
    category: 'strength',
    muscleGroup: 'Ombros Frontais',
    difficulty: 'beginner',
    instructions: [
      'Braços à frente do corpo',
      'Eleve até altura dos ombros',
      'Alterne os braços'
    ]
  },
  {
    id: 'rear_delt_fly',
    name: 'Crucifixo Inverso',
    category: 'strength',
    muscleGroup: 'Ombros Posteriores',
    difficulty: 'beginner',
    instructions: [
      'Incline o tronco para frente',
      'Abra os braços lateralmente',
      'Contraia as escápulas'
    ]
  },

  // BÍCEPS
  {
    id: 'barbell_curl',
    name: 'Rosca Direta',
    category: 'strength',
    muscleGroup: 'Bíceps',
    difficulty: 'beginner',
    instructions: [
      'Cotovelos fixos ao lado do corpo',
      'Flexione os braços trazendo a barra ao peito',
      'Contraia o bíceps no topo'
    ]
  },
  {
    id: 'hammer_curl',
    name: 'Rosca Martelo',
    category: 'strength',
    muscleGroup: 'Bíceps e Antebraço',
    difficulty: 'beginner',
    instructions: [
      'Pegada neutra (palmas frente a frente)',
      'Flexione alternadamente',
      'Mantenha cotovelos estáveis'
    ]
  },
  {
    id: 'preacher_curl',
    name: 'Rosca Scott',
    category: 'strength',
    muscleGroup: 'Bíceps',
    difficulty: 'intermediate',
    instructions: [
      'Apoie os braços no banco Scott',
      'Flexione até contração máxima',
      'Desça controladamente'
    ]
  },
  {
    id: 'concentration_curl',
    name: 'Rosca Concentrada',
    category: 'strength',
    muscleGroup: 'Bíceps',
    difficulty: 'beginner',
    instructions: [
      'Sentado, cotovelo apoiado na coxa',
      'Flexione o braço completamente',
      'Foque na contração'
    ]
  },

  // TRÍCEPS
  {
    id: 'tricep_pushdown',
    name: 'Tríceps Pulley',
    category: 'strength',
    muscleGroup: 'Tríceps',
    difficulty: 'beginner',
    instructions: [
      'Cotovelos fixos ao lado do corpo',
      'Empurre a barra para baixo',
      'Contraia o tríceps no final do movimento'
    ]
  },
  {
    id: 'overhead_extension',
    name: 'Tríceps Francês',
    category: 'strength',
    muscleGroup: 'Tríceps',
    difficulty: 'intermediate',
    instructions: [
      'Segure o halter acima da cabeça',
      'Desça atrás da cabeça flexionando cotovelos',
      'Estenda os braços completamente'
    ]
  },
  {
    id: 'close_grip_press',
    name: 'Supino Fechado',
    category: 'strength',
    muscleGroup: 'Tríceps',
    difficulty: 'intermediate',
    instructions: [
      'Pegada mais fechada que o supino normal',
      'Desça a barra até o peito',
      'Empurre focando no tríceps'
    ]
  },
  {
    id: 'tricep_dips',
    name: 'Mergulho para Tríceps',
    category: 'strength',
    muscleGroup: 'Tríceps',
    difficulty: 'intermediate',
    instructions: [
      'Corpo mais vertical que no mergulho para peito',
      'Desça até 90 graus',
      'Empurre focando no tríceps'
    ]
  },

  // ABDÔMEN
  {
    id: 'crunches',
    name: 'Abdominal Tradicional',
    category: 'strength',
    muscleGroup: 'Abdômen',
    difficulty: 'beginner',
    instructions: [
      'Deite de costas, joelhos flexionados',
      'Eleve o tronco contraindo o abdômen',
      'Desça controladamente'
    ]
  },
  {
    id: 'plank',
    name: 'Prancha',
    category: 'strength',
    muscleGroup: 'Core',
    difficulty: 'beginner',
    instructions: [
      'Apoie antebraços e pés no chão',
      'Mantenha o corpo reto',
      'Contraia o abdômen'
    ]
  },
  {
    id: 'leg_raises',
    name: 'Elevação de Pernas',
    category: 'strength',
    muscleGroup: 'Abdômen Inferior',
    difficulty: 'intermediate',
    instructions: [
      'Deite de costas',
      'Eleve as pernas até 90 graus',
      'Desça sem tocar o chão'
    ]
  },
  {
    id: 'russian_twist',
    name: 'Rotação Russa',
    category: 'strength',
    muscleGroup: 'Oblíquos',
    difficulty: 'intermediate',
    instructions: [
      'Sentado com pés elevados',
      'Gire o tronco de um lado para o outro',
      'Segure peso para maior intensidade'
    ]
  },

  // CARDIO
  {
    id: 'running',
    name: 'Corrida',
    category: 'cardio',
    muscleGroup: 'Cardiovascular',
    difficulty: 'beginner',
    instructions: [
      'Mantenha ritmo constante',
      'Respire de forma controlada',
      'Aumente intensidade gradualmente'
    ]
  },
  {
    id: 'cycling',
    name: 'Bicicleta',
    category: 'cardio',
    muscleGroup: 'Cardiovascular',
    difficulty: 'beginner',
    instructions: [
      'Ajuste o banco corretamente',
      'Mantenha cadência constante',
      'Varie a resistência'
    ]
  },
  {
    id: 'jump_rope',
    name: 'Pular Corda',
    category: 'cardio',
    muscleGroup: 'Cardiovascular',
    difficulty: 'intermediate',
    instructions: [
      'Pule com a ponta dos pés',
      'Mantenha cotovelos próximos ao corpo',
      'Respire ritmicamente'
    ]
  },
  {
    id: 'burpees',
    name: 'Burpees',
    category: 'cardio',
    muscleGroup: 'Corpo Todo',
    difficulty: 'advanced',
    instructions: [
      'Agache e apoie as mãos no chão',
      'Jogue as pernas para trás',
      'Faça uma flexão',
      'Volte e pule'
    ]
  }
];

// Configurações de treino por nível e objetivo
interface WorkoutConfig {
  daysPerWeek: number;
  setsPerExercise: { min: number; max: number };
  repsRange: string;
  restTime: number; // segundos
  exercisesPerMuscle: number;
}

const workoutConfigs: Record<TrainingLevel, Record<Goal, WorkoutConfig>> = {
  beginner: {
    weight_loss: {
      daysPerWeek: 3,
      setsPerExercise: { min: 2, max: 3 },
      repsRange: '12-15',
      restTime: 60,
      exercisesPerMuscle: 2
    },
    muscle_gain: {
      daysPerWeek: 3,
      setsPerExercise: { min: 3, max: 4 },
      repsRange: '8-12',
      restTime: 90,
      exercisesPerMuscle: 2
    },
    maintenance: {
      daysPerWeek: 3,
      setsPerExercise: { min: 2, max: 3 },
      repsRange: '10-12',
      restTime: 60,
      exercisesPerMuscle: 2
    },
    endurance: {
      daysPerWeek: 4,
      setsPerExercise: { min: 2, max: 3 },
      repsRange: '15-20',
      restTime: 45,
      exercisesPerMuscle: 2
    }
  },
  intermediate: {
    weight_loss: {
      daysPerWeek: 4,
      setsPerExercise: { min: 3, max: 4 },
      repsRange: '12-15',
      restTime: 60,
      exercisesPerMuscle: 3
    },
    muscle_gain: {
      daysPerWeek: 4,
      setsPerExercise: { min: 3, max: 4 },
      repsRange: '8-12',
      restTime: 90,
      exercisesPerMuscle: 3
    },
    maintenance: {
      daysPerWeek: 4,
      setsPerExercise: { min: 3, max: 3 },
      repsRange: '10-12',
      restTime: 75,
      exercisesPerMuscle: 3
    },
    endurance: {
      daysPerWeek: 5,
      setsPerExercise: { min: 3, max: 4 },
      repsRange: '15-20',
      restTime: 45,
      exercisesPerMuscle: 3
    }
  },
  advanced: {
    weight_loss: {
      daysPerWeek: 5,
      setsPerExercise: { min: 3, max: 5 },
      repsRange: '12-15',
      restTime: 45,
      exercisesPerMuscle: 4
    },
    muscle_gain: {
      daysPerWeek: 5,
      setsPerExercise: { min: 4, max: 5 },
      repsRange: '6-10',
      restTime: 120,
      exercisesPerMuscle: 4
    },
    maintenance: {
      daysPerWeek: 4,
      setsPerExercise: { min: 3, max: 4 },
      repsRange: '8-12',
      restTime: 75,
      exercisesPerMuscle: 3
    },
    endurance: {
      daysPerWeek: 6,
      setsPerExercise: { min: 3, max: 4 },
      repsRange: '15-25',
      restTime: 30,
      exercisesPerMuscle: 4
    }
  }
};

// Divisões de treino (splits)
const trainingSplits = {
  3: [ // 3x por semana - Full Body
    {
      day: 1,
      name: 'Treino A - Corpo Todo',
      muscleGroups: ['Peito', 'Costas', 'Pernas', 'Ombros', 'Abdômen']
    },
    {
      day: 3,
      name: 'Treino B - Corpo Todo',
      muscleGroups: ['Pernas', 'Peito', 'Costas', 'Bíceps', 'Tríceps']
    },
    {
      day: 5,
      name: 'Treino C - Corpo Todo',
      muscleGroups: ['Costas', 'Ombros', 'Pernas', 'Abdômen', 'Cardiovascular']
    }
  ],
  4: [ // 4x por semana - Upper/Lower
    {
      day: 1,
      name: 'Treino A - Superiores (Push)',
      muscleGroups: ['Peito', 'Ombros', 'Tríceps', 'Abdômen']
    },
    {
      day: 2,
      name: 'Treino B - Inferiores',
      muscleGroups: ['Pernas', 'Posterior de Coxa', 'Panturrilha', 'Core']
    },
    {
      day: 4,
      name: 'Treino C - Superiores (Pull)',
      muscleGroups: ['Costas', 'Bíceps', 'Ombros Posteriores', 'Abdômen']
    },
    {
      day: 5,
      name: 'Treino D - Inferiores',
      muscleGroups: ['Pernas', 'Quadríceps', 'Panturrilha', 'Core']
    }
  ],
  5: [ // 5x por semana - Push/Pull/Legs
    {
      day: 1,
      name: 'Treino A - Push (Empurrar)',
      muscleGroups: ['Peito', 'Ombros', 'Tríceps']
    },
    {
      day: 2,
      name: 'Treino B - Pull (Puxar)',
      muscleGroups: ['Costas', 'Bíceps', 'Antebraço']
    },
    {
      day: 3,
      name: 'Treino C - Pernas',
      muscleGroups: ['Pernas', 'Quadríceps', 'Posterior de Coxa', 'Panturrilha']
    },
    {
      day: 5,
      name: 'Treino D - Push (Empurrar)',
      muscleGroups: ['Peito', 'Ombros', 'Tríceps', 'Abdômen']
    },
    {
      day: 6,
      name: 'Treino E - Pull (Puxar)',
      muscleGroups: ['Costas', 'Bíceps', 'Core']
    }
  ],
  6: [ // 6x por semana - Bro Split
    {
      day: 1,
      name: 'Treino A - Peito',
      muscleGroups: ['Peito', 'Abdômen']
    },
    {
      day: 2,
      name: 'Treino B - Costas',
      muscleGroups: ['Costas', 'Core']
    },
    {
      day: 3,
      name: 'Treino C - Ombros',
      muscleGroups: ['Ombros', 'Trapézio', 'Abdômen']
    },
    {
      day: 4,
      name: 'Treino D - Pernas',
      muscleGroups: ['Pernas', 'Quadríceps', 'Posterior de Coxa', 'Panturrilha']
    },
    {
      day: 5,
      name: 'Treino E - Bíceps e Tríceps',
      muscleGroups: ['Bíceps', 'Tríceps', 'Antebraço']
    },
    {
      day: 6,
      name: 'Treino F - Cardio e Core',
      muscleGroups: ['Cardiovascular', 'Abdômen', 'Core']
    }
  ]
};

// Sugestões de carga por exercício e nível
interface LoadSuggestion {
  beginner: string;
  intermediate: string;
  advanced: string;
}

const loadSuggestions: Record<string, LoadSuggestion> = {
  bench_press: { beginner: '20-30kg', intermediate: '40-60kg', advanced: '70-100kg+' },
  squat: { beginner: '20-40kg', intermediate: '50-80kg', advanced: '90-140kg+' },
  deadlift: { beginner: '30-50kg', intermediate: '60-100kg', advanced: '110-180kg+' },
  shoulder_press: { beginner: '6-10kg', intermediate: '12-18kg', advanced: '20-30kg+' },
  barbell_row: { beginner: '20-30kg', intermediate: '40-60kg', advanced: '70-100kg+' },
  leg_press: { beginner: '40-80kg', intermediate: '100-160kg', advanced: '180-300kg+' },
  lat_pulldown: { beginner: '20-35kg', intermediate: '40-60kg', advanced: '65-90kg+' },
  barbell_curl: { beginner: '10-15kg', intermediate: '20-30kg', advanced: '35-50kg+' },
  tricep_pushdown: { beginner: '15-25kg', intermediate: '30-45kg', advanced: '50-70kg+' },
  default: { beginner: '5-10kg', intermediate: '12-20kg', advanced: '22-35kg+' }
};

function getLoadSuggestion(exerciseId: string, level: TrainingLevel): string {
  const suggestion = loadSuggestions[exerciseId] || loadSuggestions.default;
  return suggestion[level];
}

// Função principal para gerar plano de treino
export function generateWorkoutPlan(
  userId: string,
  level: TrainingLevel,
  goal: Goal,
  daysAvailable: number = 0
): WorkoutPlan {
  const config = workoutConfigs[level][goal];
  const days = daysAvailable > 0 ? Math.min(daysAvailable, config.daysPerWeek) : config.daysPerWeek;
  
  // Selecionar split apropriado
  let split = trainingSplits[3]; // padrão
  if (days >= 6) split = trainingSplits[6];
  else if (days >= 5) split = trainingSplits[5];
  else if (days >= 4) split = trainingSplits[4];
  else split = trainingSplits[3];

  const workoutDays: WorkoutDay[] = split.slice(0, days).map((splitDay) => {
    const exercises: Exercise[] = [];
    
    // Para cada grupo muscular do dia
    splitDay.muscleGroups.forEach((muscleGroup) => {
      // Filtrar exercícios apropriados
      const availableExercises = exerciseDatabase.filter(ex => {
        // Verificar se o exercício é do grupo muscular ou relacionado
        const matchesMuscle = ex.muscleGroup.includes(muscleGroup) || 
                             muscleGroup.includes(ex.muscleGroup.split(' ')[0]);
        
        // Verificar dificuldade apropriada
        const difficultyOk = 
          level === 'beginner' ? ex.difficulty !== 'advanced' :
          level === 'intermediate' ? true :
          true; // advanced pode fazer todos
        
        return matchesMuscle && difficultyOk;
      });

      // Selecionar exercícios aleatórios
      const exercisesToAdd = Math.min(config.exercisesPerMuscle, availableExercises.length);
      const shuffled = [...availableExercises].sort(() => Math.random() - 0.5);
      
      shuffled.slice(0, exercisesToAdd).forEach(exercise => {
        const sets = Math.floor(Math.random() * (config.setsPerExercise.max - config.setsPerExercise.min + 1)) + config.setsPerExercise.min;
        
        exercises.push({
          ...exercise,
          sets,
          reps: config.repsRange,
          // Adicionar sugestão de carga
          instructions: [
            `Carga sugerida: ${getLoadSuggestion(exercise.id, level)}`,
            `Descanso: ${config.restTime}s entre séries`,
            ...exercise.instructions
          ]
        });
      });
    });

    // Calcular duração estimada (5 min por exercício + aquecimento)
    const estimatedDuration = 10 + (exercises.length * 5);

    return {
      id: `${userId}_day_${splitDay.day}`,
      dayOfWeek: splitDay.day,
      name: splitDay.name,
      exercises,
      estimatedDuration,
      completed: false
    };
  });

  return {
    id: `${userId}_workout_${Date.now()}`,
    userId,
    weekStart: new Date(),
    days: workoutDays
  };
}

// Função para ajustar carga baseado no progresso
export function adjustLoad(currentLoad: string, progress: 'easy' | 'perfect' | 'hard'): string {
  const match = currentLoad.match(/(\d+)-?(\d+)?/);
  if (!match) return currentLoad;

  const min = parseInt(match[1]);
  const max = match[2] ? parseInt(match[2]) : min;

  let newMin = min;
  let newMax = max;

  if (progress === 'easy') {
    // Aumentar 5-10%
    newMin = Math.round(min * 1.05);
    newMax = Math.round(max * 1.1);
  } else if (progress === 'hard') {
    // Diminuir 5-10%
    newMin = Math.round(min * 0.9);
    newMax = Math.round(max * 0.95);
  }

  return newMin === newMax ? `${newMin}kg` : `${newMin}-${newMax}kg`;
}

// Função para substituir exercício
export function replaceExercise(
  currentExercise: Exercise,
  level: TrainingLevel
): Exercise | null {
  const alternatives = exerciseDatabase.filter(ex => 
    ex.muscleGroup === currentExercise.muscleGroup &&
    ex.id !== currentExercise.id &&
    (level === 'beginner' ? ex.difficulty !== 'advanced' : true)
  );

  if (alternatives.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * alternatives.length);
  return {
    ...alternatives[randomIndex],
    sets: currentExercise.sets,
    reps: currentExercise.reps
  };
}
