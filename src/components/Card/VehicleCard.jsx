import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Card, CardBody, Button, Image, ModalBody, ModalFooter } from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import { checkIfVehicleLiked, deleteVehicle, toggleVehicleLike } from '../../Redux/vehicleSlice';
import { useNavigate } from "react-router-dom";
import { Modal, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { fetchBidData } from '../../Redux/auctionSlice';
import BidsTable from "../BidsTable";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import Clock from '../Clock';










const VehicleCard = ({ vehicle, isonListed = false, isonMyBid = false, MyBidAmount = null, bids = null }) => {
  const { id, make, model, vehiclePhotos, fuelType, transmission, distanceTraveled } = vehicle;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const userId = useSelector((state) => state.auth.data.uid);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [startingBid, setStartingBid] = useState(null);
  const [highestBid, setHighestBid] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const isLiked = await dispatch(checkIfVehicleLiked({ vehicleId: id, userId }));
      setIsLiked(isLiked.payload);
console.log(vehicle);
      const bidData = await dispatch(fetchBidData({ auctionId: vehicle.auctionId, vehicleId: id }));
      setStartingBid(bidData.payload.firstBid);
      setHighestBid(bidData.payload.highestBid);
    };
    fetchData();
  }, [dispatch, id, userId, vehicle]);

  const handleLike = async () => {
    const res = await dispatch(toggleVehicleLike({ vehicleId: id, userId }));
    if (res.payload) {
      setIsLiked(true);
      toast.success('Vehicle Liked!');
    } else {
      setIsLiked(false);
      toast.success('Vehicle disliked!');
    }
  };

  const handleViewDetailClick = () => {
    navigate(`/vehicle/${id}`);
  };

  const handleDeleteListingClick = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deleteVehicle({ vehicleId: vehicle.id, userId }));
      toast.success('Vehicle deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete the vehicle!');
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const renderModalContent = () => (
    <ModalContent>
      <ModalHeader className="flex flex-col gap-1 text-center">Bids Information</ModalHeader>
      <ModalBody className="mb-4">
        <BidsTable bids={bids} />
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Close</Button>
      </ModalFooter>
    </ModalContent>
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        {renderModalContent()}
      </Modal>
      
      <Card shadow="dark-lg" className="w-[300px] flex flex-col rounded-xl overflow-hidden">
            <div className="relative h-48 overflow-hidden">
          <div className="relative z-10 top-2 right-4 bg-gray-800 bg-opacity-75 text-white rounded-md px-2 py-1 text-sm">
            <Clock vehicle={vehicle} />
          </div>
          <Image radius="none" alt={`${make} ${model}`} src={vehiclePhotos} className="object-cover w-full h-full z-0" />
        </div>
        <div className="flex items-center justify-between px-4 pt-4">
          <h3 className="font-bold text-lg">{model}</h3>
          <div onClick={handleLike} className="text-xl text-blue-600 cursor-pointer">
            {isLiked ? <FaHeart /> : <FaRegHeart />}
          </div>
        </div>
        <div className="px-4 text-gray-600 text-sm mb-2 mt-2  text-gray">
         <span className='mx-1'>{fuelType}</span>  • <span className='mx-1'>{transmission}</span>  • <span className='mx-1'>{distanceTraveled}km</span>
        </div>
     
       
        <CardBody className="flex flex-col px-4 pb-4">
          <div className="flex flex-row justify-between">
          
          <div className="flex flex-col justify-between text-lg  mt-2">
            <div className="font-bold">{highestBid}L</div>
            <div className="text-sm text-gray">Current bid</div>
          </div>
          <div className="flex flex-col items-start i justify-between text-lg ">
            <div className="font-bold">{isonMyBid ? `${MyBidAmount}L` : `${startingBid}L`}</div>
            <div className="text-sm text-gray">{isonMyBid ? 'Your Bid' : 'Starting bid'}</div>
          </div>
          </div>
          <div className="flex justify-between mt-4">
            {isonListed ? (
              <>
                <Button className="bg-blue-600 text-white" onPress={onOpen}>Open Modal</Button>
                <Button
                  variant="text"
                  color="error"
                  className="bg-red-600 text-white"
                  onClick={handleDeleteListingClick}
                  isLoading={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete Listing'}
                </Button>
              </>
            ) : (
              <>
               
                <Button variant="bordered" color="primary" className="flex-grow border-1  border-blue-600  mr-2">
                  Book test drive
                </Button>
                <Button variant="solid" color="primary" onClick={handleViewDetailClick} className="flex-grow  bg-blue-600 ml-2">
                  View details
                </Button>
              </>
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default VehicleCard;




// Prop validation

VehicleCard.propTypes = {
  vehicle: PropTypes.object.isRequired,
  isonListed: PropTypes.bool,
  isonMyBid: PropTypes.bool,
  MyBidAmount: PropTypes.number,
  bids: PropTypes.array,
};

