import { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Audio } from 'expo-av';

import { SOUNDS, type MemeSound } from '../constants/sounds';
import { COLORS, LAYOUT, TYPOGRAPHY, CONFIG, BLUR } from '../constants/theme';
import { useSoundStore } from '../store/useSoundStore';
import { SoundButton, CategoryTabs, SearchBar } from '../components';

// =============================================================================
// LAYOUT CALCULATIONS
// =============================================================================

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BUTTON_SIZE =
  (SCREEN_WIDTH -
    LAYOUT.screenPadding * 2 -
    LAYOUT.gridGap * (LAYOUT.gridColumns - 1)) /
  LAYOUT.gridColumns;

// =============================================================================
// MAIN COMPONENT
// =============================================================================

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
    const searchTerm = search.trim().toLowerCase();
    if (searchTerm) {
      sounds = sounds.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm) ||
          s.category.toLowerCase().includes(searchTerm)
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

        // Auto-unload after playback
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
          }
        });

        incrementPlayCount();

        // Interstitial ad trigger
        if ((playCount + 1) % CONFIG.interstitialFrequency === 0) {
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

  const emptyIcon = selectedCategory === 'favorites' ? '💔' : '🔇';
  const emptyText =
    selectedCategory === 'favorites'
      ? 'No favorites yet\nHold any sound to add it'
      : 'No sounds found';

  return (
    <View style={styles.container}>
      {/* Background gradient */}
      <LinearGradient
        colors={COLORS.background.gradient}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Meme Sounds</Text>
          <Text style={styles.subtitle}>
            {filteredSounds.length} sounds • Hold to favorite
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
            numColumns={LAYOUT.gridColumns}
            contentContainerStyle={styles.grid}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.row}
            initialNumToRender={CONFIG.flatList.initialNumToRender}
            maxToRenderPerBatch={CONFIG.flatList.maxToRenderPerBatch}
            windowSize={CONFIG.flatList.windowSize}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>{emptyIcon}</Text>
            <Text style={styles.emptyText}>{emptyText}</Text>
          </View>
        )}

        {/* Ad Banner - Glass style */}
        <View style={styles.adBannerWrapper}>
          <BlurView intensity={BLUR.medium} tint="dark" style={styles.adBannerBlur}>
            <View style={styles.adBanner}>
              <Text style={styles.adText}>Ad Banner</Text>
            </View>
          </BlurView>
        </View>
      </SafeAreaView>
    </View>
  );
}

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: LAYOUT.screenPadding + 4,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.title,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.tertiary,
    marginTop: 4,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  grid: {
    paddingHorizontal: LAYOUT.screenPadding,
    paddingBottom: 90,
    paddingTop: 8,
  },
  row: {
    justifyContent: 'flex-start',
    gap: LAYOUT.gridGap,
    marginBottom: LAYOUT.gridGap,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  emptyEmoji: {
    fontSize: 56,
    marginBottom: 16,
    opacity: 0.8,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: COLORS.text.tertiary,
    textAlign: 'center',
    fontWeight: TYPOGRAPHY.weights.medium,
    lineHeight: 24,
  },
  adBannerWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    borderTopWidth: 1,
    borderTopColor: COLORS.glass.borderLight,
  },
  adBannerBlur: {
    overflow: 'hidden',
  },
  adBanner: {
    paddingVertical: 16,
    paddingBottom: 28,
    alignItems: 'center',
    backgroundColor: COLORS.glass.light,
  },
  adText: {
    color: COLORS.text.muted,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
