import { ReactNode } from 'react'

interface ITitle {
  children?: ReactNode
  style?: object
}

export const Title = ({ children, style }: ITitle) => {
  return <div style={style}>{children}</div>
}
