import { Oval } from 'react-loader-spinner'

const Loader = ({ height, width, color }) => {
  return (
    <Oval
      visible={true}
      height={height}
      width={width}
      color={color}
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  )
}

export default Loader
