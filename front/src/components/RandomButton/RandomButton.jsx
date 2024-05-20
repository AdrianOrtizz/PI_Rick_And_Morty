import styles from './RandomButton.module.scss';

export default function RandomButton(props){
    return (
        <span className={styles.randomButton} onClick={props.randomCharacter}>Random</span>
    )
}