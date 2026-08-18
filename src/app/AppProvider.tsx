import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { modules, notifications as seedNotifications } from '../mocks/moduleData';
import { ModuleRecord, NotificationItem, User } from '../types/models';

interface ChatMessage {
  id: string;
  conversationId: string;
  sender: 'me' | 'other';
  text: string;
  sentAt: string;
}

interface AppContextValue {
  user: User | null;
  ready: boolean;
  toast: string;
  records: Record<string, ModuleRecord[]>;
  notifications: NotificationItem[];
  messages: ChatMessage[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  notify: (message: string) => void;
  createRecord: (moduleKey: string, record: Omit<ModuleRecord, 'id'>) => void;
  updateRecord: (moduleKey: string, record: ModuleRecord) => void;
  deleteRecord: (moduleKey: string, recordId: string) => void;
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
  sendMessage: (conversationId: string, text: string) => void;
  resetMockData: () => Promise<void>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);
const sessionStorageKey = 'smartschool.user';
const dataStorageKey = 'smartschool.mobile.data.v2';

const demoUser: User = {
  id: '1',
  name: 'SmartSchool Admin',
  email: 'admin@smartschool.demo',
  role: 'Admin',
  initials: 'SA',
};

const initialRecords = Object.fromEntries(
  Object.entries(modules).map(([moduleKey, module]) => [
    moduleKey,
    module.records.map((record) => ({ ...record })),
  ]),
);

const initialMessages: ChatMessage[] = [
  {
    id: 'message-1',
    conversationId: 'parent',
    sender: 'other',
    text: 'Assalam-o-Alaikum. Could you confirm Amina’s assignment deadline?',
    sentAt: '10:20',
  },
  {
    id: 'message-2',
    conversationId: 'parent',
    sender: 'me',
    text: 'Wa-Alaikum-Salam. It is due on Thursday.',
    sentAt: '10:22',
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState('');
  const [records, setRecords] = useState<Record<string, ModuleRecord[]>>(initialRecords);
  const [notifications, setNotifications] = useState<NotificationItem[]>(seedNotifications);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  useEffect(() => {
    hydrateApplication();
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }

    persistApplicationData();
  }, [ready, records, notifications, messages]);

  async function hydrateApplication() {
    try {
      const [serializedUser, serializedData] = await Promise.all([
        AsyncStorage.getItem(sessionStorageKey),
        AsyncStorage.getItem(dataStorageKey),
      ]);

      if (serializedUser) {
        setUser(JSON.parse(serializedUser) as User);
      }

      if (serializedData) {
        const persistedData = JSON.parse(serializedData) as {
          records: Record<string, ModuleRecord[]>;
          notifications: NotificationItem[];
          messages: ChatMessage[];
        };

        setRecords(persistedData.records);
        setNotifications(persistedData.notifications);
        setMessages(persistedData.messages);
      }
    } finally {
      setReady(true);
    }
  }

  async function persistApplicationData() {
    await AsyncStorage.setItem(
      dataStorageKey,
      JSON.stringify({ records, notifications, messages }),
    );
  }

  async function login(email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();

    if (
      normalizedEmail !== 'admin@smartschool.demo' ||
      password !== 'SmartSchool@2026'
    ) {
      return false;
    }

    setUser(demoUser);
    await AsyncStorage.setItem(sessionStorageKey, JSON.stringify(demoUser));
    return true;
  }

  async function logout() {
    setUser(null);
    await AsyncStorage.removeItem(sessionStorageKey);
  }

  function notify(message: string) {
    setToast(message);
    setTimeout(() => setToast(''), 2200);
  }

  function createRecord(moduleKey: string, record: Omit<ModuleRecord, 'id'>) {
    const newRecord: ModuleRecord = {
      ...record,
      id: `${moduleKey}-${Date.now()}`,
    };

    setRecords((currentRecords) => ({
      ...currentRecords,
      [moduleKey]: [newRecord, ...(currentRecords[moduleKey] ?? [])],
    }));
  }

  function updateRecord(moduleKey: string, record: ModuleRecord) {
    setRecords((currentRecords) => ({
      ...currentRecords,
      [moduleKey]: (currentRecords[moduleKey] ?? []).map((existingRecord) =>
        existingRecord.id === record.id ? record : existingRecord,
      ),
    }));
  }

  function deleteRecord(moduleKey: string, recordId: string) {
    setRecords((currentRecords) => ({
      ...currentRecords,
      [moduleKey]: (currentRecords[moduleKey] ?? []).filter(
        (record) => record.id !== recordId,
      ),
    }));
  }

  function markNotificationRead(notificationId: string) {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification,
      ),
    );
  }

  function markAllNotificationsRead() {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  }

  function sendMessage(conversationId: string, text: string) {
    const messageText = text.trim();

    if (!messageText) {
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: `message-${Date.now()}`,
        conversationId,
        sender: 'me',
        text: messageText,
        sentAt: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ]);
  }

  async function resetMockData() {
    setRecords(initialRecords);
    setNotifications(seedNotifications);
    setMessages(initialMessages);
    await AsyncStorage.removeItem(dataStorageKey);
    notify('Demo data has been reset.');
  }

  const contextValue = useMemo<AppContextValue>(
    () => ({
      user,
      ready,
      toast,
      records,
      notifications,
      messages,
      login,
      logout,
      notify,
      createRecord,
      updateRecord,
      deleteRecord,
      markNotificationRead,
      markAllNotificationsRead,
      sendMessage,
      resetMockData,
    }),
    [user, ready, toast, records, notifications, messages],
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used inside AppProvider.');
  }

  return context;
}
