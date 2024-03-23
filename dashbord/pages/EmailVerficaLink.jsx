import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const EmailVerficaLink = () => {
  const perams = useParams();

  useEffect(() => {
    async function verify() {
      const data = await axios.post(
        "http://localhost:8000/api/v1/auth/emailLink",
        {
          email: perams.token,
        }
      );
      console.log(data);
    }
    verify();
  }, []);
  return (
    <div>
      <h1>email</h1>
    </div>
  );
};

export default EmailVerficaLink;
