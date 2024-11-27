import { NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabaseClient';

export async function GET(
  request: Request,
) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const { data, error } = await supabase.from('itineraries').select('*').eq('id', id).single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 200 });
}
