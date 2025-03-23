import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Index() {
  // Temporary mock data - will be replaced with actual calculations
  const panchangaData = {
    date: 'March 22, 2024',
    tithi: {
      name: 'Dwadashi',
      paksha: 'Shukla',
      endTime: '18:45',
    },
    nakshatra: {
      name: 'Hasta',
      endTime: '20:12',
    },
    yoga: {
      name: 'Siddhi',
      endTime: '13:24',
    },
    karana: {
      name: 'Bava',
      endTime: '09:15',
    },
    varjyam: '15:30 - 17:15',
    rahuKalam: '10:30 - 12:00',
    yamaganda: '15:00 - 16:30',
    gulika: '07:30 - 09:00',
    moonPhase: 'Waxing (78%)',
  };

  const renderDataItem = (label: string, value: string, subValue?: string) => (
    <ThemedView style={styles.dataItem}>
      <ThemedText type="defaultSemiBold" style={styles.dataLabel}>{label}</ThemedText>
      <ThemedView>
        <ThemedText type="subtitle">{value}</ThemedText>
        {subValue && <ThemedText style={styles.subValue}>{subValue}</ThemedText>}
      </ThemedView>
    </ThemedView>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Daily Panchanga</ThemedText>
        <ThemedText type="subtitle">{panchangaData.date}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.cardContainer}>
        <ThemedView style={styles.panchangaCard}>
          {renderDataItem('Tithi', panchangaData.tithi.name, 
            `${panchangaData.tithi.paksha} Paksha · Ends at ${panchangaData.tithi.endTime}`)}
          {renderDataItem('Nakshatra', panchangaData.nakshatra.name, 
            `Ends at ${panchangaData.nakshatra.endTime}`)}
          {renderDataItem('Yoga', panchangaData.yoga.name, 
            `Ends at ${panchangaData.yoga.endTime}`)}
          {renderDataItem('Karana', panchangaData.karana.name, 
            `Ends at ${panchangaData.karana.endTime}`)}
        </ThemedView>

        <ThemedView style={styles.panchangaCard}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>INAUSPICIOUS PERIODS</ThemedText>
          {renderDataItem('Varjyam', panchangaData.varjyam, undefined)}
          {renderDataItem('Rahu Kalam', panchangaData.rahuKalam, undefined)}
          {renderDataItem('Yamaganda', panchangaData.yamaganda, undefined)}
          {renderDataItem('Gulika', panchangaData.gulika, undefined)}
        </ThemedView>

        <ThemedView style={styles.panchangaCard}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>LUNAR INFORMATION</ThemedText>
          {renderDataItem('Moon Phase', panchangaData.moonPhase, undefined)}
          {/* Placeholder for lunar phase visualization */}
          <ThemedView style={styles.moonVisualization}>
            <ThemedText type="defaultSemiBold" style={styles.visualizationPlaceholder}>
              Moon Phase Visualization
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.panchangaCard}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>RECOMMENDATIONS</ThemedText>
          <ThemedText style={styles.recommendationText}>
            Today is favorable for spiritual activities and learning new skills. Avoid starting new ventures during Rahu Kalam.
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.dateSelectorContainer}>
        <ThemedText type="defaultSemiBold">View Panchanga for another date</ThemedText>
        {/* Date selector component would go here */}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 100, // For status bar and header
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 24,
  },
  cardContainer: {
    gap: 16,
  },
  panchangaCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    gap: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  dataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  dataLabel: {
    opacity: 0.7,
  },
  subValue: {
    opacity: 0.7,
    fontSize: 14,
  },
  sectionTitle: {
    opacity: 0.7,
    marginBottom: 8,
  },
  moonVisualization: {
    height: 120,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visualizationPlaceholder: {
    opacity: 0.5,
  },
  recommendationText: {
    lineHeight: 22,
  },
  dateSelectorContainer: {
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});