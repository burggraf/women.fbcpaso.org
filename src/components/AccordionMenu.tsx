import { IonAccordion, IonAccordionGroup, IonBadge, IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import StartupService from '../services/startup.service';
import './AccordionMenu.css';
const startupService = StartupService.getInstance();

interface ContainerProps {
    appPages: AppPage[];
    menuRef: any; // useRef() reference to the menu object
    badges: any;
}
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
  
export const AccordionMenu: React.FC<ContainerProps> = ({ appPages, menuRef, badges }) => {
    // const sidemenu = useRef(menuRef);

    const selectedAccordionItem = localStorage.getItem('selectedAccordionItem') || '';
    const selectedAccordion = localStorage.getItem('selectedAccordion') || '';
    const [menuContent, setMenuContent] = useState<any>([]);
    // const [badges, setBadges] = useState<any>({});
    const selectedItem = useRef(selectedAccordionItem);

    function clickHandler(e: any) {
        localStorage.setItem('selectedPage', e.target.routerLink);
        document.getElementById(selectedItem.current)?.classList.remove('selected');
        if (e.target.id) {
          e.target.classList.add('selected');
        } else {
          e.target.parentElement.classList.add('selected');
        }
        localStorage.setItem('selectedAccordionItem', e.target.id || e.target.parentElement.id);  
        localStorage.setItem('selectedAccordion', e.target.parentElement.parentElement.parentElement.value);  
        selectedItem.current = e.target.id || e.target.parentElement.id;
        if (menuRef.current) {
          (menuRef.current as any).close();
        }
      }
      function renderMenuChildren(list: AppChild[]) {
        return list
          //.filter(route => !!route.path)
          .map((appChild, index) => (
            // <IonMenuToggle autoHide={false} key={'AppChild' + index}>
              <IonItem key={appChild.url} 
                        id={appChild.url} 
                        onClick={clickHandler} 
                        routerLink={'/' + appChild.url} 
                        // routerDirection="root" 
                        lines="none" 
                        detail={false} 
                        className="appPageChildItem">
                <IonIcon slot="start" ios="" md=""></IonIcon>
                  <IonBadge color="danger">{badges[appChild.url] && badges[appChild.url] > 0?badges[appChild.url]:''}</IonBadge>&nbsp;&nbsp;
                <IonLabel>{appChild.title}</IonLabel>
              </IonItem>
            // </IonMenuToggle>
          ));
      }
      function renderMenuItems(list: AppPage[]) {
        return list
          //.filter(route => !!route.path)
          .map((appPage, index) => (
      
            <IonAccordion key={'MenuPage' + index} value={appPage.url}>
            <IonItem key={'MenuHeader' + index} slot="header">
              <IonLabel>{appPage.title}</IonLabel>
              <IonIcon slot="start" icon={appPage.icon}></IonIcon>
            </IonItem>
            <IonList key={'MenuContent' + index} slot="content" className="appPageChildList">
              {renderMenuChildren(appPage.children)}
            </IonList>
            </IonAccordion>  
      
          ));
      }

      useEffect(() => {
          // console.log('badges has changed', badges);
        setMenuContent(renderMenuItems(appPages));
      },[badges]);

      useEffect(()=>{
        // supabaseAuthService.unreadMessageCount.subscribe((unreadMessageCount: number) => {
        //   setBadges({...badges, 'airemail': unreadMessageCount});
        // });
        setMenuContent(renderMenuItems(appPages));
        setTimeout(() => {
          // console.log('clicking selectedAccordionItem', selectedAccordionItem);
          // document.getElementById(selectedAccordionItem)?.click();
          
          // const targetItem = (localStorage.getItem('selectedPage') || selectedAccordionItem).replace('/', '');
          let targetItem = startupService.getStartupRoute();
          
          // select proper accordion item
          appPages.map((appPage, index) => {
            if (appPage.children) {
              appPage.children.map((appChild, index) => {
                document.getElementById(appChild.url)?.parentElement?.parentElement?.classList.add('accordion-collapsed');
                document.getElementById(appChild.url)?.parentElement?.parentElement?.classList.remove('accordion-expanded');
                if (appChild.url === targetItem) {
                  const acc = document.getElementById(appChild.url)?.parentElement?.parentElement;
                  if (acc) {
                    setTimeout(() => {
                      acc.classList.remove('accordion-collapsed');
                      acc.classList.add('accordion-expanded');
                      // acc.click();
                      document.getElementById(appChild.url)?.click();
  
                    } , 0);
                    // acc.classList.remove('accordion-collapsed');
                    // acc.classList.add('accordion-expanded');
                    // acc.click();
                    // document.getElementById(appChild.url)?.click();
                    return;
                  }
                }
              });
            }
          });
        }, 0);
      }, [appPages]) // <-- empty dependency array
            

    return (
      <IonAccordionGroup id="page-list" value={selectedAccordion}>
          { menuContent }
      </IonAccordionGroup>
    );
};

// export default AccordionMenu;
/*

const appPages: AppPage[] = [

  { title: 'Dashboard', url: 'dashboard', icon: 'barchart',
    children: [
      { title: 'AIRE Mail', url: 'airemail', icon: 'map' },
      { title: 'Client Activity', url: 'dsh-activity', icon: 'map' },
      { title: 'Market Trends', url: 'dsh-markettrends', icon: 'map' },
    ] 
  },
  { title: 'Properties', url: 'properties', icon: 'home',
    children: [
      { title: 'Map Search', url: 'propertymap', icon: 'map' },
      { title: 'Property Search', url: 'propertysearch', icon: 'search' },
      { title: 'Property Groups', url: 'prp-groups', icon: 'list' },
      { title: 'Saved Searches', url: 'prp-savedsearches', icon: 'bookmark' },
    ] 
  },
  { title: 'Agents', url: 'agents', icon: 'people',
    children: [
      { title: 'Agent Search', url: 'agentsearch', icon: 'search' },
      { title: 'Agent Groups', url: 'agt-groups', icon: 'list' },
      { title: 'Real Estate Offices', url: 'agt-offices', icon: 'business' },
      { title: 'Office Groups', url: 'agt-officegroups', icon: 'list' },
    ] 
  },
  { title: 'Service Providers', url: 'providers', icon: 'hammer',
    children: [
      { title: 'Search Providers', url: 'srv-search', icon: 'search' },
      { title: 'Service Provider Groups', url: 'srv-groups', icon: 'list' },
      { title: 'Service Provider Offices', url: 'srv-offices', icon: 'business' },
      { title: 'Provider Office Groups', url: 'srv-officegroups', icon: 'list' },
    ] 
  },
  { title: 'Settings & Profile', url: 'settings', icon: 'settings', 
    children: [
      { title: 'Settings', url: 'set-settings', icon: 'map' },
      { title: 'My Profile', url: 'set-profile', icon: 'map' },
      { title: 'Setup Payment Method', url: 'set-setuppayment', icon: 'map' },
    ] 
  },
  { title: 'Help & Information', url: 'information', icon: 'informationcircle',
    children: [
      { title: 'App Info', url: 'inf-appinfo', icon: 'map' },
      { title: 'Navigation Tips', url: 'inf-navigationtips', icon: 'map' },
      { title: 'About Us', url: 'inf-aboutus', icon: 'map' },
      { title: 'Terms of Use', url: 'inf-termsofuse', icon: 'map' },
      { title: 'Privacy Policy', url: 'inf-privacy', icon: 'map' },
    ] 
  },
  { title: 'Admin', url: 'admin', icon: 'lockclosed',
    children: [
      { title: 'AIRE Users', url: 'adm-users', icon: 'map' },
      { title: 'Associations', url: 'adm-associations', icon: 'map' },
      { title: 'Data', url: 'adm-data', icon: 'map' },
    ]
  }

];

*/