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
import { useLocation } from 'react-router-dom'; // Step 1: Import useLocation





const NavbarComponent = () => {
  const loggedIn = useSelector(state => state.auth.isLoggedIn);
  // const loggedIn = false;
  const location = useLocation(); // Step 2: Use useLocation to get the current path

  console.log(loggedIn);
  const profilePic = useSelector(state => state.auth.data.profilePicURL);
  const city = useSelector(state => state.vehicle.city);
  const dispatch = useDispatch();

  const checkIsActive = (href) => location.pathname === href;


  const handleLogout = () => {
    try {
      dispatch(logout());
    } finally {
      window.location.reload();
    }
  };


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
      // Global css is affecting this nav
      <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen} className=" mx-2"       classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }} >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden border-2 border-black"
        />

        <NavbarContent className="flex items-center" >
          <div className=" flex items-center ">


            <Logo />

            {/* <NavbarItem>
              <Link className="text-blue-600 mr-4 font-bold hover:underline focus:underline" color="foreground" href="/buyvehicle">
                Buy
              </Link>
            </NavbarItem> */}
          <NavbarItem isActive={checkIsActive("/vehiclelist")}>
  <Link className={`mx-2 ${checkIsActive("/vehiclelist") ? 'text-blue-600' : ''}`} color="foreground" href="/vehiclelist">
    Buy
  </Link>
</NavbarItem>
<NavbarItem isActive={checkIsActive("/sellvehicle")}>
  <Link className={`mx-2 ${checkIsActive("/sellvehicle") ? 'text-blue-600' : ''}`} color="foreground" href="/sellvehicle">
    Sell
  </Link>
</NavbarItem>
          </div>
          <NavbarContent className="flex items-center" />
          <div className="flex ">

            {/* conditional rendering user logged in or not */}
            {loggedIn ? (
              <>
                {/* <NavbarItem>
              <Link className="text-blue-600 mr-4 font-bold hover:underline focus:underline" color="foreground" href="/myvehicle">
                My Vehicles
              </Link>
            </NavbarItem> */}
                <NavbarItem className='mx-2'>
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


                  <SignIn />  {/* Signin component and it's a modal */}

                </NavbarItem>
                <NavbarItem className="mx-2  rounded-md px-4 py-2 text-white bg-blue-700 hover:bg-blue-500">


                  <SignUp /> {/* Signup component and it's a modal */}

                </NavbarItem>
              </>
            )}
          </div>
        </NavbarContent>

      </Navbar>
 
  );
};

export default NavbarComponent;


