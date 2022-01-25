import { createClient, Provider, SupabaseClient, User } from '@supabase/supabase-js';

import SupabaseAuthService from '../Login/supabase.auth.service';
// import { keys } from 'rxjs';
import { keys } from './keys.service';

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

  public async getProfile(id: string) {
    if (id) {
      const { data, error } = 
      await supabase.from('profile')
      .select('*')
      .eq('id', id)
      .limit(1)
      .single(); // return a single object (not an array)
      return { data, error };  
    } else {
      console.log('#### getProfile: no id');
      return { data: {}, error: null };  
    }
  } 

  public async saveProfile(profile: any) {
    const { data, error } = 
    await supabase.from('profile')
    .upsert(profile);
    return { data, error };
  }

  public async getMyRoles() {
    const { data, error } = await supabase.rpc('getmyroles', {})  
    if (error) {
      console.error(error);
      return [];
    } else {
      return data;
    }
  }


  public async getMenu(menu: string) {
    const { data, error } = 
    await supabase.rpc('getmenu', { m: menu})
    return { data, error };
  }
}
