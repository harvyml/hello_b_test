const bcrypt = require("bcrypt")

/**
 * Compares and returns an error if:
 * 1. The password and password_validation don't match
 * 2. The password doesn't have at least one number
 * 3. the password is 
 * @param {string} password 
 * @param {string} password_validation 
 */
function password_validation(password, password_validation){
    if(password != password_validation){
        return {err: {message: "Please check that the 'password' and 'password validation' fields match"}, okay: false}
    }else if(password.length < 6){
        return {err: {message: "Your password must have at least seven characters"}, okay: false}
    }
    return {okay: true}
}

async function get_user(_id){
    
    return result
}

function from_ms_to_date_format(ms) {
    let date = new Date(ms)
    return date.toDateString()
}

async function encrypt_password(password) {
    let hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword
}

function decrypt_password(password, encrypted_password) {
    try {
        return bcrypt.compareSync(password, encrypted_password);
    } catch (err) {
        return err.message
    }
}

function findUser(arr, email){
    return arr.reduce((acc, el) => {
        if(el.email == email){
            console.log(el.email)
            return el
        }
    }, {})
}


//database queries
module.exports = {
    password_validation,
    get_user,
    encrypt_password,
    decrypt_password,
    findUser
}