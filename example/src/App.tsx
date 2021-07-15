import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Image, LoadIndicator } from 'react-native-disco-ui';

const App = () => {
  const [imageIndex, setImageIndex] = useState(1);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: `https://randomuser.me/api/portraits/lego/${imageIndex}.jpg`,
        }}
      />
      <Button
        title={'Change picture'}
        style={styles.button}
        titleStyle={styles.buttonText}
        onPress={() => setImageIndex(imageIndex >= 8 ? 0 : imageIndex + 1)}
      />
      <Text style={styles.sectionTitle}>{'<LoadIndicator />'}</Text>
      <View style={styles.loadWheelsRow}>
        <LoadIndicator />
        <LoadIndicator
          size={40}
          gapSize={300}
          stroke={8}
          color={'green'}
          duration={400}
          clockwise={false}
        />
        <LoadIndicator
          stroke={2}
          gapSize={260}
          color={'orange'}
          renderIcon={() => (
            <View style={{ width: 20, height: 20, backgroundColor: 'red' }} />
          )}
        />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  sectionTitle: {
    marginTop: 50,
    marginBottom: 12,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  button: {
    marginTop: 20,
    width: '80%',
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    color: '#222',
  },
  loadWheelsRow: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

export default App;
