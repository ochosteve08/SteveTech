import NewNoteForm from "./NewNoteForm";
import PulseLoader from "react-spinners/PulseLoader";
import { useGetUsersQuery } from "../users/UsersApiSlice";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";


const NewNote = () => {
    useTitle("NewNote");
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]) || [],
    }),
  });
  const { isAdmin, isManager, username } = useAuth();

  let filteredUsers;
  if (isAdmin || isManager) {
    filteredUsers = [...users];
  } else {
    filteredUsers = users?.filter((user) => user.username === username);
  }

  if (!filteredUsers?.length) return <PulseLoader color={"#FFF"} />;
  const content = filteredUsers && <NewNoteForm users={filteredUsers} />;

  return content;
};
export default NewNote;
