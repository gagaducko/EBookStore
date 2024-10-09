const root = "http://localhost:8080" + "/cart";

export const showCart = async (uid) => {
    const response = await fetch(root + "/showCart", {
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


export const cartToOrder = async (uid) => {
    const response = await fetch(root + "/cartToOrder", {
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
