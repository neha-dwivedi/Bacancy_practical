// import React from 'react'
// import NetInfo from "@react-native-community/netinfo";

// const baseURL = "https://hn.algolia.com/api/v1/search_by_date?tags=story&page=1" // DEV

// export default {

//   //this function is a main function for api's calling
//     async fetchData() {
//         NetInfo.fetch().then(state => {
//         if (state.isConnected) {
//             fetch(baseURL, {
//                 method: 'GET'
//               })
//                 .then((response) => response.json())
//                 //If response is in json then in success
//                 .then((responseJson) => {
//                     console.log('responseJson-------',responseJson)
//                     return responseJson;
//                 })
//         } 
//         else {
//             console.log('Bacancy','There are network issue')
//         }
//     });
//   }
// }