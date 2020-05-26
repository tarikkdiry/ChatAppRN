import firebase from 'firebase';

class Fire {
    constructor() {
        this.init()
        this.checkAuth()
    }

    init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyBnTrh-2T6j-KRrFbok-ZplG4O_hvayTi0",
                authDomain: "chatapprn-a3d62.firebaseapp.com",
                databaseURL: "https://chatapprn-a3d62.firebaseio.com",
                projectId: "chatapprn-a3d62",
                storageBucket: "chatapprn-a3d62.appspot.com",
                messagingSenderId: "933795911536",
                appId: "1:933795911536:web:b38b66f5ce7b56ed6a21b5",
                measurementId: "G-KEMMHNRJB3"
            })
        }
    };

    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
        });
    };

    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            }

            this.db.push(message);
        });
    };

    parse = message => {
        const { user, text, timestamp } = message.val();
        const { key: _id } = message;
        const createdAt = new Date(timestamp);

        return {
            _id,
            createdAt,
            text,
            user
        };
    };

    get = callback => {
        this.db.on("child_added", snapshot => callback(this.parse(snapshot)));
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