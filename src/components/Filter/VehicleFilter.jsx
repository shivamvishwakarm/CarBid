import React, { useEffect } from "react";
import { Checkbox } from "@nextui-org/react";
import {RadioGroup, Radio} from "@nextui-org/react";

const CarType = ({ filterCriteria, setFilterCriteria }) => {
  const vehicleTypes = [
    { label: "Car", value: "car" },
    { label: "Scooter", value: "scooty" },
    { label: "Bike", value: "bike" }
  ];

  const handleRadioChange = (value) => {

    setFilterCriteria((prevCriteria) => {
      let updatedTypes;

      updatedTypes = {
        ...prevCriteria,
        vehicleType:  value
      }
return updatedTypes



    
})};

  useEffect(() => {
    vehicleTypes.forEach((type) => {
      document.getElementById(type.value).checked =
        filterCriteria.vehicleType?.includes(type.value) || false;
    });
  }, [filterCriteria]);

  return (
    <RadioGroup
     className="flex flex-col"
   

     >
      {vehicleTypes.map((vehicleType) => (
        <Radio
         key={vehicleType.value}
          value={vehicleType.value}
        id={vehicleType.value}
        onChange={(e) => handleRadioChange(e.target.value)}
        >
          {vehicleType.label}
        </Radio>
      ))}
    </RadioGroup>
  );
};

export default CarType;
