import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json(
      { error: 'Email é obrigatório' },
      { status: 400 }
    );
  }

  try {
    // Buscar assinatura no banco de dados
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Erro ao buscar assinatura:', error);
      return NextResponse.json(
        { subscription: null, hasAccess: false },
        { status: 200 }
      );
    }

    // Verificar se tem acesso ativo
    const hasAccess = 
      data?.subscription_tier === 'premium' && 
      data?.subscription_status === 'active';

    return NextResponse.json({
      subscription: data,
      hasAccess,
    });

  } catch (error) {
    console.error('Erro ao verificar assinatura:', error);
    return NextResponse.json(
      { error: 'Erro ao verificar assinatura' },
      { status: 500 }
    );
  }
}
