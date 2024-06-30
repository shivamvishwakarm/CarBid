import React, { useState } from 'react';
import { Button, Spacer } from '@nextui-org/react';
import { TextField, Checkbox, FormControlLabel } from '@mui/material';
import {Grid} from '@mui/material';


const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [useSameLocation, setUseSameLocation] = useState(false);

  const dates = [
    { day: 'MON', date: 12, status: 'Free' },
    { day: 'TUE', date: 13, status: 'Free' },
    { day: 'WED', date: 14, status: 'Free' },
    { day: 'THU', date: 16, status: 'Free' },
    { day: 'FRI', date: 17, status: 'Free' },
    { day: 'SAT', date: 18, status: 'Free' },
    { day: 'SUN', date: 19, status: 'Free' },
    { day: 'MON', date: 20, status: 'Free' },
    { day: 'TUE', date: 21, status: 'Free' },
  ];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div >
      <Grid container>
        <Grid item>
          <h2>Select date</h2>
        </Grid>
      </Grid>
      <Spacer y={1} />
      <Grid container gap={2}>
        {dates.map((dateInfo, index) => (
          <Grid item xs={2} key={index}>
            <Button
              color="primary"
              className="hover:bg-[#FAFAFA] w-full h-full"
              variant={selectedDate === dateInfo.date ? 'contained' : 'outlined'}
              onClick={() => handleDateSelect(dateInfo.date)}
            >
              <div>
                {dateInfo.day}
                <br />
                <span className="text-xl">{dateInfo.date}</span>
                <br />
                ₹{dateInfo.status}
              </div>
            </Button>
          </Grid>
        ))}
      </Grid>
      <Spacer y={2} />
      <div>
      <h2 className='my-2'>Select time</h2>
        <TextField
          fullWidth
          select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          SelectProps={{ native: true }}
          variant="outlined"
         
        >
          <option value="">Select time</option>
          <option value="10:00">10:00 AM</option>
          <option value="11:00">11:00 AM</option>
          <option value="12:00">12:00 PM</option>
          <option value="1:00">1:00 PM</option>
          <option value="2:00">2:00 PM</option>
        </TextField>
      </div>
      <Spacer y={2} />
      <div>
        <h2 className='my-2'>Pickup location</h2>
        <TextField
          fullWidth
          placeholder="Enter address"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          variant="outlined"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={useSameLocation}
              onChange={(e) => setUseSameLocation(e.target.checked)}
            />
          }
          label="Use the same as the car location"
        />
      </div>
      
    </div>
  );
};

export default DatePicker;
