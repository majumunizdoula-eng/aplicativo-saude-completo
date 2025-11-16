// Sistema de notificações para treinos, refeições, suplementos e exames

export type NotificationType = 'workout' | 'meal' | 'supplement' | 'exam';

export interface NotificationSettings {
  workouts: {
    enabled: boolean;
    time: string; // HH:MM format
    daysOfWeek: number[]; // 0-6 (domingo-sábado)
  };
  meals: {
    enabled: boolean;
    breakfast: string;
    morningSnack: string;
    lunch: string;
    afternoonSnack: string;
    dinner: string;
  };
  supplements: {
    enabled: boolean;
    times: string[]; // Array de horários
  };
  exams: {
    enabled: boolean;
    advanceDays: number; // Dias de antecedência para lembrar
  };
}

export const defaultNotificationSettings: NotificationSettings = {
  workouts: {
    enabled: true,
    time: '07:00',
    daysOfWeek: [1, 2, 3, 4, 5], // Segunda a sexta
  },
  meals: {
    enabled: true,
    breakfast: '07:30',
    morningSnack: '10:00',
    lunch: '12:30',
    afternoonSnack: '15:30',
    dinner: '19:00',
  },
  supplements: {
    enabled: true,
    times: ['07:00', '12:00', '19:00'],
  },
  exams: {
    enabled: true,
    advanceDays: 7,
  },
};

// Função para solicitar permissão de notificações
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.warn('Este navegador não suporta notificações');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

// Função para enviar notificação
export function sendNotification(title: string, options?: NotificationOptions) {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/icon.svg',
      badge: '/icon.svg',
      ...options,
    });
  }
}

// Função para agendar notificações (usando Web API)
export function scheduleNotification(
  type: NotificationType,
  title: string,
  body: string,
  time: string
) {
  const [hours, minutes] = time.split(':').map(Number);
  const now = new Date();
  const scheduledTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    0
  );

  // Se o horário já passou hoje, agendar para amanhã
  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }

  const timeUntilNotification = scheduledTime.getTime() - now.getTime();

  setTimeout(() => {
    sendNotification(title, {
      body,
      tag: type,
      requireInteraction: false,
    });
  }, timeUntilNotification);
}

// Salvar configurações no localStorage
export function saveNotificationSettings(settings: NotificationSettings) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('notificationSettings', JSON.stringify(settings));
  }
}

// Carregar configurações do localStorage
export function loadNotificationSettings(): NotificationSettings {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('notificationSettings');
    if (saved) {
      return JSON.parse(saved);
    }
  }
  return defaultNotificationSettings;
}

// Verificar se notificações estão habilitadas
export function areNotificationsEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  return Notification.permission === 'granted';
}

// Mensagens padrão para cada tipo de notificação
export const notificationMessages = {
  workout: {
    title: '💪 Hora do Treino!',
    body: 'Seu treino está agendado para agora. Vamos lá!',
  },
  meal: {
    breakfast: {
      title: '🍳 Café da Manhã',
      body: 'Hora de começar o dia com energia!',
    },
    morningSnack: {
      title: '🍎 Lanche da Manhã',
      body: 'Hora do seu lanche matinal!',
    },
    lunch: {
      title: '🍽️ Almoço',
      body: 'Hora de almoçar e repor as energias!',
    },
    afternoonSnack: {
      title: '🥤 Lanche da Tarde',
      body: 'Hora do seu lanche da tarde!',
    },
    dinner: {
      title: '🍲 Jantar',
      body: 'Hora do jantar. Aproveite sua refeição!',
    },
  },
  supplement: {
    title: '💊 Hora dos Suplementos',
    body: 'Não esqueça de tomar seus suplementos!',
  },
  exam: {
    title: '🩺 Lembrete de Exame',
    body: 'Você tem um exame agendado em breve!',
  },
};
