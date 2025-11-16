'use client';

import { useEffect } from 'react';
import { Activity, Utensils, Dumbbell, Pill, TrendingUp, Flame, Target } from 'lucide-react';
import Link from 'next/link';
import { calculateTMB, calculateDailyCalories, calculateMacros } from '@/lib/constants';
import { getUserTier } from '@/lib/subscription';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  // Verificar assinatura ao carregar
  useEffect(() => {
    const tier = localStorage.getItem('userSubscriptionTier');
    if (tier !== 'premium') {
      router.replace('/paywall');
    }
  }, [router]);

  // Mock user data - em produção viria do contexto/banco
  const user = {
    name: 'João Silva',
    weight: 78,
    height: 175,
    age: 28,
    gender: 'male' as const,
    goal: 'muscle_gain' as const,
    trainingLevel: 'intermediate',
    isPremium: false
  };

  const tmb = calculateTMB(user.weight, user.height, user.age, user.gender);
  const dailyCalories = calculateDailyCalories(tmb, user.goal, user.trainingLevel);
  const macros = calculateMacros(dailyCalories, user.goal);

  const today = {
    caloriesConsumed: 1850,
    proteinConsumed: 120,
    workoutsCompleted: 1,
    workoutsTotal: 1,
    supplementsTaken: 3,
    supplementsTotal: 4,
    waterIntake: 2.1
  };

  const progressPercentage = Math.round((today.caloriesConsumed / dailyCalories) * 100);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-8 pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Olá, {user.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Veja seu progresso de hoje
          </p>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-950 rounded-xl flex items-center justify-center">
                <Flame className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Calorias</p>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {today.caloriesConsumed}
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Meta: {dailyCalories} kcal
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Proteína</p>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {today.proteinConsumed}g
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.min((today.proteinConsumed / macros.protein) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Meta: {macros.protein}g
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-950 rounded-xl flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Treinos</p>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {today.workoutsCompleted}/{today.workoutsTotal}
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                style={{ width: `${(today.workoutsCompleted / today.workoutsTotal) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Completo
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-950 rounded-xl flex items-center justify-center">
                <Pill className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Suplementos</p>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {today.supplementsTaken}/{today.supplementsTotal}
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all"
                style={{ width: `${(today.supplementsTaken / today.supplementsTotal) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Tomados hoje
            </p>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link href="/nutrition" className="group">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full">
                  Próxima refeição
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                Plano Alimentar
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Almoço às 12:30 - Frango com batata doce
              </p>
              <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium group-hover:gap-3 transition-all">
                Ver cardápio completo
                <span>→</span>
              </div>
            </div>
          </Link>

          <Link href="/workouts" className="group">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950 px-3 py-1 rounded-full">
                  Hoje
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                Treino de Hoje
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Treino B - Costas e Bíceps (45 min)
              </p>
              <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 font-medium group-hover:gap-3 transition-all">
                Iniciar treino
                <span>→</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Progresso Semanal */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Progresso Semanal
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sua evolução nos últimos 7 dias
              </p>
            </div>
            <Link href="/progress" className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline">
              Ver detalhes
            </Link>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => {
              const completed = index < 5;
              return (
                <div key={day} className="flex flex-col items-center gap-2">
                  <div className={`w-full aspect-square rounded-xl flex items-center justify-center text-xs font-medium transition-all ${
                    completed 
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                  }`}>
                    {completed ? '✓' : ''}
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
