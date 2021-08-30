import * as React from 'react';
import { useCallback } from 'react';
import {
  Pressable,
  PressableAndroidRippleConfig,
  PressableProps,
  Text,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

import styles from './button.style';

interface Props extends PressableProps {
  style?: ViewStyle | ViewStyle[];
  title?: string;
  titleProps?: TextProps;
  enableRipple?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  isListItem?: boolean;
  androidRipple?: null | PressableAndroidRippleConfig | undefined;
  onButtonPressedStyle?: (pressed: boolean) => ViewStyle | ViewStyle[];
  titleStyle?: TextStyle | TextStyle[];
  children?: React.ReactNode;
}

const defaultButtonPressedStyle = (pressed: boolean) => ({
  opacity: pressed ? 0.7 : 1,
});

const defaultRipple = { borderless: false, color: '#FFFFFF' };

const Button = ({
  style,
  children,
  isLoading,
  isListItem,
  disabled,
  androidRipple,
  enableRipple = true,
  onButtonPressedStyle,
  title,
  titleStyle,
  titleProps,
  ...props
}: Props) => {
  const pressableStyle = useCallback(
    ({ pressed }: { pressed: boolean }) => [
      {
        ...(onButtonPressedStyle
          ? onButtonPressedStyle(pressed)
          : defaultButtonPressedStyle(pressed)),
      },
      isLoading || disabled ? { opacity: 0.5 } : {},
      style ? style : styles.container,
    ],
    [disabled, isLoading, onButtonPressedStyle, style],
  );

  return (
    <Pressable
      style={pressableStyle}
      // @ts-ignore
      unstable_pressDelay={isListItem ? 400 : undefined}
      disabled={isLoading || disabled}
      android_ripple={enableRipple ? androidRipple || defaultRipple : null}
      {...props}
    >
      <>
        {title && (
          <Text style={titleStyle} {...titleProps}>
            {title}
          </Text>
        )}
        {children && children}
      </>
    </Pressable>
  );
};

export default Button;
