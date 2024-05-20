
const validateSignUp = (form) => {
    let errors = {};
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const regexNums = /\d/;

    if(!regexEmail.test(form.email)){
        errors = {...errors, email: 'El nombre de usuario debe ser un email!'}
    }

    if(form.email.length === 0){
        errors = {...errors, email: 'El nombre de usuario no puede estar vacío!'}
    }

    if(form.email.length >= 35){
        errors = {...errors, email: 'El nombre de usuario debe tener menos de 35 caracteres'}
    }

    if(!regexNums.test(form.password)){
        errors = {...errors, password: 'La contraseña debe contener al menos un número'}
    }

    if(form.password < 6 || form.password > 10){
        errors = {...errors, password: 'La contraseña debe tener entre 6 y 10 caracteres'}
    }

    if(form.password !== form.checkPassword){
        errors = {...errors, password: 'Las contraseñas no coinciden'}
    }

    return errors;
}

export default validateSignUp;