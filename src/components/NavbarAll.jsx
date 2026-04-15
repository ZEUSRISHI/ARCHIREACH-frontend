import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { FirmProfileHeader } from './FirmProfileHeader';
import { ClientProfileHeader } from './ClientProfileHeader';
import Navbar from './Navbar';
import { DashboardHeader } from './DashboardHeader';

/**
 * Navbarall Component
 * 
 * Conditionally renders different headers based on the user's type:
 * - If usertype is 'firm', renders FirmProfileHeader
 * - If usertype is 'client', renders ClientProfileHeader
 * - Otherwise (guest or other types), renders the default Navbar
 * 
 * @param {Object} props - Props to be passed to the underlying components
 */
const NavbarAll = (props) => {
    const { user } = useAuth();
    const userType = user?.userType;

    // Conditionally render based on userType
    if (userType === 'firm' || userType === 'client') {
        return <DashboardHeader {...props} />;
    } else {
        // Default Navbar for guests or other user types (student, architect, etc.)
        return <Navbar {...props} />;
    }
};

export default NavbarAll;
