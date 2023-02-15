import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { useState } from "react";

import "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy } from "firebase/firestore";


const Test=()=>{
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [data,setData]=useState();
  const [display,setDisplay]=useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    
    const ref=collection(firestore,"users")
    try{
        addDoc(ref,{
            name:name,
            email:email,
        })
    }catch(e){
        console.log(e);
    }
};

  const handleRead = async (e) => {
    e.preventDefault();

    // const ref=doc(firestore,"users","GoKrHhmeQaRFWvIHKoAZ")
    // getDoc(ref)
    // .then(doc=>{
    //     console.log(doc.data(),doc.id)
    // })
    const ref=collection(firestore,'users')
    // const query=query(ref,orderBy('name'))

    onSnapshot(ref,(snapshot)=>{
        let array=[]
        snapshot.docs.forEach(doc=>{
            array.push({...doc.data(),id:doc.id})
            setData(array)
        })
    })

    setDisplay(true);

  };


  const handleDelete = async (e) => {
    e.preventDefault();

    const ref=collection(firestore,'users')
    // const query=query(ref,orderBy('name'))

    onSnapshot(ref,(snapshot)=>{
        let array=[]
        snapshot.docs.forEach(doc=>{
            array.push({...doc.data(),id:doc.id})
        })
        array.forEach(data=>{
            if(name==data.name){
                const id=data.id;
                const delRef=doc(firestore,"users",id);
                deleteDoc(delRef);
            }
        })
    })
    
  };

    return(
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                    <IonTitle>CRUD Form</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                    <IonRow>
                        <IonCol>
                        <IonItem>
                            <IonLabel position="stacked">Name</IonLabel>
                            <IonInput
                            type="text"
                            value={name}
                            onIonChange={(e) => setName(e.detail.value)}
                            />
                        </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                        <IonItem>
                            <IonLabel position="stacked">Email</IonLabel>
                            <IonInput
                            type="email"
                            value={email}
                            onIonChange={(e) => setEmail(e.detail.value)}
                            />
                        </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                        <IonButton onClick={handleCreate}>Create</IonButton>
                        </IonCol>
                        <IonCol>
                        <IonButton onClick={handleRead}>Read</IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        
                        <IonCol>
                        <IonButton onClick={handleDelete}>Delete</IonButton>
                        </IonCol>
                    </IonRow>
                    </IonGrid>
                    <IonLoading isOpen={loading} />
                    {display && data && data.length > 0 && (
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonTitle>name</IonTitle></IonCol>
                            <IonCol><IonTitle>email</IonTitle></IonCol>
                        </IonRow>
                        {data.map((element) => (
                        <IonRow key={element.id}>
                            <IonCol><IonLabel>{element.name}</IonLabel></IonCol>
                            <IonCol><IonLabel>{element.email}</IonLabel></IonCol>
                        </IonRow>
                        ))}
                    </IonGrid>
                    )}

                </IonContent>
            </IonPage>

        </>
    )
}

export default Test;