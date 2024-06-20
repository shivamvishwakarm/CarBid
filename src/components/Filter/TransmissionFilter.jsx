import React from "react";
import { Checkbox } from "@nextui-org/react";

const TransmissionFilter = ({ filterCriteria, setFilterCriteria }) => {
  const transmissionTypes = [
    { label: "Automatic", value: "automatic" },
    { label: "Manual", value: "manual" },
  ];

  const handleCheckboxChange = (value, checked) => {
    setFilterCriteria((prevCriteria) => {
      let updatedTransmission;
      if (checked) {
        updatedTransmission = [...(prevCriteria.transmission || []), value];
      } else {
        updatedTransmission = (prevCriteria.transmission || []).filter(type => type !== value);
      }
  
      return {
        ...prevCriteria,
        transmission: updatedTransmission
      };
    });
  };

  return (
    <div className="flex flex-col">
      {transmissionTypes.map((transmission) => (
        <Checkbox
          key={transmission.value}
          isSelected={filterCriteria.transmission?.includes(transmission.value) || false}
          onChange={(event) => handleCheckboxChange(transmission.value, event.target.checked)}
        >
          {transmission.label}
        </Checkbox>
      ))}
    </div>
  );
};

export default TransmissionFilter;
