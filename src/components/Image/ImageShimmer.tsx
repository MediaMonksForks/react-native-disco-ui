import React, { memo, useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import styles from './image.style';

interface Props {
  width: number;
  height: number;
  color?: string;
  backgroundColor?: string;
}

const Shimmer = ({ width, height, color = 'white', backgroundColor = 'gray' }: Props) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const shimmerWidth = width / 2;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: width + shimmerWidth,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).start();
  }, [animatedValue, shimmerWidth, width]);

  return (
    <View style={[styles.shimmerContainer, { width, height, backgroundColor }]}>
      <Animated.View
        style={{
          position: 'absolute',
          left: -shimmerWidth,
          backgroundColor: backgroundColor,
          opacity: 0.5,
          transform: [{ translateX: animatedValue }],
        }}
      >
        <Svg width={shimmerWidth} height={height}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor={backgroundColor} stopOpacity="1" />
              <Stop offset="1" stopColor={color} stopOpacity="1" />
            </LinearGradient>
            <LinearGradient id="grad_r" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor={color} stopOpacity="1" />
              <Stop offset="1" stopColor={backgroundColor} stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width={shimmerWidth / 2} height={height} fill="url(#grad)" />
          <Rect
            x={shimmerWidth / 2}
            y="0"
            width={shimmerWidth / 2}
            height={height}
            fill="url(#grad_r)"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

export default memo(Shimmer);
