import React from "react";

import Card from "../../shared/components/UIElements/Card";
import ProfileItem from "./ProfileItem";
import Button from "../../shared/components/FormElements/Button";
import "./ProfileList.css";

const ProfileList = (porps) => {
  if (porps.items.length === 0) {
    return (
      <div className="profile-list center">
        <Card>
          <h2>No Profile is found. Go back to home page!</h2>
          <Button to="/">HOME</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="profile-list">
      {porps.items.map((profile) => (
        <ProfileItem
          key={profile.id}
          id={profile.id}
          image={profile.image}
          title={profile.title}
          description={profile.description}
          address={profile.address}
          creatorId={profile.creator}
          onDelete={porps.onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default ProfileList;
