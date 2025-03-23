import { StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import React, { useState } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function Index() {
  const colorScheme = useColorScheme();
  
  // Location settings
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const [userLocation, setUserLocation] = useState({
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
  });
  
  // Alarm settings
  const [alarmActive, setAlarmActive] = useState(false);
  const [alarmTime, setAlarmTime] = useState('15'); // Minutes before Brahma Muhurta
  const [alarmSound, setAlarmSound] = useState('Temple Bell');
  
  // Notification settings
  const [notifyFestivals, setNotifyFestivals] = useState(true);
  const [notifyDayBefore, setNotifyDayBefore] = useState(true);
  
  // Theme settings
  const [useSystemTheme, setUseSystemTheme] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  // Account settings
  const [isSubscribed, setIsSubscribed] = useState(false);

  const renderSettingSection = (title: string, children: React.ReactNode) => (
    <ThemedView style={styles.settingSection}>
      <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>{title}</ThemedText>
      {children}
    </ThemedView>
  );

  const renderToggleSetting = (
    label: string, 
    value: boolean, 
    onToggle: (value: boolean) => void,
    description?: string
  ) => (
    <ThemedView style={styles.settingItem}>
      <ThemedView>
        <ThemedText type="default">{label}</ThemedText>
        {description && <ThemedText style={styles.settingDescription}>{description}</ThemedText>}
      </ThemedView>
      <Switch
        trackColor={{ false: '#767577', true: Colors[colorScheme ?? 'light'].tint }}
        thumbColor={value ? '#ffffff' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onToggle}
        value={value}
      />
    </ThemedView>
  );

  const renderNavigationSetting = (
    label: string,
    value: string,
    icon: any,
    onPress: () => void
  ) => (
    <TouchableOpacity style={styles.navigationItem} onPress={onPress}>
      <ThemedView style={styles.navigationContent}>
        <ThemedText type="default">{label}</ThemedText>
        <ThemedView style={styles.navigationValue}>
          <ThemedText style={styles.valueText}>{value}</ThemedText>
          <IconSymbol size={16} name={icon} color="#888" />
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Settings</ThemedText>
      </ThemedView>

      {renderSettingSection('Location', (
        <>
          {renderToggleSetting(
            'Use Current Location', 
            useCurrentLocation, 
            setUseCurrentLocation,
            'Automatically detect location for accurate calculations'
          )}

          {!useCurrentLocation && renderNavigationSetting(
            'Set Location Manually',
            `${userLocation.city}, ${userLocation.state}`,
            'chevron.right',
            () => {/* Navigation logic */}
          )}
        </>
      ))}

      {renderSettingSection('Alarm', (
        <>
          {renderToggleSetting(
            'Daily Brahma Muhurta Alarm', 
            alarmActive, 
            setAlarmActive
          )}

          {alarmActive && (
            <>
              {renderNavigationSetting(
                'Wake Up Time',
                `${alarmTime} minutes before Brahma Muhurta`,
                'chevron.right',
                () => {/* Navigation logic */}
              )}

              {renderNavigationSetting(
                'Alarm Sound',
                alarmSound,
                'chevron.right',
                () => {/* Navigation logic */}
              )}
            </>
          )}
        </>
      ))}

      {renderSettingSection('Notifications', (
        <>
          {renderToggleSetting(
            'Festival Notifications', 
            notifyFestivals, 
            setNotifyFestivals,
            'Get notifications for upcoming festivals'
          )}

          {notifyFestivals && renderToggleSetting(
            'Day Before Reminder', 
            notifyDayBefore, 
            setNotifyDayBefore,
            'Receive reminders one day before festivals'
          )}
        </>
      ))}

      {renderSettingSection('Appearance', (
        <>
          {renderToggleSetting(
            'Use System Theme', 
            useSystemTheme, 
            setUseSystemTheme
          )}

          {!useSystemTheme && renderToggleSetting(
            'Dark Mode', 
            darkMode, 
            setDarkMode
          )}
        </>
      ))}

      {renderSettingSection('Account', (
        <>
          {!isSubscribed ? (
            <TouchableOpacity style={styles.subscribeButton}>
              <ThemedText type="defaultSemiBold" style={styles.subscribeText}>
                Subscribe (₹49/month)
              </ThemedText>
              <ThemedText style={styles.subscribeDescription}>
                Remove ads and support the app
              </ThemedText>
            </TouchableOpacity>
          ) : (
            <ThemedView style={styles.subscribedContainer}>
              <ThemedView style={styles.subscribedStatus}>
                <IconSymbol size={20} name="checkmark.seal.fill" color="#4CAF50" />
                <ThemedText type="defaultSemiBold" style={styles.subscribedText}>
                  Premium Subscriber
                </ThemedText>
              </ThemedView>
              <ThemedText style={styles.subscribedDescription}>
                Ad-free experience • Next billing date: Apr 22, 2024
              </ThemedText>
            </ThemedView>
          )}

          <TouchableOpacity style={styles.supportButton}>
            <ThemedText type="defaultSemiBold">Contact Support</ThemedText>
          </TouchableOpacity>
        </>
      ))}

      <ThemedView style={styles.appInfoContainer}>
        <ThemedText style={styles.appVersionText}>Temple Bells v1.0.0</ThemedText>
        <ThemedText style={styles.appCopyrightText}>
          © 2024 CosmicTime • Privacy Policy • Terms of Use
        </ThemedText>
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
  settingSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  sectionTitle: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingDescription: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },
  navigationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  navigationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navigationValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    marginRight: 8,
    opacity: 0.6,
  },
  subscribeButton: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  subscribeText: {
    color: Colors.light.tint,
    marginBottom: 4,
  },
  subscribeDescription: {
    fontSize: 12,
    opacity: 0.6,
  },
  subscribedContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  subscribedStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  subscribedText: {
    marginLeft: 8,
  },
  subscribedDescription: {
    fontSize: 12,
    opacity: 0.6,
    marginLeft: 28,
  },
  supportButton: {
    padding: 16,
    alignItems: 'center',
  },
  appInfoContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  appVersionText: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  appCopyrightText: {
    fontSize: 12,
    opacity: 0.5,
    textAlign: 'center',
  },
});