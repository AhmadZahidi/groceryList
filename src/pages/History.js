import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonMenuToggle, IonModal, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react"
import { addCircleOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";

import "firebase/firestore";
import { db } from "../firebaseConfig";
import { onValue, ref, set, push } from "firebase/database";
import { collection, onSnapshot } from "firebase/firestore";
import { useHistory } from "react-router";

const History=()=>{
    const [user_uid,setUser_uid]=useState("");
    const [items,setItems]=useState("");

    const [data,setData]=useState();

    const history=useHistory();

    useEffect(()=>{
        let _user_id=sessionStorage.getItem("user_uid");
        setUser_uid(_user_id);

        let path=_user_id+"/items";
        const savedItemsRef=ref(db,path);

        onValue(savedItemsRef,(snapshot)=>{
            const data=snapshot.val();

            if(snapshot.exists() ){
                const array=[];
                const filteredArray=[];

                Object.keys(data).forEach((key)=>{
                    array.push({
                        ...data[key],
                        uid:key
                    });
                });

                array.map(data=>{
                    if(data.is_saved===true){
                        filteredArray.push(data)
                    }
                })

                setData(filteredArray);
                console.log(filteredArray);
            }
        });

    },[])

    return(
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonMenuButton/>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonList lines="full">

                        {data && data.map((item,idx)=>{
                            return (
                                <IonItem key={idx}>
                                    <IonLabel>
                                        {item.title}
                                    </IonLabel>
                                </IonItem>
                            );
                        })}

                    </IonList>
                </IonContent>
            </IonPage>
        </>
    )
}

export default History;