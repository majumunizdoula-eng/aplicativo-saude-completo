// Constantes e dados mock do aplicativo

import { Food, Supplement, MedicalExam, Goal } from './types';

export const GOALS = {
  weight_loss: 'Perda de Peso',
  muscle_gain: 'Ganho de Massa',
  maintenance: 'Manutenção',
  endurance: 'Resistência'
};

export const TRAINING_LEVELS = {
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  advanced: 'Avançado'
};

// Cálculo de TMB (Taxa Metabólica Basal) - Fórmula de Harris-Benedict
export function calculateTMB(weight: number, height: number, age: number, gender: 'male' | 'female' | 'other'): number {
  if (gender === 'male') {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
}

// Cálculo de calorias diárias baseado no objetivo
export function calculateDailyCalories(tmb: number, goal: Goal, trainingLevel: string): number {
  const activityMultiplier = {
    beginner: 1.375,
    intermediate: 1.55,
    advanced: 1.725
  }[trainingLevel] || 1.55;

  const tdee = tmb * activityMultiplier;

  const goalAdjustment = {
    weight_loss: -500,
    muscle_gain: 300,
    maintenance: 0,
    endurance: 200
  }[goal] || 0;

  return Math.round(tdee + goalAdjustment);
}

// Cálculo de macros
export function calculateMacros(calories: number, goal: Goal) {
  const macroRatios = {
    weight_loss: { protein: 0.35, carbs: 0.30, fats: 0.35 },
    muscle_gain: { protein: 0.30, carbs: 0.45, fats: 0.25 },
    maintenance: { protein: 0.30, carbs: 0.40, fats: 0.30 },
    endurance: { protein: 0.25, carbs: 0.50, fats: 0.25 }
  }[goal];

  return {
    protein: Math.round((calories * macroRatios.protein) / 4),
    carbs: Math.round((calories * macroRatios.carbs) / 4),
    fats: Math.round((calories * macroRatios.fats) / 9)
  };
}

// Base de alimentos expandida
export const FOODS_DATABASE: Food[] = [
  // Proteínas - Carnes
  {
    id: 'chicken_breast',
    name: 'Peito de Frango Grelhado',
    portion: '150g',
    category: 'protein',
    nutritionalInfo: { calories: 165, protein: 31, carbs: 0, fats: 3.6 }
  },
  {
    id: 'chicken_thigh',
    name: 'Coxa de Frango',
    portion: '150g',
    category: 'protein',
    nutritionalInfo: { calories: 210, protein: 26, carbs: 0, fats: 11 }
  },
  {
    id: 'ground_beef',
    name: 'Carne Moída Magra',
    portion: '150g',
    category: 'protein',
    nutritionalInfo: { calories: 250, protein: 26, carbs: 0, fats: 15 }
  },
  {
    id: 'steak',
    name: 'Filé Mignon',
    portion: '150g',
    category: 'protein',
    nutritionalInfo: { calories: 220, protein: 30, carbs: 0, fats: 10 }
  },
  
  // Proteínas - Peixes
  {
    id: 'salmon',
    name: 'Salmão Grelhado',
    portion: '150g',
    category: 'protein',
    nutritionalInfo: { calories: 280, protein: 30, carbs: 0, fats: 17 }
  },
  {
    id: 'tilapia',
    name: 'Tilápia Grelhada',
    portion: '150g',
    category: 'protein',
    nutritionalInfo: { calories: 150, protein: 30, carbs: 0, fats: 3 }
  },
  {
    id: 'tuna',
    name: 'Atum em Água',
    portion: '100g',
    category: 'protein',
    nutritionalInfo: { calories: 116, protein: 26, carbs: 0, fats: 1 }
  },
  {
    id: 'cod',
    name: 'Bacalhau',
    portion: '150g',
    category: 'protein',
    nutritionalInfo: { calories: 135, protein: 29, carbs: 0, fats: 1.5 }
  },
  
  // Proteínas - Ovos e Laticínios
  {
    id: 'eggs',
    name: 'Ovos Mexidos',
    portion: '2 unidades',
    category: 'protein',
    nutritionalInfo: { calories: 140, protein: 12, carbs: 1, fats: 10 }
  },
  {
    id: 'egg_whites',
    name: 'Claras de Ovo',
    portion: '4 unidades',
    category: 'protein',
    nutritionalInfo: { calories: 68, protein: 14, carbs: 1, fats: 0 }
  },
  {
    id: 'cottage_cheese',
    name: 'Queijo Cottage',
    portion: '100g',
    category: 'protein',
    nutritionalInfo: { calories: 98, protein: 11, carbs: 3, fats: 4 }
  },
  {
    id: 'greek_yogurt',
    name: 'Iogurte Grego Natural',
    portion: '150g',
    category: 'protein',
    nutritionalInfo: { calories: 100, protein: 17, carbs: 6, fats: 0.5 }
  },

  // Proteínas - Vegetais
  {
    id: 'tofu',
    name: 'Tofu Grelhado',
    portion: '150g',
    category: 'protein',
    nutritionalInfo: { calories: 120, protein: 14, carbs: 3, fats: 6 }
  },
  {
    id: 'tempeh',
    name: 'Tempeh',
    portion: '100g',
    category: 'protein',
    nutritionalInfo: { calories: 193, protein: 19, carbs: 9, fats: 11 }
  },
  {
    id: 'lentils',
    name: 'Lentilhas Cozidas',
    portion: '150g',
    category: 'protein',
    nutritionalInfo: { calories: 165, protein: 12, carbs: 28, fats: 1 }
  },
  
  // Carboidratos - Grãos
  {
    id: 'brown_rice',
    name: 'Arroz Integral',
    portion: '150g cozido',
    category: 'carb',
    nutritionalInfo: { calories: 170, protein: 4, carbs: 35, fats: 1.5 }
  },
  {
    id: 'white_rice',
    name: 'Arroz Branco',
    portion: '150g cozido',
    category: 'carb',
    nutritionalInfo: { calories: 195, protein: 4, carbs: 43, fats: 0.5 }
  },
  {
    id: 'quinoa',
    name: 'Quinoa',
    portion: '150g cozida',
    category: 'carb',
    nutritionalInfo: { calories: 170, protein: 6, carbs: 30, fats: 3 }
  },
  {
    id: 'oats',
    name: 'Aveia',
    portion: '50g',
    category: 'carb',
    nutritionalInfo: { calories: 190, protein: 7, carbs: 32, fats: 4 }
  },
  {
    id: 'granola',
    name: 'Granola',
    portion: '40g',
    category: 'carb',
    nutritionalInfo: { calories: 180, protein: 4, carbs: 28, fats: 6 }
  },
  
  // Carboidratos - Tubérculos
  {
    id: 'sweet_potato',
    name: 'Batata Doce',
    portion: '200g',
    category: 'carb',
    nutritionalInfo: { calories: 180, protein: 2, carbs: 41, fats: 0.3 }
  },
  {
    id: 'potato',
    name: 'Batata Inglesa',
    portion: '200g',
    category: 'carb',
    nutritionalInfo: { calories: 160, protein: 4, carbs: 37, fats: 0.2 }
  },
  {
    id: 'cassava',
    name: 'Mandioca Cozida',
    portion: '150g',
    category: 'carb',
    nutritionalInfo: { calories: 180, protein: 1, carbs: 42, fats: 0.3 }
  },
  
  // Carboidratos - Pães e Massas
  {
    id: 'whole_bread',
    name: 'Pão Integral',
    portion: '2 fatias',
    category: 'carb',
    nutritionalInfo: { calories: 140, protein: 6, carbs: 24, fats: 2 }
  },
  {
    id: 'french_bread',
    name: 'Pão Francês',
    portion: '1 unidade',
    category: 'carb',
    nutritionalInfo: { calories: 140, protein: 4, carbs: 28, fats: 1 }
  },
  {
    id: 'whole_pasta',
    name: 'Macarrão Integral',
    portion: '100g cozido',
    category: 'carb',
    nutritionalInfo: { calories: 150, protein: 6, carbs: 30, fats: 1 }
  },
  {
    id: 'tapioca',
    name: 'Tapioca',
    portion: '2 unidades',
    category: 'carb',
    nutritionalInfo: { calories: 140, protein: 0, carbs: 35, fats: 0 }
  },

  // Vegetais - Folhas
  {
    id: 'salad',
    name: 'Salada Verde Mista',
    portion: '100g',
    category: 'vegetable',
    nutritionalInfo: { calories: 20, protein: 1, carbs: 4, fats: 0.2 }
  },
  {
    id: 'spinach',
    name: 'Espinafre',
    portion: '100g',
    category: 'vegetable',
    nutritionalInfo: { calories: 23, protein: 3, carbs: 4, fats: 0.4 }
  },
  {
    id: 'kale',
    name: 'Couve',
    portion: '100g',
    category: 'vegetable',
    nutritionalInfo: { calories: 35, protein: 3, carbs: 6, fats: 0.7 }
  },
  
  // Vegetais - Crucíferos
  {
    id: 'broccoli',
    name: 'Brócolis',
    portion: '100g',
    category: 'vegetable',
    nutritionalInfo: { calories: 35, protein: 3, carbs: 7, fats: 0.4 }
  },
  {
    id: 'cauliflower',
    name: 'Couve-flor',
    portion: '100g',
    category: 'vegetable',
    nutritionalInfo: { calories: 25, protein: 2, carbs: 5, fats: 0.3 }
  },
  {
    id: 'cabbage',
    name: 'Repolho',
    portion: '100g',
    category: 'vegetable',
    nutritionalInfo: { calories: 25, protein: 1, carbs: 6, fats: 0.1 }
  },
  
  // Vegetais - Outros
  {
    id: 'tomato',
    name: 'Tomate',
    portion: '100g',
    category: 'vegetable',
    nutritionalInfo: { calories: 18, protein: 1, carbs: 4, fats: 0.2 }
  },
  {
    id: 'cucumber',
    name: 'Pepino',
    portion: '100g',
    category: 'vegetable',
    nutritionalInfo: { calories: 15, protein: 1, carbs: 4, fats: 0.1 }
  },
  {
    id: 'carrot',
    name: 'Cenoura',
    portion: '100g',
    category: 'vegetable',
    nutritionalInfo: { calories: 41, protein: 1, carbs: 10, fats: 0.2 }
  },
  {
    id: 'zucchini',
    name: 'Abobrinha',
    portion: '100g',
    category: 'vegetable',
    nutritionalInfo: { calories: 17, protein: 1, carbs: 3, fats: 0.3 }
  },

  // Frutas - Cítricas
  {
    id: 'orange',
    name: 'Laranja',
    portion: '1 unidade',
    category: 'fruit',
    nutritionalInfo: { calories: 62, protein: 1, carbs: 15, fats: 0.2 }
  },
  {
    id: 'apple',
    name: 'Maçã',
    portion: '1 unidade',
    category: 'fruit',
    nutritionalInfo: { calories: 95, protein: 0.5, carbs: 25, fats: 0.3 }
  },
  
  // Frutas - Tropicais
  {
    id: 'banana',
    name: 'Banana',
    portion: '1 unidade',
    category: 'fruit',
    nutritionalInfo: { calories: 105, protein: 1, carbs: 27, fats: 0.4 }
  },
  {
    id: 'papaya',
    name: 'Mamão',
    portion: '1 fatia (150g)',
    category: 'fruit',
    nutritionalInfo: { calories: 60, protein: 1, carbs: 15, fats: 0.2 }
  },
  {
    id: 'pineapple',
    name: 'Abacaxi',
    portion: '2 fatias',
    category: 'fruit',
    nutritionalInfo: { calories: 82, protein: 1, carbs: 22, fats: 0.2 }
  },
  {
    id: 'mango',
    name: 'Manga',
    portion: '1/2 unidade',
    category: 'fruit',
    nutritionalInfo: { calories: 100, protein: 1, carbs: 25, fats: 0.4 }
  },
  
  // Frutas - Berries
  {
    id: 'strawberry',
    name: 'Morango',
    portion: '100g',
    category: 'fruit',
    nutritionalInfo: { calories: 32, protein: 1, carbs: 8, fats: 0.3 }
  },
  {
    id: 'blueberry',
    name: 'Mirtilo',
    portion: '100g',
    category: 'fruit',
    nutritionalInfo: { calories: 57, protein: 1, carbs: 14, fats: 0.3 }
  },
  {
    id: 'watermelon',
    name: 'Melancia',
    portion: '200g',
    category: 'fruit',
    nutritionalInfo: { calories: 60, protein: 1, carbs: 15, fats: 0.2 }
  },

  // Gorduras - Óleos e Sementes
  {
    id: 'olive_oil',
    name: 'Azeite de Oliva',
    portion: '1 colher sopa',
    category: 'fat',
    nutritionalInfo: { calories: 120, protein: 0, carbs: 0, fats: 14 }
  },
  {
    id: 'coconut_oil',
    name: 'Óleo de Coco',
    portion: '1 colher sopa',
    category: 'fat',
    nutritionalInfo: { calories: 117, protein: 0, carbs: 0, fats: 14 }
  },
  
  // Gorduras - Oleaginosas
  {
    id: 'nuts',
    name: 'Castanhas Mistas',
    portion: '30g',
    category: 'fat',
    nutritionalInfo: { calories: 180, protein: 5, carbs: 6, fats: 16 }
  },
  {
    id: 'almonds',
    name: 'Amêndoas',
    portion: '30g',
    category: 'fat',
    nutritionalInfo: { calories: 170, protein: 6, carbs: 6, fats: 15 }
  },
  {
    id: 'walnuts',
    name: 'Nozes',
    portion: '30g',
    category: 'fat',
    nutritionalInfo: { calories: 185, protein: 4, carbs: 4, fats: 18 }
  },
  {
    id: 'peanut_butter',
    name: 'Pasta de Amendoim',
    portion: '1 colher sopa',
    category: 'fat',
    nutritionalInfo: { calories: 95, protein: 4, carbs: 3, fats: 8 }
  },
  {
    id: 'chia',
    name: 'Chia',
    portion: '1 colher sopa',
    category: 'fat',
    nutritionalInfo: { calories: 60, protein: 2, carbs: 5, fats: 4 }
  },
  {
    id: 'flaxseed',
    name: 'Linhaça',
    portion: '1 colher sopa',
    category: 'fat',
    nutritionalInfo: { calories: 55, protein: 2, carbs: 3, fats: 4 }
  },
  
  // Gorduras - Abacate
  {
    id: 'avocado',
    name: 'Abacate',
    portion: '1/2 unidade',
    category: 'fat',
    nutritionalInfo: { calories: 160, protein: 2, carbs: 9, fats: 15 }
  }
];

// Suplementos
export const SUPPLEMENTS_DATABASE: Supplement[] = [
  {
    id: 'whey',
    name: 'Whey Protein',
    dosage: '30g (1 scoop)',
    timing: ['Pós-treino', 'Café da manhã'],
    benefits: ['Recuperação muscular', 'Síntese proteica', 'Praticidade'],
    recommendedFor: ['muscle_gain', 'weight_loss', 'maintenance']
  },
  {
    id: 'creatine',
    name: 'Creatina',
    dosage: '5g',
    timing: ['Pós-treino'],
    benefits: ['Força', 'Ganho de massa', 'Performance'],
    recommendedFor: ['muscle_gain', 'endurance']
  },
  {
    id: 'omega3',
    name: 'Ômega 3',
    dosage: '1-2 cápsulas',
    timing: ['Café da manhã', 'Jantar'],
    benefits: ['Saúde cardiovascular', 'Anti-inflamatório', 'Recuperação'],
    recommendedFor: ['weight_loss', 'muscle_gain', 'maintenance', 'endurance']
  },
  {
    id: 'multivitamin',
    name: 'Multivitamínico',
    dosage: '1 cápsula',
    timing: ['Café da manhã'],
    benefits: ['Imunidade', 'Energia', 'Saúde geral'],
    recommendedFor: ['weight_loss', 'muscle_gain', 'maintenance', 'endurance']
  },
  {
    id: 'bcaa',
    name: 'BCAA',
    dosage: '5g',
    timing: ['Pré-treino', 'Intra-treino'],
    benefits: ['Recuperação', 'Reduz fadiga', 'Preserva massa muscular'],
    recommendedFor: ['muscle_gain', 'endurance']
  }
];

// Exames médicos recomendados
export const MEDICAL_EXAMS: MedicalExam[] = [
  {
    id: 'hemogram',
    name: 'Hemograma Completo',
    description: 'Avalia células sanguíneas e detecta anemia, infecções e outros problemas',
    frequency: 'Anual',
    recommendedFor: ['Todos']
  },
  {
    id: 'lipid_profile',
    name: 'Perfil Lipídico',
    description: 'Mede colesterol total, HDL, LDL e triglicerídeos',
    frequency: 'Anual',
    recommendedFor: ['Todos']
  },
  {
    id: 'glucose',
    name: 'Glicemia em Jejum',
    description: 'Avalia níveis de açúcar no sangue',
    frequency: 'Anual',
    recommendedFor: ['Todos']
  },
  {
    id: 'thyroid',
    name: 'Função Tireoidiana (TSH, T3, T4)',
    description: 'Avalia funcionamento da tireoide',
    frequency: 'Anual',
    recommendedFor: ['Todos']
  },
  {
    id: 'vitamin_d',
    name: 'Vitamina D',
    description: 'Mede níveis de vitamina D no organismo',
    frequency: 'Anual',
    recommendedFor: ['Praticantes de atividade física']
  },
  {
    id: 'testosterone',
    name: 'Testosterona Total e Livre',
    description: 'Avalia níveis hormonais',
    frequency: 'Anual',
    recommendedFor: ['Homens praticantes de musculação']
  },
  {
    id: 'liver',
    name: 'Função Hepática (TGO, TGP)',
    description: 'Avalia saúde do fígado',
    frequency: 'Anual',
    recommendedFor: ['Usuários de suplementos']
  },
  {
    id: 'kidney',
    name: 'Função Renal (Creatinina, Ureia)',
    description: 'Avalia saúde dos rins',
    frequency: 'Anual',
    recommendedFor: ['Dieta hiperproteica']
  }
];

// Restrições alimentares comuns
export const DIETARY_RESTRICTIONS = [
  'Vegetariano',
  'Vegano',
  'Sem Lactose',
  'Sem Glúten',
  'Sem Frutos do Mar',
  'Sem Amendoim',
  'Low Carb',
  'Sem Açúcar'
];
