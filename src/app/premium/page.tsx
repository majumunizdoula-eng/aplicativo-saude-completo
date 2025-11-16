'use client';

import { useState } from 'react';
import { Crown, Check, X, CreditCard, Smartphone, FileText, Sparkles, Lock, Unlock, Zap } from 'lucide-react';
import Link from 'next/link';
import { SUBSCRIPTION_PLANS, getUserTier, processPayment, activateSubscription } from '@/lib/subscription';
import { useRouter } from 'next/navigation';

export default function PremiumPage() {
  const [showPayment, setShowPayment] = useState(false);
  const router = useRouter();

  // Verificar tier do usuário
  const userTier = typeof window !== 'undefined' ? getUserTier() : 'none';
  const hasBasic = userTier === 'basic' || userTier === 'premium';
  const hasPremium = userTier === 'premium';

  const handleUpgradeToPremium = () => {
    if (!hasBasic) {
      router.push('/paywall');
      return;
    }
    setShowPayment(true);
  };

  if (showPayment) {
    return <PremiumPaymentScreen onBack={() => setShowPayment(false)} />;
  }

  const premiumPlan = SUBSCRIPTION_PLANS.find(p => p.id === 'premium_addon');

  // Comparação de recursos
  const features = [
    {
      category: 'Treinos',
      basic: 'Treinos personalizados básicos',
      premium: 'Treinos avançados + Periodização + Técnicas exclusivas',
    },
    {
      category: 'Nutrição',
      basic: 'Planos alimentares padrão',
      premium: '+100 receitas exclusivas + Dietas especializadas',
    },
    {
      category: 'Relatórios',
      basic: 'Relatórios básicos',
      premium: 'Relatórios aprofundados + Exportação de dados',
    },
    {
      category: 'Suplementação',
      basic: 'Controle básico',
      premium: 'Suplementação customizada + Recomendações personalizadas',
    },
    {
      category: 'Suporte',
      basic: 'Suporte por email',
      premium: 'Suporte prioritário + Atendimento preferencial',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pb-20 md:pb-8 pt-20 md:pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full mb-4">
            <Crown className="w-5 h-5" />
            <span className="text-sm font-bold">PREMIUM</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Desbloqueie Todo o Potencial
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Acesse recursos avançados, treinos exclusivos e relatórios detalhados para alcançar seus objetivos mais rápido
          </p>
        </div>

        {/* Status do Usuário */}
        {!hasBasic && (
          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-2xl p-6 mb-8 border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-4">
              <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Você precisa de um plano básico primeiro
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  O Premium é um adicional ao plano básico. Escolha primeiro seu plano básico (mensal ou anual).
                </p>
                <Link
                  href="/paywall"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
                >
                  Ver Planos Básicos
                </Link>
              </div>
            </div>
          </div>
        )}

        {hasPremium && (
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 mb-8 text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">
                  🎉 Você já é Premium!
                </h3>
                <p className="text-white/90 text-sm">
                  Aproveite todos os recursos exclusivos disponíveis no app.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Comparação de Recursos */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden mb-12">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-800">
            <div className="p-8">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">Recursos</h3>
              <div className="space-y-6">
                {features.map((feature) => (
                  <div key={feature.category}>
                    <p className="font-bold text-gray-900 dark:text-gray-100 mb-2">{feature.category}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center gap-2 mb-6">
                <Unlock className="w-5 h-5 text-emerald-500" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Básico</h3>
              </div>
              <div className="space-y-6">
                {features.map((feature) => (
                  <div key={feature.category}>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.basic}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
              <div className="flex items-center gap-2 mb-6">
                <Crown className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Premium</h3>
              </div>
              <div className="space-y-6">
                {features.map((feature) => (
                  <div key={feature.category} className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">{feature.premium}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Plano Premium */}
        {!hasPremium && (
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl p-8 text-white shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-4">
                  <Crown className="w-5 h-5" />
                  <span className="text-sm font-bold">UPGRADE PREMIUM</span>
                </div>
                <h2 className="text-3xl font-bold mb-2">
                  {premiumPlan?.name}
                </h2>
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold">
                    R$ {premiumPlan?.price.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-xl opacity-90">
                    pagamento único
                  </span>
                </div>
                <p className="text-white/90 text-sm">
                  Adicional ao seu plano básico
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {premiumPlan?.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-white/95">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleUpgradeToPremium}
                disabled={!hasBasic}
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  hasBasic
                    ? 'bg-white text-amber-600 hover:bg-gray-100 shadow-lg'
                    : 'bg-white/20 text-white/50 cursor-not-allowed'
                }`}
              >
                {hasBasic ? 'Fazer Upgrade Agora' : 'Requer Plano Básico'}
              </button>
            </div>
          </div>
        )}

        {/* Garantia */}
        <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-800 text-center">
          <Sparkles className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Garantia de 7 Dias
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experimente o Premium sem riscos. Se não ficar satisfeito, devolvemos 100% do seu dinheiro nos primeiros 7 dias.
          </p>
        </div>
      </div>
    </div>
  );
}

// Componente de Pagamento Premium
function PremiumPaymentScreen({ onBack }: { onBack: () => void }) {
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'pix' | 'boleto'>('credit_card');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const premiumPlan = SUBSCRIPTION_PLANS.find(p => p.id === 'premium_addon');

  const handlePayment = async () => {
    setProcessing(true);
    
    const result = await processPayment('premium_addon', paymentMethod, {});
    
    if (result.success) {
      await activateSubscription('user_123', 'premium_addon', 'premium');
      setProcessing(false);
      setSuccess(true);
      
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-8 pt-20 md:pt-24 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-800">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Bem-vindo ao Premium!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Seu upgrade foi ativado com sucesso. Aproveite todos os recursos exclusivos!
            </p>
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-8 pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6"
        >
          ← Voltar
        </button>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Resumo */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 h-fit">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Resumo do Upgrade
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Plano</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{premiumPlan?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tipo</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">Pagamento único</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="font-bold text-gray-900 dark:text-gray-100">Total</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">
                    R$ {premiumPlan?.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-2">
                <Crown className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                    Acesso Imediato
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Todos os recursos premium serão liberados assim que o pagamento for confirmado
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pagamento */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Forma de Pagamento
            </h2>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                onClick={() => setPaymentMethod('credit_card')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  paymentMethod === 'credit_card'
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/20'
                    : 'border-gray-200 dark:border-gray-800'
                }`}
              >
                <CreditCard className="w-6 h-6 mx-auto mb-2" />
                <p className="text-xs font-medium">Cartão</p>
              </button>
              <button
                onClick={() => setPaymentMethod('pix')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  paymentMethod === 'pix'
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/20'
                    : 'border-gray-200 dark:border-gray-800'
                }`}
              >
                <Smartphone className="w-6 h-6 mx-auto mb-2" />
                <p className="text-xs font-medium">PIX</p>
              </button>
              <button
                onClick={() => setPaymentMethod('boleto')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  paymentMethod === 'boleto'
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/20'
                    : 'border-gray-200 dark:border-gray-800'
                }`}
              >
                <FileText className="w-6 h-6 mx-auto mb-2" />
                <p className="text-xs font-medium">Boleto</p>
              </button>
            </div>

            {paymentMethod === 'credit_card' && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Número do Cartão"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-amber-500"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/AA"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Nome no Cartão"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            )}

            {paymentMethod === 'pix' && (
              <div className="text-center py-8">
                <div className="w-48 h-48 bg-gray-100 dark:bg-gray-800 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <p className="text-gray-400">QR Code PIX</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Escaneie o QR Code com seu app de banco
                </p>
              </div>
            )}

            {paymentMethod === 'boleto' && (
              <div className="text-center py-8">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  O boleto será gerado após a confirmação
                </p>
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 mt-6"
            >
              {processing ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processando...
                </span>
              ) : (
                `Pagar R$ ${premiumPlan?.price.toFixed(2).replace('.', ',')}`
              )}
            </button>

            <p className="text-xs text-center text-gray-500 mt-4">
              🔒 Pagamento seguro e criptografado
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
