import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonMenuToggle, IonModal, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { addCircleOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";

import "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { useHistory } from "react-router";

const History=()=>{


    const [data,setData]=useState();

    const history=useHistory();

    useEffect(()=>{
        const ref=collection(firestore,'history')

        onSnapshot(ref,(snapshot)=>{
            let array=[]
            snapshot.docs.forEach(doc=>{
                array.push({...doc.data(),id:doc.id})
            })
            setData(array);
        })
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
                        {[...new Set(data?.map(item => item.date))]
                        .sort((a, b) => {
                            const dateA = new Date(a.split('/').reverse().join('/'));
                            const dateB = new Date(b.split('/').reverse().join('/'));
                            return dateA - dateB;
                          })
                        ?.map((item,key)=>{
                            return(
                                <IonMenuToggle key={key} onClick={()=>{
                                    history.replace(`/history/${item}`)
                                }}>
                                    <IonItem key={key} button>
                                        <IonTitle>{item}</IonTitle>
                                    </IonItem>
                                </IonMenuToggle>
                            )
                        })}
                    </IonList>
                </IonContent>
            </IonPage>
        </>
    )
}

export default History;