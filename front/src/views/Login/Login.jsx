import { useState } from "react"
import validate from "./validation"
import styles from './Login.module.scss'

import { useNavigate } from "react-router-dom"

export default function Login({login}){

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState({})

    const navigate = useNavigate();

    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setUserData({...userData, [property]: value});
        setErrors(validate({...userData, [property]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(errors.hasOwnProperty('email') || errors.hasOwnProperty('password')){
            alert('Las credenciales no son válidas');
        }else{
            login(userData);
            setUserData({
                email: '',
                password: '',
            })
        }
        
    }

    const handleToSignUp = () => {
        navigate('/signup');
    }

    return (
        <div className={styles.window}>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="email">Email:</label>
                        <input 
                            placeholder="Email"
                            className={styles.input} 
                            type="text" 
                            name="email" 
                            value={userData.email} 
                            onChange={handleChange}
                        />
                        <span className={styles.inputError}>{errors.email}</span>
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="password">Password:</label>
                        <input 
                            placeholder="Password"
                            className={styles.input} 
                            type="password" 
                            name="password" 
                            value={userData.password} 
                            onChange={handleChange}
                        />
                        <span className={styles.inputError}>{errors.password}</span>
                    </div>

                    <button type="submit">Log In</button>
                </form>

                <h5>Dont have account? <span onClick={() => handleToSignUp()} className={styles.signUp}>Sign up here</span></h5>
            </div>
        </div>
    )
}