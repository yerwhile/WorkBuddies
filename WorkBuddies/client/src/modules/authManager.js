import firebase from "firebase/app";
import "firebase/auth";

const _apiUrl = "/api/buddy";

export const getBuddyDetails = (firebaseUUID) => {
  return getToken().then(token => {
    return fetch(`${_apiUrl}/${firebaseUUID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json())
  })
}

const _doesBuddyExist = (firebaseUserId) => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/DoesBuddyExist/${firebaseUserId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp => resp.json()));
};

const _saveBuddy = (buddy) => {
  return getToken().then((token) =>
    fetch(_apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(buddy)
    }).then(resp => resp.json()));
};

export const getToken = () => firebase.auth().currentUser.getIdToken();


export const login = (email, pw) => {
  return firebase.auth().signInWithEmailAndPassword(email, pw)
    .then((signInResponse) => _doesBuddyExist(signInResponse.user.uid))
    .then((doesBuddyExist) => {
      if (!doesBuddyExist) {

        // If we couldn't find the user in our app's database, or the user is deactivated, we should logout of firebase
        logout();

        throw new Error("Something's wrong. The user exists in firebase, but not in the application database. (User may be deactivated)");
      }
    }).catch(err => {
      console.error(err);
      throw err;
    });
};


export const logout = () => {
  firebase.auth().signOut()
};


export const register = (buddy, password) => {
  return firebase.auth().createUserWithEmailAndPassword(buddy.email, password)
    .then((createResponse) => _saveBuddy({
      ...buddy,
      firebaseUserId: createResponse.user.uid
    }));
};


export const onLoginStatusChange = (onLoginStatusChangeHandler) => {
  firebase.auth().onAuthStateChanged((user) => {
    onLoginStatusChangeHandler(!!user);
  });
};