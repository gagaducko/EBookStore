import cookie from "react-cookies";

const root = "http://localhost:8080" + "/user";

export const login = async (username, password) => {
  // alert(root);
  const response = await fetch(root + "/login", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      username: username,
      password: password
    }),
  }).then((res) => res.json())
      .then((data) => {
        console.log(data);
        cookie.save("uid", data.uid);
        return data
      }).catch((reason) => null);

  return response;
};


export const register = async (username, password, userEmail) => {
    // alert(root);
    const response = await fetch(root + "/register", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({
            username: username,
            password: password,
            userEmail: username
        }),
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            // cookie.save("uid", data.uid);
            return data
        }).catch((reason) => null);
    return response;
};

export const getUserBuy = async (uid, time) => {
    // alert(root);
    const response = await fetch(root + "/userBuy", {
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
            // cookie.save("uid", data.uid);
            return data
        }).catch((reason) => null);
    return response;
};