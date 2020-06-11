import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProfileList from "../components/ProfileList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

/* const DUMMY_PROFILES = [
  {
    id: "p1",
    title: "HiQ Innovation Lab in Norrköping",
    description: "One of the most famous place in the world!",
    imageUrl: "/Images/hiq-location_norrkoping.jpg",
    address: "Laxholmstorget 3",
    creator: "u1",
  },
  {
    id: "p2",
    title: "HiQ Innovation Lab in Linköping",
    description: "One of the most famous place in the world!",
    imageUrl: "/Images/hiq-location_norrkoping.jpg",
    address: "Laxholmstorget 3",
    creator: "u2",
  },
]; */

const UserProfiles = () => {
  const [loadedProfiles, setLoadedProfiles] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/profiles/user/${userId}`
        );
        setLoadedProfiles(responseData.profiles);
      } catch (err) {}
    };
    fetchProfiles();
  }, [sendRequest, userId]);

  const profileDeletedHandler = (deletedProfileId) => {
    setLoadedProfiles((prevProfiles) =>
      prevProfiles.filter((profile) => profile.id !== deletedProfileId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedProfiles && (
        <ProfileList
          items={loadedProfiles}
          onDeleteProfile={profileDeletedHandler}
        />
      )}
    </React.Fragment>
  );
};

export default UserProfiles;
