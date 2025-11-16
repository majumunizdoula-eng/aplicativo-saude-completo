'use client';

import { Crown, Lock, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface PremiumLockProps {
  feature: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export function PremiumLock({ feature, title, description, children }: PremiumLockProps) {
  return (
    <div className="relative">
      {/* Conteúdo bloqueado com blur */}
      <div className="pointer-events-none select-none blur-sm opacity-50">
        {children}
      </div>

      {/* Overlay de bloqueio */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm rounded-2xl">
        <div className="text-center px-6 py-8 max-w-md">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Crown className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-2">
            {title || 'Recurso Premium'}
          </h3>
          
          <p className="text-gray-300 mb-6">
            {description || 'Desbloqueie este recurso avançado com o plano Premium'}
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/premium"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
            >
              <Sparkles className="w-5 h-5" />
              Assinar Premium
            </Link>
            
            <Link
              href="/premium"
              className="text-sm text-gray-300 hover:text-white transition-all"
            >
              Ver todos os benefícios →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente de badge premium
export function PremiumBadge({ className = '' }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-xs font-bold ${className}`}>
      <Crown className="w-3.5 h-3.5" />
      PREMIUM
    </div>
  );
}

// Componente de aviso de recurso bloqueado
export function PremiumAlert({ feature, onUpgrade }: { feature: string; onUpgrade?: () => void }) {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <Lock className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
            Recurso Premium Bloqueado
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {feature} está disponível apenas para assinantes Premium
          </p>
          <Link
            href="/premium"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all"
          >
            <Crown className="w-4 h-4" />
            Fazer Upgrade
          </Link>
        </div>
      </div>
    </div>
  );
}
