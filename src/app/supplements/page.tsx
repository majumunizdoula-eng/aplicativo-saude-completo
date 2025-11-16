'use client';

import { useState, useEffect } from 'react';
import { Pill, Clock, CheckCircle2, Circle, Bell, Plus, RefreshCw, Settings, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { SUPPLEMENTS_DATABASE } from '@/lib/constants';
import { generateSupplementProtocol, generateCustomSchedule, checkSupplementReminder, getAdditionalRecommendations } from '@/lib/supplement-generator';
import type { Goal } from '@/lib/types';

export default function SupplementsPage() {
  const [takenSupplements, setTakenSupplements] = useState<string[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [customSchedule, setCustomSchedule] = useState(false);

  // Mock user data (em produção, viria do contexto/state global)
  const userGoal: Goal = 'muscle_gain';
  const userLevel = 'intermediate';
  const trainingDays = 5;
  const userAge = 28;
  const userGender = 'male';
  const budget: 'low' | 'medium' | 'high' = 'medium';

  // Horários customizados
  const [wakeUpTime, setWakeUpTime] = useState('07:00');
  const [workoutTime, setWorkoutTime] = useState('10:00');
  const [sleepTime, setSleepTime] = useState('23:00');

  // Gera protocolo automático
  const protocol = generateSupplementProtocol(userGoal, userLevel, trainingDays, budget);
  
  // Gera horários customizados se ativado
  const schedule = customSchedule 
    ? generateCustomSchedule(
        wakeUpTime, 
        workoutTime, 
        sleepTime, 
        protocol.schedule.flatMap(s => s.supplements)
      )
    : protocol.schedule;

  // Recomendações adicionais
  const additionalRecommendations = getAdditionalRecommendations(userGoal, userAge, userGender);

  // Suplementos recomendados que não estão no protocolo atual
  const currentSupplementIds = schedule.flatMap(s => s.supplements.map(sup => sup.id));
  const recommendedSupplements = SUPPLEMENTS_DATABASE.filter(s => 
    s.recommendedFor.includes(userGoal) && !currentSupplementIds.includes(s.id)
  );

  const totalSupplements = schedule.reduce((acc, s) => acc + s.supplements.length, 0);
  const takenCount = takenSupplements.length;

  const toggleSupplement = (scheduleId: string) => {
    setTakenSupplements(prev => 
      prev.includes(scheduleId) 
        ? prev.filter(id => id !== scheduleId)
        : [...prev, scheduleId]
    );
  };

  // Simula verificação de lembretes
  useEffect(() => {
    if (!notificationsEnabled) return;

    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      const reminder = checkSupplementReminder(schedule, currentTime);
      if (reminder) {
        // Em produção, dispararia notificação real
        console.log('Lembrete:', reminder);
      }
    }, 60000); // Verifica a cada minuto

    return () => clearInterval(interval);
  }, [notificationsEnabled, schedule]);

  const regenerateProtocol = () => {
    setTakenSupplements([]);
    // Em produção, regeneraria com novos parâmetros
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-8 pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Suplementação
            </h1>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl transition-all"
            >
              <Settings className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Protocolo personalizado para {userGoal === 'muscle_gain' ? 'ganho de massa' : 'seu objetivo'}
          </p>
        </div>

        {/* Configurações */}
        {showSettings && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              Configurações
            </h3>
            
            <div className="space-y-4">
              {/* Notificações */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      Lembretes
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receba notificações nos horários
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`w-12 h-6 rounded-full transition-all ${
                    notificationsEnabled 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500' 
                      : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-all ${
                    notificationsEnabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              {/* Horários Customizados */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        Horários Personalizados
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Ajuste baseado na sua rotina
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCustomSchedule(!customSchedule)}
                    className={`w-12 h-6 rounded-full transition-all ${
                      customSchedule 
                        ? 'bg-gradient-to-r from-orange-500 to-red-500' 
                        : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-all ${
                      customSchedule ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                {customSchedule && (
                  <div className="space-y-3 mt-4">
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">
                        Horário de acordar
                      </label>
                      <input
                        type="time"
                        value={wakeUpTime}
                        onChange={(e) => setWakeUpTime(e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">
                        Horário do treino
                      </label>
                      <input
                        type="time"
                        value={workoutTime}
                        onChange={(e) => setWorkoutTime(e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">
                        Horário de dormir
                      </label>
                      <input
                        type="time"
                        value={sleepTime}
                        onChange={(e) => setSleepTime(e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Pill className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {totalSupplements}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Suplementos/dia
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {Math.round((takenCount / totalSupplements) * 100)}%
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Adesão hoje
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  R$ {protocol.estimatedMonthlyCost}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Custo mensal
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progresso do Dia */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Progresso de Hoje
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {takenCount} de {totalSupplements} tomados
              </p>
            </div>
            <button
              onClick={regenerateProtocol}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
              title="Regenerar protocolo"
            >
              <RefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all"
              style={{ width: `${(takenCount / totalSupplements) * 100}%` }}
            />
          </div>
        </div>

        {/* Horários */}
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Cronograma Diário
          </h2>
          
          {schedule.map((slot, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {slot.period}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {slot.time}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {slot.supplements.map((supplement) => {
                  const isTaken = takenSupplements.includes(supplement.scheduleId);
                  
                  return (
                    <div
                      key={supplement.scheduleId}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        isTaken
                          ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500'
                          : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                      onClick={() => toggleSupplement(supplement.scheduleId)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {isTaken ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <Circle className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                            {supplement.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {supplement.dosage}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {supplement.benefits.slice(0, 2).map((benefit, i) => (
                              <span 
                                key={i}
                                className="text-xs px-2 py-1 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 rounded-lg"
                              >
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Recomendações Adicionais */}
        {additionalRecommendations.length > 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Recomendações Extras
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Baseado no seu perfil
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {additionalRecommendations.map((rec, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                >
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {rec.supplement}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {rec.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suplementos Recomendados */}
        {recommendedSupplements.length > 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Outros Suplementos
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Considere adicionar ao seu protocolo
                </p>
              </div>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all">
                <Plus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="space-y-3">
              {recommendedSupplements.map((supplement) => (
                <div
                  key={supplement.id}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Pill className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                        {supplement.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {supplement.dosage}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {supplement.benefits.map((benefit, i) => (
                          <span 
                            key={i}
                            className="text-xs px-2 py-1 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 rounded-lg"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Lembretes */}
        {!notificationsEnabled && (
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">
                  Ative os Lembretes
                </h3>
                <p className="text-sm text-white/90 mb-4">
                  Receba notificações nos horários certos para não esquecer seus suplementos
                </p>
                <button 
                  onClick={() => {
                    setNotificationsEnabled(true);
                    setShowSettings(true);
                  }}
                  className="px-4 py-2 bg-white text-orange-600 rounded-xl font-medium hover:bg-white/90 transition-all"
                >
                  Configurar Lembretes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
