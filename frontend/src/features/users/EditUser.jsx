import { useParams } from "react-router-dom";
import { useGetUsersQuery } from "./UsersApiSlice";
import EditUserForm from "./EditUserForm";

const EditUser = () => {
  const { id } = useParams();
  const { user } = useGetUsersQuery("userList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  console.log(user);
  const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>;

  return content;
};
export default EditUser;
