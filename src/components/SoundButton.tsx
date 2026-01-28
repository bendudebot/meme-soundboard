import React, { useCallback } from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { MemeSound } from '../constants/sounds';
import { useSoundStore } from '../store/useSoundStore';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface SoundButtonProps {
  sound: MemeSound;
  size: number;
  onPlay: () => void;
}

export function SoundButton({ sound, size, onPlay }: SoundButtonProps) {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const { toggleFavorite, isFavorite } = useSoundStore();
  const favorite = isFavorite(sound.id);

  const triggerHaptic = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, []);

  const handlePress = useCallback(() => {
    'worklet';
    // Bounce animation
    scale.value = withSequence(
      withTiming(0.75, { duration: 50 }),
      withSpring(1.1, { damping: 3, stiffness: 400 }),
      withSpring(1, { damping: 10, stiffness: 300 })
    );
    // Slight rotation wiggle
    rotation.value = withSequence(
      withTiming(-5, { duration: 50 }),
      withTiming(5, { duration: 50 }),
      withTiming(-3, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );
    runOnJS(triggerHaptic)();
    runOnJS(onPlay)();
  }, [onPlay, triggerHaptic]);

  const handleLongPress = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    toggleFavorite(sound.id);
  }, [sound.id, toggleFavorite]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  return (
    <AnimatedPressable
      onPress={handlePress}
      onLongPress={handleLongPress}
      delayLongPress={300}
      style={[styles.container, { width: size, height: size }, animatedStyle]}
    >
      <LinearGradient
        colors={sound.gradient}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Favorite indicator */}
        {favorite && (
          <View style={styles.favoriteIndicator}>
            <Text style={styles.favoriteHeart}>❤️</Text>
          </View>
        )}
        
        <Text style={styles.emoji}>{sound.icon}</Text>
        <Text style={styles.name} numberOfLines={1}>
          {sound.name}
        </Text>
      </LinearGradient>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  emoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  name: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  favoriteIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  favoriteHeart: {
    fontSize: 12,
  },
});
