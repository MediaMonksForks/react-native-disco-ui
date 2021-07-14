import { StyleSheet } from 'react-native';

export const DEFAULT_IMAGE_SIZE = 40;

export default StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'gray',
  },
  container: {
    width: DEFAULT_IMAGE_SIZE,
    height: DEFAULT_IMAGE_SIZE,
    backgroundColor: '#555',
  },
  retryButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shimmerContainer: {
    position: 'absolute',
  },
});
