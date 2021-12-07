import React, { useContext } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Header, Button, Card } from "react-native-elements";
import { LibrosContext } from "../Context/LibrosContext";
import Icon from "react-native-vector-icons/FontAwesome";

export default function CartScreen() {
  const { carrito, EliminarCarroTodo, total, EliminarCarro, comprarCarrito } =
    useContext(LibrosContext);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header
          placement="center"
          centerComponent={{ text: "Carrito", style: styles.heading }}
        />

        {carrito.length > 0 ? (
          <View style={styles.container3}>
            <Text style={styles.texto}>Total: {total} pesos</Text>
            <Button
              onPress={() => comprarCarrito()}
              title="Comprar"
              titleStyle={{ fontSize: 18, fontWeight: "bold", color: "white" }}
              containerStyle={{ width: "75%" }}
            />
            <Button
              onPress={() => EliminarCarroTodo()}
              title="Eliminar todo"
              titleStyle={{
                fontSize: 18,
                fontWeight: "bold",
              }}
              containerStyle={{
                width: "75%",
              }}
            />
            {carrito.map((e, i) => {
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
                    <Text>Idioma: {e.idioma}</Text>
                    <Text>Cantidad: {e.cantidad}</Text>
                    <Text>Precio: ${e.precio} pesos</Text>
                    {e.cantidad > 1 ? (
                      <Text>Importe: ${e.importe}</Text>
                    ) : (
                      <Text></Text>
                    )}
                    <View style={styles.containerIcons}>
                      <Button
                        onPress={() => EliminarCarro(e)}
                        type="clear"
                        icon={<Icon name="trash" size={25} color="red" />}
                      />
                    </View>
                  </View>
                </Card>
              );
            })}
          </View>
        ) : (
          <View style={styles.container2}>
            <Text style={styles.texto}>Carrito vacio</Text>
          </View>
        )}
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
  heading: {
    color: "white",
    fontSize: 22,
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonContainer: {
    alignSelf: "flex-end",
  },
  containerIcons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  texto: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: 20,
  },
});
