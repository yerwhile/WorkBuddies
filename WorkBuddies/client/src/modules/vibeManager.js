import { getToken } from "./authManager";

const _apiUrl = "/api/vibe";

export const getAllVibes = () => {
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

export const addVibe = (vibe) => {
    return getToken().then((token) => {
      return fetch(_apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(vibe)
      }).then((resp) => {
        if (resp.ok) {
          console.log("Vibe created successfully!")
          return resp.json();
        } else {
          throw new Error(
            "An error occurred while trying to create a pack.",
          );
        }
      });
    });
  }


export const getVibeIdsByPack = (packId) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/vibesByPack/${packId}`, {
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