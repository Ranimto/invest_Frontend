import { getFirebaseToken } from '../../firebaseinit';
import React, { useState, useEffect } from "react";

const Notifications = (props) => {
  const [isTokenFound, setTokenFound] = useState(false);

  console.log("Token found", isTokenFound);

  // To load once
  useEffect(() => {
    async function tokenFunc() {
      const token = await getFirebaseToken();
      if (token) {
        console.log("Token is", token);
        setTokenFound(true);
      } else {
        setTokenFound(false);
      }
    }

    tokenFunc();
  }, []);

  return <></>;
};

Notifications.propTypes = {};

export default Notifications;
