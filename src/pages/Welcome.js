import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import { useHistory } from "react-router";

const Welcome=()=>{
    const history=useHistory();

    return(
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                                <IonButton onClick={()=>{
                                    history.push('/register')
                                }}>
                                    Register
                                </IonButton>
                        </IonCol>
                        <IonCol>
                                <IonButton onClick={()=>{
                                    history.push('/login')
                                }}> 
                                    Login
                                </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Welcome;