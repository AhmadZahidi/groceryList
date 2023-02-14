import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonNavLink, IonRouterOutlet, IonTitle, IonToolbar } from "@ionic/react";
import { Redirect, Route, useHistory } from "react-router";

import Home from "../../pages/Home";
import History from "../../pages/History";
import Tag from "../../pages/Tag";
import Test from "../../pages/Test";



const Menu=()=>{
    const history = useHistory();

    return(
            <>
            <IonMenu contentId="Main">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Menu</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <IonMenuToggle onClick={()=>{
                            history.replace("/home")
                        }}>
                                <IonItem button>
                                    <IonLabel>Home</IonLabel>
                                </IonItem>
                        </IonMenuToggle>

                        <IonMenuToggle onClick={()=>{
                            history.replace("/history")
                        }}>
                            <IonItem button>
                                <IonLabel>History</IonLabel>
                            </IonItem>
                        </IonMenuToggle>

                        <IonMenuToggle onClick={()=>{
                            history.replace("/tag")
                        }}>
                            <IonItem button>
                                <IonLabel>Tag</IonLabel>
                            </IonItem>
                        </IonMenuToggle>

                        <IonMenuToggle onClick={()=>{
                            history.replace("/test")
                        }}>
                            <IonItem button>
                                <IonLabel>Test</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                    </IonList>
                </IonContent>
            </IonMenu>

            <IonRouterOutlet id="Main">
                <Route path="/" exact>
                    <Redirect to="/home"/>
                </Route>
                <Route path="/home">
                    <Home/>
                </Route>
                <Route path="/history">
                    <History/>
                </Route>
                <Route path="/tag">
                    <Tag/>
                </Route>
                <Route path="/test">
                    <Test/>
                </Route>
            </IonRouterOutlet>
        </>
    );
}

export default Menu;