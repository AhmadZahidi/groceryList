import { IonButton, IonButtons, IonCheckbox, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonModal, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import {addCircleOutline} from 'ionicons/icons'
import { useRef, useState } from "react";

const Home=()=>{
    const modal = useRef(null);
    const input = useRef(null);
  
    const [message, setMessage] = useState([]);
  
    function confirm() {
      modal.current?.dismiss(input.current?.value, 'confirm');
    }
  
    function onWillDismiss(e) {
      if (e.detail.role === 'confirm') {
        
        // message.push(e.detail.data)
        setMessage([...message,e.detail.data]);
      }
    //   console.log(message)
    }

    return(
        <>
            <IonPage>
                <IonHeader >
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonMenuButton/>
                        </IonButtons>
                        <IonButtons slot="end">
                            <IonButton id="open-modal">
                                <IonIcon icon={addCircleOutline} size="large"/>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader> 

                <IonContent>

                    <IonList lines="full">
                    {message.map((item,key)=>{
                            return(<IonItem key={key}>
                                <IonCheckbox slot="start"></IonCheckbox>
                                <IonLabel>{item}</IonLabel>                                
                            </IonItem>)
                        })}
                    </IonList>

                    <IonGrid>
                        <IonRow class="ion-justify-content-center">
                            <IonButton>Done Shopping</IonButton>
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