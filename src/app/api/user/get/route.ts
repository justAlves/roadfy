import { NextResponse } from "next/server";
import { supabase } from "../../../../../lib/supabaseClient";

export async function GET(request: Request){
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  const { data, error } = await supabase.from('users').select('*').eq('email', email).single();

  if(error){
    return NextResponse.json({error: error.message}, {status: 400});
  }

  return NextResponse.json(data, {status: 200});
}