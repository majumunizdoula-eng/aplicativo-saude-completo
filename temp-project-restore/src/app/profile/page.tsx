'use client';

import Link from 'next/link';
import { User, Mail, Calendar, Target, Dumbbell, Crown, ChevronRight, LogOut, Settings, Bell, Shield } from 'lucide-react';
import { GOALS, TRAINING_LEVELS } from '@/lib/constants';

export default function ProfilePage() {
  // Mock user data
  const user = {
    name: 'João Silva',
    email: 'joao.silva@email.com',
    age: 28,
    weight: 78,
    height: 175,
    gender: 'male' as const,
    goal: 'muscle_gain' as const,
    trainingLevel: 'intermediate' as const,
    isPremium: false,
    createdAt: new Date('2024-01-15')
  };

  const menuItems = [
    {
      icon: Settings,
      label: 'Configurações',
      description: 'Preferências e ajustes',
      href: '/settings'
    },
    {
      icon: Bell,
      label: 'Notificações',
      description: 'Gerencie seus lembretes',
      href: '/notifications'
    },
    {
      icon: Shield,
      label: 'Privacidade',
      description: 'Dados e segurança',
      href: '/privacy'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-8 pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Perfil
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Suas informações e configurações
          </p>
        </div>

        {/* Card do Usuário */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {user.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {user.email}
              </p>
              {!user.isPremium && (
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all">
                  <Crown className="w-4 h-4" />
                  <span className="text-sm font-medium">Upgrade para Premium</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Idade</span>
              </div>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {user.age} anos
              </p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Peso</span>
              </div>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {user.weight} kg
              </p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Altura</span>
              </div>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {user.height} cm
              </p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Dumbbell className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Nível</span>
              </div>
              <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                {TRAINING_LEVELS[user.trainingLevel]}
              </p>
            </div>
          </div>
        </div>

        {/* Objetivo */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
            Objetivo Atual
          </h3>
          <div className="flex items-center justify-between p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-lg">
                  {GOALS[user.goal]}
                </p>
                <p className="text-sm text-white/80">
                  Desde {user.createdAt.toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Menu de Configurações */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden mb-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.href}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-all border-b border-gray-200 dark:border-gray-800 last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900 dark:text-gray-100">
                      {item.label}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            );
          })}
        </div>

        {/* Estatísticas */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
            Suas Estatísticas
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                45
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Treinos
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                92%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Adesão
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                -3kg
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Progresso
              </p>
            </div>
          </div>
        </div>

        {/* Botão Sair */}
        <button className="w-full p-4 flex items-center justify-center gap-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 rounded-2xl transition-all border-2 border-red-200 dark:border-red-800">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sair da Conta</span>
        </button>
      </div>
    </div>
  );
}
