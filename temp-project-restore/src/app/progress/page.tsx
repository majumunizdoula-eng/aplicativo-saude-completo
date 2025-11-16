'use client';

import { useState } from 'react';
import { TrendingUp, Calendar, Download, Crown, BarChart3, LineChart, PieChart, Activity } from 'lucide-react';
import { PremiumLock, PremiumBadge } from '@/components/custom/premium-lock';
import Link from 'next/link';

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  // Mock user data
  const user = {
    isPremium: false, // Altere para true para testar versão premium
    name: 'João Silva',
  };

  // Dados mockados de progresso
  const progressData = {
    weight: [78, 77.5, 77.2, 76.8, 76.5],
    calories: [2200, 2150, 2300, 2100, 2250],
    workouts: [4, 5, 4, 6, 5],
    supplements: [85, 90, 88, 92, 95], // % de adesão
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-8 pt-20 md:pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Relatórios e Progresso
            </h1>
            {!user.isPremium && <PremiumBadge />}
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Análises detalhadas da sua evolução
          </p>
        </div>

        {/* Banner Premium para usuários free */}
        {!user.isPremium && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 mb-6 text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Crown className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">
                  Desbloqueie Relatórios Detalhados
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  Acesse análises completas, gráficos avançados, exportação de dados e insights personalizados
                </p>
                <Link
                  href="/premium"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-all"
                >
                  Ver Planos Premium
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Resumo Rápido (Disponível para Free) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Peso Atual</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">76.5kg</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">-1.5kg este mês</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Treinos</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">24</p>
            <p className="text-xs text-blue-600 dark:text-blue-400">Este mês</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <LineChart className="w-4 h-4 text-purple-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Calorias Média</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">2200</p>
            <p className="text-xs text-purple-600 dark:text-purple-400">kcal/dia</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <PieChart className="w-4 h-4 text-orange-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Adesão</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">90%</p>
            <p className="text-xs text-orange-600 dark:text-orange-400">Suplementos</p>
          </div>
        </div>

        {/* Conteúdo Bloqueado (Premium) */}
        {!user.isPremium ? (
          <div className="relative min-h-[600px]">
            <PremiumLock
              feature="detailed_reports"
              title="Relatórios Detalhados"
              description="Desbloqueie análises completas, gráficos avançados e exportação de dados"
            >
              <div className="space-y-6">
                {/* Gráfico de Peso */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      Evolução de Peso
                    </h3>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-lg">
                        Semana
                      </button>
                      <button className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-lg">
                        Mês
                      </button>
                      <button className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-lg">
                        Ano
                      </button>
                    </div>
                  </div>
                  <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                    <p className="text-gray-400">Gráfico de Evolução</p>
                  </div>
                </div>

                {/* Gráfico de Calorias */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Consumo Calórico
                  </h3>
                  <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                    <p className="text-gray-400">Gráfico de Calorias</p>
                  </div>
                </div>

                {/* Análise de Macros */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Distribuição de Macronutrientes
                  </h3>
                  <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                    <p className="text-gray-400">Gráfico de Macros</p>
                  </div>
                </div>

                {/* Frequência de Treinos */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Frequência de Treinos
                  </h3>
                  <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                    <p className="text-gray-400">Gráfico de Treinos</p>
                  </div>
                </div>
              </div>
            </PremiumLock>
          </div>
        ) : (
          // Conteúdo Premium Desbloqueado
          <div className="space-y-6">
            {/* Seletor de Período */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedPeriod('week')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedPeriod === 'week'
                      ? 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  Semana
                </button>
                <button
                  onClick={() => setSelectedPeriod('month')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedPeriod === 'month'
                      ? 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  Mês
                </button>
                <button
                  onClick={() => setSelectedPeriod('year')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedPeriod === 'year'
                      ? 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  Ano
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-900 transition-all">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Exportar</span>
              </button>
            </div>

            {/* Gráficos Completos */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Evolução de Peso
                </h3>
                <div className="h-64 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-xl flex items-center justify-center">
                  <p className="text-gray-600 dark:text-gray-400">Gráfico Interativo</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Consumo Calórico
                </h3>
                <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl flex items-center justify-center">
                  <p className="text-gray-600 dark:text-gray-400">Gráfico Interativo</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Distribuição de Macros
                </h3>
                <div className="h-64 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-xl flex items-center justify-center">
                  <p className="text-gray-600 dark:text-gray-400">Gráfico Interativo</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Frequência de Treinos
                </h3>
                <div className="h-64 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl flex items-center justify-center">
                  <p className="text-gray-600 dark:text-gray-400">Gráfico Interativo</p>
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">📊 Insights do Período</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-sm text-white/80 mb-1">Melhor Semana</p>
                  <p className="text-lg font-bold">Semana 3</p>
                  <p className="text-xs text-white/70">6 treinos completos</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-sm text-white/80 mb-1">Maior Adesão</p>
                  <p className="text-lg font-bold">95%</p>
                  <p className="text-xs text-white/70">Suplementação</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
