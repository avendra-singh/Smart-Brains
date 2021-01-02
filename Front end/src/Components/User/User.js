import React from'react'
const User=({user})=>{
return(
        <div>
            <h1 className="center">hello {user.name} your count is {user.entries}!!</h1>
        </div>
);
}

export default User;