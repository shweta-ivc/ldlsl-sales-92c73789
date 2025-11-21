import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jsonwebtoken'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Authorization header missing' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwtVerify(token, process.env.JWT_SECRET)
    const userId = decoded.userId

    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, name, email, created_at')
      .eq('id', userId)
      .single()

    if (userError) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const { data: blogs, error: blogsError } = await supabase
      .from('newsletter_blogs')
      .select('id, title, status, scheduled_at, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (blogsError) {
      return NextResponse.json(
        { error: 'Failed to fetch blogs' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at
      },
      blogs: blogs.map(blog => ({
        id: blog.id,
        title: blog.title,
        status: blog.status,
        scheduled_at: blog.scheduled_at,
        created_at: blog.created_at
      }))
    })
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}