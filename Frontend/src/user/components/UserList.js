import React from "react";

import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import "./UsersList.css";

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No Users Found.!</h2>
        </Card>
      </div>
    );
  }

  return (
    <il className="users-list">
      {[...props.items]
        .sort((a, b) => {
          if (a.wins < b.wins) {
            return 1;
          } else if (a.wins > b.wins) {
            return -1;
          }

          return 0;
        })
        .map((user) => (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            winCount={user.wins}
          />
        ))}
    </il>
  );
};

export default UsersList;
