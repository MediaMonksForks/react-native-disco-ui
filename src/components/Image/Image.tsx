import React, { useCallback, useMemo, useState } from 'react';
import {
  Image as RNImage,
  ImageErrorEventData,
  ImageLoadEventData,
  NativeSyntheticEvent,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import Button from '../Button';
import styles, { DEFAULT_IMAGE_SIZE } from './image.style';
import ImageShimmer from './ImageShimmer';

interface Props {
  source: number | { uri: string };
  style?: ViewStyle;
  isLoading: boolean;
  onLoad?: (event: NativeSyntheticEvent<ImageLoadEventData>) => void;
  onError?: (error: NativeSyntheticEvent<ImageErrorEventData>) => void;
  renderRetryButton?: () => void;
  onRetryPress?: () => void;
  shimmerColor?: string;
  shimmerBackground?: string;
  renderLoadIndicator?: () => void;
}

const Image = ({
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
  ...props
}: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const flattenedStyles = useMemo(() => StyleSheet.flatten(style), [style]);
  const width = (flattenedStyles?.width as number) || DEFAULT_IMAGE_SIZE;
  const height = (flattenedStyles?.height as number) || DEFAULT_IMAGE_SIZE;

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
      <RNImage
        style={{ width, height }}
        source={source}
        onError={onImageError}
        onLoad={onImageLoad}
        {...props}
      />
      {showShimmer &&
        (renderLoadIndicator ? (
          renderLoadIndicator()
        ) : (
          <ImageShimmer
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
            onPress={onRetryPress && onRetryPress()}
            style={styles.retryButton}
            title={'Error: Tap to retry'}
          />
        ))}
    </View>
  );
};

export default Image;
