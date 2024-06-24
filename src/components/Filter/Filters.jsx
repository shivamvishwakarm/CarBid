import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchVehiclesByFilter } from '../../Redux/vehicleSlice.js';
import CarType from '../Filter/VehicleFilter.jsx';
import FuleType from './FuleFilter.jsx';
import BrandsFilter from './BrandsFilter.jsx';
import TransmissionFilter from './TransmissionFilter.jsx';
import PriceRangeSlider from './PriceRangeSlider.jsx';
import DistanceFilter from './DistanceFilter.jsx';
import { Button, Card, CardBody } from '@nextui-org/react';
import { Accordion, AccordionItem } from "@nextui-org/react";


const AddSVG = () => {

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12H20" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 4L12 20" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
    </svg>


  )
}






const Filters = () => {

  const dispatch = useDispatch();
  const [filterCriteria, setFilterCriteria] = useState({
    vehicleType: [],
    fuelType: [],
    brand: [],
    transmission: [],
    maxPrice: undefined,
    minPrice: undefined,
    distanceTraveled: []
  });

  useEffect(() => {
    const fetchVehicles = async () => {
      dispatch(fetchVehiclesByFilter(filterCriteria));
    };

    fetchVehicles();
  }, [filterCriteria, dispatch]);

  const clearFilters = () => {
    setFilterCriteria({
      vehicleType: [],
      fuelType: [],
      brand: [],
      transmission: [],
      maxPrice: 1000,
      minPrice: 0,
      distanceTraveled: []
    });
  };







  return (
    <Card radius='none' className="max-w-lg mx-auto m-4 p-4">
      <div className='flex flex-row justify-between'>
        <h2 className='text-primaryColor text-sm font-medium leading-6'> Filter</h2>
        <p onClick={() => { clearFilters }} className='text-gray'>Clear all</p>
      </div>

      <Accordion defaultExpandedKeys={["2"]}>
        <AccordionItem
          key="1"
          aria-label="Vehicle"
          indicator={<AddSVG />}
          title="Vehicle"
        >
          <CarType filterCriteria={filterCriteria} setFilterCriteria={setFilterCriteria} />
        </AccordionItem>

        <AccordionItem key="2" aria-label="Fuel Type" indicator={<AddSVG />} title="Fuel Type">
          <FuleType filterCriteria={filterCriteria} setFilterCriteria={setFilterCriteria} />
        </AccordionItem>

        <AccordionItem key="3" aria-label="Brands" indicator={<AddSVG />} title="Brands">
          <BrandsFilter filterCriteria={filterCriteria} setFilterCriteria={setFilterCriteria} />
        </AccordionItem>

        <AccordionItem key="4" aria-label="Transmission" indicator={<AddSVG />} title="Transmission">
          <TransmissionFilter filterCriteria={filterCriteria} setFilterCriteria={setFilterCriteria} />
        </AccordionItem>

        <AccordionItem key="5" aria-label="Price Range" indicator={<AddSVG />} title="Price Range" >
          <PriceRangeSlider filterCriteria={filterCriteria} setFilter={setFilterCriteria} />
        </AccordionItem>

        <AccordionItem key="6" aria-label="Distance Traveled" indicator={<AddSVG />} title="Distance Traveled">
          <DistanceFilter filterCriteria={filterCriteria} setFilterCriteria={setFilterCriteria} />
        </AccordionItem>

      </Accordion>


    </Card>
  )






};

export default Filters;
