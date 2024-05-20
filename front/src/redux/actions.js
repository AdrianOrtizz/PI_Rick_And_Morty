import axios from 'axios';
import {ADD_FAV, REMOVE_FAV, REMOVE_FAV_ON_CLOSE, FILTER_FAV, ORDER_FAV, GET_ALL_FAVS} from './actions-types';
const endpoint = 'http://localhost:3001/rickandmorty/fav';

//*TRAER TODOS LOS FAVORITOS
export const getAllFavs = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            return dispatch({
                type: GET_ALL_FAVS,
                payload: data
            })     
        } catch (error) {
            console.log(error);
        }
    }     
}

//* AGREGAR UN FAVORITO
export const addFav = (character) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(endpoint, character); 
            return dispatch({
                type: ADD_FAV,
                payload: data
            });
        } catch (error) {
            console.log(error);
        }
    };
 };

//* ELIMINAR UN FAVORITO
export const removeFav = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.delete(`${endpoint}/${id}`);
            return dispatch({
                type: REMOVE_FAV,
                payload: data,
            }); 
        } catch (error) {
            console.log(error);
        }
    };
};

//* ELIMINAR UN FAVORITO DESDE EL BOTON X
export const removeFavOnClose = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.delete(`${endpoint}/${id}`);
            return dispatch({
                type: REMOVE_FAV_ON_CLOSE,
                payload: data,
            }); 
        } catch (error) {
            console.log(error);
        }
    };
}

//* FILTRAR ENTRE LOS FAVORITOS
export const filterFav = (gender) => {
    return {
        type:FILTER_FAV,
        payload: gender
    }
}

//* ORDENAR LOS FAVORITOS
export const order = (order) => {
    return {
        type: ORDER_FAV,
        payload: order
    }
}
