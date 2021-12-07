import React, { useContext } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Header, Card, Button } from "react-native-elements";
import { LibrosContext } from "../Context/LibrosContext";
import Icon from "react-native-vector-icons/FontAwesome";

export default function SettingsScreen() {
  const { wishList, EliminarWishList, agregarCarrito } =
    useContext(LibrosContext);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header
          placement="center"
          centerComponent={{ text: "Wish List", style: styles.header }}
        />
        <View style={styles.container3}>
          {wishList.length > 0 ? (
            wishList.map((e, i) => {
              return (
                <Card
                  containerStyle={{
                    width: "95%",
                    marginBottom: 10,
                  }}
                  key={i}
                >
                  <Card.Title>{e.titulo}</Card.Title>
                  <View>
                    <Text>Precio: ${e.precio} pesos</Text>
                    <Text>Idioma: {e.idioma}</Text>
                    <View style={styles.containerIcons}>
                      <Button
                        onPress={() => agregarCarrito(e)}
                        type="clear"
                        icon={
                          <Icon name="shopping-cart" size={25} color="blue" />
                        }
                      />
                      <Button
                        onPress={() => EliminarWishList(e)}
                        type="clear"
                        icon={<Icon name="trash" size={25} color="red" />}
                      />
                    </View>
                  </View>
                </Card>
              );
            })
          ) : (
            <View style={styles.container2}>
              <Text style={styles.texto}>Lista vacia</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  container3: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  header: {
    color: "white",
    fontSize: 22,
    paddingTop: 5,
    paddingBottom: 5,
  },
  containerIcons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  texto: {
    fontSize: 22,
  },
});
