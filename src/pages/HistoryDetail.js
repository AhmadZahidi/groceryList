import { IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useParams } from "react-router";
import "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { useContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import Context from '../store/context';

const HistoryDetail=()=>{

    const ctx=useContext(Context);

    const params=useParams();

    return(
        <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton/>
                </IonButtons>
                <IonTitle>Detail</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
      {ctx.groceryList.map((data,key) => {
        return data.date.slice(0, 2) === params.id ? (
          <IonTitle key={key}>{data.name}</IonTitle>
        ) : (
          console.log(null)
        );
      })}
    </IonContent>
    </IonPage>
    )
}

export default HistoryDetail;