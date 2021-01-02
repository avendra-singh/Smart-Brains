import React from 'react';
import Tilt from 'react-tilt'
import logo from'../Logo/logo.gif';
import '../Logo/Logo.css'
function Logo() {
  return (
    <div className="ma4 mt0">
      <Tilt className="Tilt br2 shadow-3" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner"><img src={logo }alt="logo" height="150px" width="150px"/></div>
      </Tilt>
    </div>
  );
}

export default Logo;