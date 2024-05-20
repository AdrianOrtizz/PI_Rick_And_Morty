import styles from './About.module.scss';

export default function About(){
    return (
        <div>
            <div className={styles.title}>
                <h2>About Me</h2>
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.data}>
                    <h2>Name: Adrian Ortiz</h2>
                    <h2>GitHub: AdrianOrtizz</h2>
                    <h2>Age: 20 years old</h2>
                    <h2>Studies: Full Stack Developer in Henry (in progress)</h2>
                    <h2>Social networks:</h2>
                    <ul>
                        <li>Instragram: @ortizz.io</li>
                        <li>Facebook: Adrian Ortiz</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}