import { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Pressable,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
} from 'react-native-reanimated';
import { SOUNDS } from '../constants/sounds';

const { width } = Dimensions.get('window');
const BUTTON_SIZE = (width - 60) / 4; // 4 columns with padding

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [playCount, setPlayCount] = useState(0);
  
  const filteredSounds = SOUNDS.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  const playSound = useCallback(async (url: string) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      
      const { sound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true }
      );
      
      // Unload after playing
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
      
      setPlayCount(c => c + 1);
      
      // Show interstitial every 10 plays
      if ((playCount + 1) % 10 === 0) {
        // TODO: Show interstitial ad
        console.log('Show interstitial ad');
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }, [playCount]);

  const renderSound = ({ item }: { item: typeof SOUNDS[0] }) => (
    <SoundButton sound={item} onPress={() => playSound(item.url)} />
  );

  return (
    <LinearGradient
      colors={['#FF6B35', '#F7C59F', '#EFEFEF']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🔊 Meme Sounds</Text>
          <Text style={styles.subtitle}>Tap to play!</Text>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search sounds..."
            placeholderTextColor="#666"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Sound Grid */}
        <FlatList
          data={filteredSounds}
          renderItem={renderSound}
          keyExtractor={(item) => item.id}
          numColumns={4}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
        />

        {/* Ad Banner Placeholder */}
        <View style={styles.adBanner}>
          <Text style={styles.adText}>📢 Ad Banner Here (AdMob)</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

function SoundButton({ sound, onPress }: { sound: typeof SOUNDS[0], onPress: () => void }) {
  const scale = useSharedValue(1);

  const handlePress = () => {
    scale.value = withSpring(0.85, {}, () => {
      scale.value = withSpring(1);
    });
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={[styles.soundButton, animatedStyle]}>
        <LinearGradient
          colors={sound.gradient}
          style={styles.soundGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.soundEmoji}>{sound.icon}</Text>
          <Text style={styles.soundName} numberOfLines={1}>{sound.name}</Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 80,
  },
  row: {
    justifyContent: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  soundButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: 16,
    overflow: 'hidden',
  },
  soundGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  soundEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  soundName: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  adBanner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#333',
    padding: 16,
    alignItems: 'center',
  },
  adText: {
    color: '#fff',
    fontSize: 12,
  },
});
