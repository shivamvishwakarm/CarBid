import { Image } from '@nextui-org/react';
import React from 'react';
import WhyPeopleChooseUs from '../components/WhyPeopleChooseUs';
import Sellform from '../components/Sellform';
import sellimg from '../assets/d0202be409abd6ce3bc3cb03884c56e7.jpg'

const SellDashboard = () => {
  return (
    <div className='flex flex-col'>
      <div>
        <Image
          className="w-full h-auto object-cover"
          radius={"none"}
          height={200}
          src={sellimg}
          alt="hero Image"
        />
      </div>
      <div className='z-50 mt-[-300px]'> 
        <Sellform />
      </div>

      <div className='flex-1'>
        <WhyPeopleChooseUs />
      </div>
    </div>
  );
};
export default SellDashboard;