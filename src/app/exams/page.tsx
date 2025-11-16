'use client';

import { useState } from 'react';
import { FileText, Calendar, Plus, AlertCircle, CheckCircle2, Clock, Upload } from 'lucide-react';
import { MEDICAL_EXAMS } from '@/lib/constants';
import { ExamRecord } from '@/lib/types';

export default function ExamsPage() {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'completed'>('upcoming');

  // Mock exam records
  const examRecords: ExamRecord[] = [
    {
      id: '1',
      userId: 'user1',
      examId: 'hemogram',
      examName: 'Hemograma Completo',
      date: new Date('2024-01-15'),
      nextDate: new Date('2025-01-15'),
      results: 'Normal'
    },
    {
      id: '2',
      userId: 'user1',
      examId: 'lipid_profile',
      examName: 'Perfil Lipídico',
      date: new Date('2024-02-20'),
      nextDate: new Date('2025-02-20'),
      results: 'Normal'
    }
  ];

  // Exames pendentes (próximos 60 dias)
  const upcomingExams = examRecords.filter(exam => {
    const daysUntil = Math.floor((exam.nextDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 60 && daysUntil >= 0;
  });

  // Exames atrasados
  const overdueExams = examRecords.filter(exam => {
    return exam.nextDate < new Date();
  });

  // Exames recomendados que ainda não foram feitos
  const recommendedExams = MEDICAL_EXAMS.filter(exam => 
    !examRecords.some(record => record.examId === exam.id)
  );

  const getDaysUntil = (date: Date) => {
    const days = Math.floor((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-8 pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Exames Médicos
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Acompanhe seus exames e resultados
          </p>
        </div>

        {/* Alertas */}
        {overdueExams.length > 0 && (
          <div className="bg-red-50 dark:bg-red-950 border-2 border-red-200 dark:border-red-800 rounded-2xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-900 dark:text-red-100 mb-1">
                  Exames Atrasados
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Você tem {overdueExams.length} exame(s) que precisam ser refeitos
                </p>
              </div>
            </div>
          </div>
        )}

        {upcomingExams.length > 0 && (
          <div className="bg-amber-50 dark:bg-amber-950 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-900 dark:text-amber-100 mb-1">
                  Exames Próximos
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  {upcomingExams.length} exame(s) devem ser feitos nos próximos 60 dias
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setSelectedTab('upcoming')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
              selectedTab === 'upcoming'
                ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-gray-800'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Próximos
          </button>
          <button
            onClick={() => setSelectedTab('completed')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
              selectedTab === 'completed'
                ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-gray-800'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Realizados
          </button>
        </div>

        {/* Conteúdo das Tabs */}
        {selectedTab === 'upcoming' ? (
          <div className="space-y-4">
            {/* Exames Atrasados */}
            {overdueExams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border-2 border-red-200 dark:border-red-800"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-950 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                        {exam.examName}
                      </h3>
                      <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                        Atrasado há {Math.abs(getDaysUntil(exam.nextDate))} dias
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 text-xs font-medium rounded-full">
                    Atrasado
                  </span>
                </div>
                <button className="w-full py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-all">
                  Agendar Exame
                </button>
              </div>
            ))}

            {/* Exames Próximos */}
            {upcomingExams.map((exam) => {
              const daysUntil = getDaysUntil(exam.nextDate);
              return (
                <div
                  key={exam.id}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-amber-100 dark:bg-amber-950 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                          {exam.examName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Fazer em {daysUntil} dias
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 text-xs font-medium rounded-full">
                      Em breve
                    </span>
                  </div>
                  <button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-teal-700 transition-all">
                    Agendar Exame
                  </button>
                </div>
              );
            })}

            {/* Exames Recomendados */}
            {recommendedExams.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Exames Recomendados
                </h3>
                <div className="space-y-3">
                  {recommendedExams.slice(0, 3).map((exam) => (
                    <div
                      key={exam.id}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                            {exam.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {exam.description}
                          </p>
                          <span className="text-xs px-2 py-1 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 rounded-lg">
                            {exam.frequency}
                          </span>
                        </div>
                        <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all">
                          <Plus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {examRecords.map((exam) => (
              <div
                key={exam.id}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                        {exam.examName}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>Realizado em {exam.date.toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs font-medium rounded-full">
                    {exam.results}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                    Ver Resultados
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-all">
                    <Upload className="w-4 h-4" />
                    Upload
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Botão Adicionar */}
        <button className="fixed bottom-24 md:bottom-12 right-6 w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center">
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
