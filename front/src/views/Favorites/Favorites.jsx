import { connect } from "react-redux"

import styles from './Favorites.module.scss'

//* COMPONENTE CARD
import Card from "../../components/Card/Card"

//* ACTIONS
import { filterFav, order, getAllFavs } from "../../redux/actions"

//* HOOKS
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

function Favorites(props){

    const [aux, setAux] = useState(false);

    const dispatch = useDispatch();

    const handleOrder = (event) => {
        setAux(!aux);
        dispatch(order(event.target.value));
    }

    const handleFilter = (event) => {
        dispatch(filterFav(event.target.value));
    }

    useEffect(() => {
        dispatch(getAllFavs())
    }, [])

    return (
        <div>
            <div className={styles.title}>
                {props.myFavorites.length > 0 && <h2 className={styles.favTitle}>Favorites:</h2>}
                {props.myFavorites.length === 0 && <h2 className={styles.favTitle}>You don't have favorite characters</h2>}
            </div>

            <div className={styles.filtersContainer}>
                <div>
                    <select className={styles.filterContainer} name="Order" id="" onChange={handleOrder}>
                        <option value="A">Upward</option>
                        <option value="D">Falling</option>
                    </select>
                </div>

                <div>
                    <select className={styles.filterContainer} name="Filter" id="" onChange={handleFilter}>
                        <option value="All">All Favorites</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Genderless">Genderless</option>
                        <option value="unknown">unknown</option>
                    </select>
                </div>
            </div>

            <div className={styles.cardsContainer}>
                {
                    props.myFavorites.map((char) => {
                        return <Card 
                            key={char.id}
                            id={char.id}
                            name={char.name}
                            status={char.status}
                            gender={char.gender}
                            species={char.species}
                            origin={char.origin.name}
                            image={char.image}
                            onClose={props.onClose}
                        />
                    })
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        myFavorites: state.myFavorites
    }
}

export default connect(mapStateToProps, null)(Favorites)