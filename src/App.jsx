import "./App.css";
import {
  DashBoard,
  Home,
  Login,
  SignUp,
  Favorites,
  Trash,
  Notebook,
  Profile,
} from "./pages";
import { PrivateRoutes, NoteModal } from "./components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "@/context/authContext";
import { NotesProvider } from "@/context/notesContext";
import { NoteModalProvider, useNoteModal } from "@/context/noteModalContext";
import { ThemeProvider } from "@/context/themeContext";
import { Toaster } from "@/components/ui/sonner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/dashboard",
        element: <DashBoard />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/trash",
        element: <Trash />,
      },
      {
        path: "/notebook",
        element: <Notebook />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

function AppContent() {
  const { isModalOpen, closeModal, selectedNote } = useNoteModal();

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
      <NoteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        note={selectedNote}
      />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotesProvider>
          <NoteModalProvider>
            <AppContent />
          </NoteModalProvider>
        </NotesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
