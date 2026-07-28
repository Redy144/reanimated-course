import { useIsFocused } from "expo-router";
import { type ComponentType, memo } from "react";
import { SharedTransitionBoundary } from "react-native-reanimated";

export function withSharedTransitionBoundary<P extends object>(
  WrappedComponent: ComponentType<P>,
) {
  const MemoizedContent = memo(WrappedComponent);

  return function WithSharedTransitionBoundary(props: P) {
    const isFocused = useIsFocused();

    return (
      <SharedTransitionBoundary isActive={isFocused}>
        <MemoizedContent {...props} />
      </SharedTransitionBoundary>
    );
  };
}
