import { useSelector } from "react-redux";
import { useState } from "react";
const SessionUserCheck = () => {

  
  const SessionUser = useSelector(state => state.session.user);

  const BlankUser = {
    email: "",
    username: "", 
    _id: ""
  }
  
  let user

  if (SessionUser) {
    user = SessionUser;
  } else {
    user = BlankUser
  }

  return (
    user
  )

}
export default SessionUserCheck