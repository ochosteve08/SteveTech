import store from "../../app/store";
import { NotesApiSlice } from "../notes/NotesApislice";
import { UsersApiSlice } from "../users/UsersApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
  
     store.dispatch(
       NotesApiSlice.util.prefetch("getNotes", "notesList", { force: true })
     );
     store.dispatch(
       UsersApiSlice.util.prefetch("getUsers", "usersList", { force: true })
     );

  }, []);

  return <Outlet />;
};
export default Prefetch;
