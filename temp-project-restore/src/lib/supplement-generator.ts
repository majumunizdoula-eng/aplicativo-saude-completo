// Gerador automático de protocolo de suplementação

import { Goal, Supplement } from './types';
import { SUPPLEMENTS_DATABASE } from './constants';

export interface SupplementSchedule {
  time: string;
  period: string;
  supplements: Array<Supplement & { scheduleId: string }>;
}

export interface SupplementProtocol {
  schedule: SupplementSchedule[];
  totalSupplements: number;
  estimatedMonthlyCost: number;
}

// Gera protocolo de suplementação baseado no objetivo e perfil do usuário
export function generateSupplementProtocol(
  goal: Goal,
  trainingLevel: string,
  trainingDays: number,
  budget: 'low' | 'medium' | 'high' = 'medium'
): SupplementProtocol {
  const schedule: SupplementSchedule[] = [];

  // Suplementos essenciais para todos
  const essentialSupplements = ['multivitamin', 'omega3'];
  
  // Suplementos baseados no objetivo
  const goalSupplements: Record<Goal, string[]> = {
    muscle_gain: ['whey', 'creatine', 'bcaa'],
    weight_loss: ['whey', 'omega3'],
    maintenance: ['whey'],
    endurance: ['bcaa', 'whey']
  };

  // Suplementos baseados no nível de treino
  const levelSupplements: Record<string, string[]> = {
    beginner: [],
    intermediate: ['bcaa'],
    advanced: ['bcaa', 'creatine']
  };

  // Combina suplementos recomendados
  const recommendedIds = [
    ...essentialSupplements,
    ...goalSupplements[goal],
    ...(levelSupplements[trainingLevel] || [])
  ];

  // Remove duplicatas
  const uniqueIds = Array.from(new Set(recommendedIds));

  // Ajusta baseado no orçamento
  let finalIds = uniqueIds;
  if (budget === 'low') {
    finalIds = uniqueIds.slice(0, 3); // Apenas os 3 mais importantes
  } else if (budget === 'medium') {
    finalIds = uniqueIds.slice(0, 5); // Até 5 suplementos
  }

  // Busca os suplementos no banco de dados
  const supplements = finalIds
    .map(id => SUPPLEMENTS_DATABASE.find(s => s.id === id))
    .filter(Boolean) as Supplement[];

  // Organiza os horários
  const morningSupplements: Supplement[] = [];
  const preWorkoutSupplements: Supplement[] = [];
  const postWorkoutSupplements: Supplement[] = [];
  const dinnerSupplements: Supplement[] = [];

  supplements.forEach(supplement => {
    if (supplement.timing.includes('Café da manhã')) {
      morningSupplements.push(supplement);
    }
    if (supplement.timing.includes('Pré-treino')) {
      preWorkoutSupplements.push(supplement);
    }
    if (supplement.timing.includes('Pós-treino')) {
      postWorkoutSupplements.push(supplement);
    }
    if (supplement.timing.includes('Jantar')) {
      dinnerSupplements.push(supplement);
    }
  });

  // Monta o cronograma
  if (morningSupplements.length > 0) {
    schedule.push({
      time: '07:00',
      period: 'Café da Manhã',
      supplements: morningSupplements.map((s, i) => ({
        ...s,
        scheduleId: `${s.id}_morning_${i}`
      }))
    });
  }

  if (preWorkoutSupplements.length > 0 && trainingDays > 0) {
    schedule.push({
      time: '10:00',
      period: 'Pré-Treino',
      supplements: preWorkoutSupplements.map((s, i) => ({
        ...s,
        scheduleId: `${s.id}_pre_${i}`
      }))
    });
  }

  if (postWorkoutSupplements.length > 0 && trainingDays > 0) {
    schedule.push({
      time: '12:00',
      period: 'Pós-Treino',
      supplements: postWorkoutSupplements.map((s, i) => ({
        ...s,
        scheduleId: `${s.id}_post_${i}`
      }))
    });
  }

  if (dinnerSupplements.length > 0) {
    schedule.push({
      time: '19:30',
      period: 'Jantar',
      supplements: dinnerSupplements.map((s, i) => ({
        ...s,
        scheduleId: `${s.id}_dinner_${i}`
      }))
    });
  }

  // Calcula custo mensal estimado (valores aproximados em R$)
  const supplementCosts: Record<string, number> = {
    whey: 120,
    creatine: 50,
    omega3: 40,
    multivitamin: 35,
    bcaa: 80
  };

  const totalCost = supplements.reduce((sum, s) => {
    return sum + (supplementCosts[s.id] || 0);
  }, 0);

  const totalSupplements = schedule.reduce((sum, slot) => {
    return sum + slot.supplements.length;
  }, 0);

  return {
    schedule,
    totalSupplements,
    estimatedMonthlyCost: totalCost
  };
}

