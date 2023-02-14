import { IonContent, IonHeader, IonLabel, IonPage, IonTitle } from "@ionic/react"

const Test=()=>{
    return(
        <>
            <IonPage>
                <IonHeader>
                    <IonTitle>Test page</IonTitle>
                </IonHeader>
                <IonContent>
                    <IonLabel>Test</IonLabel>
                </IonContent>
            </IonPage>
        </>
    )
}

export default Test;