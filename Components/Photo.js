import React from 'react'
import { View, Image, Dimensions } from 'react-native';

export const Photo = ({ route }) => {
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;
  const origianl = route.params.uri;
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{ width: width, height: height, uri: origianl }}
      />
    </View>
  )
}
