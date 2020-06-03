import React from "react";

import UsersList from "../components/UserList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Tony Homsi",
      image: "/Images/1.png.jpg",
      wins: 5,
    },
    {
      id: "u2",
      name: "Dennis",
      image: "/Images/1.png.jpg",
      wins: 7,
    },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
