import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import Menu from './components/Menu';
import Login from './Login/Login';
import ResetPassword from './Login/ResetPassword';
import Page from './pages/Page';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import StartupService from './services/startup.service';

/* Theme variables */
import './theme/variables.css';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/typography.css';

setupIonicReact();
const startupService = StartupService.getInstance();
const startupRoute = startupService.getStartupRoute();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
          <Route path="/" exact={true}>
               <Redirect to={startupRoute} />
            </Route>
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/calendar" component={Calendar} />

            <Route path="/resetpassword/:token" component={ResetPassword} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
