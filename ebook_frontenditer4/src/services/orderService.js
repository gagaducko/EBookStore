const root = "http://localhost:8080" + "/order";

export const userOrder = async (uid) => {
    const response = await fetch(root + "/userOrder", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(uid),
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            return data
        }).catch((reason) => null);
    return response;
}


export const userFindOrderByBookName = async (uid, bookname) => {
    const response = await fetch(root + "/userFindOrderByBook", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({
            uid: uid,
            bookname: bookname
        }),
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            return data
        }).catch((reason) => null);
    return response;
}


export const userGetTimeOrder = async (uid, time) => {
    // alert("the uis is" + uid)
    // alert(time)
    const response = await fetch(root + "/userGetTimeOrder", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({
            uid: uid,
            time: time
        }),
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            return data
        }).catch((reason) => null);
    return response;
}