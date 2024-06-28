import { Card, CardBody, Image } from "@nextui-org/react";
import { FaStar } from "react-icons/fa";
import PropTypes from 'prop-types';

const FeaturedCard = ({ title, price, image, location, date, mileage, fuelType, transmission, bodyType, color, description }) => {
  return (
    <Card className="mx-2">
      <CardBody className="p-0">
        <div className="relative">
          <Image
            alt="Car"
            className="object-cover"
            height={360}
            width={520}
            shadow="md"
            src={image}
          />
          <div className="rounded-md inline-flex justify-center text-white absolute top-0 left-0 z-10 bg-primary-700 items-center m-2 p-1">
            <FaStar />
            <p className='m-1'>Featured</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

FeaturedCard.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  location: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  mileage: PropTypes.number,
  fuelType: PropTypes.string,
  transmission: PropTypes.string,
  bodyType: PropTypes.string,
  color: PropTypes.string,
  description: PropTypes.string,
};

export default FeaturedCard;