import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuctionDetails } from '../Redux/auctionSlice';
import { Chip } from "@nextui-org/react";
import ClockSVG from '../assets/ClockSVG';
import PropTypes from 'prop-types';



const Clock = ({ vehicle }) => {
    const { id } = vehicle;
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auction.loading);
    const error = useSelector(state => state.auction.error);
    const [auctionendTime, setauctionendTime] = useState();

    const [remainingTime, setRemainingTime] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await dispatch(fetchAuctionDetails(id));
                console.log(res);
                setauctionendTime(res.payload.endTime)
            } catch (error) {
                console.error('Error fetching auction details:', error.message);
            }
        };

        fetchData();
    }, [dispatch, id]);

    useEffect(() => {
        if (auctionendTime) {
            const intervalId = setInterval(() => {
                const currentTime = new Date();
                const endDate = auctionendTime.toDate();
                const timeDifference = endDate - currentTime;

                if (timeDifference > 0) {
                    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
                    setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
                } else {
                    setRemainingTime('Auction ended');
                    clearInterval(intervalId);
                }
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [auctionendTime]);




    if (loading) {
        return <div className="">
            <Chip
                className='text-gray absolute top-0 right-0'
                startContent={<ClockSVG size={18} />}
                variant="faded"
                color="default"
            >Loading...
            </Chip>
        </div>
    }

    if (error) {
        return <div className="">
            <Chip
                className='text-gray absolute top-0 right-0'
                startContent={<ClockSVG size={18} />}
                variant="faded"
                color="default"
            >
                Error: {error}
            </Chip>
        </div>
    }

return (
    <div className="">
        <Chip

            className='text-gray absolute top-0 right-0'
            startContent={<ClockSVG size={18} />}
            variant="faded"
            color="default"
        >{remainingTime}
        </Chip>
    </div>
);
};

export default Clock;



// Prop validation
Clock.propTypes = {
    vehicle: PropTypes.object.isRequired,
};
