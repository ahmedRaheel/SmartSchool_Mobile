import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../app/AppProvider';
import { Screen } from '../components/Screen';
import { Header } from '../components/ui';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme/theme';

export function NotificationsScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Notifications'>) {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
  } = useApp();

  return (
    <Screen>
      <Header
        title="Notifications"
        subtitle={`${notifications.filter((item) => !item.read).length} unread alerts`}
        right={
          <Pressable onPress={markAllNotificationsRead}>
            <Text style={styles.readAll}>Read all</Text>
          </Pressable>
        }
      />

      {notifications.map((notification) => (
        <Pressable
          key={notification.id}
          style={[
            styles.notification,
            !notification.read && styles.unreadNotification,
          ]}
          onPress={() => {
            markNotificationRead(notification.id);
            navigation.navigate('Module', {
              moduleKey: notification.moduleKey,
            });
          }}
        >
          <View style={styles.notificationHeader}>
            <Text style={styles.title}>{notification.title}</Text>
            {!notification.read ? <View style={styles.dot} /> : null}
          </View>
          <Text style={styles.body}>{notification.body}</Text>
          <Text style={styles.action}>Open related module →</Text>
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  readAll: {
    color: theme.colors.primary,
    fontSize: 11,
    fontWeight: '800',
  },
  notification: {
    backgroundColor: 'white',
    borderColor: theme.colors.line,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 9,
    padding: 14,
  },
  unreadNotification: {
    borderColor: '#CFC9FF',
  },
  notificationHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
  dot: {
    backgroundColor: theme.colors.primary,
    borderRadius: 99,
    height: 8,
    width: 8,
  },
  body: {
    color: theme.colors.muted,
    fontSize: 10,
    lineHeight: 16,
    marginTop: 5,
  },
  action: {
    color: theme.colors.primary,
    fontSize: 9,
    fontWeight: '800',
    marginTop: 9,
  },
});
