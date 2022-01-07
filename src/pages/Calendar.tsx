import {
	IonButton,
	IonButtons,
	IonCol,
	IonContent,
	IonDatetime,
	IonGrid,
	IonHeader,
	IonIcon,
	IonMenuButton,
	IonPage,
	IonRow,
	IonTitle,
	IonToolbar,
} from '@ionic/react'
import { home } from 'ionicons/icons'
import { useRef, useState } from 'react'
//import { useParams } from 'react-router';
//import ExploreContainer from '../components/ExploreContainer';
import './Calendar.css'

const Calendar: React.FC = () => {
	const cal: any = useRef()
	const [selectedDate, setSelectedDate] = useState(new Date().toISOString())
	// const { name } = useParams<{ name: string; }>();
	const reset = (e: any) => {
		console.log('reset called', e)
		if (cal === undefined) return
		cal.current.reset()
	}
	const updateDate = (e: any) => {
		console.log('updateDate called', e.detail.value)
		setSelectedDate(e.detail.value!)
	}
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot='start'>
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Calendar</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent className='ion-padding'>
				<IonGrid>
					<IonRow>
						<IonCol>
							<IonDatetime
								ref={cal}
								presentation='date'
								//size="cover"
								//size="fixed"
								//show-clear-button={true}
								//showDefaultButtons={true}
								yearValues='2021,2022,2023,2024'
								value={selectedDate}
								mode='ios'
								onIonChange={updateDate}></IonDatetime>
							<IonToolbar>
								<IonButtons>
									<IonButton fill='clear' onClick={reset}>
										<IonIcon size='large' color='medium' icon={home}></IonIcon>
									</IonButton>
								</IonButtons>
							</IonToolbar>
							<div>{new Date(selectedDate).toLocaleDateString()}</div>
						</IonCol>
						<IonCol>
							<div
								className='ion-padding'
								style={{ width: '350px', height: '350px', backgroundColor: '#f5f5f5' }}>
								Date content here<br/>
                <b>
                  {new Date(selectedDate).toLocaleDateString()}
                </b>
							</div>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	)
}

export default Calendar
