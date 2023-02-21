import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonMenuToggle, IonModal, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react"
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
        const ref=collection(firestore,'items')

        onSnapshot(ref,(snapshot)=>{
            let array=[]
            let filteredArray=[]

            snapshot.docs.forEach(doc=>{
                array.push({...doc.data(),id:doc.id})
            })
            array.map(id => {
                if (id.uid === localStorage.getItem('uid')) {
                  filteredArray.push(id);
                }
              })
              setData(filteredArray);
        })
    },[])

    return(
        <>
        {console.log(data)}
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
                        {/* {[...new Set(data?.map(item => item.date))]
                        .sort((a, b) => {
                            const dateA = new Date(a.split('-').reverse().join('-'));
                            const dateB = new Date(b.split('-').reverse().join('-'));
                            return dateA - dateB;
                          }) */}
                        {data && data
                        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                        .map((item, key) => {
                            return (
                            <IonItem
                                key={key}
                            >
                                <IonItem key={key}>
                                    <IonLabel>
                                        <IonTitle class="ion-margin-bottom">{item.name}</IonTitle>
                                        <IonTitle>{item.date}</IonTitle>
                                    </IonLabel>
                                </IonItem>
                            </IonItem>
                            )
                        })}

                    </IonList>
                </IonContent>
            </IonPage>
        </>
    )
}

export default History;