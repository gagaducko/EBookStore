import cookie from "react-cookies";
import qs from "qs";

import axios from "axios";

const root = "http://localhost:8080" + "/admin";

const root1 = "123.60.89.181:8085" + "/user";

const root3 = "http://localhost:8085" + "/user";


export const getTest = async () => {
let userfriend = {};
userfriend.uid = 1;
userfriend.uidfriend = 2;
console.log("userfriend is :", userfriend);
    const response = await fetch(
            "http://localhost:8085/friend/agreeMen", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(2),
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                return data
            }).catch((reason) => null);
    return response;



//    const response = await fetch(
//            "http://123.60.89.181:8080/user/register", {
//            method: "POST",
//            headers: new Headers({
//                'Content-Type': 'application/x-www-form-urlencoded'
//            }),
//            body: qs.stringify({
//                 "nickname": "lch_0824",
//                 "username": "lch_te01",
//                 "password": "lch_te01"
//            }),
//        }).then((res) => res.json())
//            .then((data) => {
//                console.log(data);
//                return data
//            }).catch((reason) => null);
//    return response;

//        const response = await fetch(
//            "http://123.60.89.181:8080/login",
//            {
//              method: 'POST', // or 'PUT'
//              body: qs.stringify({
//                    "username": "lch_123",
//                    "password": "lch_123"
//              }), // 或者将data转换为formData格式
//              headers: new Headers({
//                'Content-Type': 'application/x-www-form-urlencoded'  // 不进行header设置的默认格式
//              })
//        }).then((res) => res.json())
//                  .then((data) => {
////                              alert(data);
//                              console.log(data);
//                              // cookie.save("uid", data.uid);
//                              return data
//                          }).catch((reason) => null);
//          return response;
}

export const getAllUsers = async () => {


//    const response = await fetch(root + "/getAllUsers", {
//        method: "POST",
//        headers: new Headers({
//            "Content-Type": "application/json"
//        }),
//        body: JSON.stringify({
//        }),
//    }).then((res) => res.json())
//        .then((data) => {
//            console.log(data);
//            // cookie.save("uid", data.uid);
//            return data
//        }).catch((reason) => null);
//    return response;
}


export const getAOrder = async (oid) => {
    const response = await fetch(root + "/getAOrder", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(oid),
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            return data
        }).catch((reason) => null);
    // alert(response[0].book.bookname)
    return response;
}

export const getAllOrder = async () => {
    const response = await fetch(root + "/allOrder", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({
        }),
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            // cookie.save("uid", data.uid);
            return data
        }).catch((reason) => null);
    return response;
}



export const getAllBooks = async () => {
    // alert("begin to get")
    const response = await fetch(root + "/getAllBooks", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({
        }),
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            // cookie.save("uid", data.uid);
            return data
        }).catch((reason) => null);
    return response;
}

export const getBook = async (bookname) => {
    const response = await fetch(root + "/findBook", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({
                bookname: bookname,
            }),
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            return data
        }).catch((reason) => null);
    // alert(response[0])
    return response;
}

export const getOrderBookName = async (bookname) => {
    const response = await fetch(root + "/findOrderByBook", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({
            bookname: bookname
        }),
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            return data
        }).catch((reason) => null);
    return response;
}

export const getTimeOrder = async (time) => {
    const response = await fetch(root + "/getTimeOrder", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(time),
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            return data
        }).catch((reason) => null);
    return response;
}

export const getBookHot = async (time) => {
    const response = await fetch(root + "/getBookHot", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(time),
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            return data
        }).catch((reason) => null);
    return response;
}

export const getUserHot = async (time) => {
    const response = await fetch(root + "/getUserConsumingList", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(time),
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            return data
        }).catch((reason) => null);
    return response;
}



export const banUsers = async (uid) => {
    const response = await fetch(root + "/banUsers", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(uid),
    }).then((res) => res.json())
        .then((data) => {
        }).catch((reason) => null);

    return response;
}

export const unBanUsers = async (uid) => {
    const response = await fetch(root + "/unBanUsers", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(uid),
    }).then((res) => res.json())
        .then((data) => {
        }).catch((reason) => null);

    return response;
}

export const changeBook = async (book) => {
    return await fetch(root + "/changeBook", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({
            bid: book.bid,
            isbn: book.isbn,
            bookname: book.bookname,
            type: book.type,
            image: book.image,
            author: book.author,
            inventory: book.inventory,
            description: book.description,
            price: book.price
        })
    })
}

export const addBook = async (book) => {
    return await fetch(root + "/addBook", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({
            isbn: book.isbn,
            bookname: book.bookname,
            type: book.type,
            image: book.image,
            author: book.author,
            inventory: book.inventory,
            description: book.description,
            price: book.price
        })
    })
}


export const deleteBookByIds = async (bid) => {
    // alert(bid);
    return await fetch(root + "/deleteBook", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(bid)
    })
}
