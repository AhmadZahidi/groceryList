import { IonButton, IonButtons, IonCheckbox, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonModal, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { addCircleOutline } from 'ionicons/icons'
import { useRef, useState } from "react";

import "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const Home = () => {
  const modal = useRef(null);
  const input = useRef(null);

  const [message, setMessage] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // month is zero-indexed, so add 1
  const year = today.getFullYear();

  const dateString = `${day}/${month}/${year}`;


  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }

  function onWillDismiss(e) {
    if (e.detail.role === 'confirm') {
      setMessage([...message, e.detail.data]);
      setIsChecked([...isChecked, false]); // set the default value of the new checkbox to false
    }
  }

  const sendData= async (e)=>{
    e.preventDefault();

    const ref=collection(firestore,"history")

    try{
        for (let i = 0; i < message.length; i++) {
            addDoc(ref,{
                name:message[i],
                isBuy:isChecked[i],
                date:dateString,
            }
            )
        }
    }
    catch(e){
        console.log(e);
    }
  }

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton id="open-modal">
                <IonIcon icon={addCircleOutline} size="large" />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonList lines="full">
            {message.map((item, key) => {
              return (
                <IonItem key={key}>
                  <IonCheckbox
                    slot="start"
                    onIonChange={(e) => {
                      const isCheckedAtIndex = e.target.checked ? true : false;
                      const newChecked = [...isChecked];
                      newChecked[key] = isCheckedAtIndex;
                      setIsChecked(newChecked);
                    }}
                    checked={isChecked[key]} // add checked property to set the default value to false
                  />
                  {console.log(isChecked)}
                  <IonLabel>{item}</IonLabel>
                </IonItem>
              )
            })}
          </IonList>

          <IonGrid>
            <IonRow class="ion-justify-content-center">
              <IonButton onClick={sendData}>Done Shopping</IonButton>
            </IonRow>
          </IonGrid>

          <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                </IonButtons>
                <IonTitle>Welcome</IonTitle>
                <IonButtons slot="end">
                  <IonButton strong={true} onClick={() => confirm()}>
                    Confirm
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonItem>
                <IonLabel position="stacked">Enter your Grocery</IonLabel>
                <IonInput ref={input} type="text" placeholder="Your name" />
              </IonItem>
            </IonContent>
          </IonModal>
        </IonContent>
      </IonPage>
    </>
  )
}

export default Home;
