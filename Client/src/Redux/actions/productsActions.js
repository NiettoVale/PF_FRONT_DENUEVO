import axios from "axios";
import {
  GET_PRODUCTS,
  POST_PRODUCT,
  GET_SIZES,
  FILTER,
  GET_CATEGORY,
  GET_GENDER,
  ORDER,
  GET_USER_NAME,
  FAVORITES,
} from "./actionTypes";

const back = process.env.REACT_APP_BACK;

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${back}/products`);
      const products = response.data;

      dispatch({ type: GET_PRODUCTS, payload: products });

      return products;
    } catch (error) {
      alert("Algo salió mal!!!");
      console.error("Error fetching products:", error);
    }
  };
};

export const postProduct = (productData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${back}/products`, productData);
      const createdProduct = response.data;

      dispatch({ type: POST_PRODUCT, payload: createdProduct });

      return createdProduct;
    } catch (error) {
      alert("Algo salió mal!!!");
      console.error("Error creating product:", error);
    }
  };
};

export const getSizes = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${back}/sizes`);

      dispatch({ type: GET_SIZES, payload: data });
    } catch (error) {
      alert("Algo salió mal!!!");
      console.error(error);
    }
  };
};

export const getGenders = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${back}/gender`);

      dispatch({ type: GET_GENDER, payload: data });
    } catch (error) {
      alert("Algo salió mal!!!");
      console.error(error);
    }
  };
};

export const getCategory = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${back}/category`);

      dispatch({ type: GET_CATEGORY, payload: data });
    } catch (error) {
      alert("Algo salió mal!!!");
      console.error(error);
    }
  };
};

export const getFilters = (dataFilter) => {
  return async (dispatch) => {
    try {
      const isDataFilterEmpty = Object.values(dataFilter).every(
        (value) => value === ""
      );

      if (isDataFilterEmpty) {
        dispatch({ type: FILTER, payload: [] });
        return;
      }

      const response = await fetch(`${back}/filter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataFilter),
      });

      const data = await response.json();

      if (response.status === 404) {
        alert(data.message);
      }

      dispatch({ type: FILTER, payload: data });
    } catch (error) {
      alert("Algo salió mal!!!");
      console.log(error);
    }
  };
};

export const getUserByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${back}/profile/${name}`);

      const data = await response.json();

      if (response.status === 404) {
        alert(data.message);
      }

      dispatch({ type: GET_USER_NAME, payload: data });
    } catch (error) {
      alert("Algo salió mal!!!");
      console.log(error);
    }
  };
};

export const addFavorite = (userId, productId) => {
  return async () => {
    try {
      const response = await fetch(
        `${back}/users/${userId}/products/${productId}/favorite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        alert(data.message);
      }
    } catch (error) {
      alert("Algo salió mal!!!");
      console.log(error);
    }
  };
};

export const getFavorites = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${back}/favorites/${userId}`);

      const data = await response.json();

      if (response.status === 404) {
        alert(data.message);
      }

      dispatch({ type: FAVORITES, payload: data });
    } catch (error) {
      alert("Algo salió mal!!!");
      console.log(error);
    }
  };
};

export const removeFromFavorites = (userId, productId) => {
  return async () => {
    try {
      const response = await fetch(`${back}/favorites/${userId}/${productId}`, {
        method: "DELETE", // Utiliza el método DELETE para eliminar el producto de favoritos
      });

      const data = await response.json();

      if (response.status === 404) {
        alert(data.message);
      }

      if (response.status === 200) {
        alert(data.message);
        window.location.href = "/userProfile";
      }
    } catch (error) {
      alert("Algo salió mal!!!");
      console.log(error);
    }
  };
};

export const setOrderByName = (order) => {
  return { type: ORDER, payload: order };
};
