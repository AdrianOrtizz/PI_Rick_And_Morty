import axios from 'axios';

import Cards from './components/Cards/Cards';
import Nav from './components/Nav/Nav'

import About from './views/About/About';
import Detail from './views/Detail/Detail';
import Error from './views/Error/Error';
import Favorites from './views/Favorites/Favorites';
import Login from './views/Login/Login';
import SignUp from './views/SignUp/SignUp';

import { removeFavOnClose } from './redux/actions';

import { useState, useEffect, useMemo } from 'react';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';

function App(props) {
  const [characters, setCharacters] = useState([]);
  const [access, setAccess] = useState(false); 
  const [nav, setNav] = useState(false);

  const location = useLocation().pathname;
  const navigate = useNavigate();

  //* seeNav y el useEffects hacen que el van solo se muestre cuando no estamos ni en la sección de login ni de sign up
  //* el useEffects está pendiente de la location para que la función seeNav se ejecute cada vez que cambie el path de la página
  const seeNav = () => {
    if(location === '/' || location === '/signup'){
      setNav(false);
    }else{
      setNav(true);
    }
  }

  useEffect(() => {
    seeNav();
  }, [location])

  //* onSearch y randomCharacter se encargan de buscar personajes. onSearch los busca mediante id y
  //* random character toma un número al azar del 1 al 826 y se lo pasa a onSearch para que lo busque

  const onSearch = async (id) => {

    try{
      const { data } = await axios(`http://localhost:3001/rickandmorty/character/${id}`);
      
      if (data.name) {
        if(characters.some(character => character.name == data.name)){
          window.alert('Este personaje ya está en la lista');
        }else{
          setCharacters((oldChars) => [...oldChars, data]);
        }
     } else{
        window.alert('¡No hay personajes con este ID!');
     }

    }catch (error){
      alert(error.message)
    }
  }

  const randomCharacter = async () => {
    try {
      let randomNumber = Math.trunc(Math.random() * 826);
      onSearch(randomNumber);
    } catch (error) {
      alert(error.message)   
    }
  }

  //* onClose es la función que borra una card
  const onClose = (id) => {
    props.removeFavOnClose(id);
    setCharacters(characters.filter(character => Number(character.id) !== Number(id)))
  }
  
  //* Con siguientes funciones gestionamos el logueo del usuario
  const login = async (userData) => {
    const { email, password } = userData;
    const URL = 'http://localhost:3001/rickandmorty/login';

    try {
      const {data} = await axios(URL + `?email=${email}&password=${password}`);
      const { access } = data;
      setAccess(data);
      access && navigate('/home');
    } catch (error) {
      alert(error.response.data);
    }
 }

  const logOut = () => {
    setAccess(false)
  }

  //* Función para que el usuario se registre
  const signUp = async (userData) => {
    const URL = 'http://localhost:3001/rickandmorty/login';

    try {
      const { data } = await axios.post(URL, userData);
      alert('Successful registration!')
      navigate('/');
    } catch (error) {
      alert(error.response.data);
    }
  }

  useEffect(() => {
    !access && navigate('/');
  }, [access]);

  return (
    <div className='App'>

      {nav && <Nav onSearch={onSearch} randomCharacter={randomCharacter} logOut={logOut}/>}

      <Routes>
        <Route path='/' element={<Login login={login}/>}/>
        <Route path='/signup' element={<SignUp signUp={signUp}/>} />
        <Route path='/home' element={<Cards characters={characters} onClose={onClose}/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/favorites' element={<Favorites onClose={onClose}/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
       
    </div>
  );
}

const mapStateToProps = (state) => {
  return {myFavorites: state.myFavorites}
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeFavOnClose: (id) => {dispatch(removeFavOnClose(id))}
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(App);
