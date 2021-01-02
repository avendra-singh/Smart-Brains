import React from 'react';
import'../Signin/Signin.css';
function Signin({userstate,logedin,logedout,login}) {
  if(userstate){
    return (
      <div id="nav">
        <p onClick={login} className="f3 link dim blac underline pa4 pointer">Login</p>
        <p  onClick={logedout} className="f3 link dim blac underline pa4 pointer">Register</p>
      </div>
    );
  }
  else{
   return(
    <p onClick={logedout} id="nav" className="f3 link dim blac underline pa4 pointer">Signout</p>
   );
  }
}

export default Signin;