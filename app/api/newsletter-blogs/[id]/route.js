import { createClient } from '@/lib/supabase';
import { verifyToken, extractToken } from '@/lib/jwt';
import { NextResponse } from 'next/server';

const supabase = createClient();

async function authenticateRequest(request) {
  const token = extractToken(request);
  if (!token) {
    return { error: 'Unauthorized', status: 401 };
  }

  try {
    const decoded = verifyToken(token);
    return { userId: decoded.userId };
  } catch (error) {
    return { error: 'Invalid token', status: 401 };
  }
}

export async function GET(request, { params }) {
  try {
    const authResult = await authenticateRequest(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { id } = params;

    const { data, error } = await supabase
      .from('newsletter_blogs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Newsletter blog not found' }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const authResult = await authenticateRequest(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { id } = params;
    const body = await request.json();

    const { title, description, content, status, scheduled_at, tags } = body;

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (content !== undefined) updateData.content = content;
    if (status !== undefined) updateData.status = status;
    if (scheduled_at !== undefined) updateData.scheduled_at = scheduled_at;
    if (tags !== undefined) updateData.tags = tags;

    const { data, error } = await supabase
      .from('newsletter_blogs')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Newsletter blog not found' }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const authResult = await authenticateRequest(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { id } = params;

    const { data, error } = await supabase
      .from('newsletter_blogs')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Newsletter blog not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Newsletter blog deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}