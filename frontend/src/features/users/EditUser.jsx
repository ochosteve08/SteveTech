// import { useParams } from "react-router-dom";
// import { useGetUsersQuery } from "./UsersApiSlice";
// import EditUserForm from "./EditUserForm";

// const EditUser = () => {
//   const { id } = useParams();

//   const { data: users, isFetching } = useGetUsersQuery();

//   const user = users?.entities[id];

//   let content;
//   if (isFetching && !user) {
//     content = <p>Loading...</p>;
//   } else if (user) {
//     content = <EditUserForm user={user} />;
//   } else {
//     content = <p>No user found</p>;
//   }

//   return content;
// };
// export default EditUser;

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./UsersApiSlice";
import EditUserForm from "./EditUserForm";

const EditUser = () => {
  const { id } = useParams();

  const user = useSelector((state) => selectUserById(state, id));

  const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>;

  return content;
};
export default EditUser;
