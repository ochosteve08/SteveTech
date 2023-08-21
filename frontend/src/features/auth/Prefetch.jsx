import store from "../../app/store";
import { NotesApiSlice } from "../notes/NotesApislice";
import { UsersApiSlice } from "../users/UsersApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
  
    const notes = store.dispatch(NotesApiSlice.endpoints.getNotes.initiate());
    const users = store.dispatch(UsersApiSlice.endpoints.getUsers.initiate());

    return () => {
     
      notes.unsubscribe();
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
};
export default Prefetch;
