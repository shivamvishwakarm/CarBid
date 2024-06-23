// import { useEffect, useState } from 'react';

// const useCurrentCity = () => {
//   const [city, setCity] = useState('');

//   useEffect(() => {
    
//    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyDUg8BNNbzNfllCLg1h60ugBH6e151Ft0o').then((res)=>(res.json())).then(((r=>(console.log(r)))))            

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // Empty dependency array ensures useEffect runs only once on component mount

//   return city;
// };

// export default useCurrentCity;



// Todo: create hook to get current city

import { useState, useEffect } from 'react';

const useUserLocation = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    const handleSuccess = async (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
      await fetchCity(latitude, longitude);
    };

    const handleError = (error) => {
      setError(error.message);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  const fetchCity = async (latitude, longitude) => {
    // Replace YOUR_API_KEY with your actual API key and adjust the URL to the API you're using
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDaJmHG1L3O3bRrO8lHWun8imFYBmgxdoE`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const addressComponents = data.results[0].address_components;
      const cityObj = addressComponents.find(component => component.types.includes('locality'));
      setCity(cityObj ? cityObj.long_name : 'Unknown location');
    } catch (error) {
      setError('Failed to fetch city name');
    }
  };

  return { location, city, error };
};

export default useUserLocation;