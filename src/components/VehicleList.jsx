import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllVehicles } from '../Redux/vehicleSlice.js';
import { Card, Skeleton } from '@nextui-org/react';
import VehicleCard from './Card/VehicleCard.jsx';

const VehicleList = () => {
    const dispatch = useDispatch();
    const vehicles = useSelector((state) => state.vehicle.vehicles) || [];  
    const loading = useSelector((state) => state.vehicle.loading); 

    

    const uId = useSelector((state) => state.auth.data.uid);
    console.log("this is the ve", vehicles);    

    useEffect(() => {
        dispatch(fetchAllVehicles());
    }, [dispatch]);

    return (
        <div className='my-10'>
        
            <h2 className='font-bold my-4'>Vehicles on auction</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 justify-center'>
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <Card key={index} className="w-[200px] space-y-5 p-4" radius="lg">
                            <Skeleton className="rounded-lg">
                                <div className="h-24 rounded-lg bg-default-300"></div>
                            </Skeleton>
                            <div className="space-y-3">
                                <Skeleton className="w-3/5 rounded-lg">
                                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                                </Skeleton>
                                <Skeleton className="w-4/5 rounded-lg">
                                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                                </Skeleton>
                                <Skeleton className="w-2/5 rounded-lg">
                                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                                </Skeleton>
                            </div>
                        </Card>
                    ))
                ) : (
                    vehicles.map((vehicle) => {
                        const endDate = vehicle.endTime.toDate();
                        const currentTime = new Date();
                        const timeDifference = endDate - currentTime;
                      
                        console.log("this is the time difference", timeDifference)
                  

                        if (timeDifference > 0 &&
                            vehicle.adminApprove === 'ACCEPT' &&
                            vehicle.evaluationDone === 'APPROVE' &&
                            vehicle.auctionStatus &&
                            vehicle.userId !== uId) {
                                return (
                                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                                );
                            } else {
                                return null; 
                            }
                    })
                )}
            </div>
        </div>
    );
};

export default VehicleList;
