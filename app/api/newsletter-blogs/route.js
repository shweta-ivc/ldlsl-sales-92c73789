import { createClient } from '@/lib/supabase';
import { verifyToken } from '@/lib/jwt';
import { newsletterBlogSchema } from '@/lib/validation';

export async function GET(request) {
  try {
    const supabase = createClient();

    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return Response.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return Response.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Fetch newsletter blogs with author information
    const { data, error } = await supabase
      .from('newsletter_blogs')
      .select(`
        id,
        title,
        description,
        status,
        created_at,
        updated_at,
        scheduled_for,
        author_id,
        users (
          id,
          name,
          email
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      return Response.json(
        { error: 'Failed to fetch newsletter blogs' },
        { status: 500 }
      );
    }

    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const supabase = createClient();

    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return Response.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return Response.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = newsletterBlogSchema.parse(body);

    // Create newsletter blog
    const { data, error } = await supabase
      .from('newsletter_blogs')
      .insert({
        ...validatedData,
        author_id: decoded.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select();

    if (error) {
      return Response.json(
        { error: 'Failed to create newsletter blog' },
        { status: 500 }
      );
    }

    return Response.json(data[0], { status: 201 });
  } catch (error) {
    if (error.name === 'ZodError') {
      return Response.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}