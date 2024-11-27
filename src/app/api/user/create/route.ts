import { NextResponse } from "next/server";
import { supabase } from "../../../../../lib/supabaseClient";

export async function POST(request: Request) {
  const { email, name } = await request.json();

  const { data, error } = await supabase.from('users').insert({ email, name }).select();

  if(error){
    return NextResponse.json({error: error.message}, {status: 400});
  }

  return NextResponse.json(data, {status: 201});
}
