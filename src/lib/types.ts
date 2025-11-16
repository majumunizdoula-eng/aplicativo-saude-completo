// Tipos do aplicativo de saúde

export type Goal = 'weight_loss' | 'muscle_gain' | 'maintenance' | 'endurance';
export type TrainingLevel = 'beginner' | 'intermediate' | 'advanced';
export type Gender = 'male' | 'female' | 'other';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  weight: number; // kg
  height: number; // cm
  gender: Gender;
  goal: Goal;
  trainingLevel: TrainingLevel;
  dietaryRestrictions: string[];
  isPremium: boolean;
  createdAt: Date;
}

export interface NutritionalInfo {
  calories: number;
  protein: number; // g
  carbs: number; // g
  fats: number; // g
}

export interface Food {
  id: string;
  name: string;
  portion: string;
  nutritionalInfo: NutritionalInfo;
  category: 'protein' | 'carb' | 'vegetable' | 'fruit' | 'fat' | 'dairy';
  alternatives?: string[]; // IDs de alimentos alternativos
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  foods: Food[];
  totalNutrition: NutritionalInfo;
}

export interface MealPlan {
  id: string;
  userId: string;
  date: Date;
  meals: Meal[];
  dailyTarget: NutritionalInfo;
  dailyTotal: NutritionalInfo;
}

export interface Exercise {
  id: string;
  name: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'functional';
  muscleGroup: string;
  sets?: number;
  reps?: string;
  duration?: number; // minutos
  videoUrl?: string;
  instructions: string[];
  difficulty: TrainingLevel;
}

export interface WorkoutDay {
  id: string;
  dayOfWeek: number; // 0-6
  name: string;
  exercises: Exercise[];
  estimatedDuration: number; // minutos
  completed: boolean;
}

export interface WorkoutPlan {
  id: string;
  userId: string;
  weekStart: Date;
  days: WorkoutDay[];
}

export interface Supplement {
  id: string;
  name: string;
  dosage: string;
  timing: string[];
  benefits: string[];
  recommendedFor: Goal[];
}

export interface SupplementSchedule {
  id: string;
  userId: string;
  supplement: Supplement;
  times: string[]; // horários do dia
  taken: boolean[];
}

export interface MedicalExam {
  id: string;
  name: string;
  description: string;
  frequency: string; // "anual", "semestral", etc
  recommendedFor: string[];
}

export interface ExamRecord {
  id: string;
  userId: string;
  examId: string;
  examName: string;
  date: Date;
  nextDate: Date;
  results?: string;
  files?: string[];
}

export interface ProgressEntry {
  id: string;
  userId: string;
  date: Date;
  weight: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    thighs?: number;
  };
  photos?: string[];
}

export interface DailyProgress {
  date: Date;
  workoutsCompleted: number;
  workoutsTotal: number;
  mealsFollowed: number;
  mealsTotal: number;
  supplementsTaken: number;
  supplementsTotal: number;
  waterIntake: number; // ml
}

export interface Notification {
  id: string;
  type: 'workout' | 'meal' | 'supplement' | 'exam';
  title: string;
  message: string;
  time: string;
  enabled: boolean;
}
