import './userList.css'
import { useState } from 'react';
import User from './User';
import { UserType } from '../types/userTypes';

interface UsersPageProps {
    users: UserType[]
}

const UsersList = (props: UsersPageProps) => {
  const { users } = props;
  const [selectedUserId, setSelectedUserId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const filterUsers = (user: UserType) => {
    const query = searchQuery.toLowerCase();

    // Check if the user's name, ID, or friend's ID matches the search query
    return (
      user.name.toLowerCase().includes(query) ||
      user.id.toString().includes(query) ||
      user.friends.some((friendId) => friendId.toString().includes(query))
    );
  };

  const filteredUsers = users.filter(filterUsers);

  return (
    <div >
      <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search users" className="user-search-bar"/>
      <div className="user-list">
      {filteredUsers.map((user) => (
        <User
          key={user.id}
          user={user}
          onClick={handleUserClick}
          isSelected={selectedUserId === user.id}
        />
      ))}
      </div>
    </div>
  );
};

export default UsersList;
