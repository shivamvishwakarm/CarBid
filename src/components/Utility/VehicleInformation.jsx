import React from 'react';
import { Input, RadioGroup, Radio, ScrollShadow, Image } from '@nextui-org/react';

const VehicleInformation = ({ formData, setFormData, brands, models }) => {
  return (
    <ScrollShadow hideScrollBar className="w-[600px] h-[400px]">
      <div className=' flex flex-col '>
        <div>
          <select
            value={formData.registrationYear}
            onChange={(e) => setFormData({ ...formData, registrationYear: e.target.value })}
            className="mt-2 mr-4 border border-blue-300 rounded-md p-1 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 outline-none text-blue-600 bg-white"
          >
            <option value="">Select registration year</option>
            {[2022, 2021, 2020, 2019, 2018].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            className="mt-2 border border-blue-300 rounded-md p-1 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 outline-none text-blue-600 bg-white"
          >
            <option value="">Select brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.brand}
              </option>
            ))}
          </select>
        </div>
        <div className='my-4'>
          <select
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            className="mt-2 mr-4 border border-blue-300 rounded-md p-1 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 outline-none text-blue-600 bg-white"
          >
            <option value="">Select model</option>
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.model}
              </option>
            ))}
          </select>
          <select
            value={formData.fuelType}
            onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
            className="mt-2 border border-blue-300 rounded-md p-1 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 outline-none text-blue-600 bg-white"
          >
            <option value="">Select fuel type</option>
            {['Petrol', 'Diesel', 'CNG & Hybrids', 'LPG'].map((fuel) => (
              <option key={fuel} value={fuel}>
                {fuel}
              </option>
            ))}
          </select>
        </div>
        <div className='my-4'>
          <Input
            className='mr-2'
            type="text"
            placeholder="Enter your location"
            radius={"md"}
            variant="bordered"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
          <Input
            className=''
            type="tel"
            placeholder="Enter your kms driven"
            radius={"md"}
            variant="bordered"
            value={formData.kmsDriven}
            onChange={(e) => setFormData({ ...formData, kmsDriven: e.target.value })}
          />
        </div>
        <div className='my-2'>
          <RadioGroup label="Transmission" value={formData.transmission} onChange={(value) => setFormData({ ...formData, transmission: value.target.value })}>
            <div className=' flex'>
              <Radio value="Manual" className='mr-2'>Manual</Radio>
              <Radio value="Automatic">Automatic</Radio>
            </div>
          </RadioGroup>
          <RadioGroup label="Ownership" value={formData.ownership} onChange={(value) => setFormData({ ...formData, ownership: value.target.value })}>
            <div className=' flex'>
              <Radio value="1st Owner" className='mr-2'>1st Owner</Radio>
              <Radio value="2nd Owner" className='mr-2'>2nd Owner</Radio>
              <Radio value="3rd Owner">3rd Owner</Radio>
            </div>
          </RadioGroup>
        </div>
        <div className="my-2">
          <label className="block m-4">
            <span className="text-gray">Vehicle Photos</span>
            <div className="mt-1 flex flex-col">
              <label className="inline-flex w-full mt-3 cursor-pointer">
                <Button auto flat color="primary" variant="bordered" className="flex w-80 text-blue-700 rounded-md">
                  <UploadIcon />
                  Upload Images
                </Button>
                <input type="file" className="sr-only" onChange={(e) => {
                  const files = Array.from(e.target.files);
                  const previews = files.map(file => URL.createObjectURL(file));
                  setFormData({ ...formData, vehiclePhotos: previews });
                }} multiple />
              </label>
            </div>
          </label>
          <div className="flex">
            {formData.vehiclePhotos.map((photo, index) => (
              <Image key={index} src={photo} alt="Vehicle" className="w-20 h-20 object-cover rounded-md mr-2" />
            ))}
          </div>
        </div>
      </div>
    </ScrollShadow>
  );
};

export default VehicleInformation;
