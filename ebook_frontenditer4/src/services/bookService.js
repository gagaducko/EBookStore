const root = "http://localhost:8080" + "/book";

export const getBookById = async (bid) => {



//    const response = await fetch(root + "/getByBID", {
//        method: "POST",
//        headers: new Headers({
//            "Content-Type": "application/json"
//        }),
//        body: JSON.stringify(bid),
//    }).then((res) => res.json())
//        .then((data) => {
//            console.log(data);
//            return data
//        }).catch((reason) => null);
//    return response;
}

export const addToCart = async (uid, bid) => {
    const response = await fetch(root + "/addToCart", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({
            uid: uid,
            bid: bid
        }),
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            return data
        }).catch((reason) => null);
    return response;
}