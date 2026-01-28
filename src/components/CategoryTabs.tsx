import { memo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { CATEGORIES, type Category } from '../constants/sounds';
import { COLORS, LAYOUT, TYPOGRAPHY, ANIMATION, BLUR } from '../constants/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

interface CategoryTabsProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  favoritesCount: number;
}

interface FavoritesTab {
  id: 'favorites';
  name: string;
  icon: string;
}

type TabItem = Category | FavoritesTab;

export const CategoryTabs = memo(function CategoryTabs({
  selectedCategory,
  onSelectCategory,
  favoritesCount,
}: CategoryTabsProps) {
  const favoritesTab: FavoritesTab = { id: 'favorites', name: 'Favorites', icon: '♥' };
  const allTabs: TabItem[] = [favoritesTab, ...CATEGORIES];

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
});

interface CategoryTabProps {
  category: TabItem;
  isSelected: boolean;
  onPress: () => void;
  badge?: number;
}

const CategoryTab = memo(function CategoryTab({
  category,
  isSelected,
  onPress,
  badge,
}: CategoryTabProps) {
  const animatedBorderStyle = useAnimatedStyle(() => ({
    borderColor: withTiming(
      isSelected ? 'rgba(255, 255, 255, 0.25)' : COLORS.glass.border,
      { duration: ANIMATION.duration.fast }
    ),
  }));

  return (
    <Pressable onPress={onPress}>
      <AnimatedView style={[styles.tabWrapper, animatedBorderStyle]}>
        <BlurView
          intensity={isSelected ? BLUR.medium : BLUR.light}
          tint="dark"
          style={styles.tabBlur}
        >
          <View style={[
            styles.tab,
            isSelected && styles.tabSelected,
          ]}>
            <Text style={styles.tabIcon}>{category.icon}</Text>
            <Text style={[styles.tabText, isSelected && styles.tabTextSelected]}>
              {category.name}
            </Text>
            {badge !== undefined && badge > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            )}
          </View>
        </BlurView>
      </AnimatedView>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: LAYOUT.screenPadding,
    gap: 8,
  },
  tabWrapper: {
    borderRadius: LAYOUT.radiusFull,
    overflow: 'hidden',
    borderWidth: 1,
  },
  tabBlur: {
    overflow: 'hidden',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 6,
    backgroundColor: COLORS.glass.light,
  },
  tabSelected: {
    backgroundColor: COLORS.glass.medium,
  },
  tabIcon: {
    fontSize: 14,
  },
  tabText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.text.secondary,
  },
  tabTextSelected: {
    color: COLORS.text.primary,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  badge: {
    backgroundColor: COLORS.favorite,
    borderRadius: LAYOUT.radiusFull,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  badgeText: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
});
