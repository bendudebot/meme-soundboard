import { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import { SOUNDS, MemeSound } from '../constants/sounds';
import { useSoundStore } from '../store/useSoundStore';
import { SoundButton } from '../components/SoundButton';
import { CategoryTabs } from '../components/CategoryTabs';
import { SearchBar } from '../components/SearchBar';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 4;
const PADDING = 16;
const GAP = 8;
const BUTTON_SIZE = (width - PADDING * 2 - GAP * (NUM_COLUMNS - 1)) / NUM_COLUMNS;

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { favorites, playCount, incrementPlayCount } = useSoundStore();

  // Filter sounds based on search and category
  const filteredSounds = useMemo(() => {
    let sounds = SOUNDS;

    // Filter by category
    if (selectedCategory === 'favorites') {
      sounds = sounds.filter((s) => favorites.includes(s.id));
    } else if (selectedCategory !== 'all') {
      sounds = sounds.filter((s) => s.category === selectedCategory);
    }

    // Filter by search
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      sounds = sounds.filter(
        (s) =>
          s.name.toLowerCase().includes(searchLower) ||
          s.category.toLowerCase().includes(searchLower)
      );
    }

    return sounds;
  }, [search, selectedCategory, favorites]);

  const playSound = useCallback(
    async (url: string) => {
      try {
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

        incrementPlayCount();

        // Show interstitial every 10 plays
        if ((playCount + 1) % 10 === 0) {
          // TODO: Show interstitial ad
          console.log('Show interstitial ad');
        }
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    },
    [playCount, incrementPlayCount]
  );

  const renderSound = useCallback(
    ({ item }: { item: MemeSound }) => (
      <SoundButton
        sound={item}
        size={BUTTON_SIZE}
        onPlay={() => playSound(item.url)}
      />
    ),
    [playSound]
  );

  const keyExtractor = useCallback((item: MemeSound) => item.id, []);

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2', '#f093fb']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🔊 Meme Sounds</Text>
          <Text style={styles.subtitle}>
            {filteredSounds.length} sounds • Tap to play • Hold to ❤️
          </Text>
        </View>

        {/* Search Bar */}
        <SearchBar value={search} onChangeText={setSearch} />

        {/* Category Tabs */}
        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          favoritesCount={favorites.length}
        />

        {/* Sound Grid */}
        {filteredSounds.length > 0 ? (
          <FlatList
            data={filteredSounds}
            renderItem={renderSound}
            keyExtractor={keyExtractor}
            numColumns={NUM_COLUMNS}
            contentContainerStyle={styles.grid}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.row}
            initialNumToRender={20}
            maxToRenderPerBatch={20}
            windowSize={5}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>
              {selectedCategory === 'favorites' ? '💔' : '🔇'}
            </Text>
            <Text style={styles.emptyText}>
              {selectedCategory === 'favorites'
                ? 'No favorites yet!\nHold any sound to add it'
                : 'No sounds found'}
            </Text>
          </View>
        )}

        {/* Ad Banner Placeholder */}
        <View style={styles.adBanner}>
          <Text style={styles.adText}>📢 Ad Banner (AdMob)</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
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
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
    fontWeight: '500',
  },
  grid: {
    paddingHorizontal: PADDING,
    paddingBottom: 80,
    paddingTop: 8,
  },
  row: {
    justifyContent: 'flex-start',
    gap: GAP,
    marginBottom: GAP,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 26,
  },
  adBanner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    paddingVertical: 14,
    alignItems: 'center',
  },
  adText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});
