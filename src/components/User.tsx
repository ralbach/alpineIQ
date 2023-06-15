import './user.css';
import React from 'react';
import { UserType } from '../types/userTypes';

interface UserProps {
    user: UserType,
    isSelected: boolean,
    onClick: (userId: string) => void
}

export const User = React.memo((props: UserProps) => {
  const { onClick, isSelected, user } = props;

  const handleClick = () => {
    onClick(user.id);
  };

  return (
    <div>
        <div 
            className={`user${isSelected ? '-selected' : ''}`}
            onClick={handleClick}>
                <img src={user.image} height="60px" width="60px" /> <br />
                Name:<div className="user-field" style={{fontWeight: "bold"}}> {user.name} < br/></div>
                Email: <div className="user-field">{user.email} < br/></div>
                Friends:<div>{user.friendNames && user.friendNames.length > 0 && <> <br />{user.friendNames?.map((friend) => {return <div className="friend"> { friend } </div>})} < br/></>}</div>
        </div>
    </div>
  )
});

export default User;