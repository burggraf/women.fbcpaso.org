import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
//import { useParams } from 'react-router';
//import ExploreContainer from '../components/ExploreContainer';
import './Profile.css';
import SupabaseDataService from '../services/supabase.data.service'
import SupabaseAuthService from '../Login/supabase.auth.service'
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
const supabaseDataService = SupabaseDataService.getInstance();
const supabaseAuthService = SupabaseAuthService.getInstance();

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(()=>{
    // Only run this one time!  No multiple subscriptions!
    supabaseAuthService.profile.subscribe((profile: any | null) => {
      setProfile(profile);
    });
  }, []) // <-- empty dependency array

  // const { name } = useParams<{ name: string; }>();
  
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
