interface ITitle {
  label: string
  [key: string]: unknown
}

export const Title = ({ label, ...rest }: ITitle) => {
  return <h1 {...rest}>{label}</h1>
}
