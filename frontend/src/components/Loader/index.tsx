import { Oval } from 'react-loader-spinner'

export const Loader = () => {
  return (
    <Oval
      height={80}
      width={80}
      color='#0d6efd'
      wrapperStyle={{}}
      wrapperClass=''
      visible={true}
      ariaLabel='oval-loading'
      secondaryColor='#0d6efd'
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  )
}
