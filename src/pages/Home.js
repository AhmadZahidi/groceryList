import { IonContent, IonHeader, IonLabel, IonPage, IonTitle } from "@ionic/react"

const Home=()=>{
    return(
        <>
            <IonPage>
                <IonHeader>
                    <IonTitle>Home page</IonTitle>
                </IonHeader>
                <IonContent>
                    <IonLabel>Home</IonLabel>
                </IonContent>
            </IonPage>
        </>
    )
}

export default Home;