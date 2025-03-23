import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type PracticeCategory = 'all' | 'meditation' | 'yoga' | 'rituals' | 'mantras';

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<PracticeCategory>('all');
  const colorScheme = useColorScheme();

  // Mock practice data - will be replaced with database content
  const practices = [
    {
      id: '1',
      name: 'Sunrise Meditation',
      category: 'meditation',
      duration: '15 mins',
      level: 'Beginner',
      description: 'A gentle meditation to greet the rising sun and set intentions for the day.',
      imageUrl: require('@/assets/images/partial-react-logo.png'), // Placeholder image
    },
    {
      id: '2',
      name: 'Morning Surya Namaskar',
      category: 'yoga',
      duration: '10 mins',
      level: 'Intermediate',
      description: 'Traditional sun salutation sequence to energize the body and mind.',
      imageUrl: require('@/assets/images/partial-react-logo.png'), // Placeholder image
    },
    {
      id: '3',
      name: 'Brahma Muhurta Sandhyavandanam',
      category: 'rituals',
      duration: '20 mins',
      level: 'Advanced',
      description: 'Traditional morning ritual offering prayers to the sun.',
      imageUrl: require('@/assets/images/partial-react-logo.png'), // Placeholder image
    },
    {
      id: '4',
      name: 'Gayatri Mantra Practice',
      category: 'mantras',
      duration: '10 mins',
      level: 'Beginner',
      description: 'Recitation of the sacred Gayatri Mantra with proper pronunciation.',
      imageUrl: require('@/assets/images/partial-react-logo.png'), // Placeholder image
    },
    {
      id: '5',
      name: 'Pranayama Sequence',
      category: 'yoga',
      duration: '12 mins',
      level: 'Intermediate',
      description: 'A series of breathing exercises to increase vital energy.',
      imageUrl: require('@/assets/images/partial-react-logo.png'), // Placeholder image
    },
  ];

  const filteredPractices = selectedCategory === 'all' 
    ? practices 
    : practices.filter(practice => practice.category === selectedCategory);

  const renderCategoryButton = (category: PracticeCategory, label: string, icon: any) => {
    const isSelected = category === selectedCategory;
    return (
      <TouchableOpacity 
        style={[styles.categoryButton, isSelected && styles.selectedCategory]} 
        onPress={() => setSelectedCategory(category)}
      >
        <IconSymbol 
          size={22} 
          name={icon} 
          color={isSelected ? Colors[colorScheme ?? 'light'].tint : '#888'} 
        />
        <ThemedText 
          type={isSelected ? 'defaultSemiBold' : 'default'}
          style={[styles.categoryLabel, isSelected && { color: Colors[colorScheme ?? 'light'].tint }]}
        >
          {label}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  const renderPracticeCard = (practice: typeof practices[0]) => {
    // Map category to a background color for visual distinction
    const categoryColors = {
      meditation: 'rgba(156, 39, 176, 0.15)',
      yoga: 'rgba(0, 150, 136, 0.15)',
      rituals: 'rgba(255, 87, 34, 0.15)',
      mantras: 'rgba(33, 150, 243, 0.15)',
    };
    
    const backgroundColor = categoryColors[practice.category as keyof typeof categoryColors];

    return (
      <TouchableOpacity key={practice.id} style={styles.practiceCard}>
        <Image source={practice.imageUrl} style={styles.practiceImage} />
        
        <ThemedView style={styles.practiceContent}>
          <ThemedView style={[styles.categoryBadge, { backgroundColor }]}>
            <ThemedText style={styles.categoryText}>
              {practice.category.charAt(0).toUpperCase() + practice.category.slice(1)}
            </ThemedText>
          </ThemedView>
          
          <ThemedText type="subtitle" style={styles.practiceTitle}>
            {practice.name}
          </ThemedText>
          
          <ThemedText style={styles.practiceDescription}>
            {practice.description}
          </ThemedText>
          
          <ThemedView style={styles.practiceMetadata}>
            <ThemedView style={styles.metadataItem}>
              <IconSymbol size={16} name="clock.fill" color="#888" />
              <ThemedText style={styles.metadataText}>{practice.duration}</ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.metadataItem}>
              <IconSymbol size={16} name="star.fill" color="#888" />
              <ThemedText style={styles.metadataText}>{practice.level}</ThemedText>
            </ThemedView>
          </ThemedView>
          
          <TouchableOpacity style={styles.startButton}>
            <ThemedText type="defaultSemiBold" style={styles.startButtonText}>
              Start Practice
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Morning Practices</ThemedText>
        <ThemedText style={styles.subtitle}>
          Sacred practices ideal for Brahma Muhurta
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.categoriesContainer}>
        {renderCategoryButton('all', 'All', 'sparkles')}
        {renderCategoryButton('meditation', 'Meditation', 'moon.stars.fill')}
        {renderCategoryButton('yoga', 'Yoga', 'figure.walk')}
        {renderCategoryButton('rituals', 'Rituals', 'flame.fill')}
        {renderCategoryButton('mantras', 'Mantras', 'music.note')}
      </ThemedView>

      <ThemedView style={styles.practicesList}>
        {filteredPractices.map(practice => renderPracticeCard(practice))}
      </ThemedView>

      <TouchableOpacity style={styles.buildCustomButton}>
        <IconSymbol size={20} name="plus.circle.fill" color={Colors[colorScheme ?? 'light'].tint} />
        <ThemedText 
          type="defaultSemiBold" 
          style={{ color: Colors[colorScheme ?? 'light'].tint }}
        >
          Build Custom Practice
        </ThemedText>
      </TouchableOpacity>
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
  subtitle: {
    opacity: 0.7,
    marginTop: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedCategory: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  categoryLabel: {
    marginLeft: 6,
  },
  practicesList: {
    gap: 20,
  },
  practiceCard: {
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  practiceImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  practiceContent: {
    padding: 16,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  practiceTitle: {
    marginBottom: 8,
  },
  practiceDescription: {
    opacity: 0.9,
    marginBottom: 12,
    lineHeight: 20,
  },
  practiceMetadata: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metadataText: {
    marginLeft: 4,
    fontSize: 14,
    opacity: 0.8,
  },
  startButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
  },
  buildCustomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    paddingVertical: 16,
    gap: 8,
  },
});