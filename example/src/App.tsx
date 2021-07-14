import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Image } from 'react-native-disco-ui';

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
        title={'Change image'}
        style={styles.button}
        titleStyle={styles.buttonText}
        onPress={() => setImageIndex(imageIndex >= 8 ? 0 : imageIndex + 1)}
      />
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
  image: {
    width: 200,
    height: 200,
    borderRadius: 12,
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
};

export default App;
