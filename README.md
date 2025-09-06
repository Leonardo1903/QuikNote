# QuikNote

<div align="center">

**A full-stack sticky notes application for a seamless, intuitive, and personal note-taking experience.**

QuikNote allows users to securely sign in, manage their personal dashboard, and organize their thoughts with an elegant drag-and-drop interface. Built with a modern tech stack for a fast and responsive experience.

<p>
  <img src="https://img.shields.io/github/last-commit/Leonardo1903/QuikNote?style=for-the-badge" alt="last commit">
  <img src="https://img.shields.io/github/stars/Leonardo1903/QuikNote?style=for-the-badge" alt="stars">
</p>

[**Live Demo**](https://quiknote.leonardo1903.me/)

</div>

<p align="center">
  <img src="https://github.com/user-attachments/assets/ff9a352f-52cd-4aae-a303-a8d59eaf4db1" alt="QuikNote App Demo" width="80%">
</p>

---

## ✨ Core Features

-   **🔐 Secure User Authentication**: Safe and secure login and registration system powered by Appwrite.
-   **🎨 Personalized Dashboard**: Each user gets their own dedicated space to manage their notes.
-   **✏️ Full CRUD Functionality**: Easily Create, Read, Update, and Delete notes.
-   **🖐️ Drag & Drop Interface**: Intuitively organize your notes by dragging and dropping them, powered by Framer Motion.

## 🛠️ Tech Stack

| Category      | Technologies                                                                                                                                                                                                |
| :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Client** | ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black) ![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white) ![Shadcn/UI](https://img.shields.io/badge/shadcn/ui-000000?logo=shadcnui&logoColor=white) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white) |
| **Backend** | ![Appwrite](https://img.shields.io/badge/-Appwrite-F02E65?logo=appwrite&logoColor=white)                                                                                                                      |

## 📸 Screenshots

| Landing Page                                                                                                              | Notes Dashboard                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/b5998adf-db9f-4761-a9b5-7563bcab01c7" alt="Landing Page Screenshot"> | <img src="https://github.com/user-attachments/assets/ff9a352f-52cd-4aae-a303-a8d59eaf4db1" alt="Dashboard Screenshot"> |

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   An **[Appwrite](https://appwrite.io/) account** (you can use the free Appwrite Cloud tier).

### 1. Set up Your Appwrite Backend

Before running the app, you need to configure your Appwrite project.

1.  Go to your [Appwrite Console](https://cloud.appwrite.io/) and create a new project.
2.  **Create a Database**: Navigate to the "Databases" tab and create a new database.
3.  **Create a Collection**: Inside your new database, create a collection to store the notes. You will need to define attributes for your notes (e.g., `title`, `content`, `user_id`).
4.  **Find Your IDs**: Keep the following IDs handy:
    -   Your **Project ID** (from Settings)
    -   Your **Database ID** (from the Databases tab)
    -   Your **Collection ID** (from the collection you just created)

### 2. Configure Environment Variables

1.  In the root directory of the project, create a new file named `.env`.
2.  Copy the contents of `.env.example` (if available) or add the following variables, replacing the placeholders with your actual Appwrite IDs.

    ```env
    VITE_APPWRITE_URL="[https://cloud.appwrite.io/v1](https://cloud.appwrite.io/v1)"
    VITE_APPWRITE_PROJECT_ID="YOUR_PROJECT_ID"
    VITE_APPWRITE_DATABASE_ID="YOUR_DATABASE_ID"
    VITE_APPWRITE_COLLECTION_ID="YOUR_COLLECTION_ID"
    ```
    *Note: The `VITE_APPWRITE_URL` is typically the one shown above for Appwrite Cloud.*

### 3. Install and Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Leonardo1903/QuikNote.git](https://github.com/Leonardo1903/QuikNote.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd QuikNote
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Start the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:5173](http://localhost:5173) (or the URL provided) in your browser to see the application.

## 🌟 Key Learnings

This project was a fantastic exercise in full-stack development. Key highlights include:

-   Implementing a complete backend solution using **Appwrite** for authentication, database management, and storage.
-   Creating fluid, interactive user experiences with **Framer Motion** for features like drag-and-drop.
-   Building a modern, component-based UI with **React**, **TailwindCSS**, and the brilliant **ShadCN-UI**.

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE.md](https://choosealicense.com/licenses/mit/) file for details.
