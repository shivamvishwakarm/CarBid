import React from 'react';
import { Input, RadioGroup, Radio, Image, Button } from '@nextui-org/react';

const SellerInformation = ({ formData, setFormData, idPreviews, handelIdproof, brands, models }) => {
  return (
    <div>
      <RadioGroup value={formData.sellerType} label="Seller Type" onChange={(value) => setFormData({ ...formData, sellerType: value.target.value })}>
        <div className='flex'>
          <Radio value="dealer" className=' mr-2'>Dealer</Radio>
          <Radio value="individual">Individual</Radio>
        </div>
      </RadioGroup>
      <h2 className='text-black mt-4'>Seller Information</h2>
      {formData.sellerType === 'individual' && (
        <div className='flex flex-col my-2'>
          <div className='flex my-2'>
            <Input
              className='mr-2'
              type="text"
              placeholder="Name"
              value={formData.name}
              radius='md'
              variant={"bordered"}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              className=''
              type="tel"
              placeholder="Mobile number"
              value={formData.mobile}
              radius='md'
              variant={"bordered"}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            />
          </div>
          <Input
            className='mb-2'
            type="text"
            placeholder="Address"
            value={formData.address}
            radius='md'
            variant={"bordered"}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>
      )}
      <div>
        <label className="block m-4">
          <span className="text-gray">Id proof (*Please provide only PAN card & Driving license)</span>
          <div className="mt-1 flex flex-col">
            <label className="inline-flex w-full mt-3 cursor-pointer">
              <Button auto flat color="primary" variant="bordered" className="flex w-80 text-blue-700 rounded-md">
                <UploadIcon />
                Upload ID
              </Button>
              <input type="file" className="sr-only" onChange={handelIdproof} />
            </label>
          </div>
        </label>
        <Image
          src={idPreviews}
          alt="Proof"
          className="w-20 h-20 object-cover rounded-md mr-2"
        />
      </div>
      {formData.sellerType === 'dealer' && (
        <div className=' flex flex-col'>
          <div>
            <Input
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
              placeholder="Enter dealer name"
              value={formData.name}
              radius='sm'
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className='mr-2'
            />
            <Input
              type="tel"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              radius={"md"}
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
};

export default SellerInformation;
