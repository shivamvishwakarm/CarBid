
import PropTypes from 'prop-types';

const ClockSVG = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="gray" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 3.75V6.25L8 7.5" stroke="gray" strokeWidth="0.7" strokeLinecap="round" />
    </svg>
);

ClockSVG.propTypes = {
    size: PropTypes.number.isRequired
};

export default ClockSVG;
