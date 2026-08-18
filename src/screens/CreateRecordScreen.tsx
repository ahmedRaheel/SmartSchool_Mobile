import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput } from 'react-native';
import { useApp } from '../app/AppProvider';
import { Screen } from '../components/Screen';
import { Header } from '../components/ui';
import { modules } from '../mocks/moduleData';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme/theme';

export function CreateRecordScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'CreateRecord'>) {
  const module = modules[route.params.moduleKey];
  const { createRecord, notify } = useApp();
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [reference, setReference] = useState('');
  const [status, setStatus] = useState('Active');
  const [value, setValue] = useState('Ready');

  if (!module) {
    return null;
  }

  function handleSave() {
    if (!title.trim() || !detail.trim()) {
      return;
    }

    createRecord(module.key, {
      title: title.trim(),
      subtitle: detail.trim(),
      meta: reference.trim() || `MOBILE-${Date.now()}`,
      status: status.trim() || 'Active',
      value: value.trim() || 'Ready',
    });

    notify(`${title.trim()} created.`);
    navigation.goBack();
  }

  return (
    <Screen>
      <Header
        title={module.action}
        subtitle={`Create ${module.title.toLowerCase()} data`}
      />
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />
      <Text style={styles.label}>Detail</Text>
      <TextInput
        style={styles.input}
        value={detail}
        onChangeText={setDetail}
        placeholder="Enter detail"
      />
      <Text style={styles.label}>Reference</Text>
      <TextInput
        style={styles.input}
        value={reference}
        onChangeText={setReference}
        placeholder="Optional reference"
      />
      <Text style={styles.label}>Status</Text>
      <TextInput style={styles.input} value={status} onChangeText={setStatus} />
      <Text style={styles.label}>Value</Text>
      <TextInput style={styles.input} value={value} onChangeText={setValue} />
      <Pressable
        disabled={!title.trim() || !detail.trim()}
        style={[
          styles.button,
          (!title.trim() || !detail.trim()) && styles.disabledButton,
        ]}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Save record</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: {
    color: theme.colors.muted,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 6,
  },
  input: {
    backgroundColor: 'white',
    borderColor: theme.colors.line,
    borderRadius: 12,
    borderWidth: 1,
    height: 48,
    marginBottom: 14,
    paddingHorizontal: 12,
  },
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.45,
  },
  buttonText: {
    color: 'white',
    fontWeight: '800',
  },
});
