import './App.css'
import { useState, useEffect } from 'react'
import { UserType } from './types/userTypes';
import UsersList from './components/UsersList';

const sampleData: UserType[] = [
  { id: "1", rank: 1, name: "John Doe", email: "john.doe@example.com", friends: ["2", "3", "4"], image: 'https://picsum.photos/200' },
  { id: "2", rank: 2, name: "Jane Smith", email: "jane.smith@example.com", friends: ["1", "3"], image: 'https://picsum.photos/200' },
  { id: "3", rank: 3, name: "Alex Johnson", email: "alex.johnson@example.com", friends: ["1", "2"], image: 'https://picsum.photos/200' },
  { id: "4", rank: 4, name: "Sarah Williams", email: "sarah.williams@example.com", friends: ["1"], image: 'https://picsum.photos/200' },
  { id: "5", rank: 5, name: "Michael Brown", email: "michael.brown@example.com", friends: [], image: 'https://picsum.photos/200' },
  { id: "6", rank: 6, name: "Emily Davis", email: "emily.davis@example.com", friends: [], image: 'https://picsum.photos/200' },
  { id: "7", rank: 7, name: "Christopher Wilson", email: "christopher.wilson@example.com", friends: [], image: 'https://picsum.photos/200' },
];

export default function App() {
    const [users, setUsers] = useState<UserType[]>([])

    useEffect(() => {
      // mock api request (in reality would await sampleData using fetch or axios)
     const fetchData = async () => {
        try {
          const response = await sampleData;
          const formattedData = response.map((user) => formatUser(user, sampleData));
          setUsers(formattedData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchData();
    }, []);

    const formatUser = (user: UserType, allUsers: UserType[]) => {
      //map across user friends returning the name of the id
      const friendNames = user.friends.map((friendId) =>
        allUsers.find((u) => u.id === friendId)?.name || ''
      );
      
      //go across friends and return the highest rank 
      const highestRankingFriend = user.friends.reduce((highestRankingId, friendId) => {
        const friend = allUsers.find((u) => u.id === friendId);
        return friend && friend.rank > (allUsers.find((u) => u.id === highestRankingId)?.rank || 0)
          ? friend.id
          : highestRankingId;
      }, '');
  
      return {
        ...user,
        friendNames,
        highestRankingFriend,
      };
    };

  return (
    <>
      {users.length && <UsersList users={users} />}
      {!users.length && <> Loading... </> }
    </>
  );
}



