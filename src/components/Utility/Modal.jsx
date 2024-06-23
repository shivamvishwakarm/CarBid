import  {useState} from 'react'
import { Image, Input, Modal as NextModal, ModalContent, ModalHeader, ModalBody,  } from '@nextui-org/react';
// import useCurrentCity from '../../hooks/useCurrentCity';

import city1 from '../../assets/city/0690c6b725612a73907f20fe585f8daa.png';
import city2 from '../../assets/city/255ceaad882dd3fb9f1bc294bb98ec75.png';
import city3 from '../../assets/city/752bf30c8f4dcbee386afbedc29b048e.png';
import city4 from '../../assets/city/76dfc7078a0ddc725959cba5c6ba3c32.png';
import city5 from '../../assets/city/837a809d553ecdad415030dce1b7579a.png';
import city6 from '../../assets/city/83a1a93845a04dc690cf035ad8215645.png';
import city7 from '../../assets/city/9e07661e3d190ff5fe83cf4204565bfd.png';
import city8 from '../../assets/city/a5947aa3a5b31469fa323e9e30f94bbb.png';
import city9 from '../../assets/city/ce285c9b051aba7b94220676b2045821.png';


export const Modal = () => {

    const [isModalOpen, setIsModalOpen] = useState(true);
    const [city, setCity] = useState('');
    


    const citys = [
        { name: 'Mumbai', image: city1 },
        { name: 'Ahmedabad', image: city2 },
        { name: 'Jaipur', image: city3 },
        { name: 'Delhi', image: city4 },
        { name: 'Gurugram', image: city5 },
        { name: 'Chennai', image: city6 },
        { name: 'Bengaluru', image: city7 },
        { name: 'Chhattisgarh', image: city8 },
        { name: 'Kolkata', image: city9 }
      ];
    const handleCloseModal = () => {
        setIsModalOpen(false);
      };


      const handleCityClick = (cityName) => {
        setCity(cityName);
      };
      const handleCityChange = (event) => {
        setCity(event.target.value);
      };
 


  return (
    <NextModal className="fixed w-full insert-0 overflow-auto max-w-4xl"
        isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalContent className='flex '>
          <ModalHeader className="">
            Location

          </ModalHeader>
          <hr className="mx-5" /> {/* Horizontal line added here */}

          <ModalBody className=''>
            <div className="flex justify-center items-center">


              <Input
                className='w-3/5'
                value={city}
                onChange={handleCityChange}
                placeholder="Enter city"
                fullWidth
              />

              <p className="mx-4">or</p>

              {/* get the user location */}
              <button className='w-2/5 border border-blue-700 rounded-lg p-2 text-blue-700 flex justify-center items-center'>
                <div className="flex justify-center items-center w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.364 6.364l-1.414-1.414M6.05 6.05l-1.415 1.414M12 6a6 6 0 110 12 6 6 0 010-12zm0-3a9 9 0 110 18 9 9 0 010-18z" />
                  </svg>
                  Use Current Location
                </div>
              </button>
            </div>
            {/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'> */}
            <h3 className='text-lg font-semibold mt-4'>Popular Cities</h3>
            <div className='flex flex-wrap gap-3 '>
              {citys.map((c, index) => (
                <div key={index} onClick={() => handleCityClick(c.name)} className='cursor-pointer'>
                  <Image width={100} height={150} src={c.image} className="size-32  " />
                  <p className="flex justify-center items-center">{c.name}</p>
                </div>
              ))}
            </div>
          </ModalBody>

          
        </ModalContent>
      </NextModal>
  )
}
