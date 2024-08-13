import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTimes } from '@fortawesome/free-solid-svg-icons';

interface ReferralProps {
    onClose: () => void;
}

const Referral: React.FC<ReferralProps> = ({ onClose }) => {
    const [copied, setCopied] = useState(false);
    const referralLink = 'https://directorysf.com/?referralCode=YOURCODE';

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Invite a friend</h2>
                    <button onClick={onClose} className="text-black bg-transparent border border-gray-400 rounded-lg p-2 hover:text-gray-700">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <p className="mb-4 text-sm text-gray-600">
                    Only refer people you know, trust, and would be willing to live with yourself.
                </p>
                <div className="flex items-center bg-gray-100 p-2 rounded">
                    <input
                        type="text"
                        value={referralLink}
                        readOnly
                        className="flex-grow bg-transparent outline-none"
                    />
                    <button
                        onClick={copyToClipboard}
                        className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                    >
                        <FontAwesomeIcon icon={faCopy} />
                    </button>
                </div>
                {copied && (
                    <p className="mt-2 text-sm text-green-600">Copied to clipboard!</p>
                )}
            </div>
        </div>
    );
};

export default Referral;
