import React, { useState, useEffect } from 'react';
import { TouchableOpacity, AccessibilityInfo } from 'react-native';
import audioHaptics from '../services/audioHaptics';

const DOUBLE_TAP_DELAY = 300; // milliseconds

export const AccessibleTouchable = ({
  onPress,
  children,
  style,
  soundDescription,
  isAccessibilityModeOn,
  language = 'en'
}) => {
  const [lastTap, setLastTap] = useState(null);

  const handlePress = async () => {
    const now = Date.now();

    if (isAccessibilityModeOn) {
      if (lastTap && (now - lastTap) < DOUBLE_TAP_DELAY) {
        // Double tap detected - execute the action
        onPress();
        await audioHaptics.playFocus();
      } else {
        // Single tap - read the description
        if (soundDescription) {
          await audioHaptics.speak(soundDescription, language);
        }
      }
    } else {
      // Regular mode - execute immediately
      onPress();
      await audioHaptics.playFocus();
    }

    setLastTap(now);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={style}
      accessible={true}
      accessibilityLabel={soundDescription}
      accessibilityHint={isAccessibilityModeOn ? "Double tap to activate" : "Tap to activate"}
    >
      {children}
    </TouchableOpacity>
  );
};

export default AccessibleTouchable;
