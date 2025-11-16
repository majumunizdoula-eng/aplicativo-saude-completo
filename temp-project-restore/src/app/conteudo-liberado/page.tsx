'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Crown, Lock, CheckCircle, Sparkles, TrendingUp, Zap } from 'lucide-react';

export default function ConteudoLiberado() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    // Verificar se o usuário tem assinatura premium
    const tier = localStorage.getItem('userSubscriptionTier');
    
    if (tier === 'premium') {
      setHasAccess(true);
      setLoading(false);
    } else {
      // Redirecionar para paywall se não tiver acesso
      setTimeout(() => {
        router.push('/paywall');
      }, 2000);
    }
  }, [router]);

  if (loading || !hasAccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="text-center">
          <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Verificando acesso...
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Aguarde enquanto validamos sua assinatura
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pb-20 md:pb-8 pt-20 md:pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header de Boas-vindas */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full mb-4 animate-bounce">
            <Crown className="w-5 h-5" />
            <span className="text-sm font-bold">ACESSO PREMIUM LIBERADO</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            🎉 Bem-vindo ao Life Live!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Seu pagamento foi confirmado e seu acesso está 100% liberado. Comece agora sua jornada de transformação!
          </p>
        </div>

        {/* Card de Confirmação */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Pagamento Confirmado!
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Seu acesso premium está ativo
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
              <Sparkles className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mb-2" />
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                Acesso Completo
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Todos os recursos desbloqueados
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                Progresso Garantido
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Acompanhamento personalizado
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
              <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                Suporte Prioritário
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Atendimento preferencial
              </p>
            </div>
          </div>
        </div>

        {/* Próximos Passos */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            🚀 Próximos Passos
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                  Complete seu Perfil
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Adicione suas informações para receber recomendações personalizadas
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                  Configure seu Plano Alimentar
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Defina suas preferências e restrições alimentares
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                  Inicie seu Primeiro Treino
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Comece hoje mesmo sua jornada de transformação
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botão de Ação */}
        <div className="text-center">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
          >
            Acessar Dashboard
            <span>→</span>
          </button>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            Comece agora sua transformação! 💪
          </p>
        </div>

        {/* Suporte */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Precisa de ajuda? Entre em contato com nosso suporte:{' '}
            <a href="mailto:suporte@lifelive.com" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
              suporte@lifelive.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
