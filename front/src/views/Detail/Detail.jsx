import axios from "axios";

import styles from './Detail.module.scss'

//* HOOKS
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Detail(){

    const [character, setCharacter] = useState({});
    const { id } = useParams();

    useEffect(() => {
        // axios(`https://rym2.up.railway.app/api/character/${id}?key=pi-adrianortizz`)
        axios(`http://localhost:3001/rickandmorty/character/${id}`).then(({ data }) => {
           if (data.name) {
              setCharacter(data);
           } else {
              window.alert('No hay personajes con ese ID');
           }
        });
        return setCharacter({});
    }, [id])


    return (
        <div>
            <div className={styles.title}>
                {character.name && <h2 className={styles.charTitle}>{character.name}</h2>}
            </div>
            <div className={styles.detailCard}>
                <div className={styles.imageContainer}>
                    {character.image && <img className={styles.charImage} src={character.image} alt={character.name} />}
                </div>

                <div className={styles.dataContainer}>
                    {character.status && <h2>STATUS - {character.status}</h2>}
                    {character.species && <h2>SPECIE - {character.species}</h2>}
                    {character.gender && <h2>GENDER - {character.gender}</h2>}
                    {character.origin && <h2>ORIGIN - {character.origin.name}</h2>}
                </div>
            </div>
        </div>
    )
}