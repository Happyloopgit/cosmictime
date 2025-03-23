import { Image, StyleSheet, Platform, Switch, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function HomeScreen() {
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const colorScheme = useColorScheme();

  // Temporary mock data - will be replaced with actual calculations
  const brahmaMuhurtaTime = {
    today: {
      start: '4:48 AM',
      end: '6:24 AM',
    },
    tomorrow: {
      start: '4:47 AM',
      end: '6:23 AM',
    }
  };

  // Mock quick practice suggestions
  const quickPractices = [
    { id: '1', name: 'Surya Namaskar', duration: '10 mins' },
    { id: '2', name: 'Pranayama', duration: '5 mins' },
    { id: '3', name: 'Meditation', duration: '15 mins' },
  ];

  const toggleAlarm = () => {
    setAlarmEnabled(previousState => !previousState);
    // TODO: Add actual alarm setting functionality
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFB74D', dark: '#BF6900' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.container}>
        {/* Brahma Muhurta Display */}
        <ThemedView style={styles.timeCard}>
          <ThemedText type="defaultSemiBold" style={styles.label}>TODAY'S BRAHMA MUHURTA</ThemedText>
          <ThemedText type="title" style={styles.time}>{brahmaMuhurtaTime.today.start} - {brahmaMuhurtaTime.today.end}</ThemedText>
          
          <ThemedText type="defaultSemiBold" style={styles.label}>TOMORROW</ThemedText>
          <ThemedText style={styles.tomorrowTime}>{brahmaMuhurtaTime.tomorrow.start} - {brahmaMuhurtaTime.tomorrow.end}</ThemedText>
          
          {/* Alarm Toggle */}
          <ThemedView style={styles.alarmContainer}>
            <ThemedText type="defaultSemiBold">Daily Brahma Muhurta Alarm</ThemedText>
            <Switch
              trackColor={{ false: '#767577', true: Colors[colorScheme ?? 'light'].tint }}
              thumbColor={alarmEnabled ? '#ffffff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleAlarm}
              value={alarmEnabled}
            />
          </ThemedView>
        </ThemedView>

        {/* Quick Practice Suggestions */}
        <ThemedView style={styles.practicesContainer}>
          <ThemedText type="subtitle">Recommended Practices</ThemedText>
          
          {quickPractices.map(practice => (
            <TouchableOpacity key={practice.id} style={styles.practiceCard}>
              <ThemedView style={styles.practiceContent}>
                <ThemedText type="defaultSemiBold">{practice.name}</ThemedText>
                <ThemedText>{practice.duration}</ThemedText>
              </ThemedView>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.viewMoreButton}>
            <ThemedText type="defaultSemiBold" style={styles.viewMoreText}>
              View More Practices
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Current Festival / Auspicious Day */}
        <ThemedView style={styles.festivalContainer}>
          <ThemedText type="subtitle">Today's Auspicious Day</ThemedText>
          <ThemedText type="defaultSemiBold">Ekadashi</ThemedText>
          <ThemedText>Favorable for fasting and spiritual practices</ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingBottom: 24,
  },
  headerImage: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  timeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  label: {
    opacity: 0.7,
    marginBottom: 4,
  },
  time: {
    fontSize: 32,
    marginBottom: 16,
  },
  tomorrowTime: {
    fontSize: 18,
    marginBottom: 16,
  },
  alarmContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  practicesContainer: {
    gap: 12,
  },
  practiceCard: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  practiceContent: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewMoreButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  viewMoreText: {
    color: Colors.light.tint,
  },
  festivalContainer: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  }
});