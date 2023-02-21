import { IonButton, IonButtons, IonCheckbox, IonContent, IonFab, IonFabButton, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, 
  IonModal, IonPage, IonRow, IonText, IonTitle, IonToolbar } from "@ionic/react"

import { addCircleOutline } from 'ionicons/icons'
import { useRef, useState, useEffect, useContext } from "react";

import { db } from "../firebaseConfig";

import { onValue, ref, set, push } from "firebase/database";

import Context from "../store/context";

// https://firebase.google.com/docs/database/web/read-and-write


const HomeRT = () => {

  const modal = useRef(null);
  const input = useRef(null);

  const [user_uid, setUser_uid] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [items, setItems] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // month is zero-indexed, so add 1
  const year = today.getFullYear();

  const dateString = `${year}-${month}-${day}`;

  const ctx = useContext(Context);

  useEffect( () => {

    let _user_uid = sessionStorage.getItem("user_uid");
    console.log('user id', _user_uid);

    setUser_uid(_user_uid)

    let path = _user_uid + "/items";

    const userItemsRef = ref(db,path);

    console.log('path', path);

    onValue(userItemsRef, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        const array = [];

        Object.keys(data).forEach((key) => {
          array.push({
            ...data[key],
            uid: key
          });
        });

        setItems(array);
        setIsLoading(false);

        console.log('array',array);

      } else {
        setIsLoading(false);
      }
      // setItems(data);

    });

    // return onValue(query, (snapshot) => {
    //   const data = snapshot.val();

    //   if (snapshot.exists()) {
    //     Object.values(data).map((project) => {
    //       setItems((projects) => [...projects, project]);
    //     });
    //   }
    // });
    

  },[])


  function confirm () {

    let name = input.current?.value;

    let path = user_uid + "/items";


    var itemsRef = ref(db, user_uid + "/items");


    console.log('name', name, path)

    // set(ref(db, path), {
    //   title: name,
    // })

    push(itemsRef, {
      title: name,
      is_done: false,
    }).then(res=>{
      console.log('r',res);
    }).catch(e=>{
      console.log('r',e);
    })
    

    // var itemsRef = firebase.database().ref(user_uid + "/items");

    // itemsRef.push({
    //   title: name,
    //   is_done: false,
    // });

    modal.current?.dismiss();

  }

  function onWillDismiss() {

  }


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

        {renderModal()}

        {
          (items.length <= 0 && isLoading == false )&&
          <center>
            <div style={{height:24}}></div>
            <IonText>
              No Items Added Yet
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


          <IonList lines="inset">
            {items.map((item, idx) => {
              return (
                <IonItem key={idx}>
                  <IonCheckbox
                    slot="start"
                    onIonChange={(e) => {

                      console.log('item', item);

                      const isCheckedAtIndex = e.target.checked ? true : false;
                      const newChecked = [...isChecked];
                      newChecked[idx] = isCheckedAtIndex;
                      setIsChecked(newChecked);

                    }}
                    checked={isChecked[idx]} // add checked property to set the default value to false
                  />
                  {console.log(isChecked)}
                  <IonLabel>{item.title}</IonLabel>
                </IonItem>
              )
            })}
          </IonList>

          {/* <IonGrid>
            <IonRow class="ion-justify-content-center">
              <IonButton onClick={sendData}>Done Shopping</IonButton>
            </IonRow>
          </IonGrid> */}


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

  function renderModal(){
    return (
      <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
      <IonHeader>
        <IonToolbar>                
          <IonTitle>Add Item</IonTitle>

        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Name</IonLabel>
          <IonInput ref={input} type="text" placeholder="" />
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
    )
  }
}

export default HomeRT;

