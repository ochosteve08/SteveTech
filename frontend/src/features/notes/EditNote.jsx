import { useParams } from "react-router-dom";
import EditNoteForm from "./EditNoteForm";
import { useGetNotesQuery } from "./NotesApiSlice";
import { useGetUsersQuery } from "../users/UsersApiSlice";
import useAuth from "../../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";

const EditNote = () => {
  const { id } = useParams();
  const { isAdmin, isManager, username } = useAuth();
  const { note } = useGetNotesQuery("noteList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });
  let filteredUsers;
  if (isAdmin || isManager) {
    filteredUsers = [...users];
  } else {
    filteredUsers = users?.filter((user) => user.username === username);
  }

  if (!filteredUsers.length || !note) return <PulseLoader color={"#FFF"} />;

  const content = note && filteredUsers && (
    <EditNoteForm note={note} users={filteredUsers} />
  );

  return content;
};
export default EditNote;
