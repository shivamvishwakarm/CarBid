import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import React from 'react'
import { ChevronDown, Lock, Activity, Flash, Server, TagUser, Scale } from "./Icons.jsx";

const Exploreby = () => {

  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    lock: <Lock className="text-success" fill="currentColor" size={30} />,
    activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: <Server className="text-success" fill="currentColor" size={30} />,
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
  };




  return (
    <>
      <Divider />
      <div className="w-full items-center justify-start flex  rounded   pl-4 ml-6">
        <h2 className='mr-4 text-gray'>Explore by</h2>

        <div className="ml-14">
          <Dropdown>
            <DropdownTrigger>
              <Button disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={icons.chevron}
                radius="sm"
                variant="light">Types of vehicle </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Types of vehicle">
              <DropdownItem onClick={() => handleDropdownClick('car')}>
                <div className="flex items-center">
                  Car
                  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="ml-2 outline-none transition-transform group-data-[hover=true]:translate-y-0.5 [&>path]:stroke-[2.5px]" width="10" height="10" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6m0 0H9m9 0v9"></path>
                  </svg>
                </div>
              </DropdownItem>
              <DropdownItem onClick={() => handleDropdownClick('bike')}>
                <div className="flex items-center">
                  Bike
                  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="ml-2 outline-none transition-transform group-data-[hover=true]:translate-y-0.5 [&>path]:stroke-[2.5px]" width="10" height="10" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6m0 0H9m9 0v9"></path>
                  </svg>
                </div>
              </DropdownItem>
              <DropdownItem onClick={() => handleDropdownClick('scooty')}>
                <div className="flex items-center">
                  Scooty
                  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="ml-2 outline-none transition-transform group-data-[hover=true]:translate-y-0.5 [&>path]:stroke-[2.5px]" width="10" height="10" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6m0 0H9m9 0v9"></path>
                  </svg>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>



        <div className='ml-4'>
          <Dropdown>
            <DropdownTrigger>
              <Button disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={icons.chevron}
                radius="sm"
                variant="light">
                Brands
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Brands">
              <DropdownItem>
                <div className="flex items-center ">
                  Tata
                  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="ml-2 outline-none transition-transform group-data-[hover=true]:translate-y-0.5 [&>path]:stroke-[2.5px]" width="10" height="10" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6m0 0H9m9 0v9"></path>
                  </svg>
                </div>
              </DropdownItem>
              <DropdownItem>
                <div className="flex items-center ">
                  Hyundai
                  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="ml-2 outline-none transition-transform group-data-[hover=true]:translate-y-0.5 [&>path]:stroke-[2.5px]" width="10" height="10" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6m0 0H9m9 0v9"></path>
                  </svg>
                </div>
              </DropdownItem>
              <DropdownItem>
                <div className="flex items-center ">
                  Mahindra
                  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="ml-2 outline-none transition-transform group-data-[hover=true]:translate-y-0.5 [&>path]:stroke-[2.5px]" width="10" height="10" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6m0 0H9m9 0v9"></path>
                  </svg>
                </div>
              </DropdownItem>

            </DropdownMenu>


          </Dropdown>
        </div>
        <div className='mx-4'>
        <Dropdown>
  <DropdownTrigger>
    <Button disableRipple
      className="p-0 bg-transparent data-[hover=true]:bg-transparent"
      endContent={icons.chevron}
      radius="sm"
      variant="light">Kms Travelled</Button>
  </DropdownTrigger>
  <DropdownMenu aria-label="Kms Travelled">
    <DropdownItem>
      <div className="flex items-center">
        0 - 10,000 Kms
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="ml-2 outline-none transition-transform group-data-[hover=true]:translate-y-0.5 [&>path]:stroke-[2.5px]" width="10" height="10" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6m0 0H9m9 0v9"></path>
        </svg>
      </div>
    </DropdownItem>
    <DropdownItem>
      <div className="flex items-center">
        10,000 - 20,000
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="ml-2 outline-none transition-transform group-data-[hover=true]:translate-y-0.5 [&>path]:stroke-[2.5px]" width="10" height="10" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6m0 0H9m9 0v9"></path>
        </svg>
      </div>
    </DropdownItem>
    <DropdownItem>
      <div className="flex items-center">
        20,000 - 30,000
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="ml-2 outline-none transition-transform group-data-[hover=true]:translate-y-0.5 [&>path]:stroke-[2.5px]" width="10" height="10" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6m0 0H9m9 0v9"></path>
        </svg>
      </div>
    </DropdownItem>
    <DropdownItem>
      <div className="flex items-center">
        30,000 - 40,000
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="ml-2 outline-none transition-transform group-data-[hover=true]:translate-y-0.5 [&>path]:stroke-[2.5px]" width="10" height="10" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6m0 0H9m9 0v9"></path>
        </svg>
      </div>
    </DropdownItem>
    <DropdownItem>
      <div className="flex items-center">
        40,000 - 50,000
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="ml-2 outline-none transition-transform group-data-[hover=true]:translate-y-0.5 [&>path]:stroke-[2.5px]" width="10" height="10" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6m0 0H9m9 0v9"></path>
        </svg>
      </div>
    </DropdownItem>
    <DropdownItem>
      <div className="flex items-center">
        More than 50,000
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="ml-2 outline-none transition-transform group-data-[hover=true]:translate-y-0.5 [&>path]:stroke-[2.5px]" width="10" height="10" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6m0 0H9m9 0v9"></path>
        </svg>
      </div>
    </DropdownItem>
  </DropdownMenu>
</Dropdown>
        </div>
        <div className='mx-4'>

        <Dropdown>
  <DropdownTrigger>
    <Button disableRipple
      className="p-0 bg-transparent data-[hover=true]:bg-transparent"
      endContent={icons.chevron}
      radius="sm"
      variant="light">Fuel Type</Button>
  </DropdownTrigger>
  <DropdownMenu aria-label="Fuel Type">
    <DropdownItem>
      <div className="flex items-center">
        Petrol
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="ml-2 outline-none transition-transform group-data-[hover=true]:translate-y-0.5 [&>path]:stroke-[2.5px]" width="10" height="10" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6m0 0H9m9 0v9"></path>
        </svg>
      </div>
    </DropdownItem>
    <DropdownItem>
      <div className="flex items-center">
        Diesel
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="ml-2 outline-none transition-transform group-data-[hover=true]:translate-y-0.5 [&>path]:stroke-[2.5px]" width="10" height="10" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6m0 0H9m9 0v9"></path>
        </svg>
      </div>
    </DropdownItem>
    <DropdownItem>
      <div className="flex items-center">
        CNG
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="ml-2 outline-none transition-transform group-data-[hover=true]:translate-y-0.5 [&>path]:stroke-[2.5px]" width="10" height="10" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6m0 0H9m9 0v9"></path>
        </svg>
      </div>
    </DropdownItem>
  </DropdownMenu>
</Dropdown>

        </div>
        <div className='mx-4'>
        <Dropdown>
  <DropdownTrigger>
    <Button disableRipple
      className="p-0 bg-transparent data-[hover=true]:bg-transparent"
      endContent={icons.chevron}
      radius="sm"
      variant="light">Transmission</Button>
  </DropdownTrigger>
  <DropdownMenu aria-label="Transmission">
    <DropdownItem>
      <div className="flex items-center">
        Auto
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="ml-2 outline-none transition-transform group-data-[hover=true]:translate-y-0.5 [&>path]:stroke-[2.5px]" width="10" height="10" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6m0 0H9m9 0v9"></path>
        </svg>
      </div>
    </DropdownItem>
    <DropdownItem>
      <div className="flex items-center">
        Manual
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="ml-2 outline-none transition-transform group-data-[hover=true]:translate-y-0.5 [&>path]:stroke-[2.5px]" width="10" height="10" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6m0 0H9m9 0v9"></path>
        </svg>
      </div>
    </DropdownItem>
  </DropdownMenu>
</Dropdown>
        </div>





      </div>
      <Divider />
    </>

  )
}

export default Exploreby
