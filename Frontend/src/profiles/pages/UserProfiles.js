import React from "react";
import { useParams } from "react-router-dom";

import ProfileList from "../components/ProfileList";

const DUMMY_PROFILES = [
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
];

const UserProfiles = () => {
  const userId = useParams().userId;
  const loadedProfiles = DUMMY_PROFILES.filter(
    (profile) => profile.creator === userId
  );
  return <ProfileList items={loadedProfiles} />;
};

export default UserProfiles;
