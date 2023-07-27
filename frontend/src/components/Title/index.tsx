interface ITitle {
  name: string
}

export const Title = ({ name }: ITitle) => {
  return <h1>{name}</h1>
}
