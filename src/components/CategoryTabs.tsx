import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { CATEGORIES } from '../constants/sounds';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CategoryTabsProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  favoritesCount: number;
}

export function CategoryTabs({
  selectedCategory,
  onSelectCategory,
  favoritesCount,
}: CategoryTabsProps) {
  // Add favorites tab at the beginning
  const allTabs = [
    { id: 'favorites', name: 'Favorites', icon: '❤️' },
    ...CATEGORIES,
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {allTabs.map((category) => (
          <CategoryTab
            key={category.id}
            category={category}
            isSelected={selectedCategory === category.id}
            onPress={() => onSelectCategory(category.id)}
            badge={category.id === 'favorites' ? favoritesCount : undefined}
          />
        ))}
      </ScrollView>
    </View>
  );
}

interface CategoryTabProps {
  category: { id: string; name: string; icon: string };
  isSelected: boolean;
  onPress: () => void;
  badge?: number;
}

function CategoryTab({ category, isSelected, onPress, badge }: CategoryTabProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(isSelected ? 1.05 : 1) }],
    backgroundColor: isSelected
      ? 'rgba(255,255,255,0.95)'
      : 'rgba(255,255,255,0.6)',
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      style={[styles.tab, animatedStyle]}
    >
      <Text style={styles.tabIcon}>{category.icon}</Text>
      <Text style={[styles.tabText, isSelected && styles.tabTextSelected]}>
        {category.name}
      </Text>
      {badge !== undefined && badge > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  tabIcon: {
    fontSize: 16,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  tabTextSelected: {
    color: '#333',
    fontWeight: '700',
  },
  badge: {
    backgroundColor: '#ff4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
});
