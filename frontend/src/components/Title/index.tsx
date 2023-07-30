interface ITitle {
  name: string
  [key: string]: unknown
}

export const Title = ({ name, ...rest }: ITitle) => {
  return <h1 {...rest}>{name}</h1>
}
