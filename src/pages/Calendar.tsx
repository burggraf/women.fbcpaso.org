import { IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonIcon, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { home } from 'ionicons/icons';
import { useRef } from 'react';
//import { useParams } from 'react-router';
//import ExploreContainer from '../components/ExploreContainer';
import './Calendar.css';

const Calendar: React.FC = () => {
  const cal: any = useRef();
  // const { name } = useParams<{ name: string; }>();
  const reset = () => {
    if (cal === undefined) return;
    cal.current.reset();
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Calendar</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonDatetime 
          ref={cal}
          size="cover" 
          yearValues="2022,2023,2024">
        </IonDatetime>
        <div className="ion-text-center">
          <IonButton fill="clear" onClick={reset}>
            <IonIcon size="large" color="medium" icon={home}></IonIcon>
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Calendar;
