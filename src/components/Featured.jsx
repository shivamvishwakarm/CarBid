import FeaturedCard from './Card/FeaturedCard';
import car from '../assets/car.jpg';
import { useSelector, useDispatch } from 'react-redux';




// Dummy data array
const data = [
  {
    title: '2021 Toyota Corolla',
    price: 'N 5,000,000',
    image: car, // Replace with actual image path or URL
    location: 'Lagos, Nigeria',
    date: '2021',
    mileage: '50,000 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    color: 'Black',
    description: 'A reliable car suitable for all your needs.'
  },
  {
    title: '2021 Toyota Corolla',
    price: 'N 5,000,000',
    image: car, // Replace with actual image path or URL
    location: 'Lagos, Nigeria',
    date: '2021',
    mileage: '50,000 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    color: 'Black',
    description: 'A reliable car suitable for all your needs.'
  },
  {
    title: '2021 Toyota Corolla',
    price: 'N 5,000,000',
    image: car, // Replace with actual image path or URL
    location: 'Lagos, Nigeria',
    date: '2021',
    mileage: '50,000 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    color: 'Black',
    description: 'A reliable car suitable for all your needs.'
  },
  // Add more objects for additional cars as needed
];






const Featured = () => {


  const city = useSelector(state => state.vehicle.city);

  return (
    <>
      <h3 className='ml-10 my-4 font-semibold text-2xl'>Featured Cars in {city}</h3>

      <div className='flex flex-row ml-10'>
        {
          data.map((item, index) => (
            
            <FeaturedCard key={index} {...item} />
          ))
        }
      </div>
    </>
  )
}


export default Featured;
