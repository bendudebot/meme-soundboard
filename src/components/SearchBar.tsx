import { memo } from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, LAYOUT, TYPOGRAPHY, BLUR } from '../constants/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar = memo(function SearchBar({
  value,
  onChangeText,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <BlurView intensity={BLUR.light} tint="dark" style={styles.blur}>
          <View style={styles.inputContainer}>
            <Ionicons
              name="search"
              size={18}
              color={COLORS.text.tertiary}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Search sounds..."
              placeholderTextColor={COLORS.text.muted}
              value={value}
              onChangeText={onChangeText}
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="search"
              selectionColor={COLORS.accent.primary}
            />
            {value.length > 0 && (
              <Pressable
                onPress={() => onChangeText('')}
                style={styles.clearButton}
                hitSlop={8}
              >
                <Ionicons
                  name="close-circle"
                  size={18}
                  color={COLORS.text.tertiary}
                />
              </Pressable>
            )}
          </View>
        </BlurView>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: LAYOUT.screenPadding,
    marginBottom: 4,
  },
  wrapper: {
    borderRadius: LAYOUT.radiusMedium,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.glass.border,
  },
  blur: {
    overflow: 'hidden',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    backgroundColor: COLORS.glass.light,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.primary,
    fontWeight: TYPOGRAPHY.weights.regular,
  },
  clearButton: {
    padding: 4,
  },
});
