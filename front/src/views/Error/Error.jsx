import React from "react"

import styles from './Error.module.scss'

export default function Error(){
    return (
        <div className={styles.errorContainer}>
            <h2>404</h2>
            <p>Lo sentimos, esta página no existe</p>
        </div>
    )
}