import { IonButton, IonCol, IonGrid, IonIcon, IonRow, useIonToast } from '@ionic/react'
import {
	logoApple,
	logoBitbucket,
	logoDiscord,
	logoFacebook,
	logoGithub,
	logoGitlab,
	logoGoogle,
	logoMicrosoft,
	logoSlack,
	logoTwitch,
	logoTwitter,
} from 'ionicons/icons'
import logoSpotify from '../Login/auth-provider-icons/spotify.svg'
import { addIcons } from 'ionicons'
import './ProviderSignInButton.css'
import SupabaseAuthService from './supabase.auth.service'
import { Provider } from '@supabase/supabase-js'
import { useHistory } from 'react-router'

interface ContainerProps {
	name: string
}

const supabaseAuthService = SupabaseAuthService.getInstance()

addIcons({
	apple: logoApple,
	bitbucket: logoBitbucket,
	discord: logoDiscord,
	facebook: logoFacebook,
	github: logoGithub,
	gitlab: logoGitlab,
	google: logoGoogle,
	twitch: logoTwitch,
	twitter: logoTwitter,
	slack: logoSlack,
	spotify: logoSpotify,
	microsoft: logoMicrosoft,
	azure: logoMicrosoft
})

const ProviderSignInButton: React.FC<ContainerProps> = ({ name }) => {
	const nameProperCase = name.charAt(0).toUpperCase() + name.slice(1)
	const history = useHistory()
	const signInWithProvider = async (provider: Provider) => {
		console.log('signInWithProvider', provider)
		const { user, session, error } = await supabaseAuthService.signInWithProvider(provider)
		console.log('user', user)
		console.log('session', session)
		console.log('error', error)
		if (error) {
			toast(error.message)
		} else {
      //window.location.href = '/';
			history.replace('/')
		}
	}
	const [present, dismiss] = useIonToast()

	const toast = (message: string, color: string = 'danger') => {
		present({
			color: color,
			message: message,
			cssClass: 'toast',
			buttons: [{ icon: 'close', handler: () => dismiss() }],
			duration: 6000,
			//onDidDismiss: () => console.log('dismissed'),
			//onWillDismiss: () => console.log('will dismiss'),
		})
	}

	return (

		// <IonButton expand="block" color="medium"
		// onClick={() => {
		// 	signInWithProvider(name as Provider)
		// }}>
		// <IonIcon icon={name} size="large" slot="start" />
		// 	<b>Sign in with {name}</b>
		// </IonButton>

		<IonButton expand="block" color="medium"
		style={{width: '180px'}}
		onClick={() => {
			signInWithProvider(name as Provider)
		}}>
		<IonGrid><IonRow>
			<IonCol><div style={{height: '100%', marginTop: "15%"}}><b>{name}</b></div></IonCol>
			<IonCol style={{textAlign: "right"}}><IonIcon icon={name} size="large" /></IonCol>
		</IonRow></IonGrid>
		
			
		</IonButton>

	)
}

export default ProviderSignInButton
