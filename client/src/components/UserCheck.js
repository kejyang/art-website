import React, {useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const UserCheck = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  /* if (isLoading) {
    return <div>Loading ...</div>;
  } */

  useEffect(()=>{
    if (isAuthenticated){
      axios
        .post("api/v1/users", { user: { artist:"test@gmail.com", profile_pic:"", description:"" } })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },[isAuthenticated]);
  
  

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default UserCheck;