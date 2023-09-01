/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "./UsersApiSlice";
import { memo } from "react";
import PulseLoader from "react-spinners/PulseLoader";

const User = ({ userId }) => {
  const navigate = useNavigate();
  const { user, isLoading } = useGetUsersQuery("userList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
      isLoading: !data,
    }),
  });
  if (isLoading) {
    return (
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
  }

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);
    const userRolesString = user.roles.toString().replaceAll(",", ", ");
    const cellStatus = user.active ? "" : "table__cell--inactive";

    return (
      <tr className="table__row user">
        <td className={`table__cell ${cellStatus}`}>{user.username}</td>
        <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
        <td className={`table__cell ${cellStatus}`}>
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

const memoizedUser = memo(User);
export default memoizedUser;
