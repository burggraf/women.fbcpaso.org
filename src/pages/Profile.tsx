import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
//import { useParams } from 'react-router';
//import ExploreContainer from '../components/ExploreContainer';
import './Profile.css';
import SupabaseDataService from '../services/supabase.data.service'
import { useState } from 'react';
const supabaseDataService = SupabaseDataService.getInstance();

const Profile: React.FC = () => {

  // const { name } = useParams<{ name: string; }>();
  const [profile, setProfile] = useState<any>({});
  useIonViewWillEnter(async () => {
    const { data, error } = await supabaseDataService.getMyProfile();
    if (error) {
      console.error('getMyProfile error', error);
    } else {
      setProfile(data);
    }
  });
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
      Profile screen here...<br/>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
