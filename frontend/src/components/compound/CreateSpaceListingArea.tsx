import React from 'react';
import { SpaceListingCreateForm } from './SpaceListingCreateForm';

interface CreateSpaceListingAreaProps {
    onNewListing: () => void;
}

export const CreateSpaceListingArea: React.FC<CreateSpaceListingAreaProps> = ({ onNewListing }) => {
    return (
        <div>
            {/* <SpaceListingCreateForm onSuccess={onNewListing} /> */}
        </div>
    );
};

// TODO: REMOVE