import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUsers } from "../../logic/api";

const Users: React.FC = () => {
  const { data = [] } = useQuery({ queryFn: getUsers, queryKey: ["users"] });

  return (
    <div>
      <h1>Users</h1>
      {data?.map((user, index) => (
        <div key={index}>
          <h2>{user.email}</h2>
        </div>
      ))}
    </div>
  );
};

export default Users;
