import * as React from 'react';
import { useCallback, useMemo, useState } from 'react';
import {
  Image as RNImage,
  ImageErrorEventData,
  ImageLoadEventData,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  NativeSyntheticEvent,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import Button from '../Button';
import Shimmer from '../Shimmer';
import styles, { DEFAULT_IMAGE_SIZE } from './image.style';

interface Props {
  source: ImageSourcePropType | { uri: string };
  style?: ViewStyle | ImageStyle | (ViewStyle | undefined)[] | (ImageStyle | undefined)[];
  isLoading?: boolean;
  onLoad?: (event: NativeSyntheticEvent<ImageLoadEventData>) => void;
  onError?: (error: NativeSyntheticEvent<ImageErrorEventData>) => void;
  renderRetryButton?: () => void;
  onRetryPress?: () => void;
  shimmerColor?: string;
  shimmerBackground?: string;
  renderLoadIndicator?: () => void;
  blurRadius?: number;
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

  const flattenedStyles = useMemo(() => StyleSheet.flatten(style), [style]) as ImageStyle &
    ViewStyle;
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
      <RNImage
        style={{ width, height, resizeMode }}
        source={source}
        resizeMode={resizeMode}
        onError={onImageError}
        onLoad={onImageLoad}
        {...props}
      />
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
    </View>
  );
};

export default Image;
