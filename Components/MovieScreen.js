import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, SafeAreaView, TouchableOpacity, ScrollView, Button } from 'react-native';
import { fetchPost } from "./Data"

export const Movie = ({ navigation, route }) => {
  const d = route.params.day;
  const m = route.params.month
  const monthName = route.params.monthName;
  let day;
  let month;
  if (d < 10) {
    day = `0${d}`;
  } else {
    day = d;
  }
  if (m < 10) {
    month = `0${m}`;
  } else {
    month = m;
  }
  const link = `https://api.tvmaze.com/schedule?country=US&date=2021-${month}-${day}`
  useEffect(() => {
    getMovies();
  }, []);
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(false);
  const [togle, setTogle] = useState(true);
  async function getMovies() {
    setLoading(true);
    const data = await fetchPost.getAll(link);
    setPost(data);
    setLoading(false);
  }
  console.log(post)
  return (
    <SafeAreaView style={styles.mainColor}>
      {loading === true ? (
        <View style={styles.spinner}>
          <ActivityIndicator
          />
        </View>
      ) : (
        <>
          <View style={styles.date}>
            <Text>{d} {monthName}</Text>
          </View>
          <View style={styles.component}>
            <FlatList
              windowSize={togle === true ? 1 : 2}
              data={post}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.main}>
                  <TouchableOpacity style={styles.photo} onPress={() => navigation.push("Original", { uri: item.show.image.original })}>
                    {item.show.image === null ? (
                      <Image source={{ width: 80, height: 120, uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmkGQBRxFUx8O4KJxU13KVbryooB0W_2Ok9QbwrZITj_9Q_6U2b70USzXqqXW1CFSAi4s&usqp=CAU" }} />
                    ) :
                      <Image source={{ width: 80, height: 120, uri: item.show.image.medium }} />}
                  </TouchableOpacity>
                  <View style={{ height: "120px" }}>
                    <View style={styles.nameArea}>
                      <Text>{item.show.name}</Text>
                    </View>
                    <View style={styles.seasonArea}>
                      <View style={styles.table}>
                        {item.season === 2021 ? (
                          <Text style={styles.season}>Сезон: 1 </Text>
                        ) : (
                          <Text style={styles.season}>Сезон: {item.season} </Text>
                        )}
                        <Text>Эпизод: {item.number}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
          <View style={styles.hideButton}>
            <TouchableOpacity style={styles.button} onPress={() => setTogle(!togle)}>
              <Text>Показать весь список</Text>
            </TouchableOpacity>
          </View>
        </>
      )
      }
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  table: {
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
    width: "170px",
    height: "40px",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  season: {
    marginRight: "3%",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    flexDirection: "row",
    marginBottom: "7%",
  },
  photo: {
    marginRight: "5%",
  },
  nameArea: {
    height: "60px",
  },
  seasonArea: {
    height: "60px",
    justifyContent: "flex-end",

  },
  component: {
    paddingHorizontal: "5%",
    paddingTop: "8%",
  },
  date: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    height: "40px",
    borderBottomColor: "#EAEAEA",
  },
  mainColor: {
    backgroundColor: "white",
    flex: 1,
  },
  spinner: {
    flex: 1,
    justifyContent: "center"
  },
  button: {
    width: "100%",
    height: "30px",
    borderWidth: 2,
    borderColor: "#EAEAEA",
    textAlign: "center",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  hideButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "5%",
    paddingHorizontal: "5%",
  },
  hideList: {
    display: "none",
  }
});
