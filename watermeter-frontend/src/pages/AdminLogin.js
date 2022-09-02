import React from 'react';
import Header from '../components/Header';
import LoginPage from '../components/LoginPage';

const AdminLogin = (props) => {
    return (
      <div>
        <Header
          item1=""
          item2=""
          waterauthority="കേരള വാട്ടർ അതോറിറ്റി"
          item3=""
          item4="ബന്ധപെടുക "
        />
        <LoginPage logText="ഉദ്യോഗസ്ഥ ലോഗിൻ" page="/admin-home" admId="അഡ്മിൻ ഐഡി" />
      </div>
    );
}
export default AdminLogin;