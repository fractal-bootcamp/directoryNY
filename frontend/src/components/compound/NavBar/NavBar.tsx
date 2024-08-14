import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import UserDropdown from "./UserDropdown";
import HousingForm from '../../base/HousingForm';
import Referral from '../../base/Referral';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const [showHousingForm, setShowHousingForm] = useState(false);
  const [showReferralForm, setShowReferralForm] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-primary">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Directory NY logo */}
        <div className="flex-shrink-0">

          <span className="text-xl font-bold">Directory NY</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded-full hover:bg-black"
            onClick={() => setShowHousingForm(true)}
          >
            <FontAwesomeIcon icon={faHouse} className="mr-2" />
            Help Me find housing
          </button>
          <button
            className="px-4 py-2 bg-black text-white rounded-full hover:bg-green-600"
            onClick={() => setShowReferralForm(true)}
          >
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            Invite a friend
          </button>
          <UserDropdown />
        </div>
      </div>
      <div className="border-t border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex space-x-4 py-3">
            <Link to="/" className="px-4 py-2 text-gray-600 bg-transparent hover:text-gray-900 border-b-2 border-gray-200 hover:border-gray-900">People</Link>
            <Link to="/spaces" className="px-4 py-2 text-gray-600 bg-transparent hover:text-gray-900 border-b-2 border-gray-200 hover:border-gray-900">Rooms</Link>
            <Link to="/map" className="px-4 py-2 text-gray-600 bg-transparent hover:text-gray-900 border-b-2 border-gray-200 hover:border-gray-900">Map View</Link>
          </div>
        </div>
      </div>
      {showHousingForm && (
        <HousingForm onClose={() => setShowHousingForm(false)} />
      )}
      {showReferralForm && (
        <Referral onClose={() => setShowReferralForm(false)} />
      )}
    </nav>
  );
}