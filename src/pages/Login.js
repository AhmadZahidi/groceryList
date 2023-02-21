import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { useContext, useState } from "react";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signOut,
    onAuthStateChanged
  } from 'firebase/auth'
import { auth } from "../firebaseConfig";
import { useHistory } from "react-router";
import Context from "../store/context";

const Login=()=>{
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const history=useHistory();

    const ctx=useContext(Context);

    const sendLogin=()=>{
        signInWithEmailAndPassword(auth,email,password)
        .then(cred=>{
            console.log('user login:',cred.user)
            // localStorage.setItem('uid',cred.user.uid)
            ctx.getUid(cred.user.uid);

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
                            <IonTitle>Login</IonTitle>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonList inset={true}>
                                <IonItem>
                                    <IonLabel position="floating">Email:</IonLabel>
                                    <IonInput 
                                        type="text"
                                        value={email}
                                        onIonChange={(e)=>setEmail(e.detail.value)}
                                        required
                                    ></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Password:</IonLabel>
                                    <IonInput 
                                        type="password"
                                        value={password}
                                        onIonChange={(e)=>setPassword(e.detail.value)}
                                        required
                                    ></IonInput>
                                </IonItem>
                            </IonList>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton onClick={sendLogin}>Login</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Login;