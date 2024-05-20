import styles from './SignUp.module.scss';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import validateSignUp from './validation';

export default function SignUp({signUp}){

    const [userData, setUserData] = useState({
        email: '',
        password: '',
        checkPassword: '',
    });

    const [errors, setErrors] = useState({})

    const navigate = useNavigate();

    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setUserData({...userData, [property]: value});
        setErrors(validateSignUp({...userData, [property]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(errors.hasOwnProperty('email') || errors.hasOwnProperty('password')){
            alert('Las credenciales no son válidas');
        }else{
            signUp(userData);
            setUserData({
                email: '',
                password: '',
                checkPassword: '',
            })
        }
        
    }

    const handleToLogin = () => {
        navigate('/');
    }

    return (
        <div className={styles.window}>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="email">Email:</label>
                        <input
                            placeholder='Email'
                            className={styles.input}
                            type='text'
                            name='email'
                            value={userData.email}
                            onChange={handleChange}
                        />
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

                    <div className={styles.inputContainer}>
                        <label htmlFor="checkPassword">Repeat password:</label>
                        <input 
                            placeholder="Password"
                            className={styles.input} 
                            type="password" 
                            name="checkPassword" 
                            value={userData.checkPassword} 
                            onChange={handleChange}
                        />
                        <span className={styles.inputError}>{errors.password}</span>
                    </div>

                    <button type="submit">Sign up</button>
                </form>

                <h5>Do you have account? <span onClick={() => handleToLogin()} className={styles.login}>Log in here</span></h5>
            </div>
        </div>
    ) 
}