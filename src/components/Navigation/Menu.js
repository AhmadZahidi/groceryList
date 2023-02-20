import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonNavLink, IonRouterOutlet, IonTitle, IonToolbar } from "@ionic/react";
import { Redirect, Route, useHistory } from "react-router";

import Home from "../../pages/Home";
import History from "../../pages/History";
import HistoryDetail from "../../pages/HistoryDetail";
import Tag from "../../pages/Tag";
import Test from "../../pages/Test";
import Welcome from "../../pages/Welcome";
import Register from "../../pages/Register";
import Login from "../../pages/Login";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";



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
                            signOut(auth)
                            .then(()=>{
                                history.replace("/welcome")
                                console.log('logout')
                            })
                            .catch(e=>{
                                console.log(e.message)
                            })
                        }}>
                            <IonItem button>
                                <IonLabel>Logout</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                    </IonList>
                </IonContent>
            </IonMenu>

            <IonRouterOutlet id="Main">
                <Route path="/" exact>
                    <Redirect to="/welcome"/>
                </Route>
                <Route path="/home">
                    <Home/>
                </Route>
                <Route exact path="/history">
                    <History/>
                </Route>
                <Route path="/history/:id">
                    <HistoryDetail/>
                </Route>
                <Route path="/tag">
                    <Tag/>
                </Route>
                <Route path="/test">
                    <Test/>
                </Route>

                <Route path="/welcome">
                    <Welcome/>
                </Route>

                <Route path="/register">
                    <Register/>
                </Route>

                <Route path="/login">
                    <Login/>
                </Route>
            </IonRouterOutlet>
        </>
    );
}

export default Menu;