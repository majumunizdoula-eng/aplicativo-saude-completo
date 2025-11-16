'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { UserProfile, Goal, TrainingLevel, Gender } from '@/lib/types';
import { GOALS, TRAINING_LEVELS, DIETARY_RESTRICTIONS } from '@/lib/constants';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '',
    email: '',
    age: 25,
    weight: 70,
    height: 170,
    gender: 'male',
    goal: 'maintenance',
    trainingLevel: 'beginner',
    dietaryRestrictions: [],
    isPremium: false
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Salvar perfil e redirecionar
      const profile: UserProfile = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date()
      } as UserProfile;
      
      localStorage.setItem('userProfile', JSON.stringify(profile));
      router.push('/');
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleRestriction = (restriction: string) => {
    const current = formData.dietaryRestrictions || [];
    if (current.includes(restriction)) {
      updateFormData('dietaryRestrictions', current.filter(r => r !== restriction));
    } else {
      updateFormData('dietaryRestrictions', [...current, restriction]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Passo {step} de {totalSteps}
            </span>
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              {Math.round((step / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {step === 1 && (
            <Step1
              formData={formData}
              updateFormData={updateFormData}
            />
          )}
          {step === 2 && (
            <Step2
              formData={formData}
              updateFormData={updateFormData}
            />
          )}
          {step === 3 && (
            <Step3
              formData={formData}
              updateFormData={updateFormData}
            />
          )}
          {step === 4 && (
            <Step4
              formData={formData}
              toggleRestriction={toggleRestriction}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl ml-auto"
            >
              {step === totalSteps ? 'Finalizar' : 'Próximo'}
              {step === totalSteps ? <CheckCircle2 className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step1({ formData, updateFormData }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Vamos começar!</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Conte-nos um pouco sobre você
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Nome completo</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            placeholder="Seu nome"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Gênero</label>
          <div className="grid grid-cols-3 gap-3">
            {(['male', 'female', 'other'] as Gender[]).map((gender) => (
              <button
                key={gender}
                onClick={() => updateFormData('gender', gender)}
                className={`px-4 py-3 rounded-xl border-2 transition-all ${
                  formData.gender === gender
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                {gender === 'male' ? 'Masculino' : gender === 'female' ? 'Feminino' : 'Outro'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Idade: {formData.age} anos</label>
          <input
            type="range"
            min="15"
            max="80"
            value={formData.age}
            onChange={(e) => updateFormData('age', parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

function Step2({ formData, updateFormData }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Suas medidas</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Essas informações nos ajudam a calcular suas necessidades calóricas
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Peso: {formData.weight} kg</label>
          <input
            type="range"
            min="40"
            max="150"
            value={formData.weight}
            onChange={(e) => updateFormData('weight', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>40kg</span>
            <span>150kg</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Altura: {formData.height} cm</label>
          <input
            type="range"
            min="140"
            max="220"
            value={formData.height}
            onChange={(e) => updateFormData('height', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>140cm</span>
            <span>220cm</span>
          </div>
        </div>

        {/* IMC Calculado */}
        <div className="bg-emerald-50 dark:bg-emerald-950 rounded-xl p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Seu IMC</div>
          <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {((formData.weight || 70) / Math.pow((formData.height || 170) / 100, 2)).toFixed(1)}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {(() => {
              const imc = (formData.weight || 70) / Math.pow((formData.height || 170) / 100, 2);
              if (imc < 18.5) return 'Abaixo do peso';
              if (imc < 25) return 'Peso normal';
              if (imc < 30) return 'Sobrepeso';
              return 'Obesidade';
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}

function Step3({ formData, updateFormData }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Seu objetivo</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Escolha seu objetivo principal e nível de treino
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-3">Objetivo</label>
          <div className="grid grid-cols-2 gap-3">
            {(Object.keys(GOALS) as Goal[]).map((goal) => (
              <button
                key={goal}
                onClick={() => updateFormData('goal', goal)}
                className={`px-4 py-4 rounded-xl border-2 transition-all text-left ${
                  formData.goal === goal
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <div className="font-semibold mb-1">{GOALS[goal]}</div>
                <div className="text-xs text-gray-500">
                  {goal === 'weight_loss' && 'Reduzir gordura corporal'}
                  {goal === 'muscle_gain' && 'Aumentar massa muscular'}
                  {goal === 'maintenance' && 'Manter peso atual'}
                  {goal === 'endurance' && 'Melhorar resistência'}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">Nível de treino</label>
          <div className="space-y-3">
            {(Object.keys(TRAINING_LEVELS) as TrainingLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => updateFormData('trainingLevel', level)}
                className={`w-full px-4 py-4 rounded-xl border-2 transition-all text-left ${
                  formData.trainingLevel === level
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <div className="font-semibold mb-1">{TRAINING_LEVELS[level]}</div>
                <div className="text-xs text-gray-500">
                  {level === 'beginner' && 'Menos de 6 meses de treino'}
                  {level === 'intermediate' && '6 meses a 2 anos de treino'}
                  {level === 'advanced' && 'Mais de 2 anos de treino'}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Step4({ formData, toggleRestriction }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Restrições alimentares</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Selecione suas restrições (opcional)
      </p>

      <div className="grid grid-cols-2 gap-3">
        {DIETARY_RESTRICTIONS.map((restriction) => (
          <button
            key={restriction}
            onClick={() => toggleRestriction(restriction)}
            className={`px-4 py-3 rounded-xl border-2 transition-all ${
              formData.dietaryRestrictions?.includes(restriction)
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
            }`}
          >
            {restriction}
          </button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950 rounded-xl">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          💡 <strong>Dica:</strong> Suas restrições serão consideradas na geração do plano alimentar personalizado.
        </p>
      </div>
    </div>
  );
}
