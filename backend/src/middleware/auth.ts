import jwt from 'jsonwebtoken'

const { JWT_KEY } = process.env

export const checkAuthToken = (req: any, res: any, next: any) => {
  const authorizationClient = req.headers['authorization']

  const token = authorizationClient && authorizationClient.split(' ')[1]

  if (!token) return res.sendStatus(401)

  try {
    jwt.verify(token, JWT_KEY || 'VincentTang')

    next()
  } catch (e) {
    return res.status(403).json({ error: 'Unauthorized' })
  }
}
