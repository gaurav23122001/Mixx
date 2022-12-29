import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { StorageService } from './Services/StorageService';
import { useEffect, useState } from 'react';
import { LoginMetadata } from './Models/LoginMetadata';
import Loading from './components/Loading';
import Login from './pages/Login';

setupIonicReact();

const App: React.FC = () => {
  const [loginMetadata, setLoginMetadata] = useState(new LoginMetadata("-1"));
  const [showLoading, setShowLoading] = useState(false);
  let setLoginData = (resp: any) => {
    setLoginMetadata(resp);
    StorageService.Set("LoginMetadataKey", resp);
  };
  useEffect(() => {
    setShowLoading(true);
    StorageService.Get("LoginMetadataKey")
      .then((resp) => {
        if (resp != null) setLoginMetadata(resp);
        setShowLoading(false);
      })
      .catch(() => {
        setShowLoading(false);
      });
    console.log("hello");
  }, []);
  if (showLoading) {
    return (
      <IonApp>
        <Loading />
      </IonApp>
    );
  }
  return (
    <IonApp>
      <IonReactRouter>
        {loginMetadata.tokenString != "-1" ? (
          <IonSplitPane contentId="main" class="backgroundImage">
            <Menu />
            <IonRouterOutlet id="main">
              <Route path="/:name" exact={true}>
                <Page />
              </Route>
              <Route path="/" exact={true}>
                <Redirect to="/home" />
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        ) : (
          <IonRouterOutlet id="main">
            <Route path="/" exact={false}>
              <Redirect to="/login" />
              <Login />
            </Route>
          </IonRouterOutlet>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
