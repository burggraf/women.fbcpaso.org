
export default class StartupService {
    static myInstance:any = null;

    static getInstance() {
        if (this.myInstance == null) {
          this.myInstance = new this();
        }
        return this.myInstance;
      }
      
  
    constructor() {


    }

    public getDefaultRoute(): string {
        return '/dashboard';
    }

    public getStartupRoute(): string {
        // handle password recovery links
        const hash = window.location.hash;
        // console.log('#hash', hash);
        if (hash && hash.substr(0,1) === '#') {
            // console.log('processing hash');
            const tokens = hash.substr(1).split('&');
            // console.log('tokens', tokens);
            const entryPayload: any = {};
            tokens.map((token) => {
                const pair = (token + '=').split('=');
                entryPayload[pair[0]] = pair[1];
            });
            // console.log('entryPayload', entryPayload);
            // console.log('entryPayload.type', entryPayload?.type);
            if (entryPayload?.type === 'recovery') { // password recovery link
                return `/resetpassword/${entryPayload.access_token}`;
                // router.navigateByUrl(`/resetpassword/${entryPayload.access_token}`);
            }
        }
        // console.log('window.location', window.location);
        let path = window.location.pathname.replace(/\//, '');
        // remove querystring from path
        if (path.indexOf('?') > -1) {
            path = path.substr(0, path.indexOf('?'));
        }    
        // console.log('>>>>>>> path', path);
        if (!path || path.length === 0 || path === '/') {
            path = localStorage.getItem('selectedPage') || this.getDefaultRoute();
        }
        // console.log('returning path', path);
        if (path === 'undefined' || path === '/undefined') {
            path = this.getDefaultRoute(); // safety net
        }
        return path;
    }
  


}
