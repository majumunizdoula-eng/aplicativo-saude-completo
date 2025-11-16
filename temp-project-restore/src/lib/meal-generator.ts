// Sistema de geração automática de plano alimentar

import { Food, Meal, MealPlan, NutritionalInfo, Goal, UserProfile } from './types';
import { FOODS_DATABASE, calculateDailyCalories, calculateMacros, calculateTMB } from './constants';

// Distribuição de calorias por refeição (%)
const MEAL_DISTRIBUTION = {
  breakfast: 0.25,      // 25%
  snack1: 0.10,         // 10%
  lunch: 0.30,          // 30%
  snack2: 0.10,         // 10%
  dinner: 0.25          // 25%
};

// Estrutura de refeições
const MEAL_STRUCTURE = [
  { id: 'breakfast', name: 'Café da Manhã', time: '07:00' },
  { id: 'snack1', name: 'Lanche da Manhã', time: '10:00' },
  { id: 'lunch', name: 'Almoço', time: '12:30' },
  { id: 'snack2', name: 'Lanche da Tarde', time: '16:00' },
  { id: 'dinner', name: 'Jantar', time: '19:30' }
];

// Filtrar alimentos por restrições
export function filterFoodsByRestrictions(foods: Food[], restrictions: string[]): Food[] {
  return foods.filter(food => {
    // Vegetariano: remove carnes e peixes
    if (restrictions.includes('Vegetariano')) {
      if (['chicken_breast', 'salmon', 'tilapia'].includes(food.id)) return false;
    }
    
    // Vegano: remove todos os produtos animais
    if (restrictions.includes('Vegano')) {
      if (['chicken_breast', 'salmon', 'tilapia', 'eggs'].includes(food.id)) return false;
    }
    
    // Sem Lactose
    if (restrictions.includes('Sem Lactose')) {
      if (food.category === 'dairy') return false;
    }
    
    // Sem Frutos do Mar
    if (restrictions.includes('Sem Frutos do Mar')) {
      if (['salmon', 'tilapia'].includes(food.id)) return false;
    }
    
    return true;
  });
}

