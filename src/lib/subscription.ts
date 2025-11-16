// Tipos de assinatura
export type SubscriptionTier = 'free' | 'premium';
export type SubscriptionStatus = 'active' | 'cancelled' | 'refunded' | 'expired';

export interface UserSubscription {
  email: string;
  name: string;
  subscription_tier: SubscriptionTier;
  subscription_status: SubscriptionStatus;
  order_id?: string;
  subscription_id?: string;
  activated_at?: string;
  expires_at?: string;
}

// Verificar se usuário tem acesso premium
export function hasAccessToPremium(subscription: UserSubscription | null): boolean {
  if (!subscription) return false;
  
  return (
    subscription.subscription_tier === 'premium' &&
    subscription.subscription_status === 'active'
  );
}

// Salvar assinatura no localStorage (temporário - substituir por banco de dados)
export function saveSubscriptionLocal(subscription: UserSubscription): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userSubscription', JSON.stringify(subscription));
    localStorage.setItem('userSubscriptionTier', subscription.subscription_tier);
  }
}

// Recuperar assinatura do localStorage
export function getSubscriptionLocal(): UserSubscription | null {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('userSubscription');
    return data ? JSON.parse(data) : null;
  }
  return null;
}

// Limpar assinatura do localStorage
export function clearSubscriptionLocal(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('userSubscription');
    localStorage.removeItem('userSubscriptionTier');
  }
}

// Verificar assinatura via API (para implementar com banco de dados)
export async function checkSubscriptionStatus(email: string): Promise<UserSubscription | null> {
  try {
    const response = await fetch(`/api/subscription/check?email=${encodeURIComponent(email)}`);
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.subscription || null;
  } catch (error) {
    console.error('Erro ao verificar assinatura:', error);
    return null;
  }
}
