/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useGetNotesQuery } from "./NotesApislice";
import { memo } from "react";
import PulseLoader from "react-spinners/PulseLoader";

const Note = ({ noteId }) => {
  const navigate = useNavigate();

  const { note, isLoading } = useGetNotesQuery("noteList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId],
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
  if (note) {
    const created = new Date(note.createdAt).toLocaleString("en-NG", {
      day: "numeric",
      month: "long",
    });
    const updated = new Date(note.updatedAt).toLocaleString("en-NG", {
      day: "numeric",
      month: "long",
    });
    const handleEdit = () => navigate(`/dash/notes/${noteId}`);

    return (
      <tr className="table__row ">
        <td className="table__cell note__status">
          {note.completed ? (
            <span className="note__status--completed">Completed</span>
          ) : (
            <span className="note__status--open">Open</span>
          )}
        </td>
        <td className="table__cell note__created">{created}</td>
        <td className="table__cell note__updated">{updated}</td>
        <td className="table__cell note__title">{note.title}</td>
        <td className="table__cell note__username">{note.username}</td>
        <td className="table__cell">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

const memoizedNote = memo(Note);

export default memoizedNote;
