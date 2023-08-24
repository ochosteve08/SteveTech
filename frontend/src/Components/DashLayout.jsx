import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";
import { useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";

const DashLayout = () => {
  const isLoggingOut = useSelector((state) => state.auth.isLoggingOut);
  let content;

  

  if (isLoggingOut) {
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
  } else {
    content = (
      <div className="dash-container">
        <Outlet />
      </div>
    );
  }

  return (
    <>
      <DashHeader />
      {content}
      <DashFooter />
    </>
  );
};

export default DashLayout;
