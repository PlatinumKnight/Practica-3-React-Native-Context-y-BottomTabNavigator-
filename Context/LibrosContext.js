import React, { createContext, useState } from "react";
import { Alert } from "react-native";

export const LibrosContext = createContext();

const LibreriaProvider = (props) => {
  const [cantidad, setCantidad] = useState(0);
  const [total, setTotal] = useState(0);
  const [carrito, setCarrito] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [catalogo, setCatalogo] = useState([
    {
      codigo: 1,
      titulo: "Programación",
      precio: 100.5,
      idioma: "ESP",
      color: "blue",
    },
    {
      codigo: 2,
      titulo: "Aprende Python",
      precio: 80.0,
      idioma: "ESP",
      color: "blue",
    },
    {
      codigo: 3,
      titulo: "Precálculo",
      precio: 90.5,
      idioma: "ESP",
      color: "blue",
    },
    {
      codigo: 4,
      titulo: "Ingenieria De Software",
      precio: 60.5,
      idioma: "ESP",
      color: "blue",
    },
    {
      codigo: 5,
      titulo: "Ingenieria De Software 2",
      precio: 200.0,
      idioma: "ESP",
      color: "blue",
    },
  ]);

  const EliminarWishList = (libro) => {
    let temp = catalogo;
    let i = temp.findIndex((e) => e.codigo === libro.codigo);
    temp[i].color = "blue";
    let tempEl = wishList.filter((c) => c.codigo !== libro.codigo);
    setCatalogo(temp);
    setWishList(tempEl);
    Alert.alert("Se elimino de tu lista de deseados");
  };

  const AgregarWishList = (libro) => {
    let temp = catalogo;
    let i = temp.findIndex((e) => e.codigo === libro.codigo);

    if (temp[i].color === "blue") {
      temp[i].color = "red";
      let tempOrder = [...wishList, libro];
      tempOrder = tempOrder.sort((a, b) => a.codigo - b.codigo);
      setCatalogo(temp);
      setWishList(tempOrder);
      Alert.alert("Se añadio a tu lista");
    } else {
      temp[i].color = "blue";
      let tempEl = wishList.filter((c) => c.codigo !== libro.codigo);
      setCatalogo(temp);
      setWishList(tempEl);
      Alert.alert("Se elimino de tu lista de deseados");
    }
  };

  const agregarCarrito = (libro) => {
    let temp = catalogo.find((e) => e.codigo === libro.codigo);
    let tempCant = cantidad;
    tempCant = tempCant + 1;
    setCantidad(tempCant);

    let exist = carrito.find((e) => e.codigo === libro.codigo);
    if (exist != null) {
      temp.cantidad++;
      temp.importe = temp.cantidad * temp.precio;
      setCarrito([...carrito]);
      setTotal(total + temp.precio);
      Alert.alert("Se agrego a carrito");
    } else {
      temp["cantidad"] = 1;
      temp["Total"] = temp.cantidad * temp.precio;
      setCarrito([...carrito, temp]);
      setTotal(total + temp.precio);
      Alert.alert("Se agrego a carrito");
    }
  };

  const comprarCarrito = () => {
    EliminarCarroTodo();
    Alert.alert("Gracias por tu compra");
  };

  const EliminarCarro = (libro) => {
    let temp = carrito.find((e) => e.codigo === libro.codigo);
    let tempObj = carrito.filter((e) => e.codigo !== libro.codigo);
    let tempCant = cantidad;
    tempCant = tempCant - 1;
    setCantidad(tempCant);

    if (temp.cantidad === 1) {
      if (carrito.length === 1) {
        setCarrito([]);
      } else {
        setCarrito(tempObj);
      }
    } else {
      temp.cantidad--;
      temp.importe = temp.cantidad * temp.precio;
      setCarrito([...carrito]);
    }
    setTotal(total - temp.precio);
  };

  const EliminarCarroTodo = () => {
    if (carrito.length !== 0) {
      setCarrito([]);
      setTotal(0);
      setCantidad(0);
    } else {
      Alert.alert("No hay nada que eliminar de carrito");
    }
  };

  return (
    <LibrosContext.Provider
      value={{
        EliminarWishList,
        EliminarCarro,
        EliminarCarroTodo,
        AgregarWishList,
        agregarCarrito,
        comprarCarrito,
        catalogo,
        wishList,
        carrito,
        total,
        cantidad,
      }}
    >
      {props.children}
    </LibrosContext.Provider>
  );
};

export default LibreriaProvider;
