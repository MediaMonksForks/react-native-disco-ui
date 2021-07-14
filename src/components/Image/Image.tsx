import React, { useCallback, useState } from 'react';
import { Image as RNImage, StyleSheet, View, ViewStyle } from 'react-native';

import Button from '../Button';
import styles, { DEFAULT_IMAGE_SIZE } from './image.style';
import ImageShimmer from './ImageShimmer';

interface Props {
  source: number | { uri: string };
  style?: ViewStyle;
  isLoading: boolean;
}

const Image = ({ source, style, isLoading }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const flattenedStyles = StyleSheet.flatten(style);
  const width = (flattenedStyles?.width as number) || DEFAULT_IMAGE_SIZE;
  const height = (flattenedStyles?.width as number) || DEFAULT_IMAGE_SIZE;

  const onError = useCallback(() => {
    setHasError(true);
  }, []);

  const showShimmer = (!isLoaded && !hasError) || isLoading;

  return (
    <View style={[styles.imageContainer, style]}>
      <RNImage
        style={{ width, height }}
        source={source}
        onError={onError}
        onLoad={() => setIsLoaded(true)}
      />
      {showShimmer && <ImageShimmer width={width} height={height} />}
      {hasError && <Button style={styles.retryButton} title={'Error: Tap to retry'} />}
    </View>
  );
};

export default Image;
