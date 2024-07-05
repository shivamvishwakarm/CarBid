import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { checkIfVehicleLiked, fetchVehicle, toggleVehicleLike } from '../Redux/vehicleSlice';
import { Input, Button, Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Image, ScrollShadow } from '@nextui-org/react';
import Vehicleinfo from '../components/Vehicleinfo';
import VehicleFeature  from '../components/VehicleFeature';
import { fetchBidData } from '../Redux/auctionSlice';
import { placeBid } from '../Redux/bidSlice';
import LoadingButton from '../components/LoadingButton ';
import { FaHeart, FaRegHeart, FaHome, FaFile, FaMap } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiMapPinAreaLight } from "react-icons/pi";
import toast from 'react-hot-toast';

const VehicleDetail = () => {

  const userName = useSelector((state) => state.auth.data.displayName);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isLiked, setIsLiked] = useState(false);
  const [isPlacingBid, setIsPlacingBid] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bidAmount, setBidAmount] = useState(0);
  const userId = useSelector((state) => state.auth.data.uid);
  const vehicle = useSelector((state) => state.vehicle.onevehicle);
  const [startingBid, setStartingBid] = useState(null);
  const [highestBid, setHighestBid] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const endDate = vehicle?.endTime?.toDate();
  const currentTime = new Date();
  const timeDifference = endDate - currentTime;


  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchVehicle(id));
      const isLiked = await dispatch(checkIfVehicleLiked({ vehicleId: id, userId }));
      setIsLiked(isLiked.payload);
    };
    fetchData();
  }, [dispatch, id, userId]);

  useEffect(() => {
    const fetchBidAmounts = async () => {
      if (vehicle) {
        try {
          const res = await dispatch(fetchBidData({ auctionId: vehicle.auctionId, vehicleId: vehicle.id }));
          setStartingBid(res.payload.firstBid);
          setHighestBid(res.payload.highestBid);
        } catch (error) {
          console.error('Error fetching bid data:', error);
        }
      }
    };
    if (vehicle) {
      fetchBidAmounts();
    }
  }, [dispatch, vehicle]);

  const handleLike = async () => {
    const res = await dispatch(toggleVehicleLike({ vehicleId: id, userId }));
    setIsLiked(res.payload);
  };

  const handleChange = (e) => {
    setBidAmount(e.target.value);
  };

  const handlePlaceBid = async () => {
    try {
      setIsPlacingBid(true);
      const res = await dispatch(placeBid({ auctionId: vehicle.auctionId, bidAmount: parseFloat(bidAmount), userId, userName }));
      
      toast(res.payload.message);
      onClose();
      const bidData = await dispatch(fetchBidData({ auctionId: vehicle.auctionId, vehicleId: id }));
      setStartingBid(bidData.payload.firstBid);
      setHighestBid(bidData.payload.highestBid);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPlacingBid(false);
    }
  };

  if (!vehicle) {
    return <div className="p-6">No auction details found</div>;
  }

  console.log(vehicle)

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row mt-10 gap-10">
        <div className="  flex flex-col ">
          <Image
            className="drop-shadow-2xl"
            width={666}
            height={444}
            isZoomed
            alt="Vehicle Image"
            src={selectedImage ? selectedImage : vehicle.vehiclePhotos[0]}
          />
          <ScrollShadow className=" " orientation="horizontal" hideScrollBar>
            <div className="flex mt-6 mb-2" style={{ minWidth: `${vehicle.vehiclePhotos.length * 120}px` }}>
              {vehicle.vehiclePhotos.map((photo, index) => (
                <div key={index} className="m cursor-pointer" onClick={() => setSelectedImage(photo)}>
                  <img className="rounded-md mr-4" width={120} height={80} alt="Vehicle Thumbnail" src={photo} />
                </div>
              ))}
            </div>
          </ScrollShadow>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="flex justify-between m-2">
            <div className="font-bold text-xl">{vehicle.model}</div>
            <div>
              <Button onClick={handleLike} className="text-xl text-blue-600 cursor-pointer bg-transparent">
                {isLiked ? <FaHeart /> : <FaRegHeart />}
              </Button>
            </div>
          </div>
          <ul className="flex gap-4 mb-4">
            {/* <li className="px-2 py-1 bg-gray-100 rounded">{vehicle.travelDistance} kms</li> */}
            <li className="px-2 py-1 drop-shadow-2xl bg-[#dfdddd] rounded">{vehicle.distanceTraveled} kms</li>
            <li className="px-2 py-1 drop-shadow-2xl bg-[#dfdddd] rounded">{vehicle.fuelType}</li>
            <li className="px-2 py-1 drop-shadow-2xl bg-[#dfdddd] rounded">{vehicle.transmission}</li>
            <li className="px-2 py-1 drop-shadow-2xl bg-[#dfdddd] rounded">{vehicle.registrationYear}</li>
          </ul>
          <div className="flex flex-col mb-6">
            <div className="mb-2">
            <PiMapPinAreaLight />
              {vehicle.address}
              </div>
            <div className="flex flex-row mb-2 items-center">
            <AiOutlineHome />

              <p className='ml-2'>Home test drive available</p>
            </div>
            <div
              className="flex flex-row mb-2 items-center cursor-pointer text-blue-500">
              <IoDocumentTextOutline />
              <p className='ml-2'>Check inspection report</p>
            </div>
            <div
              className="flex flex-row mb-2 items-center cursor-pointer text-blue-500">
              <IoDocumentTextOutline />
              <p className='ml-2'>Check service history</p>
            </div>
          </div>

          <div className="flex flex-col mt-5 gap-4 md:flex-row md:justify-between md:gap-10">

            <div className="w-full md:w-1/2 ">
            <div className="font-bold text-2xl text-blue-700">{highestBid}L</div>
            <div className="font-light mb-4">Current bid</div>

           
              <Button fullWidth disabled>Book Test Drive Coming Soon ...</Button>
            </div>
            
            <div className="w-full md:w-1/2">
            <div className="font-extrabold text-2xl">{startingBid}L</div>
            <div className="font-light mb-4">Starting Bid</div>
              {timeDifference <= 0 ? (
                <div>Auction End</div>
              ) : (
                <div>
                  {isLoggedIn ? (
                    isPlacingBid ? (
                      <Button fullWidth loading>
                        Placing Bid...
                      </Button>
                    ) : (
                      <Button className='bg-blue-700 text-white' onPress={onOpen} fullWidth>
                        Place Bid
                      </Button>
                    )
                  ) : (
                    <div>Login To Place Bid</div>
                  )}

                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className=''>
     
        <Vehicleinfo vehicle={vehicle} />
        <VehicleFeature/>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent className='w-80'>
          <ModalHeader className="flex flex-col gap-1">Place your Bid</ModalHeader>
          <ModalBody>
            <div className="flex items-center justify-center flex-col">
              <div className="flex items-center justify-between w-full">
                <div className="">
                  <div className="font-light">Current Bid</div>
                  <div className="font-bold">{highestBid}L</div>
                </div>
                <div className="">
                  <div className="font-light">Starting Bid</div>
                  <div className="font-bold">{startingBid}L</div>
                </div>
              </div>
              <div className="flex flex-col w-full my-4">
                <Input type="text" variant='bordered' placeholder="Enter Bid Amount" value={bidAmount} onChange={handleChange} />
              </div>
              <Divider />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>Close</Button>
            {isPlacingBid ? (
              <Button isLoading color='primary'></Button>
            ) : (
              <Button color="primary" onPress={handlePlaceBid}>Place Bid</Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default VehicleDetail;
