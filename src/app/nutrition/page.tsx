'use client';

import { useState, useEffect } from 'react';
import { Utensils, Clock, Flame, RefreshCw, ChevronDown, ChevronUp, ArrowLeftRight, Crown } from 'lucide-react';
import { calculateDailyCalories, calculateMacros, calculateTMB } from '@/lib/constants';
import { Meal, MealPlan, UserProfile } from '@/lib/types';
import { generateMealPlan, getFoodAlternatives, replaceFoodInMeal } from '@/lib/meal-generator';
import { PremiumLock, PremiumBadge } from '@/components/custom/premium-lock';
import Link from 'next/link';

export default function NutritionPage() {
  const [expandedMeal, setExpandedMeal] = useState<string | null>('breakfast');
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [showAlternatives, setShowAlternatives] = useState<{ mealId: string; foodId: string } | null>(null);

  // Mock user data (em produção viria do contexto/estado global)
  const user: UserProfile = {
    id: 'user_1',
    name: 'João Silva',
    email: 'joao@email.com',
    weight: 78,
    height: 175,
    age: 28,
    gender: 'male',
    goal: 'muscle_gain',
    trainingLevel: 'intermediate',
    dietaryRestrictions: [],
    isPremium: false, // Altere para true para testar versão premium
    createdAt: new Date()
  };

  // Gerar plano inicial
  useEffect(() => {
    const plan = generateMealPlan(user);
    setMealPlan(plan);
  }, []);

  // Regenerar plano completo
  const handleRegeneratePlan = () => {
    if (!user.isPremium) return; // Bloqueado para free
    
    const newPlan = generateMealPlan(user);
    setMealPlan(newPlan);
    setExpandedMeal('breakfast');
  };

  // Substituir alimento
  const handleReplaceFood = (mealId: string, oldFoodId: string, newFoodId: string) => {
    if (!mealPlan) return;

    const updatedMeals = mealPlan.meals.map(meal => {
      if (meal.id === mealId) {
        return replaceFoodInMeal(meal, oldFoodId, newFoodId);
      }
      return meal;
    });

    // Recalcular total diário
    const dailyTotal = updatedMeals.reduce((total, meal) => ({
      calories: total.calories + meal.totalNutrition.calories,
      protein: total.protein + meal.totalNutrition.protein,
      carbs: total.carbs + meal.totalNutrition.carbs,
      fats: total.fats + meal.totalNutrition.fats
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

    setMealPlan({
      ...mealPlan,
      meals: updatedMeals,
      dailyTotal
    });

    setShowAlternatives(null);
  };

  if (!mealPlan) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Gerando seu plano alimentar...</p>
        </div>
      </div>
    );
  }

  const tmb = calculateTMB(user.weight, user.height, user.age, user.gender);
  const dailyCalories = calculateDailyCalories(tmb, user.goal, user.trainingLevel);
  const macros = calculateMacros(dailyCalories, user.goal);

  // Limitar refeições para usuários free (apenas 3 primeiras)
  const displayedMeals = user.isPremium ? mealPlan.meals : mealPlan.meals.slice(0, 3);
  const lockedMeals = user.isPremium ? [] : mealPlan.meals.slice(3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-8 pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Plano Alimentar
            </h1>
            {!user.isPremium && <PremiumBadge />}
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Seu cardápio personalizado para hoje
          </p>
        </div>

        {/* Banner Premium para usuários free */}
        {!user.isPremium && (
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 mb-6 text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Crown className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">
                  Desbloqueie Planos Alimentares Avançados
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  Acesse mais de 100 receitas, substituições ilimitadas e planos personalizados para objetivos específicos
                </p>
                <Link
                  href="/premium"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-amber-600 rounded-xl font-bold hover:bg-gray-100 transition-all"
                >
                  Ver Planos Premium
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Resumo Nutricional */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Resumo do Dia
            </h2>
            <button 
              onClick={handleRegeneratePlan}
              disabled={!user.isPremium}
              className={`flex items-center gap-2 text-sm rounded-lg px-3 py-2 transition-all ${
                user.isPremium
                  ? 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              title={!user.isPremium ? 'Recurso Premium' : 'Gerar novo plano'}
            >
              <RefreshCw className="w-4 h-4" />
              Gerar novo plano
              {!user.isPremium && <Crown className="w-4 h-4" />}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Calorias</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {mealPlan.dailyTotal.calories}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Meta: {dailyCalories} kcal
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min((mealPlan.dailyTotal.calories / dailyCalories) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Proteína</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {mealPlan.dailyTotal.protein}g
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Meta: {macros.protein}g
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min((mealPlan.dailyTotal.protein / macros.protein) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-amber-500 rounded-full" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Carboidratos</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {mealPlan.dailyTotal.carbs}g
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Meta: {macros.carbs}g
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 mt-2">
                <div 
                  className="bg-amber-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min((mealPlan.dailyTotal.carbs / macros.carbs) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-emerald-500 rounded-full" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Gorduras</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {mealPlan.dailyTotal.fats}g
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Meta: {macros.fats}g
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 mt-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min((mealPlan.dailyTotal.fats / macros.fats) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Refeições Disponíveis */}
        <div className="space-y-4 mb-4">
          {displayedMeals.map((meal) => (
            <div 
              key={meal.id}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <button
                onClick={() => setExpandedMeal(expandedMeal === meal.id ? null : meal.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <Utensils className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {meal.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {meal.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {meal.totalNutrition.calories} kcal
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      P: {meal.totalNutrition.protein}g • C: {meal.totalNutrition.carbs}g • G: {meal.totalNutrition.fats}g
                    </p>
                  </div>
                  {expandedMeal === meal.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {expandedMeal === meal.id && (
                <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-800 pt-4">
                  <div className="space-y-3">
                    {meal.foods.map((food, index) => (
                      <div key={index}>
                        <div 
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                              {food.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {food.portion}
                            </p>
                          </div>
                          <div className="text-right mr-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {food.nutritionalInfo.calories} kcal
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              P: {food.nutritionalInfo.protein}g
                            </p>
                          </div>
                          <button
                            onClick={() => setShowAlternatives({ mealId: meal.id, foodId: food.id })}
                            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all"
                            title="Trocar alimento"
                          >
                            <ArrowLeftRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          </button>
                        </div>

                        {/* Alternativas */}
                        {showAlternatives?.mealId === meal.id && showAlternatives?.foodId === food.id && (
                          <div className="mt-2 p-3 bg-emerald-50 dark:bg-emerald-950 rounded-xl border border-emerald-200 dark:border-emerald-800">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                              Substituir por:
                            </p>
                            <div className="space-y-2">
                              {getFoodAlternatives(food.id, user.dietaryRestrictions).map(alt => (
                                <button
                                  key={alt.id}
                                  onClick={() => handleReplaceFood(meal.id, food.id, alt.id)}
                                  className="w-full text-left p-2 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all"
                                >
                                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {alt.name}
                                  </p>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    {alt.portion} • {alt.nutritionalInfo.calories} kcal
                                  </p>
                                </button>
                              ))}
                              {getFoodAlternatives(food.id, user.dietaryRestrictions).length === 0 && (
                                <p className="text-sm text-gray-500 dark:text-gray-500">
                                  Nenhuma alternativa disponível
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => setShowAlternatives(null)}
                              className="mt-2 text-xs text-gray-600 dark:text-gray-400 hover:underline"
                            >
                              Cancelar
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Refeições Bloqueadas (Premium) */}
        {lockedMeals.length > 0 && (
          <div className="relative min-h-[400px]">
            <PremiumLock
              feature="advanced_nutrition"
              title="Plano Alimentar Completo"
              description="Desbloqueie todas as 5 refeições diárias e mais de 100 receitas exclusivas"
            >
              <div className="space-y-4">
                {lockedMeals.map((meal) => (
                  <div 
                    key={meal.id}
                    className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                        <Utensils className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                          {meal.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {meal.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </PremiumLock>
          </div>
        )}

        {/* Info adicional */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            💡 <strong>Dica:</strong> Clique no ícone de troca ao lado de cada alimento para ver alternativas. 
            O plano é gerado automaticamente baseado no seu objetivo ({user.goal === 'muscle_gain' ? 'Ganho de Massa' : user.goal === 'weight_loss' ? 'Perda de Peso' : 'Manutenção'}) 
            e suas restrições alimentares.
          </p>
        </div>
      </div>
    </div>
  );
}
