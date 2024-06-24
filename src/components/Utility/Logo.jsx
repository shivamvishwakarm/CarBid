import { Image } from '@nextui-org/react';
import logo from '../../assets/logo/logo.jpg'

 const Logo = () => {
  return (
   <>
   <Image width={50} height={50} src={logo} className="m-2"></Image>
   <div className="m-2 mx-6 text-primary font-medium text-4xl">IAA</div>
   </>
  )
}

export default Logo;


