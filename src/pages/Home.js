import { IonButton, IonButtons, IonCheckbox, IonContent, IonFab, IonFabButton, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonModal, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { addCircleOutline } from 'ionicons/icons'
import { useRef, useState, useEffect, useContext } from "react";

import "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import Context from "../store/context";

const Home = () => {
  const modal = useRef(null);
  const input = useRef(null);

  const [items, setItems] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // month is zero-indexed, so add 1
  const year = today.getFullYear();

  const dateString = `${year}-${month}-${day}`;

  const ctx=useContext(Context);

  useEffect(()=>{

    const ref = collection(firestore,'listItems');

    onSnapshot(ref,(snapshot)=>{
      
      let array=[]
      let filteredArray=[]
      snapshot.docs.forEach(doc=>{
          array.push({...doc.data(),id:doc.id})
      })

      array.map(id => {
        if (id.uid === ctx.uid) {
          filteredArray.push(id);
        }
      })
      setItems(filteredArray);

      // console.log('hi', array);

    })
    

  },[])


  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }

  function onWillDismiss(e) {
    if (e.detail.role === 'confirm') {
      
      setItems([...items, e.detail.data]);
      setIsChecked([...isChecked, false]); // set the default value of the new checkbox to false

      // sendData();

      const items_ref = collection(firestore,"listItems")

      try {
        
        addDoc(items_ref,{
          name:e.detail.data,
          isBuy:false,
          date:dateString,
          uid:ctx.uid,
        });

      } catch (e) {

        console.log(e);

      }

    }
  }

  // const sendData= async (e)=>{

  //   e.preventDefault();

  //   const ref=collection(firestore,"items")

  //   try{
  //       for (let i = 0; i < items.length; i++) {
  //           addDoc(ref,{
  //               name:items[i],
  //               isBuy:isChecked[i],
  //               date:dateString,
                
  //           }
  //         )
  //       }
  //   }
  //   catch(e){
  //       console.log(e);
  //   }
  // }

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonButtons slot="end">
              {/* <IonButton id="open-modal">
                <IonIcon icon={addCircleOutline} size="large" />
              </IonButton> */}
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonList lines="inset">
            {items.map((item, idx) => {
              return (
                <IonItem key={idx}>
                  <IonCheckbox
                    slot="start"
                    onIonChange={(e) => {
                      const isCheckedAtIndex = e.target.checked ? true : false;
                      const newChecked = [...isChecked];
                      newChecked[idx] = isCheckedAtIndex;
                      setIsChecked(newChecked);
                    }}
                    checked={isChecked[idx]} // add checked property to set the default value to false
                  />
                  {console.log(isChecked)}
                  <IonLabel>{item.name}</IonLabel>
                </IonItem>
              )
            })}
          </IonList>

          {/* <IonGrid>
            <IonRow class="ion-justify-content-center">
              <IonButton onClick={sendData}>Done Shopping</IonButton>
            </IonRow>
          </IonGrid> */}

          <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
            <IonHeader>
              <IonToolbar>                
                <IonTitle>Add Item</IonTitle>

              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonItem>
                <IonLabel position="stacked">Enter your Grocery</IonLabel>
                <IonInput ref={input} type="text" placeholder="Your name" />
              </IonItem>
           
            </IonContent>
            <IonFooter>                           

              <div style={{padding:6, display:'flex', justifyContent:'flex-end', flex:1}}> 
              <IonButton 
                fill="outline"
                onClick={() => modal.current?.dismiss()}>Cancel
              </IonButton>
              <IonButton 
                strong={true} 
                onClick={() => confirm()}
                style={{color:'white'}}
              >
                Confirm
              </IonButton>
              </div>
        
            </IonFooter>
          </IonModal>
        </IonContent>

        <IonFab slot="fixed" horizontal="end" vertical="bottom">
          <IonFabButton id="open-modal" >
            {/* <IonIcon icon={confirm()}></IonIcon> */}
            <IonIcon icon={addCircleOutline} size="large" />
          </IonFabButton>
        </IonFab>
     
      </IonPage>
    </>
  )
}

export default Home;
