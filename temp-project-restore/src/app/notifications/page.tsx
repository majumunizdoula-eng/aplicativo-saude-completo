'use client';

import { useState, useEffect } from 'react';
import { Bell, BellOff, Clock, Calendar, Utensils, Dumbbell, Pill, FileText, ChevronRight } from 'lucide-react';
import {
  NotificationSettings,
  loadNotificationSettings,
  saveNotificationSettings,
  requestNotificationPermission,
  areNotificationsEnabled,
  notificationMessages,
  sendNotification,
} from '@/lib/notifications';

export default function NotificationsPage() {
  const [settings, setSettings] = useState<NotificationSettings | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [showTestNotification, setShowTestNotification] = useState(false);

  useEffect(() => {
    const loadedSettings = loadNotificationSettings();
    setSettings(loadedSettings);
    setPermissionGranted(areNotificationsEnabled());
  }, []);

  const handleRequestPermission = async () => {
    const granted = await requestNotificationPermission();
    setPermissionGranted(granted);
    if (granted) {
      sendNotification('✅ Notificações Ativadas!', {
        body: 'Você receberá lembretes para treinos, refeições e muito mais.',
      });
    }
  };

  const updateSettings = (newSettings: NotificationSettings) => {
    setSettings(newSettings);
    saveNotificationSettings(newSettings);
  };

  const toggleWorkouts = () => {
    if (!settings) return;
    updateSettings({
      ...settings,
      workouts: { ...settings.workouts, enabled: !settings.workouts.enabled },
    });
  };

  const toggleMeals = () => {
    if (!settings) return;
    updateSettings({
      ...settings,
      meals: { ...settings.meals, enabled: !settings.meals.enabled },
    });
  };

  const toggleSupplements = () => {
    if (!settings) return;
    updateSettings({
      ...settings,
      supplements: { ...settings.supplements, enabled: !settings.supplements.enabled },
    });
  };

  const toggleExams = () => {
    if (!settings) return;
    updateSettings({
      ...settings,
      exams: { ...settings.exams, enabled: !settings.exams.enabled },
    });
  };

  const updateWorkoutTime = (time: string) => {
    if (!settings) return;
    updateSettings({
      ...settings,
      workouts: { ...settings.workouts, time },
    });
  };

  const updateMealTime = (meal: keyof NotificationSettings['meals'], time: string) => {
    if (!settings || meal === 'enabled') return;
    updateSettings({
      ...settings,
      meals: { ...settings.meals, [meal]: time },
    });
  };

  const sendTestNotification = () => {
    sendNotification('🔔 Notificação de Teste', {
      body: 'Suas notificações estão funcionando perfeitamente!',
    });
    setShowTestNotification(true);
    setTimeout(() => setShowTestNotification(false), 3000);
  };

  if (!settings) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-8 pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Notificações
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Configure lembretes para suas atividades diárias
          </p>
        </div>

        {/* Permissão de Notificações */}
        {!permissionGranted && (
          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-xl flex items-center justify-center flex-shrink-0">
                <BellOff className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-2">
                  Ative as Notificações
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-300 mb-4">
                  Permita que o HealthApp envie notificações para você não perder nenhum treino, refeição ou suplemento.
                </p>
                <button
                  onClick={handleRequestPermission}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
                >
                  Ativar Notificações
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Teste de Notificação */}
        {permissionGranted && (
          <div className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100">
                    Notificações Ativadas
                  </h3>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    Você receberá lembretes conforme configurado
                  </p>
                </div>
              </div>
              <button
                onClick={sendTestNotification}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
              >
                Testar
              </button>
            </div>
            {showTestNotification && (
              <div className="mt-4 text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                ✓ Notificação de teste enviada!
              </div>
            )}
          </div>
        )}

        {/* Notificações de Treinos */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 mb-4 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950 rounded-xl flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Treinos
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Lembretes para seus treinos
                  </p>
                </div>
              </div>
              <button
                onClick={toggleWorkouts}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  settings.workouts.enabled
                    ? 'bg-emerald-600'
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.workouts.enabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {settings.workouts.enabled && (
              <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>Horário do lembrete</span>
                  </div>
                  <input
                    type="time"
                    value={settings.workouts.time}
                    onChange={(e) => updateWorkoutTime(e.target.value)}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notificações de Refeições */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 mb-4 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950 rounded-xl flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Refeições
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Lembretes para suas refeições
                  </p>
                </div>
              </div>
              <button
                onClick={toggleMeals}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  settings.meals.enabled
                    ? 'bg-emerald-600'
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.meals.enabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {settings.meals.enabled && (
              <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                {[
                  { key: 'breakfast', label: 'Café da Manhã', icon: '🍳' },
                  { key: 'morningSnack', label: 'Lanche da Manhã', icon: '🍎' },
                  { key: 'lunch', label: 'Almoço', icon: '🍽️' },
                  { key: 'afternoonSnack', label: 'Lanche da Tarde', icon: '🥤' },
                  { key: 'dinner', label: 'Jantar', icon: '🍲' },
                ].map((meal) => (
                  <div key={meal.key} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>{meal.icon}</span>
                      <span>{meal.label}</span>
                    </div>
                    <input
                      type="time"
                      value={settings.meals[meal.key as keyof typeof settings.meals] as string}
                      onChange={(e) => updateMealTime(meal.key as keyof NotificationSettings['meals'], e.target.value)}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Notificações de Suplementos */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 mb-4 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-950 rounded-xl flex items-center justify-center">
                  <Pill className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Suplementos
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Lembretes para tomar suplementos
                  </p>
                </div>
              </div>
              <button
                onClick={toggleSupplements}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  settings.supplements.enabled
                    ? 'bg-emerald-600'
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.supplements.enabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {settings.supplements.enabled && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Horários configurados: {settings.supplements.times.length}
                </p>
                <div className="flex flex-wrap gap-2">
                  {settings.supplements.times.map((time, index) => (
                    <div
                      key={index}
                      className="px-3 py-1.5 bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400 rounded-lg text-sm font-medium"
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notificações de Exames */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 mb-4 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Exames
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Lembretes para exames agendados
                  </p>
                </div>
              </div>
              <button
                onClick={toggleExams}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  settings.exams.enabled
                    ? 'bg-emerald-600'
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.exams.enabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {settings.exams.enabled && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>Lembrar com antecedência</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={settings.exams.advanceDays}
                      onChange={(e) =>
                        updateSettings({
                          ...settings,
                          exams: { ...settings.exams, advanceDays: parseInt(e.target.value) || 7 },
                        })
                      }
                      className="w-16 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-center"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">dias</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-900 dark:text-blue-100 mb-2">
                Sobre as Notificações
              </h3>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• As notificações funcionam mesmo com o app fechado</li>
                <li>• Você pode ajustar os horários a qualquer momento</li>
                <li>• Desative notificações específicas quando não precisar</li>
                <li>• Configure lembretes personalizados para cada atividade</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
