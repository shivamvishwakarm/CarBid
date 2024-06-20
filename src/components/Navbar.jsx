import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Avatar, NavbarMenuToggle,Image } from "@nextui-org/react";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux/authSlice';
import SearchByCity from '../components/SearchByCity';
import logo from '../assets/logo/WhatsApp Image 2024-06-16 at 16.23.49_d16d42f4.jpg'
// import { PiCarProfile } from "react-icons/pi";
import { GoPersonFill } from "react-icons/go";


const NavbarComponent = () => {
  const loggedIn = useSelector(state => state.auth.isLoggedIn);
  const profilePic = useSelector(state => state.auth.data.profilePicURL);
  const city = useSelector(state => state.vehicle.city);
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      dispatch(logout());
    } finally {
      window.location.reload();
    }
  };


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className=" w-full">
      <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen} className="w-full">
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden w-full"
      />

      <NavbarContent className="w-full" >
        <div className=" flex items-center justify-between w-full">
          <div className="flex pr-5 items-center">
            <NavbarItem className="logo mr-4">
              <Image width={50} height={50} src={logo}/>
              
            </NavbarItem>
            {/* <NavbarItem>
          <Link className="text-blue-600 mr-4 font-bold hover:underline focus:underline" color="foreground" href="/buyvehicle">
            Buy
          </Link>
        </NavbarItem> */}
            <NavbarItem>
              <Link className="text-gray-600 mr-4 font-semibold " color="foreground" href="/vehiclelist">
                Buy
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link className="text-gray-600 mr-4 font-semibold " color="foreground" href="/sellvehicle">
                Sell
              </Link>
            </NavbarItem>

          </div>
          <div className=" flex">
            {loggedIn ? (
              <>
                {/* <NavbarItem>
              <Link className="text-blue-600 mr-4 font-bold hover:underline focus:underline" color="foreground" href="/myvehicle">
                My Vehicles
              </Link>
            </NavbarItem> */}
                <NavbarItem>
                  <SearchByCity />
                </NavbarItem>
                <NavbarItem>
                  <Button className="border mr-4 border-blue-900 text-blue-600 font-semibold" color="error" >
                    {city}
                  </Button>
                </NavbarItem>
                <NavbarItem>
                  <Link className="ml-2" color="foreground" href="/editprofile">
                    <Avatar src={profilePic} />
                  </Link>
                  {/* <GoPersonFill className="w-full h-full text-3xl text-blue-700" />  */}
                </NavbarItem>
              </>
            ) : (
              <>
                <NavbarItem>
                  <Link className="text-blue-600 font-semibold hover:underline focus:underline" color="foreground" href="/signin">
                    Login
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Link className="text-blue-600 font-semibold hover:underline focus:underline" color="foreground" href="/signup">
                    Sign Up
                  </Link>
                </NavbarItem>
              </>
            )}
          </div>
        </div>
      </NavbarContent>
    </Navbar>
    </div>
  );
};

export default NavbarComponent;
