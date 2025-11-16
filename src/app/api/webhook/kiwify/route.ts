import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Tipos de eventos da Kiwify
type KiwifyWebhookEvent = {
  event: 'order.paid' | 'order.refunded' | 'subscription.cancelled';
  order_id: string;
  product_id: string;
  customer: {
    email: string;
    name: string;
    phone?: string;
  };
  payment: {
    amount: number;
    status: string;
    method: string;
  };
  subscription?: {
    id: string;
    status: string;
    plan: string;
  };
};

export async function POST(request: NextRequest) {
  try {
    const body: KiwifyWebhookEvent = await request.json();

    console.log('Webhook recebido da Kiwify:', body);

    // Validar evento
    if (!body.event || !body.customer?.email) {
      return NextResponse.json(
        { error: 'Dados inválidos no webhook' },
        { status: 400 }
      );
    }

    // Processar diferentes tipos de eventos
    switch (body.event) {
      case 'order.paid':
        // Pagamento confirmado - liberar acesso
        await handleOrderPaid(body);
        break;

      case 'order.refunded':
        // Reembolso - remover acesso
        await handleOrderRefunded(body);
        break;

      case 'subscription.cancelled':
        // Assinatura cancelada - remover acesso
        await handleSubscriptionCancelled(body);
        break;

      default:
        console.log('Evento não tratado:', body.event);
    }

    // Retornar sucesso para a Kiwify
    return NextResponse.json({ success: true, message: 'Webhook processado' });

  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return NextResponse.json(
      { error: 'Erro ao processar webhook' },
      { status: 500 }
    );
  }
}

// Função para processar pagamento confirmado
async function handleOrderPaid(data: KiwifyWebhookEvent) {
  console.log('Processando pagamento confirmado:', data.customer.email);

  const userData = {
    email: data.customer.email,
    name: data.customer.name,
    phone: data.customer.phone,
    subscription_status: 'active',
    subscription_tier: 'premium',
    order_id: data.order_id,
    product_id: data.product_id,
    payment_amount: data.payment.amount,
    payment_method: data.payment.method,
    subscription_id: data.subscription?.id,
    subscription_plan: data.subscription?.plan,
    activated_at: new Date().toISOString(),
  };

  console.log('Salvando dados do usuário no banco:', userData);

  // Salvar no Supabase
  const { data: savedData, error } = await supabase
    .from('subscriptions')
    .upsert(userData, { onConflict: 'email' });

  if (error) {
    console.error('Erro ao salvar no banco:', error);
    throw error;
  }

  console.log('Usuário salvo com sucesso:', savedData);
  return userData;
}

// Função para processar reembolso
async function handleOrderRefunded(data: KiwifyWebhookEvent) {
  console.log('Processando reembolso:', data.customer.email);

  const updateData = {
    email: data.customer.email,
    subscription_status: 'refunded',
    subscription_tier: 'free',
    refunded_at: new Date().toISOString(),
  };

  console.log('Removendo acesso do usuário:', updateData);

  const { error } = await supabase
    .from('subscriptions')
    .update(updateData)
    .eq('email', data.customer.email);

  if (error) {
    console.error('Erro ao atualizar banco:', error);
    throw error;
  }

  return updateData;
}

// Função para processar cancelamento de assinatura
async function handleSubscriptionCancelled(data: KiwifyWebhookEvent) {
  console.log('Processando cancelamento:', data.customer.email);

  const updateData = {
    email: data.customer.email,
    subscription_status: 'cancelled',
    subscription_tier: 'free',
    cancelled_at: new Date().toISOString(),
  };

  console.log('Cancelando acesso do usuário:', updateData);

  const { error } = await supabase
    .from('subscriptions')
    .update(updateData)
    .eq('email', data.customer.email);

  if (error) {
    console.error('Erro ao atualizar banco:', error);
    throw error;
  }

  return updateData;
}

// Endpoint GET para testar se a API está funcionando
export async function GET() {
  return NextResponse.json({
    message: 'Webhook da Kiwify está funcionando!',
    endpoint: '/api/webhook/kiwify',
    methods: ['POST'],
  });
}
