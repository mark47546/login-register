import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import '../styles/facebook.css'

function Facebook() {

  const [login, setLogin] = useState(false);

  const responseFacebook = (response) => {
    console.log(response);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }

  return ( 
    <div className='f-button'>
        
            <FacebookLogin
            appId="618207266638899"
            autoLoad={true}
            scope="public_profile,user_friends"
            callback={responseFacebook}
            icon="fa-facebook" />
        
    </div>
  );
}

export default Facebook;