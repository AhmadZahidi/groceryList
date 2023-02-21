import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import { firestore,auth } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signOut,
    onAuthStateChanged
  } from 'firebase/auth'
import { useHistory } from "react-router";

  

const Register=()=>{

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const history=useHistory();

    const sendRegister=()=>{
        createUserWithEmailAndPassword(auth,email,password)
        .then(cred=>{
            console.log('cred',cred.user)
            history.replace('/home')
        })
        .catch(e=>{
            console.log(e.message)
        })
        
      }

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton/>
                    </IonButtons>
                    <IonTitle>
                        Grocery List
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonTitle>Register</IonTitle>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonList inset={true}>
                                <IonItem>
                                    <IonLabel position="floating">Email</IonLabel>
                                    <IonInput 
                                        type="text"
                                        value={email}
                                        onIonChange={(e)=>setEmail(e.detail.value)}
                                        required
                                    ></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Password</IonLabel>
                                    <IonInput
                                        type="password"
                                        value={password}
                                        onIonChange={(e)=>setPassword(e.detail.value)}
                                        required></IonInput>
                                </IonItem>
                            </IonList>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton onClick={sendRegister} expand="block">Register</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Register;