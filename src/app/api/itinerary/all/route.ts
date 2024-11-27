import { supabase } from "../../../../../lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(request: Request){
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get('user_id');

  const { data, error } = await supabase.from('itineraries').select('*').eq('user_id', user_id);

  if(error){
    return NextResponse.json({error: error.message}, {status: 400});
  }

  return NextResponse.json(data, {status: 200});
}