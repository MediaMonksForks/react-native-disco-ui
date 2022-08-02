import * as React from 'react';
import { memo, useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import styles from './loadIndicator.style';

interface Props {
  color?: string;
  size?: number;
  stroke?: number;
  duration?: number;
  clockwise?: boolean;
  gapSize?: number;
  renderIcon?: () => void;
}

const LoadIndicator = ({
  color = 'red',
  size = 60,
  stroke = 4,
  gapSize = 230,
  renderIcon,
  duration = 750,
  clockwise = true,
}: Props) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: clockwise ? 1 : -1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    return () => {
      animatedValue.stopAnimation();
    };
  }, [animatedValue, clockwise, duration]);

  const rotate = animatedValue.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  const containerSize = { width: size, height: size };
  const radius = useMemo(() => size / 2, [size]);

  return (
    <View style={[styles.container, containerSize]}>
      <Animated.View style={[styles.container, containerSize, { transform: [{ rotate }] }]}>
        <Svg width={size} height={size}>
          <Circle
            cx={radius}
            cy={radius}
            r={radius - stroke}
            strokeWidth={stroke}
            stroke={color}
            strokeDasharray={360}
            strokeDashoffset={gapSize}
          />
        </Svg>
      </Animated.View>
      {/* @ts-ignore */}
      {renderIcon && <View style={styles.iconContainer}>{renderIcon()}</View>}
    </View>
  );
};

export default memo(LoadIndicator);
