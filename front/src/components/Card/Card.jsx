import { Link } from "react-router-dom";

import styles from './Card.module.scss';

import { connect } from 'react-redux';

//* HOOKS
import { useState, useEffect } from "react";
//* ACTIONS
import { addFav, removeFav } from "../../redux/actions";

function Card(props) {

   const [isFav, setIsFav] = useState(false);

   useEffect(() => {
      props.myFavorites.forEach((fav) => {
         if (Number(fav.id) === Number(props.id)) {
            setIsFav(true);
         }
      });
   }, [props.myFavorites]);

   const handleFavorite = () => {
      if(isFav){
         setIsFav(false);
         props.removeFav(props.id);
      }else{
         setIsFav(true);
         props.addFav(props)
      }
   }

   return (
      <div className={styles.cardContainer}>
         {
            isFav ? (
               <span className={styles.favBtn} onClick={handleFavorite}>❤️</span>
            ) : (
               <span className={styles.favBtn} onClick={handleFavorite}>🤍</span>
            )
         }

         <span className={styles.closeBtn} onClick={() => props.onClose(props.id)}>X</span>
         <img className={styles.charImage} src={props.image} alt={props.name} />
         
         <div className={styles.charData}>
            <Link className={styles.charInfo} to={`/detail/${props.id}`}><h2>{props.name}</h2></Link>
            <hr />
            <h2>Specie: {props.species}</h2>
            <h2>Gender: {props.gender}</h2>
         </div>
      </div>
   );
}

const mapStateToProps = (state) => {
   return {myFavorites: state.myFavorites}
}

const mapDispatchToProps = (dispatch) => {
   return {
      addFav: (char) => { dispatch(addFav(char)) },
      removeFav: (id) => { dispatch(removeFav(id)) }
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Card)