
import {ScrollShadow} from "@nextui-org/scroll-shadow";
import {Button} from "@nextui-org/react";
import PropTypes from 'prop-types';

 const VehicleDetails = () => {

// console.log(vehicle)
    return (
        <ScrollShadow >
            <div className="z-50 w-full">
            <h2 className='mt-2 mb-4'>Vehicle details</h2>
            <hr className='my-2 border-gray' />

            <div className=''>
                <div className='flex justify-between my-2'>
                    <div className="">
                        <h5 className='text-gray py-1 '>Model name</h5>
                        <p>Model name</p>
                        <hr className='my-2 w-60 border-gray'/>
                    </div>
                    <div className="mb-4">
                        <h5 className='text-gray py-1'>Listed by</h5>
                        <p>Mr. deepak kalala </p>
                        <hr className='my- 2 w-30 border-gray'/>
                    </div>

                </div>
               
                <div className='flex justify-between my-2'>
                    <div>
                        <h5 className='text-gray py-1'>Seller contact</h5>
                        <p>+91 754455787</p>
                        <hr className='my-2 w-60 border-gray'/>
                    </div>
                    <div>
                        <h5 className='text-gray py-1'>Scheduled on</h5>
                        <p>21 Jan' 24    10:00 AM


                        </p>
                        <hr className='my-2 w-30 border-gray'/>
                    </div>

                </div>
         

                <div className='flex  my-2'>
                    <div>
                        <h5 className='text-gray py-1'>Address</h5>
                        <p>Gaur tower , gt baazar or mar d -blc, cyrsttea, cout m</p>
                        <hr className='my-2 border-gray'/>
                    </div>
                </div>
             
                <div className='flex justify-between my-2'>
                    <div>
                        <h5 className='text-gray py-1'>Ownership</h5>
                        <p>First owner</p>
                        <hr className='my-2 w-60 border-gray'/>
                    </div>
                    <div>
                        <h5 className='text-gray py-1'>Distance travelled</h5>
                        <p>10,204 kms</p>
                        <hr className='my-2 w-30 border-gray'/>
                    </div>

                </div>
                <div className='flex justify-between my-2'>
                    <div>
                        <h5 className='text-gray py-1'>Registration year</h5>
                        <p>2014</p>
                        <hr className='my-2 w-60 border-gray'/>
                    </div>
                    <div>
                        <h5 className='text-gray py-1'>State code</h5>
                        <p>Up-14</p>
                        <hr className='my-2 w-30 border-gray'/>
                    </div>

                </div>
                <div className='flex justify-between my-2'>
                    <div>
                        <h5 className='text-gray py-1'>Vehicle type</h5>
                        <p>Car</p>
         
                    </div>
                    <div>
                        <h5 className='text-gray py-1'>Brand</h5>
                        <p>Hundai</p>
                
                    </div>

                </div>
                {/* <hr className='border-gray'/>   */}
                {/* <div className="my-2 flex justify-end ">
                <Button className='mx-1' color="danger" variant="bordered">
        Fail evaluation
      </Button>  
                <Button className='mx-1' color="primary" variant="solid">
        Approve dealer
      </Button>
      </div> */}
            </div>
            </div>


        </ScrollShadow>
    );
};

export default VehicleDetails;

// VehicleDetails.propTypes = {
//     selectedVehicle: PropTypes.object.isRequired,
// };