// Gera horários personalizados baseado na rotina do usuário
export function generateCustomSchedule(
  wakeUpTime: string,
  workoutTime: string,
  sleepTime: string,
  supplements: Supplement[]
): SupplementSchedule[] {
  const schedule: SupplementSchedule[] = [];

  // Converte horários para minutos desde meia-noite
  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const minutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const wakeUp = timeToMinutes(wakeUpTime);
  const workout = timeToMinutes(workoutTime);
  const sleep = timeToMinutes(sleepTime);

  // Café da manhã (30 min após acordar)
  const breakfastTime = minutesToTime(wakeUp + 30);
  const breakfastSupplements = supplements.filter(s => 
    s.timing.includes('Café da manhã')
  );

  if (breakfastSupplements.length > 0) {
    schedule.push({
      time: breakfastTime,
      period: 'Café da Manhã',
      supplements: breakfastSupplements.map((s, i) => ({
        ...s,
        scheduleId: `${s.id}_breakfast_${i}`
      }))
    });
  }

  // Pré-treino (30 min antes do treino)
  const preWorkoutTime = minutesToTime(workout - 30);
  const preWorkoutSupplements = supplements.filter(s => 
    s.timing.includes('Pré-treino')
  );

  if (preWorkoutSupplements.length > 0) {
    schedule.push({
      time: preWorkoutTime,
      period: 'Pré-Treino',
      supplements: preWorkoutSupplements.map((s, i) => ({
        ...s,
        scheduleId: `${s.id}_pre_${i}`
      }))
    });
  }

  // Pós-treino (imediatamente após)
  const postWorkoutTime = minutesToTime(workout + 90); // Assume 90 min de treino
  const postWorkoutSupplements = supplements.filter(s => 
    s.timing.includes('Pós-treino')
  );

  if (postWorkoutSupplements.length > 0) {
    schedule.push({
      time: postWorkoutTime,
      period: 'Pós-Treino',
      supplements: postWorkoutSupplements.map((s, i) => ({
        ...s,
        scheduleId: `${s.id}_post_${i}`
      }))
    });
  }

  // Jantar (3 horas antes de dormir)
  const dinnerTime = minutesToTime(sleep - 180);
  const dinnerSupplements = supplements.filter(s => 
    s.timing.includes('Jantar')
  );

  if (dinnerSupplements.length > 0) {
    schedule.push({
      time: dinnerTime,
      period: 'Jantar',
      supplements: dinnerSupplements.map((s, i) => ({
        ...s,
        scheduleId: `${s.id}_dinner_${i}`
      }))
    });
  }

  return schedule;
}

// Verifica se é hora de tomar algum suplemento
export function checkSupplementReminder(
  schedule: SupplementSchedule[],
  currentTime: string
): SupplementSchedule | null {
  const current = new Date(`2000-01-01T${currentTime}`);
  
  for (const slot of schedule) {
    const slotTime = new Date(`2000-01-01T${slot.time}`);
    const diff = Math.abs(current.getTime() - slotTime.getTime()) / 1000 / 60; // diferença em minutos
    
    // Se estiver dentro de 15 minutos do horário
    if (diff <= 15) {
      return slot;
    }
  }
  
  return null;
}

// Gera recomendações adicionais baseadas em deficiências comuns
export function getAdditionalRecommendations(
  goal: Goal,
  age: number,
  gender: 'male' | 'female' | 'other'
): Array<{ supplement: string; reason: string }> {
  const recommendations: Array<{ supplement: string; reason: string }> = [];

  // Vitamina D para todos
  if (age > 30) {
    recommendations.push({
      supplement: 'Vitamina D3',
      reason: 'Importante para saúde óssea e imunidade, especialmente após os 30 anos'
    });
  }

  // Magnésio para praticantes de atividade física
  if (goal === 'muscle_gain' || goal === 'endurance') {
    recommendations.push({
      supplement: 'Magnésio',
      reason: 'Auxilia na recuperação muscular e qualidade do sono'
    });
  }

  // Zinco para homens
  if (gender === 'male' && goal === 'muscle_gain') {
    recommendations.push({
      supplement: 'Zinco',
      reason: 'Importante para produção de testosterona e recuperação'
    });
  }

  // Colágeno para mulheres
  if (gender === 'female' && age > 25) {
    recommendations.push({
      supplement: 'Colágeno',
      reason: 'Beneficia pele, cabelos, unhas e articulações'
    });
  }

  // Cafeína para performance
  if (goal === 'endurance' || goal === 'weight_loss') {
    recommendations.push({
      supplement: 'Cafeína (Pré-treino)',
      reason: 'Aumenta energia, foco e performance no treino'
    });
  }

  return recommendations;
}
