import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useApp } from '../app/AppProvider';
import { Screen } from '../components/Screen';
import { Header, MetricCard, Pill } from '../components/ui';
import { modules } from '../mocks/moduleData';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme/theme';

export function ModuleScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Module'>) {
  const module = modules[route.params.moduleKey];
  const { notify, records } = useApp();
  const [searchText, setSearchText] = useState('');

  if (!module) {
    return null;
  }

  const moduleRecords = records[module.key] ?? [];

  const filteredRecords = useMemo(() => {
    const normalizedSearchText = searchText.trim().toLowerCase();

    if (!normalizedSearchText) {
      return moduleRecords;
    }

    return moduleRecords.filter((record) =>
      [record.title, record.subtitle, record.meta, record.status, record.value]
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearchText),
    );
  }, [moduleRecords, searchText]);

  return (
    <Screen>
      <Header
        title={module.title}
        subtitle={module.subtitle}
        right={
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={24} />
          </Pressable>
        }
      />

      <Pressable
        style={styles.action}
        onPress={() =>
          navigation.navigate('CreateRecord', {
            moduleKey: module.key,
          })
        }
      >
        <Ionicons name="add" size={18} color="white" />
        <Text style={styles.actionText}>{module.action}</Text>
      </Pressable>

      <View style={styles.metrics}>
        {module.metrics.map((metric) => (
          <MetricCard
            key={metric.label}
            {...metric}
            onPress={() => notify(`${metric.label}: ${metric.value}`)}
          />
        ))}
      </View>

      <View style={styles.search}>
        <Ionicons name="search" size={18} color={theme.colors.muted} />
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder={`Search ${module.title.toLowerCase()}...`}
          style={styles.input}
        />
      </View>

      <Text style={styles.heading}>Records</Text>

      {filteredRecords.map((record) => (
        <Pressable
          key={record.id}
          style={styles.record}
          onPress={() =>
            navigation.navigate('RecordDetail', {
              moduleKey: module.key,
              recordId: record.id,
            })
          }
        >
          <View style={styles.recordContent}>
            <Text style={styles.recordTitle}>{record.title}</Text>
            <Text style={styles.recordSubtitle}>
              {record.subtitle} • {record.meta}
            </Text>
          </View>
          <View style={styles.recordSummary}>
            <Pill text={record.status} />
            <Text style={styles.recordValue}>{record.value}</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={theme.colors.muted}
          />
        </Pressable>
      ))}

      <Text style={styles.heading}>Smart insights</Text>
      {module.insights.map((insight) => (
        <Pressable
          key={insight}
          style={styles.insight}
          onPress={() => notify(insight)}
        >
          <Ionicons
            name="bulb-outline"
            size={18}
            color={theme.colors.warning}
          />
          <Text style={styles.insightText}>{insight}</Text>
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  action: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    borderRadius: 11,
    flexDirection: 'row',
    gap: 7,
    marginBottom: 15,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  actionText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '800',
  },
  metrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  search: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: theme.colors.line,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    height: 46,
    marginVertical: 10,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
  },
  heading: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 8,
    marginTop: 14,
  },
  record: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: theme.colors.line,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    marginBottom: 9,
    padding: 13,
  },
  recordContent: {
    flex: 1,
  },
  recordTitle: {
    color: theme.colors.text,
    fontWeight: '800',
  },
  recordSubtitle: {
    color: theme.colors.muted,
    fontSize: 10,
    marginTop: 4,
  },
  recordSummary: {
    alignItems: 'flex-end',
    gap: 5,
  },
  recordValue: {
    color: theme.colors.text,
    fontSize: 10,
    fontWeight: '700',
  },
  insight: {
    backgroundColor: '#FFF9EE',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 9,
    marginBottom: 8,
    padding: 12,
  },
  insightText: {
    color: theme.colors.text,
    flex: 1,
    fontSize: 11,
    lineHeight: 17,
  },
});
