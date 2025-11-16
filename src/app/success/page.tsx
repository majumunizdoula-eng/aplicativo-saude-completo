'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PagamentoSucesso() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const secretKey = params.get('key');

    // VERIFICAÇÃO: só libera premium se a Kiwify mandar a chave correta
    if (secretKey === 'VIDA2025') {
      localStorage.setItem('userSubscriptionTier', 'premium');
      router.push('/');
    } else {
      // Se alguém tentar abrir manualmente, volta para o paywall
      router.push('/paywall');
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-3xl font-bold mb-4">Validando pagamento...</h1>
      <p className="text-gray-700">Aguarde um momento...</p>
    </div>
  );
}
