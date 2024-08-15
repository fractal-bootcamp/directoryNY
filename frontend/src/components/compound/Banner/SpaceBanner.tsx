const SpaceBanner = () => {
  return (
    <div className="flex flex-col p-4 border border-2 rounded-lg bg-[#F7FCEF] gap-2 m-6">
      <div className="text-md lg:text-base font-bold">
        🏡 Have a co-living space, sublet, or vacant room?
      </div>
      <div className="text-sm lg:text-base ">
        Add your space to be discovered by people looking for housing.
      </div>
      <button className="bg-[#519F69] text-xs text-white p-3 rounded-3xl w-fit px-4">
        Add my space
      </button>
      {/* {userSpaceListings.length > 0 ? <EditSpaceArea /> : <SpaceListingCreateButton clickHandler={handleCreateSpaceClick} />}
        {createFormVisible ? <SpaceListingCreateForm /> : null} */}
    </div>
  );
};

export default SpaceBanner;
