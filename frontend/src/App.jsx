import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Public from "./Components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./Components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList"
import EditUser from "./features/users/EditUser";
import NewUser from "./features/users/NewUser";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />

          <Route path="users">
            <Route index element={<UsersList />} />
            <Route path=":id" element={<EditUser />} />
            <Route path="new" element={<NewUser />} />
          </Route>

          <Route path="notes">
            <Route index element={<NotesList />} />
            <Route path=":id" element={<EditNote />} />
            <Route path="new" element={<NewNote />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
