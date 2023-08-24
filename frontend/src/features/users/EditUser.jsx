import { useParams } from "react-router-dom";
import { useGetUsersQuery } from "./UsersApiSlice";
import EditUserForm from "./EditUserForm";
import PulseLoader from "react-spinners/PulseLoader";


const EditUser = () => {
  const { id } = useParams();
  const { user } = useGetUsersQuery("userList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

    if (!user) return <PulseLoader color={"#FFF"} />;
  const content = user && <EditUserForm user={user} /> ;

  return content;
};
export default EditUser;
