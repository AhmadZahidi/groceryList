import React, { useEffect, useState } from "react";
import "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

const Context = React.createContext({
  groceryList: [],
  index: [],
  getUid:(uid)=>{},
  removeUid:()=>{},
  uid:"",
});

export const ContextProvider = (props) => {
  const [groceryList, setGroceryList] = useState([]);
  const [index, setIndex] = useState([]);
  const [uid,setUid]=useState();

  useEffect(() => {
    const ref = collection(firestore, "history");

    onSnapshot(ref, (snapshot) => {
      let array = [];
      snapshot.docs.forEach((doc) => {
        array.push({ ...doc.data(), id: doc.id });
      });
      array.sort((a, b) => {
        const dateA = new Date(a.date.split("/").reverse().join("/"));
        const dateB = new Date(b.date.split("/").reverse().join("/"));
        return dateA - dateB;
      });
      
      setGroceryList(array);

      setIndex([...new Set(array?.map(item=>item.date))].map((item, index) => index));

    });
  }, []);

  const uidHandler=(uid)=>{
    setUid(uid);
  }

  const removeUidHandler=()=>{
    setUid("");
    console.log("uid is removed from context")
  }

  return (
    <Context.Provider
      value={{
        groceryList: groceryList,
        index: index,
        getUid:uidHandler,
        removeUid:removeUidHandler,
        uid:uid
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
