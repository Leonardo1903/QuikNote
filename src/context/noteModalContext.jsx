import { createContext, useContext, useState } from "react";

const NoteModalContext = createContext();

export const useNoteModal = () => useContext(NoteModalContext);

export const NoteModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const openModal = (note = null) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  const openNewNoteModal = () => {
    openModal(null);
  };

  const openEditNoteModal = (note) => {
    openModal(note);
  };

  const contextData = {
    isModalOpen,
    selectedNote,
    openModal,
    closeModal,
    openNewNoteModal,
    openEditNoteModal,
  };

  return (
    <NoteModalContext.Provider value={contextData}>
      {children}
    </NoteModalContext.Provider>
  );
};
