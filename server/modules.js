const bcrypt = require("bcrypt")
const axios = require("axios")
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
    arr = arr ? arr : []
    return arr.reduce((acc, el) => {
        if(el.email == email){
            console.log(el.email)
            return el
        }
    }, {})
}

function findValueInArray(arr, value, key){
    arr = arr ? arr : []
    return arr.reduce((acc, el) => {
        if(el[key] == value){
            return true
        }
        return false
    }, false)
}


function compare_and_add_key(arr1, arr2, key, to_add){
    arr1 = arr1 ? arr1 : [{id: 12345678}] 
    arr2 = arr2 ? arr2 : [{id: 12345679}] 
    let maxlength = arr1.length > arr2.length ? arr1.length : arr2.length
    for(var i = 0; i < maxlength; i++){
      var current_key_1 = arr1[i] ? arr1[i][key] : null
      var current_key_2 = arr2[i] ? arr2[i][key] : null
      if(arr2[i] && current_key_1 == current_key_2){
        arr2[i][to_add] = true
      }else if(arr2[i]){
        arr2[i][to_add] = false
      }
    }
    return arr2
}

async function getGithubUser(access_token){
    const result = await axios.get("https://api.github.com/user", {
        params: {
            client_id: process.env.GITHUB_CLIENT_ID
        },
        headers: {
            Authorization: `token ${access_token}`,
            Accept: "application/vnd.github.v3+json"
        }
    })
    console.log(result.data)
    return result.data
}
//database queries
module.exports = {
    password_validation,
    get_user,
    encrypt_password,
    decrypt_password,
    findUser,
    getGithubUser,
    findValueInArray,
    compare_and_add_key
}