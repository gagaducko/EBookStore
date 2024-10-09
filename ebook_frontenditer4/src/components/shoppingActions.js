// 购物车添加商品
function AddBook(data){
    return (dispatch, getState) => {
        dispatch({ type: "ADD_BOOK", data })
    }
}

// 购物车移除商品
function RemoveBook(data){
    return (dispatch, getState) => {
        dispatch({ type: "REMOVE_BOOK", data })
    }
}

// 清空购物车
function ClearBook(data){
    return (dispatch, getState) => {
        dispatch({ type: "CLEAR_BOOK", data })
    }
}



module.exports = {
    AddBook,
    RemoveBook,
    ClearBook,
}