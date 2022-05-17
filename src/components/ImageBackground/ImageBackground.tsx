import * as React from 'react';
import { useCallback, useMemo, useState } from 'react';
import {
  ImageBackground as RNImageBackground,
  ImageErrorEventData,
  ImageLoadEventData,
  ImageResizeMode,
  ImageStyle,
  NativeSyntheticEvent,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import Button from '../Button';
import Shimmer from '../Shimmer';
import styles, { DEFAULT_IMAGE_SIZE } from './imageBackground.style';

interface Props {
  source: number | { uri: string };
  style?: ViewStyle | ImageStyle | (ViewStyle | undefined)[] | (ImageStyle | undefined)[];
  imageStyle?: ViewStyle & ImageStyle;
  isLoading?: boolean;
  onLoad?: (event: NativeSyntheticEvent<ImageLoadEventData>) => void;
  onError?: (error: NativeSyntheticEvent<ImageErrorEventData>) => void;
  renderRetryButton?: () => void;
  onRetryPress?: () => void;
  shimmerColor?: string;
  shimmerBackground?: string;
  renderLoadIndicator?: () => void;
  children: React.ReactNode;
  blurRadius?: number;
}

const ImageBackground = ({
  source,
  style,
  isLoading,
  onError,
  onLoad,
  renderRetryButton,
  onRetryPress,
  shimmerColor,
  shimmerBackground,
  renderLoadIndicator,
  imageStyle,
  ...props
}: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const flattenedStyles = useMemo(
    () => StyleSheet.flatten([style, imageStyle]),
    [style, imageStyle],
  );
  const width = (flattenedStyles?.width as number) || DEFAULT_IMAGE_SIZE;
  const height = (flattenedStyles?.height as number) || DEFAULT_IMAGE_SIZE;
  const resizeMode = (flattenedStyles?.resizeMode as ImageResizeMode) || 'cover';

  const onImageError = useCallback(
    (error: NativeSyntheticEvent<ImageErrorEventData>) => {
      setHasError(true);
      onError && onError(error);
    },
    [onError],
  );

  const onImageLoad = useCallback(
    (event: NativeSyntheticEvent<ImageLoadEventData>) => {
      setIsLoaded(true);
      onLoad && onLoad(event);
    },
    [onLoad],
  );

  const showShimmer = (!isLoaded && !hasError) || isLoading;

  return (
    <View style={[styles.imageContainer, style]}>
      <RNImageBackground
        style={{ width, height }}
        source={source}
        onError={onImageError}
        onLoad={onImageLoad}
        resizeMode={resizeMode}
        {...props}
      >
        {showShimmer &&
          (renderLoadIndicator ? (
            renderLoadIndicator()
          ) : (
            <Shimmer
              color={shimmerColor}
              backgroundColor={shimmerBackground}
              {...{ width, height }}
            />
          ))}
        {hasError &&
          (renderRetryButton ? (
            renderRetryButton()
          ) : (
            <Button
              onPress={() => onRetryPress && onRetryPress()}
              style={styles.retryButton}
              title={'Error: Tap to retry'}
            />
          ))}
        {!hasError && !showShimmer && <>{props.children}</>}
      </RNImageBackground>
    </View>
  );
};

export default ImageBackground;
