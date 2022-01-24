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

