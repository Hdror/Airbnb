export function changePage(pageName) {
    return async (dispatch) => {
        try {
            const currPage = await pageName
            dispatch({ type: 'SET_PAGE', currPage })
        } catch (err) {
            console.log('currPage : err ', err)
        }
    }
}

export function toggleModal(modalName) {
    if (modalName) {
        return async (dispatch) => {
            try {
                dispatch({ type: 'OPEN_MODAL', modalName })
            } catch (err) {
                console.log(err);
            }
        }
    } else {
        return async (dispatch) => {
            try {
                dispatch({ type: 'CLOSE_MODAL' })
            } catch (err) {
                console.log(err);
            }
        }
    }
}



