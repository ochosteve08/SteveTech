import { useParams } from "react-router-dom";
import { useGetUsersQuery } from "./UsersApiSlice";
import EditUserForm from "./EditUserForm";
import PulseLoader from "react-spinners/PulseLoader";
import useTitle from "../../hooks/useTitle";

const EditUser = () => {
  useTitle("EditUser");
  const { id } = useParams();
  const { user } = useGetUsersQuery("userList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  if (!user)
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
  const content = user && <EditUserForm user={user} />;

  return content;
};
export default EditUser;
