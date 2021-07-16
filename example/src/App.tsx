import React, { useMemo, useState } from 'react';
import { Dimensions, ScrollView, StatusBar, Text, View } from 'react-native';
import {
  Button,
  Carousel,
  Image,
  LoadIndicator,
  TextInput,
} from 'react-native-disco-ui';

const screenWidth = Dimensions.get('window').width;

const data = [0, 1, 2, 3, 4];

const App = () => {
  const [imageIndex, setImageIndex] = useState(1);
  const snapPoints = useMemo(
    () => data.map((_, index) => ({ x: index * -screenWidth })),
    []
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.mainTitle}>{'React Native Disco UI'}</Text>
        <Text style={styles.sectionTitle}>{'Carousel'}</Text>
        <Carousel
          style={[styles.carousel, { width: screenWidth * data.length }]}
          horizontalOnly={true}
          snapPoints={snapPoints}
        >
          {data.map((_, index) => (
            <Image
              style={styles.swipeItem}
              source={{
                uri: `https://randomuser.me/api/portraits/lego/${index}.jpg`,
              }}
            />
          ))}
        </Carousel>
        <Text style={styles.sectionTitle}>{'Image'}</Text>
        <View style={styles.row}>
          <Image
            style={styles.image}
            isLoading={true}
            source={{
              uri: `https://randomuser.me/api/portraits/lego/${imageIndex}.jpg`,
            }}
          />
          <Image
            style={styles.imageRound}
            source={{
              uri: `https://randomuser.me/api/portraits/lego/${imageIndex}.jpg`,
            }}
          />
          <Image
            style={styles.image}
            source={{
              uri: `https://randomuser.me/api/portraits/lego/2.jpg`,
            }}
          />
        </View>
        <Text style={styles.sectionTitle}>{'Button'}</Text>
        <View style={styles.row}>
          <Button
            title={'Change picture'}
            style={styles.button}
            titleStyle={styles.buttonText}
            onPress={() => setImageIndex(imageIndex >= 8 ? 0 : imageIndex + 1)}
          />
          <Button
            title={'Secondary'}
            style={styles.secondaryButton}
            titleStyle={styles.secondaryButtonText}
          />
        </View>
        <Text style={styles.sectionTitle}>{'Text Input'}</Text>
        <TextInput
          title={'Username'}
          placeholder={'E.g. Sonny Jim'}
          placeholderTextColor={'rgba(255, 255, 255, 0.75)'}
          titleStyle={styles.inputTitle}
          style={styles.inputText}
        />
        <TextInput
          title={'Password'}
          titleStyle={styles.inputTitle}
          style={styles.inputText}
          isPassword={true}
        />
        <Text style={styles.sectionTitle}>{'Load Indicator'}</Text>
        <View style={styles.row}>
          <LoadIndicator color={'white'} />
          <LoadIndicator
            size={40}
            gapSize={300}
            stroke={8}
            color={'#B3B'}
            duration={400}
            clockwise={false}
          />
          <LoadIndicator
            stroke={2}
            gapSize={260}
            color={'orange'}
            renderIcon={() => (
              <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 4, backgroundColor: 'white' }} />
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#1c313a',
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  mainTitle: {
    alignSelf: 'center',
    marginTop: 80,
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  sectionTitle: {
    backgroundColor: '#455a64',
    width: '100%',
    marginTop: 60,
    paddingVertical: 8,
    paddingLeft: 20,
    marginBottom: 12,
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
  carousel: {
    flexDirection: 'row',
    marginTop: 20,
  },
  swipeItem: {
    width: screenWidth - 160,
    marginHorizontal: 80,
    height: 200,
    borderRadius: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
  },
  imageRound: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
  },
  button: {
    height: 50,
    paddingHorizontal: 20,
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
  secondaryButton: {
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 18,
    color: '#FFF',
  },
  row: {
    marginTop: 28,
    width: '100%',
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    paddingHorizontal: 20,
    width: '80%',
    height: 50,
    borderRadius: 25,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255,255, 0.3)',
    color: 'white',
  },
  inputTitle: {
    marginTop: 20,
    marginLeft: 60,
    marginBottom: 8,
    color: 'white',
  },
};

export default App;
