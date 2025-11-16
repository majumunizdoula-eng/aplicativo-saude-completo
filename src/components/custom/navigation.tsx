'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Utensils, Dumbbell, Pill, FileText, User, Crown, Bell, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getUserTier } from '@/lib/subscription';

const navItems = [
  { href: '/', icon: Home, label: 'Início' },
  { href: '/nutrition', icon: Utensils, label: 'Nutrição' },
  { href: '/workouts', icon: Dumbbell, label: 'Treinos' },
  { href: '/supplements', icon: Pill, label: 'Suplementos' },
  { href: '/progress', icon: TrendingUp, label: 'Progresso' },
  { href: '/profile', icon: User, label: 'Perfil' },
];

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [userTier, setUserTier] = useState<'none' | 'basic' | 'premium'>('none');

  useEffect(() => {
    const tier = getUserTier();
    setUserTier(tier);

    // Redirecionar para paywall se não tiver assinatura
    if (tier === 'none' && pathname !== '/paywall') {
      router.push('/paywall');
    }
  }, [pathname, router]);

  // Não mostrar navegação na página de paywall
  if (pathname === '/paywall') {
    return null;
  }

  // Não mostrar navegação nas páginas de onboarding
  if (pathname?.includes('/onboarding')) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 md:top-0 md:bottom-auto md:border-b md:border-t-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between md:justify-start md:gap-8 h-16">
          {/* Logo - apenas desktop */}
          <Link href="/" className="hidden md:flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">Life Live</span>
          </Link>

          {/* Menu principal */}
          <div className="flex items-center justify-around w-full md:w-auto md:gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 px-3 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs md:text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Botões de ação - apenas desktop */}
          <div className="hidden md:flex items-center gap-2 ml-auto">
            <Link
              href="/notifications"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                pathname === '/notifications'
                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Bell className="w-5 h-5" />
            </Link>
            <Link
              href="/premium"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                userTier === 'premium'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
              }`}
            >
              <Crown className="w-4 h-4" />
              <span className="text-sm font-medium">
                {userTier === 'premium' ? 'Premium' : 'Upgrade'}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
