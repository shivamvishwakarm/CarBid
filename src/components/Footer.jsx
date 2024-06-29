import { Card, Link } from '@nextui-org/react'; // Make sure this is the correct path for Link
import Logo from './Utility/Logo';
const Footer = () => {
  return (
    <Card radius='none' className="flex flex-col p-2 text-gray">
      <div className="flex text-lg mb-4 items-center mx-6 ">
        <Logo/>
      </div>
      <div className="w-1/3 mb-4 mx-6 ">
        Prestige Misty Waters, Nada Prabhu, Service Road, Kempe Gowda Main Rd, Vayunandana Layout,
        Hebbal, Bengaluru, Karnataka 560024
      </div>
      <div className="flex flex-col sm:flex-row items-center mx-6  justify-between">
        <div className="mb-2 sm:mb-0">+91 81217 51709</div>
        <div className="flex gap-4 ">
          <Link className="text-gray" href="/terms">Terms & Conditions</Link>
          <Link className="text-gray" href="/about">About Us</Link>
          <Link className="text-gray" href="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </Card>
  );
};

export default Footer;
