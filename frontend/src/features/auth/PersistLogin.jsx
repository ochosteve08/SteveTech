/* eslint-disable no-undef */
import { Outlet,  Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist.js";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import PulseLoader from "react-spinners/PulseLoader";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          //const response =
          await refresh();
          //const { accessToken } = response.data
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    // persist: no

    content = <Outlet />;
  } else if (isLoading) {
    //persist: yes, token: no

    content = (
      <PulseLoader
        className="dash-container"
        style={{
          justifyContent: "center",
          alignItems: "center",
          margin: "100px auto",
        }}
        color={"#FFF"}
      />
    );
  } else if (isError) {
    //persist: yes, token: no

    content = (
      <p className="errmsg">
        {`${error.data?.message} -- `}
        <Navigate to="/login" />
      
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes

    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes

    content = <Outlet />;
  }

  return content;
};
export default PersistLogin;
