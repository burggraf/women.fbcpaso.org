import { createClient, Provider, SupabaseClient, User } from '@supabase/supabase-js';

// import { keys } from 'rxjs';
import { keys } from './keys.service';
import SupabaseAuthService from '../Login/supabase.auth.service';

const supabase: SupabaseClient = createClient(keys.SUPABASE_URL, keys.SUPABASE_KEY);
let supabaseAuthService: any;


export default class SupabaseDataService {
  static myInstance:any = null;

  static getInstance() {
    if (this.myInstance == null) {
      this.myInstance = new this();
    }
    return this.myInstance;
  }

  constructor() {}
  

  public getIDfromEmail = async (email: string) => {
    const { data, error } = await supabase.from('profile')
    .select('id')
    .eq('email', email)
    .limit(1);
    return { data, error };
  }
  // generic sample functions
  public async getRow(table: string, whereColumn: string, whereValue: any, columnList: string = '*') {
    const { data, error } = 
    await supabase.from(table)
    .select(columnList)
    .eq(whereColumn, whereValue)
    .limit(1)
    .single(); // return a single object (not an array)
    return { data, error };
  }
  public async getRows(table: string, whereColumn: string, whereValue: any, columnList: string = '*', offset: number = 0, limit: number = 100) {
    const { data, error } = 
    await supabase.from(table)
    .select(columnList)
    .eq(whereColumn, whereValue)
    .range(offset, offset + limit)
    return { data, error };
  }


  public async getMyProfile() {
    if (!supabaseAuthService) {
      supabaseAuthService = SupabaseAuthService.getInstance();
    }
    const user = supabaseAuthService.getCurrentUser();
    console.log('*** got current user', user);
    if (user) {
      const { data, error } = 
      await supabase.from('profile')
      .select('*')
      .eq('id', user.id)
      .limit(1)
      .single(); // return a single object (not an array)
      return { data, error };  
    } else {
      return { data: {}, error: null };
    }
  }


}
