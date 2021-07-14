import React, { useCallback } from 'react';
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
  style: ViewStyle;
  title?: string;
  titleProps?: TextProps;
  enableRipple?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  androidRipple?: null | PressableAndroidRippleConfig | undefined;
  onButtonPressedStyle?: (pressed: boolean) => ViewStyle;
  titleStyle?: TextStyle;
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
