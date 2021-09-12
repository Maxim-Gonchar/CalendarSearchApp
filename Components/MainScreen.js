import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Calendar } from "react-native-calendars"
import { LocaleConfig } from 'react-native-calendars';

export const MainScreen = ({ navigation }) => {
  console.log()
  LocaleConfig.locales['ru'] = {
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthNamesShort: [],
    dayNames: [],
    dayNamesShort: [],
    today: "",
  };
  LocaleConfig.defaultLocale = 'ru';
  const mNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Майя', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
  const [width, setWidth] = useState(
    Dimensions.get("window").width
  )
  useEffect(() => {
    const update = () => {
      const width = Dimensions.get("window").width;
      setWidth(width);
    }
    Dimensions.addEventListener("change", update)
    return () => {
      Dimensions.removeEventListener("change", update)
    }
  })
  return (
    <View style={styles.container}>
      {(width < 450) ? (
        <View style={styles.container}>
          <View style={styles.photoContainer}>
            <View style={styles.photo}>
              <Image source={{ width: 200, height: 170, uri: "https://demidov-art.ru/wp-content/uploads/televizory-foto_6.jpg" }} />
            </View>
            <View style={styles.textContainer} >
              <Text>Для получения списка сериалов, пожалуйста, выберите необходимый месяц и день</Text>
            </View>
          </View>
          <View style={styles.calendar}>
            <Calendar
              hideDayNames={true}
              style={{
                height: 330,
              }}
              onDayPress={(date) => navigation.navigate("SUPER FILM", { day: date.day, month: date.month, monthName: mNames[date.month - 1] })}
              theme={{ arrowColor: 'black' }}
            />
          </View>
        </View>
      ) : (
        <Calendar
          hideDayNames={true}
          onDayPress={(date) => navigation.navigate("SUPER FILM", { day: date.day, month: date.month, monthName: mNames[date.month - 1] })}
          theme={{ arrowColor: 'black' }}
        />)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  photoContainer: {
    justifyContent: "center",
    alignItems: 'center',
    paddingVertical: "10%",
    height: "50%"
  },
  textContainer: {
    width: "60%",
    textAlign: "center",
  },
  photo: {
    paddingBottom: "10%",
  },
  calendar: {
    height: "50%",
    justifyContent: "flex-end",
  }
});
