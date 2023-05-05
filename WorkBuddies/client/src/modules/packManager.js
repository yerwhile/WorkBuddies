import { getToken } from "./authManager";

const _apiUrl = "/api/pack";

export const getAllPacks = () => {
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

export const getPacksByState = (state) => {
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

export const getPackDetails = (id) => {
  
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
            "An unknown error occurred while trying to get pack details.",
          );
        }
      });
    });
  }

  export const getPacksByHangout = (hangout) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/searchByHangout?q=${hangout}`, {
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

  export const getPacksByCity = (city) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/searchByCity?q=${city}`, {
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
  
export const getPacksByCompany = (company) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/searchByCompany?q=${company}`, {
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

  export const addPack = (pack) => {
    return getToken().then((token) => {
      return fetch(_apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(pack)
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

  export const editPack = (id) => {
    return getToken().then(token => {
        return fetch(`${_apiUrl}/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
    })
}
  