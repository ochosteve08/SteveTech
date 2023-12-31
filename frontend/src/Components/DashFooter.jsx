import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onGoHomeClicked = () => navigate("/dash");
  const { username, status,  } = useAuth();

  let goHomeButton = null;
  if (pathname !== "/dash") {
    goHomeButton = (
      <button
        className="dash-footer__button icon-button"
        title="Home"
        onClick={onGoHomeClicked}
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }
  const content = (
    <footer className="dash-footer">
      {goHomeButton}
      <p>
        Current User: <span className="user__footer">{username}</span>{" "}
      </p>
      <p>
        Status: <span className="user__footer">{status}</span>{" "}
      </p>
    </footer>
  );
  return content;
};

export default DashFooter;
