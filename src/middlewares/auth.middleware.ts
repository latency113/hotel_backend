import type { Context } from 'elysia'

export const authMiddleware = async (context: Context) => {
  const { jwt, headers, store, set } = context as Context & {
    jwt: {
      verify: (token: string) => Promise<any>
    }
    store: {
      user?: {
        id: string | number
        role: string
      }
      [key: string]: any
    }
  }

  const authHeader = headers.authorization || headers.Authorization

  if (!authHeader?.startsWith('Bearer ')) {
    set.status = 401
    console.log('Unauthorized: Missing or invalid Bearer token')
    throw new Error('Unauthorized')
  }


  const token = authHeader.split(' ')[1]
  // console.log('Token extracted:', token)  // <-- ดู token ที่ดึงออกมา

  try {
    const payload = await jwt.verify(token)
    // console.log('JWT payload:', payload)  // <-- ดู payload หลัง verify

    if (!payload || typeof payload !== 'object') {
      set.status = 401
      console.log('Invalid token payload')
      return { error: 'Invalid token' }
    }

    store.user = {
      id: payload.id,
      role: payload.role,
    }
    console.log('User stored in context:', store.user)  // <-- ดู user ที่เก็บใน store

  } catch (err) {
    set.status = 401
    console.log('Token verification failed:', err)
    return { error: 'Invalid or expired token' }
  }
}
