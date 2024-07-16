// // public/firebase-messaging-sw.js
// importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

// firebase.initializeApp({
//     apiKey: "AIzaSyDXpLHnVuYGGjNBizwSm20Pi95a_StxNIE",
//     authDomain: "tasty-dog.firebaseapp.com",
//     projectId: "tasty-dog",
//     storageBucket: "tasty-dog.appspot.com",
//     messagingSenderId: "1086376724882",
//     appId: "1:1086376724882:web:5a7cacd9645c8609c4594b" 
// //   measurementId: "YOUR_MEASUREMENT_ID"
// });

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function(payload) {
//     const { title, body, image } = payload.notification;
//     const notificationTitle = title;
//     const notificationOptions = {
//       body: body,
//       icon: image,
//     };
  
//     self.registration.showNotification(notificationTitle, notificationOptions);
//   });