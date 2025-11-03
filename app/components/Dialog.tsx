import {
  forwardRef,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { Portal } from "react-native-paper";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { colors, spacing } from "../config/styles";

export type DialogHandle = {
  open: () => void;
  close: () => void;
};

export type DialogProps = {
  isOpen?: boolean | null;
  backDropColor?: string;
  closeOnBackdropPress?: boolean;
  enableCloseGesture?: boolean;
  style?: ViewStyle | ViewStyle[];
  onOpen?: () => void;
  onClose?: () => void;
  onVisibilityChange?: (isVisible: boolean) => void;
  trigger?: ({ open }: { open: () => void }) => ReactNode;
  children:
    | ((args: { close: () => void; isVisible: boolean }) => ReactElement)
    | ReactElement;
};

const Dialog = forwardRef<DialogHandle, DialogProps>(
  (
    {
      isOpen = null,
      backDropColor = "rgba(0,0,0,0.3)",
      enableCloseGesture = false,
      closeOnBackdropPress = false,
      style,
      onOpen,
      onClose,
      onVisibilityChange,
      trigger,
      children,
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState<boolean | null>(isOpen);

    useEffect(() => {
      if (isOpen !== undefined) setIsVisible(isOpen);
    }, [isOpen]);

    useEffect(() => {
      onVisibilityChange?.(Boolean(isVisible));
    }, [isVisible, onVisibilityChange]);

    const open = useCallback(() => {
      onOpen?.();
      setIsVisible(true);
    }, [onOpen]);

    const close = useCallback(() => {
      onClose?.();
      setIsVisible(false);
    }, [onClose]);

    useImperativeHandle(ref, () => ({ open, close }), [open, close]);

    const closeGesture = useMemo(
      () =>
        Gesture.Pan()
          .enabled(enableCloseGesture)
          .onEnd((e) => {
            if (e.translationY > 100) runOnJS(close)();
          }),
      [enableCloseGesture, close]
    );

    if (!isVisible) {
      return <>{trigger?.({ open })}</>;
    }

    return (
      <>
        {trigger?.({ open })}
        <Portal>
          <GestureDetector gesture={closeGesture}>
            <View
              style={[
                StyleSheet.absoluteFill,
                styles.overlay,
                { backgroundColor: backDropColor },
              ]}
              pointerEvents="box-none"
            >
              {closeOnBackdropPress ? (
                <TouchableWithoutFeedback onPress={close}>
                  <View style={StyleSheet.absoluteFillObject} />
                </TouchableWithoutFeedback>
              ) : (
                <View
                  style={StyleSheet.absoluteFillObject}
                  pointerEvents="none"
                />
              )}

              <View style={[styles.container, style]}>
                {typeof children === "function"
                  ? children({ close, isVisible })
                  : children}
              </View>
            </View>
          </GestureDetector>
        </Portal>
      </>
    );
  }
);

const styles = StyleSheet.create({
  overlay: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1001,
    elevation: 1001,
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: spacing["xl"],
    padding: spacing["xl"],
    borderWidth: 1,
    borderColor: "transparent",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: spacing["xs"] },
    shadowOpacity: 0.1,
    shadowRadius: spacing["md"],
    elevation: 10,
    maxWidth: 560,
    width: "90%",
  },
});

export default Dialog;
