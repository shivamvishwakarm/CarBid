import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';
import Exploreby from '../components/Exploreby'

const Layout = ({ children }) => {
  return (
    <>
        <NavbarComponent />
        <Exploreby/>
        {children}
        <Footer />
      </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
