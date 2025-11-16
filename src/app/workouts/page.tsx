'use client';

import { useState, useEffect } from 'react';
import { Dumbbell, Play, CheckCircle2, Clock, Flame, Target, ChevronRight, RefreshCw, Zap, TrendingUp, Info, Crown } from 'lucide-react';
import { Exercise, WorkoutDay, WorkoutPlan } from '@/lib/types';
import { generateWorkoutPlan, replaceExercise, adjustLoad } from '@/lib/workout-generator';
import { PremiumLock, PremiumBadge } from '@/components/custom/premium-lock';
import Link from 'next/link';

export default function WorkoutsPage() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [showLoadInfo, setShowLoadInfo] = useState<string | null>(null);

  // Dados do usuário (mock - em produção viria do contexto/estado global)
  const userProfile = {
    id: 'user_123',
    level: 'intermediate' as const,
    goal: 'muscle_gain' as const,
    daysAvailable: 4,
    isPremium: false // Altere para true para testar versão premium
  };

  // Gerar plano de treino ao carregar
  useEffect(() => {
    const plan = generateWorkoutPlan(
      userProfile.id,
      userProfile.level,
      userProfile.goal,
      userProfile.daysAvailable
    );
    setWorkoutPlan(plan);
    
    // Selecionar primeiro dia disponível
    if (plan.days.length > 0) {
      setSelectedDay(plan.days[0].dayOfWeek);
    }
  }, []);

  // Regenerar plano de treino
  const handleRegeneratePlan = () => {
    if (!userProfile.isPremium) return; // Bloqueado para free
    
    const newPlan = generateWorkoutPlan(
      userProfile.id,
      userProfile.level,
      userProfile.goal,
      userProfile.daysAvailable
    );
    setWorkoutPlan(newPlan);
  };

  // Substituir exercício
  const handleReplaceExercise = (dayId: string, exerciseId: string) => {
    if (!workoutPlan) return;

    const updatedDays = workoutPlan.days.map(day => {
      if (day.id === dayId) {
        const updatedExercises = day.exercises.map(ex => {
          if (ex.id === exerciseId) {
            const replacement = replaceExercise(ex, userProfile.level);
            return replacement || ex;
          }
          return ex;
        });
        return { ...day, exercises: updatedExercises };
      }
      return day;
    });

    setWorkoutPlan({ ...workoutPlan, days: updatedDays });
  };

  // Marcar treino como concluído
  const handleCompleteWorkout = (dayId: string) => {
    if (!workoutPlan) return;

    const updatedDays = workoutPlan.days.map(day => {
      if (day.id === dayId) {
        return { ...day, completed: true };
      }
      return day;
    });

    setWorkoutPlan({ ...workoutPlan, days: updatedDays });
  };

  if (!workoutPlan) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <Dumbbell className="w-12 h-12 text-purple-500 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Gerando seu plano de treino...</p>
        </div>
      </div>
    );
  }

  const currentWorkout = workoutPlan.days.find(w => w.dayOfWeek === selectedDay) || workoutPlan.days[0];
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const completedWorkouts = workoutPlan.days.filter(d => d.completed).length;

  // Limitar exercícios para usuários free (apenas 4 primeiros)
  const displayedExercises = userProfile.isPremium ? currentWorkout.exercises : currentWorkout.exercises.slice(0, 4);
  const lockedExercises = userProfile.isPremium ? [] : currentWorkout.exercises.slice(4);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-8 pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Treinos
            </h1>
            <div className="flex items-center gap-2">
              {!userProfile.isPremium && <PremiumBadge />}
              <button
                onClick={handleRegeneratePlan}
                disabled={!userProfile.isPremium}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  userProfile.isPremium
                    ? 'bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                }`}
                title={!userProfile.isPremium ? 'Recurso Premium' : 'Gerar novo plano'}
              >
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm font-medium">Gerar Novo</span>
                {!userProfile.isPremium && <Crown className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Plano personalizado para {userProfile.level === 'beginner' ? 'iniciante' : userProfile.level === 'intermediate' ? 'intermediário' : 'avançado'} • Objetivo: {userProfile.goal === 'muscle_gain' ? 'Ganho de Massa' : userProfile.goal === 'weight_loss' ? 'Perda de Peso' : userProfile.goal === 'endurance' ? 'Resistência' : 'Manutenção'}
          </p>
        </div>

        {/* Banner Premium para usuários free */}
        {!userProfile.isPremium && (
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 mb-6 text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Crown className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">
                  Desbloqueie Treinos Avançados
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  Acesse periodização completa, técnicas avançadas e treinos para objetivos específicos
                </p>
                <Link
                  href="/premium"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-xl font-bold hover:bg-gray-100 transition-all"
                >
                  Ver Planos Premium
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Seletor de Dias */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-800 mb-6">
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => {
              const hasWorkout = workoutPlan.days.some(w => w.dayOfWeek === index);
              const workout = workoutPlan.days.find(w => w.dayOfWeek === index);
              const isSelected = selectedDay === index;
              
              return (
                <button
                  key={index}
                  onClick={() => hasWorkout && setSelectedDay(index)}
                  disabled={!hasWorkout}
                  className={`relative p-3 rounded-xl transition-all ${
                    isSelected
                      ? 'bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg scale-105'
                      : hasWorkout
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'
                      : 'bg-gray-50 dark:bg-gray-900 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <div className="text-xs font-medium mb-1">{day}</div>
                  {workout?.completed && (
                    <CheckCircle2 className="w-4 h-4 mx-auto text-emerald-500" />
                  )}
                  {hasWorkout && !workout?.completed && (
                    <div className="w-2 h-2 bg-purple-500 rounded-full mx-auto" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Treino do Dia */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {currentWorkout.name}
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{currentWorkout.estimatedDuration} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Dumbbell className="w-4 h-4" />
                  <span>{currentWorkout.exercises.length} exercícios</span>
                </div>
              </div>
            </div>
            {currentWorkout.completed ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-xl">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-medium">Concluído</span>
              </div>
            ) : (
              <button 
                onClick={() => handleCompleteWorkout(currentWorkout.id)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all shadow-lg"
              >
                <Play className="w-5 h-5" />
                <span className="font-medium">Iniciar</span>
              </button>
            )}
          </div>

          {/* Lista de Exercícios Disponíveis */}
          <div className="space-y-3 mb-4">
            {displayedExercises.map((exercise, index) => (
              <div
                key={`${exercise.id}_${index}`}
                className="group p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-750 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                          {exercise.name}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <span className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            {exercise.muscleGroup}
                          </span>
                          {exercise.sets && exercise.reps && (
                            <span className="font-medium text-purple-600 dark:text-purple-400">
                              {exercise.sets} séries × {exercise.reps} reps
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleReplaceExercise(currentWorkout.id, exercise.id)}
                        className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                      >
                        Trocar
                      </button>
                    </div>

                    {/* Informações de Carga */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-3 mb-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-amber-500" />
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {exercise.instructions[0]}
                          </span>
                        </div>
                        <button
                          onClick={() => setShowLoadInfo(showLoadInfo === exercise.id ? null : exercise.id)}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {exercise.instructions[1]}
                      </div>

                      {/* Info expandida */}
                      {showLoadInfo === exercise.id && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">
                            Instruções de execução:
                          </p>
                          <ul className="space-y-1">
                            {exercise.instructions.slice(2).map((instruction, i) => (
                              <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                <span className="text-purple-500 mt-0.5">•</span>
                                <span>{instruction}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Badge de Dificuldade */}
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        exercise.difficulty === 'beginner' 
                          ? 'bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400'
                          : exercise.difficulty === 'intermediate'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400'
                          : 'bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400'
                      }`}>
                        {exercise.difficulty === 'beginner' ? 'Iniciante' : exercise.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Exercícios Bloqueados (Premium) */}
          {lockedExercises.length > 0 && (
            <div className="relative min-h-[300px]">
              <PremiumLock
                feature="advanced_workouts"
                title="Treino Completo"
                description="Desbloqueie todos os exercícios, técnicas avançadas e periodização personalizada"
              >
                <div className="space-y-3">
                  {lockedExercises.map((exercise, index) => (
                    <div
                      key={`${exercise.id}_locked_${index}`}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold">
                          {displayedExercises.length + index + 1}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-gray-100">
                            {exercise.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {exercise.muscleGroup}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </PremiumLock>
            </div>
          )}
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-950 rounded-xl flex items-center justify-center">
                <Flame className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Calorias</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  ~{Math.round(currentWorkout.estimatedDuration * 8)}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Estimativa por treino
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-950 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Progresso</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {completedWorkouts}/{workoutPlan.days.length}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Treinos concluídos
            </p>
          </div>
        </div>

        {/* Dica do Dia */}
        <div className="mt-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold mb-2">💡 Dica de Treino</h3>
              <p className="text-sm text-white/90">
                {userProfile.level === 'beginner' 
                  ? 'Foque na execução correta antes de aumentar a carga. A técnica é fundamental para evitar lesões e maximizar resultados.'
                  : userProfile.level === 'intermediate'
                  ? 'Varie a velocidade de execução: fase concêntrica explosiva e excêntrica controlada (2-3 segundos) para maior hipertrofia.'
                  : 'Implemente técnicas avançadas como drop sets, rest-pause e super séries para quebrar platôs e estimular novos ganhos.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
