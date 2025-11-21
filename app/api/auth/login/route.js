import { createClient } from '@/lib/supabase'
import { validateLogin } from '@/lib/validation'
import { generateToken } from '@/lib/jwt'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    const supabase = createClient()

    const body = await request.json()
    const validatedData = validateLogin(body)

    const { email, password } = validatedData

    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, password_hash, name')
      .eq('email', email)
      .single()

    if (error || !user) {
      return Response.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash)

    if (!isValidPassword) {
      return Response.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const token = generateToken({ 
      id: user.id, 
      email: user.email,
      name: user.name
    })

    const { password_hash, ...userWithoutPassword } = user

    return Response.json({
      user: userWithoutPassword,
      token
    }, { 
      status: 200,
      headers: {
        'Set-Cookie': `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`
      }
    })
  } catch (error) {
    if (error.name === 'ZodError') {
      return Response.json(
        { error: 'Validation failed', issues: error.errors },
        { status: 400 }
      )
    }

    console.error('Login error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}