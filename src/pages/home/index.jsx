import React from "react";

const Home = ({ getUser, username, users }) => {
  return (
    <div>
      <h1>Welcome to home, {username}</h1>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
