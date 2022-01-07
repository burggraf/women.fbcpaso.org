import { IonAccordion, IonAccordionGroup, IonBadge, IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote } from '@ionic/react';
import { User } from '@supabase/supabase-js';
import { addIcons } from 'ionicons';
import { archiveOutline, archiveSharp, barChart, barChartOutline, barChartSharp, book, bookmarkOutline, hammer, handRight, heartOutline, heartSharp, home, homeOutline, homeSharp, informationCircle, informationCircleOutline, informationCircleSharp, list, listCircleOutline, listCircleSharp, listOutline, listSharp, lockClosed, lockClosedOutline, lockClosedSharp, logIn, logInOutline, logInSharp, logoApple, logoBitbucket, logoDiscord, logoFacebook, logoGithub, logoGitlab, logoGoogle, logoTwitch, logoTwitter, logOut, logOutOutline, logOutSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, people, peopleOutline, peopleSharp, person, personOutline, personSharp, search, searchOutline, searchSharp, settings, settingsOutline, settingsSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { description, version } from '../../package.json';
import SupabaseAuthService from '../Login/supabase.auth.service';
import SupabaseDataService from '../services/supabase.data.service'
import { AccordionMenu } from '../components/AccordionMenu';
import './Menu.css';

const supabaseAuthService = SupabaseAuthService.getInstance();
const supabaseDataService = SupabaseDataService.getInstance();

interface AppPage {
  title: string;
  url: string;
  icon?: string;
  iosIcon?: string;
  mdIcon?: string;
  children: AppChild[];
}
interface AppChild {
  title: string;
  url: string;
  icon: string;
}
addIcons({
  'barchart': barChart,
  'home': home,
  'book': book,
  'person': person,
  'people': people,
  'hammer': hammer,
  'settings': settings,
  'informationcircle': informationCircle,
  'lockclosed': lockClosed,
  'handright': handRight
});


const appPages: AppPage[] = [

  { title: 'Home', url: 'dashboard', icon: 'home',
    children: [
      { title: 'Dashboard', url: 'dashboard', icon: '' },
      { title: 'Calendar', url: 'calendar', icon: '' },
      { title: 'Messages', url: 'messages', icon: '' },
    ] 
  },
  { title: 'Bible Studies', url: 'studies', icon: 'book', 
    children: [
      { title: 'Tuesday 6:00 AM', url: 'studies/tuesday6am', icon: '' },
      { title: 'Tuesday 9:00 AM', url: 'studies/tuesday9am', icon: '' },
      { title: 'Tuesday 6:30 PM', url: 'studies/tuesday630pm', icon: '' },
      { title: 'Doctrinal Class', url: 'studies/doctrinal', icon: '' },
    ] 
  },
  { title: 'Ministries', url: 'ministries', icon: 'people', 
    children: [
      { title: 'Healing', url: 'ministries/healing', icon: '' },
      { title: 'Special Events', url: 'ministries/events', icon: '' },
    ] 
  },
  { title: 'Prayer', url: 'prayer', icon: 'handright', 
    children: [
      { title: 'Send Prayer Request', url: 'prayer/sendrequest', icon: '' },
      { title: 'View Requests', url: 'prayer/viewrequests', icon: '' },
      { title: 'My Prayer Journal', url: 'prayer/journal', icon: '' },
    ] 
  },
  { title: 'Profile & Settings', url: 'settings', icon: 'person', 
    children: [
      { title: 'My Profile', url: 'profile', icon: '' },
      { title: 'Settings', url: 'settings', icon: '' },
    ] 
  },
  { title: 'Help & Information', url: 'about', icon: 'informationcircle',
    children: [
      { title: 'About Us', url: 'about/us', icon: '' },
      { title: 'About FBC Paso', url: 'about/fbcpaso', icon: '' },
      { title: 'Terms of Use', url: 'about/termsofuse', icon: '' },
      { title: 'Privacy Policy', url: 'about/privacy', icon: '' },
    ] 
  },
  { title: 'Admin', url: 'admin', icon: 'lockclosed',
    children: [
      { title: 'Users', url: 'admin/users', icon: '' },
      { title: 'Groups', url: 'admin/groups', icon: '' },
    ]
  }

];


const Menu: React.FC = () => {
  // const initialMenuRef = useRef();
  const sidemenu = useRef(null);
  // const location = useLocation();
  let _user: User | null = null;
  const [avatar, setAvatar] = useState('./assets/img/profile160x160.png');
  const [email, setEmail] = useState('');
  
  const signOut = async () => {
    const { error } = await supabaseAuthService.signOut();
    if (error) {
      console.error('Error signing out', error);
    }
  }
  const loadImage = () =>{
    console.log('loadImage() not implemented');
  }
  const selectImage = ($event: any) => {
    console.log('selectImage() not implemented');
  }
  const getPhotoURL = () => {
    console.log('getPhotoURL: _user', _user);
    return _user?.user_metadata?.avatar_url || './assets/img/profile160x160.png';
  }

  // useEffect(() => {
  //   setMenuContent(renderMenuItems(appPages));
  // },[badges]);

  useEffect(()=>{
    // Only run this one time!  No multiple subscriptions!
    supabaseAuthService.user.subscribe((user: User | null) => {
      _user = user;
      // console.log('subscribed: _user', _user);
      if (_user?.email) {
        setEmail(_user.email);
        setAvatar(_user?.user_metadata?.avatar_url || './assets/img/profile160x160.png')
      } else {
        setEmail('');
      }
    });
  }, []) // <-- empty dependency array

  const [badges, setBadges] = useState<any>({});

  return (    
    <IonMenu contentId="main" type="overlay" ref={sidemenu}>

      {/* <IonHeader className="menuHeader">
        <div style={{paddingLeft: "20px"}}>
          <h4>
            { email &&
              <>
                <img onClick={loadImage} style={{height: '35px', borderRadius: '50%', objectFit: 'cover'}}
                  src={avatar}
                />
                <input type="file" hidden id="fileInput" onChange={selectImage} accept=".jpg, .jpeg, .png" />
                <span style={{position: 'relative', top: '-8px'}}>&nbsp;&nbsp; { email || ''  }</span>
              </>
            }
            { !email && 
              <>
                <IonIcon src="/assets/aire.svg" size="large"></IonIcon>
                <span style={{position: 'relative', top: '-8px'}}>&nbsp;&nbsp; FBC Paso</span>
              </>
            }
          </h4>
        </div>
      </IonHeader> */}

      <IonContent>
        <IonList id="inbox-list">
        
          <table style={{width: "100%", marginLeft: "10px"}}><tbody><tr><td><IonImg src="/assets/FBC_color.svg" style={{width: '50px'}}></IonImg></td>
          <td><h3><b>FBC&nbsp;Paso&nbsp;Women</b></h3></td></tr></tbody></table>
          { email && <IonNote style={{width: '100%'}} class="ion-text-center"><strong>{email || ''}</strong></IonNote>}
          <IonMenuToggle autoHide={false}>
            { email &&
              <IonItem href='' onClick={signOut} lines="none" detail={false}>
                <IonIcon slot="start" ios={logOutOutline} md={logOutSharp}></IonIcon>
                <IonLabel><strong>Sign Out</strong></IonLabel>
              </IonItem>
            }    
            { !email &&
              <IonItem routerDirection="root" routerLink="/login" lines="none" detail={false}>
                <IonIcon slot="start" ios={logInOutline} md={logInSharp}></IonIcon>
                <IonLabel><strong>Sign In</strong></IonLabel>
              </IonItem>
            }
          </IonMenuToggle>
        </IonList>

        {/* <IonAccordionGroup id="page-list" value={selectedAccordion}>
=          { menuContent }
        </IonAccordionGroup> */}
        <AccordionMenu appPages={appPages} menuRef={sidemenu} badges={badges} />
      </IonContent>
      <IonFooter>
        <div className="ion-text-center">
          { description } v{ version }
        </div>
      </IonFooter>
    </IonMenu>
  );
};

export default Menu;