// Calcular nutrição total de uma lista de alimentos
export function calculateTotalNutrition(foods: Food[]): NutritionalInfo {
  return foods.reduce((total, food) => ({
    calories: total.calories + food.nutritionalInfo.calories,
    protein: total.protein + food.nutritionalInfo.protein,
    carbs: total.carbs + food.nutritionalInfo.carbs,
    fats: total.fats + food.nutritionalInfo.fats
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
}

// Selecionar alimentos para atingir macros alvo
function selectFoodsForMeal(
  availableFoods: Food[],
  targetNutrition: NutritionalInfo,
  mealType: string
): Food[] {
  const selectedFoods: Food[] = [];
  
  // Estratégia baseada no tipo de refeição
  if (mealType === 'breakfast') {
    // Café da manhã: proteína + carbo + gordura saudável + fruta
    const protein = availableFoods.find(f => f.category === 'protein' && f.id === 'eggs');
    const carb = availableFoods.find(f => f.category === 'carb' && f.id === 'whole_bread');
    const fat = availableFoods.find(f => f.category === 'fat' && f.id === 'avocado');
    const fruit = availableFoods.find(f => f.category === 'fruit' && f.id === 'banana');
    
    if (protein) selectedFoods.push(protein);
    if (carb) selectedFoods.push(carb);
    if (fat) selectedFoods.push(fat);
    if (fruit) selectedFoods.push(fruit);
  } 
  else if (mealType === 'snack1' || mealType === 'snack2') {
    // Lanches: fruta + gordura boa OU proteína + carbo
    if (mealType === 'snack1') {
      const fruit = availableFoods.find(f => f.category === 'fruit' && f.id === 'apple');
      const fat = availableFoods.find(f => f.category === 'fat' && f.id === 'nuts');
      if (fruit) selectedFoods.push(fruit);
      if (fat) selectedFoods.push(fat);
    } else {
      // Lanche pós-treino: proteína + carbo
      const protein: Food = {
        id: 'whey_shake',
        name: 'Whey Protein Shake',
        portion: '30g',
        category: 'protein',
        nutritionalInfo: { calories: 120, protein: 24, carbs: 3, fats: 1 }
      };
      const carb = availableFoods.find(f => f.category === 'carb' && f.id === 'oats');
      selectedFoods.push(protein);
      if (carb) selectedFoods.push(carb);
    }
  }
  else if (mealType === 'lunch' || mealType === 'dinner') {
    // Refeições principais: proteína + carbo + vegetal + gordura
    const proteins = availableFoods.filter(f => f.category === 'protein');
    const carbs = availableFoods.filter(f => f.category === 'carb');
    const vegetables = availableFoods.filter(f => f.category === 'vegetable');
    const fats = availableFoods.filter(f => f.category === 'fat' && f.id === 'olive_oil');
    
    // Variar proteínas entre almoço e jantar
    if (mealType === 'lunch') {
      const protein = proteins.find(f => f.id === 'chicken_breast') || proteins[0];
      const carb = carbs.find(f => f.id === 'sweet_potato') || carbs[0];
      const vegetable = vegetables.find(f => f.id === 'broccoli') || vegetables[0];
      const fat = fats[0];
      
      if (protein) selectedFoods.push(protein);
      if (carb) selectedFoods.push(carb);
      if (vegetable) selectedFoods.push(vegetable);
      if (fat) selectedFoods.push(fat);
    } else {
      const protein = proteins.find(f => f.id === 'salmon') || proteins.find(f => f.id === 'tilapia') || proteins[0];
      const carb = carbs.find(f => f.id === 'brown_rice') || carbs[0];
      const vegetable = vegetables.find(f => f.id === 'salad') || vegetables[0];
      
      if (protein) selectedFoods.push(protein);
      if (carb) selectedFoods.push(carb);
      if (vegetable) selectedFoods.push(vegetable);
    }
  }
  
  return selectedFoods;
}

// Gerar plano alimentar completo
export function generateMealPlan(user: UserProfile): MealPlan {
  // Calcular necessidades nutricionais
  const tmb = calculateTMB(user.weight, user.height, user.age, user.gender);
  const dailyCalories = calculateDailyCalories(tmb, user.goal, user.trainingLevel);
  const dailyMacros = calculateMacros(dailyCalories, user.goal);
  
  const dailyTarget: NutritionalInfo = {
    calories: dailyCalories,
    protein: dailyMacros.protein,
    carbs: dailyMacros.carbs,
    fats: dailyMacros.fats
  };
  
  // Filtrar alimentos disponíveis por restrições
  const availableFoods = filterFoodsByRestrictions(FOODS_DATABASE, user.dietaryRestrictions);
  
  // Gerar refeições
  const meals: Meal[] = MEAL_STRUCTURE.map(mealInfo => {
    const mealCalories = Math.round(dailyCalories * MEAL_DISTRIBUTION[mealInfo.id as keyof typeof MEAL_DISTRIBUTION]);
    const mealProtein = Math.round(dailyMacros.protein * MEAL_DISTRIBUTION[mealInfo.id as keyof typeof MEAL_DISTRIBUTION]);
    const mealCarbs = Math.round(dailyMacros.carbs * MEAL_DISTRIBUTION[mealInfo.id as keyof typeof MEAL_DISTRIBUTION]);
    const mealFats = Math.round(dailyMacros.fats * MEAL_DISTRIBUTION[mealInfo.id as keyof typeof MEAL_DISTRIBUTION]);
    
    const targetNutrition: NutritionalInfo = {
      calories: mealCalories,
      protein: mealProtein,
      carbs: mealCarbs,
      fats: mealFats
    };
    
    const foods = selectFoodsForMeal(availableFoods, targetNutrition, mealInfo.id);
    const totalNutrition = calculateTotalNutrition(foods);
    
    return {
      id: mealInfo.id,
      name: mealInfo.name,
      time: mealInfo.time,
      foods,
      totalNutrition
    };
  });
  
  // Calcular total diário
  const dailyTotal = meals.reduce((total, meal) => ({
    calories: total.calories + meal.totalNutrition.calories,
    protein: total.protein + meal.totalNutrition.protein,
    carbs: total.carbs + meal.totalNutrition.carbs,
    fats: total.fats + meal.totalNutrition.fats
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
  
  return {
    id: `plan_${Date.now()}`,
    userId: user.id,
    date: new Date(),
    meals,
    dailyTarget,
    dailyTotal
  };
}

// Obter alternativas para um alimento
export function getFoodAlternatives(foodId: string, restrictions: string[]): Food[] {
  const food = FOODS_DATABASE.find(f => f.id === foodId);
  if (!food) return [];
  
  // Buscar alimentos da mesma categoria
  const alternatives = FOODS_DATABASE.filter(f => 
    f.id !== foodId && 
    f.category === food.category
  );
  
  // Filtrar por restrições
  return filterFoodsByRestrictions(alternatives, restrictions);
}

// Substituir alimento em uma refeição
export function replaceFoodInMeal(
  meal: Meal, 
  oldFoodId: string, 
  newFoodId: string
): Meal {
  const newFood = FOODS_DATABASE.find(f => f.id === newFoodId);
  if (!newFood) return meal;
  
  const updatedFoods = meal.foods.map(food => 
    food.id === oldFoodId ? newFood : food
  );
  
  const totalNutrition = calculateTotalNutrition(updatedFoods);
  
  return {
    ...meal,
    foods: updatedFoods,
    totalNutrition
  };
}

// Ajustar porções para atingir meta de calorias
export function adjustPortionsToTarget(
  foods: Food[],
  targetCalories: number
): Food[] {
  const currentCalories = calculateTotalNutrition(foods).calories;
  const ratio = targetCalories / currentCalories;
  
  // Se a diferença for pequena (<10%), não ajustar
  if (Math.abs(ratio - 1) < 0.1) return foods;
  
  // Ajustar proporcionalmente (simplificado)
  return foods.map(food => ({
    ...food,
    nutritionalInfo: {
      calories: Math.round(food.nutritionalInfo.calories * ratio),
      protein: Math.round(food.nutritionalInfo.protein * ratio),
      carbs: Math.round(food.nutritionalInfo.carbs * ratio),
      fats: Math.round(food.nutritionalInfo.fats * ratio)
    }
  }));
}
