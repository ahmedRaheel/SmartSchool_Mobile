import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useApp } from '../app/AppProvider';
import { Screen } from '../components/Screen';
import { Header, Pill } from '../components/ui';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme/theme';

export function RecordDetailScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'RecordDetail'>) {
  const { moduleKey, recordId } = route.params;
  const { records, updateRecord, deleteRecord, notify } = useApp();
  const record = (records[moduleKey] ?? []).find((item) => item.id === recordId);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [reference, setReference] = useState('');
  const [status, setStatus] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (!record) {
      return;
    }

    setTitle(record.title);
    setSubtitle(record.subtitle);
    setReference(record.meta);
    setStatus(record.status);
    setValue(record.value);
  }, [record]);

  if (!record) {
    return (
      <Screen>
        <Header title="Record unavailable" subtitle="This record may have been deleted." />
      </Screen>
    );
  }

  function handleSave() {
    updateRecord(moduleKey, {
      ...record,
      title: title.trim(),
      subtitle: subtitle.trim(),
      meta: reference.trim(),
      status: status.trim(),
      value: value.trim(),
    });

    setIsEditing(false);
    notify('Changes saved locally.');
  }

  function confirmDelete() {
    Alert.alert('Delete record?', 'This removes the record from the local mock database.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteRecord(moduleKey, record.id);
          notify('Record deleted.');
          navigation.goBack();
        },
      },
    ]);
  }

  return (
    <Screen>
      <Header title={record.title} subtitle={`${moduleKey.toUpperCase()} record`} />

      <View style={styles.hero}>
        <Text style={styles.heroTitle}>{record.title}</Text>
        <Pill text={record.status} />
      </View>

      {isEditing ? (
        <>
          <EditableField label="Title" value={title} onChangeText={setTitle} />
          <EditableField label="Detail" value={subtitle} onChangeText={setSubtitle} />
          <EditableField label="Reference" value={reference} onChangeText={setReference} />
          <EditableField label="Status" value={status} onChangeText={setStatus} />
          <EditableField label="Value" value={value} onChangeText={setValue} />
        </>
      ) : (
        <>
          <ReadOnlyField label="Detail" value={record.subtitle} />
          <ReadOnlyField label="Reference" value={record.meta} />
          <ReadOnlyField label="Value" value={record.value} />
          <ReadOnlyField label="Status" value={record.status} />
        </>
      )}

      <View style={styles.actions}>
        <Pressable style={styles.dangerButton} onPress={confirmDelete}>
          <Text style={styles.dangerButtonText}>Delete</Text>
        </Pressable>
        <Pressable
          style={styles.secondaryButton}
          onPress={() => setIsEditing((currentValue) => !currentValue)}
        >
          <Text style={styles.secondaryButtonText}>
            {isEditing ? 'Cancel' : 'Edit'}
          </Text>
        </Pressable>
        <Pressable
          disabled={!isEditing || !title.trim() || !subtitle.trim()}
          style={[styles.primaryButton, !isEditing && styles.disabledButton]}
          onPress={handleSave}
        >
          <Text style={styles.primaryButtonText}>Save</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

function EditableField({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} value={value} onChangeText={onChangeText} />
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: 'white',
    borderColor: theme.colors.line,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 12,
    padding: 18,
  },
  heroTitle: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 10,
  },
  field: {
    backgroundColor: 'white',
    borderColor: theme.colors.line,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
    padding: 14,
  },
  label: {
    color: theme.colors.muted,
    fontSize: 10,
    fontWeight: '700',
  },
  value: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: '800',
    marginTop: 5,
  },
  input: {
    borderBottomColor: theme.colors.line,
    borderBottomWidth: 1,
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 6,
    paddingVertical: 7,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  dangerButton: {
    alignItems: 'center',
    borderColor: '#E9B6BE',
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    height: 46,
    justifyContent: 'center',
  },
  dangerButtonText: {
    color: '#C53D51',
    fontWeight: '800',
  },
  secondaryButton: {
    alignItems: 'center',
    borderColor: theme.colors.line,
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    height: 46,
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: theme.colors.text,
    fontWeight: '800',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    flex: 1,
    height: 46,
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '800',
  },
  disabledButton: {
    opacity: 0.45,
  },
});
