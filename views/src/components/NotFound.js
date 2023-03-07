import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default  function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }, [navigate]);
  return <h2 className="text-center m-5">404 Not Found</h2>;
};


