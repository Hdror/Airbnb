import { userService } from '../services/user.service.js'


// add update user 
export function login(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            dispatch({
                type: 'SET_USER',
                user,
            })
            return user
        } catch (err) {
            console.log('Could not Signin', err);
        }

    }
}

export function signup(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(credentials)
            dispatch({
                type: 'SET_USER',
                user,
            })
            return user
        } catch (err) {
            console.error('Could not Signup', err)
        }
    }
}

export function logout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch({
                type: 'SET_USER',
                user: null,
            })
            console.log('logged out')
        } catch (err) {
            console.error('Could not Logout', err)

        }
    }
}

export function getCurrentUser() {
    return async (dispatch) => {
        try {
            const user = await userService.getLoggedinUser()
            dispatch({
                type: 'SET_USER',
                user,
            })
            return user
        } catch (err) {
            console.log('No user found', err)
        }
    }
}

export function update(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.update(credentials)
            dispatch({
                type: 'SET_USER',
                user,
            })
            return user
        } catch (err) {
            console.log('Cannot signup', err)
        }
    }
}

export function addToLikedStays(stayId) {
    return async (dispatch) => {
        try {
            const user = userService.getLoggedinUser()
            user.likedStays.push(stayId)
            await userService.update(user)
            dispatch({
                type: 'ADD_USER_LIKED_STAY',
                user,
            })
        } catch (err) {
            console.log('Cannot save stay', err)
        }
    }
}

export function removeFromLikedStays(stayId) {
    return async (dispatch) => {
        try {
            const user = userService.getLoggedinUser()
            const likedStays = user.likedStays.filter(
                (likedStay) => likedStay !== stayId
            )
            await userService.update({ ...user, likedStays })
            dispatch({
                type: 'REMOVE_USER_LIKED_STAY',
                user,
            })
        } catch (err) {
            console.log('Cannot save stay', err)
        }
    }
}

export function loadUserLikedStays() {
    return async (dispatch) => {
        try {
            const user = await userService.getLoggedinUser()
            const likedStays = user.likedStays
            dispatch({ type: 'LOAD_USER_LIKED_STAYS', likedStays })
            return likedStays
        } catch (err) {
            console.log('UserActions: err in loadStaysFromUser', err)
        }
    }
}