import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  StyleProp,
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
  Keyboard,
} from "react-native";
import { colors, fontSizes, spacing } from "../config/styles";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { useGlobalTap } from "../hooks/context/GlobalTabContext";
import useKeyboard from "../helpers/useKeyboard";

type ButtonVariant =
  | "primary"
  | "outline"
  | "ghost"
  | "icon"
  | "card"
  | "profile";

type ButtonProps = {
  children?: ReactNode;
  variant?: ButtonVariant;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  disabledStyle?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
  icon?: ReactNode;
  enableGesture?: boolean;
  enableOnTouchEnd?: boolean;
  enableGlobalTapWhenKeyboardIsVisible?: boolean;
  enablePressedStyles?: boolean;
};

const Button = ({
  children,
  variant = "primary",
  onPress,
  disabled = false,
  style,
  disabledStyle = { opacity: 0.6 },
  textStyle,
  icon,
  enableGlobalTapWhenKeyboardIsVisible = false,
  enableGesture = false,
  enableOnTouchEnd = false,
  enablePressedStyles = true,
}: ButtonProps) => {
  const [keyboardWasVisible, setKeyboardWasVisible] = useState(false);
  const [globalTapWasInside, setGlobalTapWasInside] = useState(false);
  const buttonRef = useRef<View>(null);

  const { keyBoardIsVisible } = useKeyboard();

  useEffect(() => {
    if (keyBoardIsVisible) {
      setKeyboardWasVisible(true);
    }
  }, [keyBoardIsVisible]);

  useEffect(() => {
    if (
      keyboardWasVisible &&
      globalTapWasInside &&
      enableGlobalTapWhenKeyboardIsVisible &&
      onPress
    ) {
      onPress();
      setKeyboardWasVisible(false);
      setGlobalTapWasInside(false);
    }
  }, [keyboardWasVisible, globalTapWasInside]);

  useGlobalTap(buttonRef, (isInside) => {
    setGlobalTapWasInside(isInside);
  });

  const getBackgroundColor = () => {
    if (variant === "primary") return colors.primary;
    return "transparent";
  };

  const getTextColor = () => {
    if (variant === "primary") return colors.gray[100];
    if (variant === "outline") return colors.primary;
    return undefined;
  };

  const getBorderColor = () => {
    if (variant === "outline") return colors.primary;
    return "transparent";
  };

  const isIconOnly = variant === "icon";
  const isCard = variant === "card";
  const isProfile = variant === "profile";
  const isGhost = variant === "ghost";

  const baseStyles = [
    isIconOnly
      ? styles.iconOnly
      : isProfile
      ? styles.profile
      : isCard
      ? styles.card
      : isGhost
      ? styles.ghost
      : styles.button,
    {
      backgroundColor: getBackgroundColor(),
      borderColor: getBorderColor(),
    },
    style,
  ];

  if (disabled) {
    baseStyles.push(disabledStyle);
  }

  const content = (
    <>
      {icon && icon}
      {isProfile && children}
      {variant !== "icon" &&
        variant !== "profile" &&
        (typeof children === "string" ? (
          <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
            {children}
          </Text>
        ) : (
          children
        ))}
    </>
  );

  if (enableGesture && !disabled) {
    const tapGesture = Gesture.Tap()
      .maxDistance(10)
      .simultaneousWithExternalGesture(Gesture.Native())
      .onEnd((_e, success) => {
        if (success && onPress) {
          runOnJS(onPress)();
        }
      });

    return (
      <GestureDetector gesture={tapGesture}>
        <View style={baseStyles}>{content}</View>
      </GestureDetector>
    );
  }

  return (
    <Pressable
      ref={buttonRef}
      onPress={!enableOnTouchEnd ? onPress : undefined}
      onTouchEnd={enableOnTouchEnd ? onPress : undefined}
      disabled={disabled}
      style={({ pressed }) => [
        {
          opacity: pressed && enablePressedStyles ? 0.6 : 1,
        },
        baseStyles,
      ]}
    >
      {icon && icon}
      {isProfile && children}
      {variant !== "icon" &&
        variant !== "profile" &&
        (typeof children === "string" ? (
          <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
            {children}
          </Text>
        ) : (
          children
        ))}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: spacing.md,
    borderWidth: spacing.xxs,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    fontWeight: "600",
    fontSize: fontSizes.md,
  },
  iconOnly: {
    borderWidth: 0,
    padding: 0,
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  ghost: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing["md"],
    borderRadius: spacing["sm"],
    backgroundColor: "transparent",
  },
  card: {
    padding: 0,
    margin: 0,
    borderRadius: spacing.sm,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  profile: {
    width: spacing["16"],
    height: spacing["16"],
    borderRadius: spacing["16"] / 2,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Button;
