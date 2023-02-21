import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import { useHistory } from "react-router";

const Welcome=()=>{
    const history=useHistory();

    return(
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonRow>
                      <IonButton onClick={()=>{
                          history.push('/register')
                      }}>
                          Register
                      </IonButton>
                      <br/>

                      <IonButton onClick={()=>{
                          history.push('/login')
                      }}> 
                          Login
                      </IonButton>

                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Welcome;