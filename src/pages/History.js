import { IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonMenuToggle, IonModal, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react"
import { addCircleOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";

import "firebase/firestore";
import { db } from "../firebaseConfig";
import { onValue, ref, set, push } from "firebase/database";
import { collection, onSnapshot } from "firebase/firestore";
import { useHistory } from "react-router";

const History=()=>{
    const [user_uid,setUser_uid]=useState("");
    const [isLoading, setIsLoading] = useState(true);


    const [data,setData]=useState([]);

    const history=useHistory();

    useEffect(()=>{
        let _user_id=sessionStorage.getItem("user_uid");
        setUser_uid(_user_id);

        let path=_user_id+"/items";
        const savedItemsRef=ref(db,path);

        onValue(savedItemsRef,(snapshot)=>{
            const data=snapshot.val();

            if(snapshot.exists() ){
                const array=[];
                const filteredArray=[];

                Object.keys(data).forEach((key)=>{
                    array.push({
                        ...data[key],
                        uid:key
                    });
                });

                array.map(data=>{
                    if(data.is_saved===true){
                        filteredArray.push(data)
                    }
                })

                setData(filteredArray);
                setIsLoading(false);
                console.log(filteredArray);
            }else{
                setIsLoading(false);
            }
        });

    },[])

    return(
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonMenuButton/>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    
                {
                (data.length <= 0 && isLoading == false)&&
                    <center>
                        <div style={{height:24}}></div>
                        <IonText>
                        No Items Saved Yet
                        </IonText>
                    </center>
                    }

                    {
                    (isLoading == true )&&
                    <center>
                        <div style={{height:24}}></div>
                        <IonText>
                        Loading items...
                        </IonText>
                    </center>
                }
                    
                    <IonList lines="full">

                        {data && data.map((item,idx)=>{
                            return (
                                <IonItem key={idx} button onClick={()=>{
                                    let path=user_uid+"/items/"+item.uid

                                    set(ref(db,path),{
                                        title:item.title,
                                        is_done:!item.is_done,
                                        is_saved:false
                                    })
                                    .then(()=>{})
                                    .catch(()=>{})
                                }}>

                                    <IonLabel>
                                        {item.title}
                                    </IonLabel>
                                </IonItem>
                            );
                        })}

                    </IonList>
                </IonContent>
            </IonPage>
        </>
    )
}

export default History;