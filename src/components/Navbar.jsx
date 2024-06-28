import { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Avatar, NavbarMenuToggle, Image } from "@nextui-org/react";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux/authSlice';
import SearchByCity from '../components/SearchByCity';
import Logo from './Utility/Logo'  // Logo component
// import { PiCarProfile } from "react-icons/pi";
import { GoPersonFill } from "react-icons/go";
import SignUp from './Signup';
import SignIn from './Signin';



const NavbarComponent = () => {
  const loggedIn = useSelector(state => state.auth.isLoggedIn);
  console.log(loggedIn);
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
         
             <Logo/>
 
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
          <div className="flex">

            {/* conditional rendering user logged in or not */}
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
                <NavbarItem className="mx-2 border border-blue-700 rounded-md px-4 py-2 text-blue-700 hover:text-blue-500">
               

                  <SignIn/>
              
                </NavbarItem>
                <NavbarItem className="mx-2  rounded-md px-4 py-2 text-white bg-blue-700 hover:bg-blue-500">
              

                  <SignUp/> {/* Signup component and it's modal */}
     
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


