//* COMPONENTE CARDS
import Card from '../Card/Card.jsx';

import styles from './Cards.module.scss'

export default function Cards(props) {
   return (
      <div className={styles.cardsContainer}>
         {props.characters.map(personaje => {
            return <Card 
               key={personaje.id}
               id={personaje.id}
               name={personaje.name}
               status={personaje.status}
               gender={personaje.gender}
               species={personaje.species}
               origin={personaje.origin.name}
               image={personaje.image}
               onClose={props.onClose}
            />
         })}
      </div>
   )
}
