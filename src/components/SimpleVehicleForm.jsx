import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitVehicleDetails } from '../Redux/vehicleSlice.js';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Radio, RadioGroup, Input, Divider, Checkbox, ScrollShadow, Image } from '@nextui-org/react';
import LoadingButton from './LoadingButton ';
import useBrandModels from '../hooks/useBrandModels.jsx';
import b1 from '../assets/374c24fdbbb811e3fe494f27ae695992.png';
import b2 from '../assets/6a2c6d1d7a63e9b0b4c51c016d3d96a8.png';
import b3 from '../assets/6b887207aa943cdf23bdff721988238b.png';
import b4 from '../assets/71a56f0bf6e78b7ca53ba588013427c5.png';
import b5 from '../assets/a9fe987ee1edd3fa351dee20689382da.png';
import b6 from '../assets/aac85f63ec516ad9f9038d1e9864160b.png';
import b7 from '../assets/bc3d6ddc5983ce11ad42ba78b28716ca.png';
import b8 from '../assets/c3e37bcf2700ab5e993594e2e31f0852.png';
import b9 from '../assets/d0202be409abd6ce3bc3cb03884c56e7.jpg';
import b10 from '../assets/dd574ce9ae4551ed764f80ff3e7addc1.png';

import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

// upload icon
const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12" />
  </svg>
);

import toast from 'react-hot-toast';
import useBrands from '../hooks/useBrands.jsx';



// new code 
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';

const steps = ['Seller info', 'Vechicle info', 'Evaluation', 'Terms & conditions', 'Enter bid'];




