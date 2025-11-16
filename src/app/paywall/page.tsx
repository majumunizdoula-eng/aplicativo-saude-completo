'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Paywall() {
  const router = useRouter();

  useEffect(() => {
    const tier = localStorage.getItem('userSubscriptionTier');
    if (tier === 'premium') {
      router.replace('/');
    }
  }, [router]);

  const handlePaymentMonthly = () => {
    // Capturar email do usuário antes de redirecionar
    const email = prompt('Digite seu email para continuar:');
    if (email) {
      // Salvar email temporariamente
      localStorage.setItem('pendingEmail', email);
      // Abrir página de pagamento da Kiwify
      window.open(`https://pay.kiwify.com.br/XyBZ0m4?email=${encodeURIComponent(email)}`, "_blank");
      // Redirecionar para página de aguardo
      router.push(`/success?email=${encodeURIComponent(email)}`);
    }
  };

  const handlePaymentAnnual = () => {
    // Capturar email do usuário antes de redirecionar
    const email = prompt('Digite seu email para continuar:');
    if (email) {
      // Salvar email temporariamente
      localStorage.setItem('pendingEmail', email);
      // Abrir página de pagamento da Kiwify
      window.open(`https://pay.kiwify.com.br/pmqhKZA?email=${encodeURIComponent(email)}`, "_blank");
      // Redirecionar para página de aguardo
      router.push(`/success?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Acesse o App Completo</h1>
      <p className="text-gray-600 mb-8">
        Escolha o plano ideal para você e libere todas as funções do app.
      </p>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
        {/* Plano Mensal */}
        <div className="flex-1 border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 transition-colors">
          <h2 className="text-xl font-bold mb-2">Plano Mensal</h2>
          <div className="text-4xl font-bold text-blue-600 mb-4">
            R$ 29,90<span className="text-lg text-gray-500">/mês</span>
          </div>
          <button
            onClick={handlePaymentMonthly}
            className="w-full bg-blue-600 px-6 py-3 rounded-lg text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Assinar Mensal
          </button>
        </div>

        {/* Plano Anual */}
        <div className="flex-1 border-2 border-green-500 rounded-xl p-6 bg-green-50 hover:border-green-600 transition-colors">
          <div className="inline-block bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
            MELHOR OFERTA
          </div>
          <h2 className="text-xl font-bold mb-2">Plano Anual</h2>
          <div className="text-4xl font-bold text-green-600 mb-4">
            R$ 299,90<span className="text-lg text-gray-500">/ano</span>
          </div>
          <button
            onClick={handlePaymentAnnual}
            className="w-full bg-green-600 px-6 py-3 rounded-lg text-white font-semibold hover:bg-green-700 transition-colors"
          >
            Assinar Anual
          </button>
        </div>
      </div>
    </div>
  );
}
