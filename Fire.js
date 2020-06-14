import firebase from "firebase";

class Fire {
  constructor() {
    this.inti();
    this.checkAuth();
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyDrRkYgK1nu7dJvjLXvfkpd5uWnXrk2C7c",
        authDomain: "firechat-ee359.firebaseapp.com",
        databaseURL: "https://firechat-ee359.firebaseio.com",
        projectId: "firechat-ee359",
        storageBucket: "firechat-ee359.appspot.com",
        messagingSenderId: "922018196065",
        appId: "1:922018196065:web:7725764da6be3eaef41820",
        measurementId: "G-X5TTDXBXYS",
      });
    }
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    });
  };

  send = (messages) => {
    messages.forEach((item) => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user,
      };

      this.db.push(message);
    });
  };

  parse = (message) => {
    const { user, text, timestamp } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timestamp);

    return {
      _id,
      createdAt,
      text,
      user,
    };
  };

  get = (callback) => {
    this.db.on("child_added", (snapshot) => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }

  get db() {
    return firebase.database().ref("messages");
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}

export default new Fire();
