import { getToken } from "./authManager";

const _apiUrl = "/api/buddy";

export const getAllBuddies = () => {
    return getToken().then((token) => {
        return fetch(_apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if(resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get packs.",
                );
            }
        });
    });
}

export const getBuddyProfile = (id) => {
  
    return getToken().then(token => {
      return fetch(`${_apiUrl}/profile/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error(
            "An unknown error occurred while trying to get pack details.",
          );
        }
      });
    });
  }

export const getBuddiesByState = (state) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/searchByState?q=${state}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if(resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get packs.",
                );
            }
        });
    });
}

export const addBuddyPack = (buddyPack) => {
    return getToken().then((token) => {
      return fetch(_apiUrl +"/addBuddyPack", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(buddyPack)
      }).then((resp) => {
        if (resp.ok) {
          console.log("Pack formed successfully!")
          return resp.json();
        } else {
          throw new Error(
            "An error occurred while trying to form a pack.",
          );
        }
      });
    });
  }