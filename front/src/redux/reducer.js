import {ADD_FAV, REMOVE_FAV, REMOVE_FAV_ON_CLOSE, FILTER_FAV, ORDER_FAV, GET_ALL_FAVS} from './actions-types';

const initialState = {
    myFavorites: [],
    allCharacters: []
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_FAVS:
            return {
                ...state,
                myFavorites: action.payload
            }
        case ADD_FAV:
            return {
                ...state, 
                myFavorites: action.payload, 
                allCharacters: action.payload 
            };

        case REMOVE_FAV:
            return {
                ...state,
                myFavorites: action.payload
            }

        case REMOVE_FAV_ON_CLOSE:
            return {
                ...state,
                myFavorites: state.myFavorites.filter((char) => char.id !== Number(action.payload))
            }

        case FILTER_FAV:

            if(action.payload === 'All'){
                return {
                    ...state,
                    myFavorites: state.allCharacters
                }
            }

            let charactersFiltred = state.allCharacters.filter((char) => char.gender === action.payload);
            return {
                ...state,
                myFavorites: charactersFiltred,
            }

        case ORDER_FAV:
            let charactersInOrder = state.myFavorites.sort((a,b) => {
                if(action.payload === 'A') return a.id - b.id;
                if(action.payload === 'D') return b.id - a.id;
            })
            return {
                ...state,
                myFavorites: charactersInOrder
            }

        default:
            return {...state}
    }
}

export default rootReducer;