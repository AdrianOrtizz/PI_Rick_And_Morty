import { Link } from "react-router-dom";
import styles from './Nav.module.scss';

//* COMPONENTES
import SearchBar from '../SearchBar/SearchBar.jsx';
import RandomButton from "../RandomButton/RandomButton.jsx";

export default function Nav(props){
    return(
        <div className={styles.navContainer}>
            <div className={styles.navPrin}>
                <Link className={styles.link} to='/home'>
                    <span className={styles.btn}>Home</span>
                </Link>
                    
                <Link className={styles.link} to='/about'>
                    <span className={styles.btn}>About</span>
                </Link>

                <Link className={styles.link} to='/favorites'>
                    <span className={styles.btn}>Favorites</span>
                </Link>

                <span className={styles.btn} onClick={props.logOut}>Log Out</span>
            </div>
            
            <div className={styles.navSearch}>
                <RandomButton randomCharacter={props.randomCharacter}/>
                <SearchBar onSearch={props.onSearch}/>
            </div>
        </div>
    )
}
