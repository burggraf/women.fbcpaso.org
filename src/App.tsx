import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Redirect, Route, Switch } from 'react-router-dom'

import Menu from './components/Menu'
import Login from './Login/Login'
import ResetPassword from './Login/ResetPassword'
import Page from './pages/Page'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'
import Calendar from './pages/Calendar'
import Groups from './pages/admin/Groups'
import Users from './pages/admin/Users'
import StartupService from './services/startup.service'

/* Theme variables */
import './theme/variables.css'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'
import '@ionic/react/css/display.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/float-elements.css'
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/typography.css'

setupIonicReact()
const startupService = StartupService.getInstance()
const startupRoute = startupService.getStartupRoute()

const App: React.FC = () => {
	return (
		<IonApp>
			<IonReactRouter>
				<IonSplitPane contentId='main'>
					<Menu />
					<IonRouterOutlet id='main'>
						<Switch>
							<Route path='/' exact={true}>
								<Redirect to={startupRoute} />
							</Route>
							<Route path='/login' component={Login} />
							<Route path='/profile' component={Profile} />
							<Route path='/dashboard' component={Dashboard} />
							<Route path='/calendar' component={Calendar} />
							<Route path='/admin/groups' component={Groups} />
							<Route path='/admin/users' component={Users} />
							<Route path='/resetpassword/:token' component={ResetPassword} />
							<Route path='/privacy' component={Privacy} />
							<Route path='/terms' component={Terms} />
              <Route component={NotFound} />
						</Switch>
					</IonRouterOutlet>
				</IonSplitPane>
			</IonReactRouter>
		</IonApp>
	)
}

export default App
