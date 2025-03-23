import { StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function Index() {
  const [selectedView, setSelectedView] = useState<'upcoming' | 'calendar'>('upcoming');

  // Mock festival data - will be replaced with actual calculations and database
  const upcomingFestivals = [
    {
      id: '1',
      name: 'Rama Navami',
      date: 'April 17, 2024',
      description: 'Celebration of Lord Rama\'s birth',
      significance: 'High',
      ritual: 'Puja, Fasting, Bhajan',
    },
    {
      id: '2',
      name: 'Hanuman Jayanti',
      date: 'April 23, 2024',
      description: 'Birthday of Lord Hanuman',
      significance: 'High',
      ritual: 'Puja, Chanting Hanuman Chalisa',
    },
    {
      id: '3',
      name: 'Akshaya Tritiya',
      date: 'May 10, 2024',
      description: 'Day of eternal success',
      significance: 'High',
      ritual: 'Charity, New beginnings',
    },
    {
      id: '4',
      name: 'Buddha Purnima',
      date: 'May 23, 2024',
      description: 'Buddha\'s birthday',
      significance: 'Medium',
      ritual: 'Meditation, Charitable acts',
    },
    {
      id: '5',
      name: 'Ganga Dussehra',
      date: 'June 16, 2024',
      description: 'Celebration of the descent of Ganges',
      significance: 'Medium',
      ritual: 'Bath in Ganges, Offerings',
    },
  ];

  const renderFestivalCard = (festival: typeof upcomingFestivals[0]) => (
    <TouchableOpacity key={festival.id} style={styles.festivalCard}>
      <ThemedView style={styles.cardHeader}>
        <ThemedText type="subtitle">{festival.name}</ThemedText>
        
        <ThemedView style={[
          styles.significanceBadge, 
          { backgroundColor: festival.significance === 'High' ? 'rgba(255, 152, 0, 0.2)' : 'rgba(0, 188, 212, 0.2)' }
        ]}>
          <ThemedText style={styles.significanceText}>{festival.significance}</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.dateContainer}>
        <IconSymbol size={16} name="calendar" color="#888" />
        <ThemedText style={styles.dateText}>{festival.date}</ThemedText>
      </ThemedView>

      <ThemedText style={styles.descriptionText}>{festival.description}</ThemedText>
      
      <ThemedView style={styles.ritualContainer}>
        <ThemedText type="defaultSemiBold">Rituals: </ThemedText>
        <ThemedText>{festival.ritual}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.cardFooter}>
        <TouchableOpacity style={styles.footerButton}>
          <ThemedText type="defaultSemiBold">View Details</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <ThemedText type="defaultSemiBold">Set Reminder</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Festivals & Special Days</ThemedText>
      </ThemedView>

      <ThemedView style={styles.viewToggleContainer}>
        <TouchableOpacity 
          style={[styles.toggleButton, selectedView === 'upcoming' && styles.selectedToggle]}
          onPress={() => setSelectedView('upcoming')}
        >
          <ThemedText 
            type={selectedView === 'upcoming' ? 'defaultSemiBold' : 'default'}
          >
            Upcoming
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.toggleButton, selectedView === 'calendar' && styles.selectedToggle]}
          onPress={() => setSelectedView('calendar')}
        >
          <ThemedText 
            type={selectedView === 'calendar' ? 'defaultSemiBold' : 'default'}
          >
            Calendar
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {selectedView === 'upcoming' ? (
        <ThemedView style={styles.festivalList}>
          {upcomingFestivals.map(festival => renderFestivalCard(festival))}
        </ThemedView>
      ) : (
        <ThemedView style={styles.calendarPlaceholder}>
          <ThemedText type="defaultSemiBold">Calendar View Coming Soon</ThemedText>
          <ThemedText>Monthly view with highlighted festival days</ThemedText>
        </ThemedView>
      )}
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
  viewToggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    marginBottom: 16,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  selectedToggle: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  festivalList: {
    gap: 16,
  },
  festivalCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  significanceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  significanceText: {
    fontSize: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateText: {
    marginLeft: 8,
    opacity: 0.8,
  },
  descriptionText: {
    marginBottom: 12,
  },
  ritualContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 12,
  },
  footerButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    marginRight: 12,
  },
  calendarPlaceholder: {
    height: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
  },
});