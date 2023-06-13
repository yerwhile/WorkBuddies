import { getToken } from "./authManager";

const _apiUrl = "/api/hangout";

export const getAllHangouts = () => {
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

export const getHangoutDetails = (id) => {
  
    return getToken().then(token => {
      return fetch(`${_apiUrl}/details/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error(
            "An unknown error occurred while trying to get hangout details.",
          );
        }
      });
    });
  }

export const addHangout = (hangout) => {
    return getToken().then((token) => {
      return fetch(_apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(hangout)
      }).then((resp) => {
        if (resp.ok) {
          console.log("Hangout created successfully!")
          return resp.json();
        } else {
          throw new Error(
            "An error occurred while trying to create a hangout.",
          );
        }
      });
    });
  }

export const getHangoutsByState = (state) => {
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

export const getHangoutIdsByPack = (hangoutId) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/hangoutsByPack/${hangoutId}`, {
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

export const updateHangout = (hangoutObj) => {
  return getToken().then(token => {
      return fetch(`${_apiUrl}/${hangoutObj.id}`, {
          method: "PUT",
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: hangoutObj.id,
            name: hangoutObj.name,
            streetAddress: hangoutObj.streetAddress,
            city: hangoutObj.city,
            state: hangoutObj.state
        })
      })
  })
}

export const addVibeToHangout = (hangoutVibe, hangoutId) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/addVibeToHangout/${hangoutId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(hangoutVibe)
    }).then((resp) => {
      if (resp.ok) {
        console.log("HangoutVibe added successfully!")
        return resp.json();
      } else {
        throw new Error(
          "An error occurred while trying to add a HangoutVibe.",
        );
      }
    });
  });
}