const SimpleVehicleForm = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.data.uid);
  const [isLoading, setisLoding] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [idPreviews, setidPreviews] = useState();
  const [formDisabled, setFormDisabled] = useState(false);
  const [idProof, setIdProof] = useState('');
  const [vehiclePhotos, setVehiclePhotos] = useState([]);
  const [stage, setStage] = useState(1);
  const [formData, setFormData] = useState({
    sellerType: 'individual',
    name: '',
    mobile: '',
    address: '',
    registrationYear: '',
    brand: '',
    model: '',
    travelDistance: 0,
    transmission: '',
    ownerType: '',
    carLocation: '',
    modification: '',
    'modificationDetails': '',
    pickupLocation: '',
    dealershipName: '',
    website: '',
    city: '',
    vehicleType: 'car',
    'fuelType': 'petrol'
  });


  const brands = useBrands();
  const models = useBrandModels(formData.brand);

  const handlepickup = (e) => {
    if (e.target.checked) {
      setFormData({ ...formData, pickupLocation: formData.carLocation });
    } else {
      setFormData({ ...formData, pickupLocation: '' });
    }
  }

  const handlePhotoUpload = (files) => {
    const photoFiles = Array.from(files);
    setVehiclePhotos(photoFiles);
    const previews = photoFiles.map((file) => URL.createObjectURL(file));
    setPhotoPreviews(previews);
  };
  const handelIdproof = (files) => {
    setIdProof(files);
    const previews = URL.createObjectURL(files);
    setidPreviews(previews);


  };

  const handleSubmit = async (e) => {
    setisLoding(true);
    e.preventDefault();
    try {
      const missingFields = [];
      if (!formData.address) missingFields.push('Address');
      if (!formData.brand) missingFields.push('Brand');
      if (!formData.carLocation) missingFields.push('Car Location');
      if (!formData.mobile) missingFields.push('Mobile');
      if (!formData.model) missingFields.push('Model');
      if (!formData.modification) missingFields.push('Modification');
      if (!formData.name) missingFields.push('Name');
      if (!formData.ownerType) missingFields.push('Owner Type');
      if (!formData.pickupLocation) missingFields.push('Pickup Location');
      if (!formData.registrationYear) missingFields.push('Registration Year');
      if (!formData.sellerType) missingFields.push('Seller Type');
      if (!formData.transmission) missingFields.push('Transmission');
      if (!formData.travelDistance) missingFields.push('Travel Distance');
      if (!idProof) missingFields.push('ID Proof');
      if (!formData.vehicleType) missingFields.push('vehicleType');
      if (!formData.fuelType) missingFields.push('fuelType');
      if (!formData.city) missingFields.push('city');
      if (vehiclePhotos.length === 0) missingFields.push('Vehicle Photos');

      if (formData.sellerType === 'dealer') {
        if (!formData.dealershipName) missingFields.push('Dealership Name');
        if (!formData.salesRange) missingFields.push('Sales Range');
      }

      if (missingFields.length > 0) {
        const missingFieldsString = missingFields.join(', ');
        toast.error(`Please fill all required fields: ${missingFieldsString}`);
        return;
      }

      await dispatch(submitVehicleDetails({
        vehicleData: formData,
        vehiclePhotos,
        userId: currentUser,
        idProof,
        stage
      }));

      setFormData({
        sellerType: 'individual',
        name: '',
        mobile: '',
        address: '',
        registrationYear: '',
        brand: '',
        model: '',
        travelDistance: '',
        transmission: '',
        ownerType: '',
        carLocation: '',
        modification: '',
        pickupLocation: '',
        dealershipName: '',
        website: '',
        city: '',
        'fuelType': 'petrol',
        'vehicleType': 'car'
      });
      setVehiclePhotos([])
      setIdProof('')
      setidPreviews('')
      setStage(1);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error submitting vehicle details:', error.message);
    } finally {
      setisLoding(false);
    }
  };


  const renderStage = () => {
    switch (stage) {
      case 1:
        return (
          <div>
            <RadioGroup className='text-black pt-4' value={formData.sellerType} label="Seller Type" onChange={(value) => setFormData({ ...formData, sellerType: value.target.value })}>
              <div className='flex'>
                <Radio value="dealer" className=' mr-2'>Dealer</Radio>
                <Radio value="individual">Individual</Radio>
              </div>
            </RadioGroup>
            <h2 className='mt-4'>Seller Information</h2>
            {formData.sellerType === 'individual' && <div className='flex flex-col my-2'>
              <div className='flex my-2'>
                <Input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  radius='sm'
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className='mr-2 bg-transparent'
                />
                <Input
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={formData.mobile}
                  radius='sm'
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                />
              </div>
              <Input
                type="text"
                placeholder="Enter your address"
                value={formData.address}
                radius='sm'
                className='mb-2 '
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            }

            <label className="block m-4">
              <span className="text-gray">ID proof(*Please provide only PAN card & Driving license)</span>
              <div className="mt-1 flex flex-col">

                <label className="inline-flex  mt-3 cursor-pointer">
                  <Button auto flat color="primary" variant="bordered" className="flex text-blue-700 rounded-md w-80">
                    <UploadIcon />
                    Upload ID
                  </Button>
                  <input type="file" className="sr-only" onChange={handlePhotoUpload} />
                </label>
              </div>
            </label>
            <Image
              src={idPreviews}
              alt='Proof'
              className="w-20 h-20 object-cover rounded-md mr-2"

            />
            {formData.sellerType === 'dealer' && (
              <div className=' flex flex-col'>

                <div><Input
                  type="text"
                  placeholder="Enter dealership name"
                  value={formData.dealershipName}
                  radius='sm'
                  onChange={(e) => setFormData({ ...formData, dealershipName: e.target.value })}
                  className='mb-2 w-1/2'
                />
                </div>
                <div className=' flex'>
                  <Input
                    type="text"
                    placeholder="Enter Delear your name"
                    value={formData.name}
                    radius='sm'
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className='mr-2'
                  />
                  <Input
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    radius='sm'
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className='mb-2'
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Enter your address"
                    value={formData.address}
                    radius='sm'
                    className='mb-2'
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div className=' flex'>
                  <Input
                    type="text"
                    placeholder="Enter website"
                    value={formData.website}
                    radius='sm'
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className='mb-2 mr-2'
                  />
                  <Input
                    type="text"
                    placeholder="Enter sales range"
                    value={formData.salesRange}
                    radius='sm'
                    onChange={(e) => setFormData({ ...formData, salesRange: e.target.value })}
                    className='mb-2'
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <ScrollShadow hideScrollBar className="w-[600px] h-[400px]">
            <div className=' flex flex-col mt-2'>
              <div className='flex flex-col w-80'>
                <label htmlFor="registrationYear">Registration year</label>
                <select
                  id='registrationYear'
                  value={formData.registrationYear}
                  onChange={(e) => setFormData({ ...formData, registrationYear: e.target.value })}
                  className="text-gray mt-2 mr-4 border-2 border-gray rounded-md p-1 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 outline-none text-blue-600 bg-white"
                >
                  <option value="">Choose year</option>
                  {[2022, 2021, 2020, 2019, 2018].map((year) => (
                    <option key={year} value={year} className="text-blue-600">
                      {year}
                    </option>
                  ))}
                </select>
                {/* uncomment if city is needed */}


                {/* <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="mt-2 border border-blue-300 rounded-md p-1 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 outline-none text-blue-600 bg-white"
                >
                  <option value="">City</option>
                  {['Bengaluru'].map((city) => (
                    <option key={city} value={city} className="text-blue-600">
                      {city}
                    </option>
                  ))}
                </select> */}


              </div>
              <div className='flex items-center          justify-between my-2 '>
                <div className='flex flex-col'>
                  <label htmlFor="brand">Choose brand</label>
                  <select
                    id='brand'
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className='mt-2 border border-gray rounded-md p-1 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 outline-none text-gray bg-white'
                  >
                    <option value="">Choose brand</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand} className="text-blue-600">
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="model">Choose model</label>
                  <select
                    label="model"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className='mt-2 border border-gray rounded-md p-1 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 outline-none text-gray bg-white'
                  >
                    <option value="">Choose model</option>
                    {models.map((model) => (
                      <option key={model} value={model} className="text-blue-600">
                        {model}
                      </option>
                    ))}
                  </select>
                </div>
              </div>


              <div className='flex items-center justify-between my-2'>

                <div className='flex flex-col'>
                  <label htmlFor="vechicle">Choose vechicle type</label>
                  <select
                    label="vechicle"
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                    className='mt-2 border border-gray rounded-md p-1 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 outline-none text-gray bg-white'
                  >
                    <option value="Choose vehicle type">Choose vehicle type</option>
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                    <option value="scooty">Scooty</option>
                  </select>
                </div>

                <div className='flex flex-col mr-2'>
                  <label htmlFor="fuel">Choose fuel type</label>
                  <select
                    label="fuel"
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                    className='mt-2 border border-gray rounded-md p-1 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 outline-none text-gray bg-white'
                  >
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="cng">CNG</option>
                  </select>
                </div>

              </div>




            </div>
            <div className='flex items-center justify-between mb-2'>



              {/* Transmission Type */}
              <div className="flex flex-col p-1">
                <label htmlFor="transmission">Transmission</label>
                <select
                  id='transmission'
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className='mt-2 border border-gray rounded-md p-1 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 outline-none text-gray bg-white'
                >
                  <option value="">Transmission</option>

                  <option value={"Manual"} className="text-blue-600">
                    Manual
                  </option>
                  <option k value={"Automatic"} className="text-blue-600">
                    Automatic
                  </option>

                </select>
              </div>


              {/* Distance Travel */}
              <div className='flex flex-col'>
                <label >Distance Travel</label>
                <input
                  type="text"
                  placeholder="Travel Distance (in kilometers)"
                  value={formData.travelDistance}
                  onChange={(e) => setFormData({ ...formData, travelDistance: e.target.value })}
                  className='mt-2 border border-gray rounded-md p-1 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 outline-none text-gray bg-white w-2/3 mr-0'
                />
              </div>
            </div>

            <RadioGroup
              value={formData.ownerType}
              label={<span style={{ color: 'black' }}>Owner Type</span>}
              className="mt-2"
              onChange={(e) => setFormData({ ...formData, ownerType: e.target.value })}
            >
              <div className='flex mb-2'>
                <Radio value="first" className="mr-4">First Owner</Radio>
                <Radio value="second" className='mx-4'>Second Owner</Radio>
                <Radio value="third">Third Owner</Radio>
              </div>
            </RadioGroup>

            <label htmlFor="carLocation" className="block text-sm font-medium text-gray-700">
              Car Location
            </label>
            <Input
              id="carLocation"
              type="text"
              placeholder="Car Location"
              value={formData.carLocation}
              radius='sm'
              className='mt-2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              onChange={(e) => setFormData({ ...formData, carLocation: e.target.value })}
            />


            <RadioGroup
              id="modifications"
              value={formData.modification}
              label="Has there been any modification?"
              className="mt-2"
              onChange={(e) => setFormData({ ...formData, modification: e.target.value })}
            >
              <div className='flex'>
                <Radio value="yes">Yes</Radio>
                <Radio value="no" className='mx-2'>No</Radio>
              </div>
            </RadioGroup>
            {formData.modification === 'yes' && (
              <div className='my-2'>
                <label htmlFor='modificationsDetails'>If yes, please specify*</label>
                <Input
                className='mt-2'
                  id='modificationDetails'
                  type="text"
                  placeholder="Enter modification details"
                  value={formData.modificationDetails}
                  radius='sm'
                  onChange={(e) => setFormData({ ...formData, modificationDetails: e.target.value })}
                />
              </div>
            )}

          </ScrollShadow>

        );

      case 3:
        return (
          <div>
            <h2 className='text-blue-600'>evalution</h2>
            
            </div>
        
        );

      case 4:
        return (
          <div>
          <h2 className="font-bold">Terms and conditions</h2>
        
          <p className='pt-4'>
            {/* write terms and conditions content */}
            By using this service, you agree to the following terms and conditions:
            <ol>
              <li>1. You must ensure that all information provided about your vehicle is accurate and truthful.</li>
              <li>2. Any modifications or alterations to the vehicle must be disclosed prior to the evaluation.</li>
              <li>3. The service reserves the right to modify or terminate services at any time without notice.</li>
              <li>4. All evaluations are subject to change based on further inspection and market conditions.</li>
              <li>5. Personal data collected during the process will be used in accordance with our privacy policy.</li>
            </ol>
            Please read these terms carefully before proceeding.
          </p>
        
          <div className="flex items-center mt-4">
            <input
              id="agreeTerms"
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-900">
              I agree to the terms and conditions
            </label>
          </div>
        </div>
        );

    }

  };




  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };






  return (
    <>
      <div className="flex flex-col justify-center max-h-screen  ">
        {/* <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl "> */}
        <h2 className="text-xl  mb-4 ">Sell your vehicle</h2>
        <div className="flex space-x-2 mb-6">
          <Input
            className="flex-1"
            placeholder="Vehicle number"
          />
          <Button
            className="bg-blue-400  text-white hover: bg-blue-600"
            onPress={onOpen}
          >
            Search vehicle
          </Button>
        </div>
        <div className="flex items-center mb-4">
          <div className="flex-grow h-0.5" style={{ backgroundColor: '#DFDFDF' }}></div>
          <span className="px-2" style={{ color: '#DFDFDF' }}>or</span>
          <div className="flex-grow h-0.5" style={{ backgroundColor: '#DFDFDF' }}></div>
        </div>
        <p className=" mb-4">Start with a brand</p>
        <div className="grid grid-cols-4 gap-4">
          {[b1, b2, b3, b4, b5, b6, b7, b8].map((brand, index) => (
            <button
              key={index}
              className="flex items-center justify-center p-4 border rounded-lg hover:shadow-md transition"
            >
              <Image
                src={brand} // Ensure you have the brand logos in your public folder
                alt={brand}
                className="h-8"
              />

            </button>
          ))}
        </div>
      </div>
      {/* </div> */}
      {/* <Button className='font-bold bg-blue-600 text-white' onPress={onOpen} disabled={formDisabled}>Add Vehicle</Button> */}
      <Modal size='2xl' isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Submit Vehicle Details</ModalHeader>

          {/* stepper function */}

          <Box className='mx-2 ' sx={{ width: '100%' }}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (

                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>

          </Box>

          {/* stepper function */}



          <ModalBody>
            <form onSubmit={handleSubmit}>
              {renderStage()}
              <Divider />
              <div className='my-4 flex items-center justify-end'>

                {isLoading ? (
                  <LoadingButton />
                ) : (
                  <>
                    <Button
                      className="mr-2 bg-gray "
                      radius='sm'
                      // onClick={handleBack}

                      onClick={() => {
                        handleBack()
                        setStage((prevStage) => Math.max(prevStage - 1, 1))
                      }}
                    >
                      Previous
                    </Button>
                    <Button
                      className="mr-2 bg-blue-800 text-white hover:bg-blue-400"
                      type="button"
                      radius='sm'
                      onClick={(e) => {
                        if (stage === 4) {
                          handleSubmit(e);
                        } else {
                          setStage(prevStage => prevStage + 1);
                          handleNext()
                        }
                      }}
                    >
                      {(stage === 4) ? 'Submit' : 'Next'}
                    </Button>
                  </>
                )}



              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>

  );
};

export default SimpleVehicleForm;