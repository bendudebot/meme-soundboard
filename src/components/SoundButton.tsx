import { useCallback, memo } from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import type { MemeSound } from '../constants/sounds';
import { useSoundStore } from '../store/useSoundStore';
import {
  COLORS,
  LAYOUT,
  ANIMATION,
  SHADOWS,
  CONFIG,
  SOUND_TINTS,
  BLUR,
} from '../constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface SoundButtonProps {
  sound: MemeSound;
  size: number;
  onPlay: () => void;
}

export const SoundButton = memo(function SoundButton({
  sound,
  size,
  onPlay,
}: SoundButtonProps) {
  const scale = useSharedValue(1);
  const { toggleFavorite, isFavorite } = useSoundStore();
  const favorite = isFavorite(sound.id);

  const triggerHaptic = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const handlePressIn = useCallback(() => {
    'worklet';
    scale.value = withTiming(ANIMATION.press.scale, {
      duration: ANIMATION.press.duration,
    });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    'worklet';
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, [scale]);

  const handlePress = useCallback(() => {
    triggerHaptic();
    onPlay();
  }, [onPlay, triggerHaptic]);

  const handleLongPress = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    toggleFavorite(sound.id);
  }, [sound.id, toggleFavorite]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const tintColor = SOUND_TINTS[sound.tint];

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      onLongPress={handleLongPress}
      delayLongPress={CONFIG.longPressDelay}
      style={[
        styles.container,
        { width: size, height: size },
        animatedStyle,
      ]}
    >
      <BlurView intensity={BLUR.light} tint="dark" style={styles.blur}>
        {/* Tint overlay */}
        <View style={[styles.tintOverlay, { backgroundColor: tintColor }]} />

        {/* Content */}
        <View style={styles.content}>
          {favorite && (
            <View style={styles.favoriteIndicator}>
              <Text style={styles.favoriteHeart}>♥</Text>
            </View>
          )}

          <Text style={styles.emoji}>{sound.icon}</Text>
          <Text style={styles.name} numberOfLines={1}>
            {sound.name}
          </Text>
        </View>
      </BlurView>
    </AnimatedPressable>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: LAYOUT.radiusMedium,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.glass.border,
    ...SHADOWS.soft,
  },
  blur: {
    flex: 1,
  },
  tintOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    backgroundColor: COLORS.glass.light,
  },
  emoji: {
    fontSize: 26,
    marginBottom: 2,
  },
  name: {
    fontSize: 9,
    fontWeight: '600',
    color: COLORS.text.primary,
    textAlign: 'center',
  },
  favoriteIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteHeart: {
    fontSize: 9,
    color: COLORS.favorite,
  },
});
