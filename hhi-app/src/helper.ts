import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database'
import { StakeholderInfo } from 'types';

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID

});

const db = getDatabase(app, "https://hhimap-default-rtdb.firebaseio.com/");


function loadObjects() {
  var info: StakeholderInfo[] = [];
  onValue(ref(db), (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    data.forEach((el: any) => (

      info.push({
        ...el,
        logo: "None", headquarterCoordinates: el.headquarterCoordinates.split(","),
        locationsServed: el.locationsServed.split(";").map((val: any, idx: any) => {
          return {
            "name": val,
            "coordinates": el.locationServedCoordinates.split(";")[idx]
          }
        })
      })));
  });

  return info;
  // for(row : db.ref() )
  // var shinfo: StakeholderInfo = {
  //   logo: string,
  //   emailAddress: string,
  //   organizationName: string,
  //   headquarter: string,
  //   headquarterCoordinates: Coordinates,
  //   locationsServed: Record<string, Coordinates>,
  //   description: string,
  //   tags: string[],
  //   website: string,
  // }

}


export default loadObjects;