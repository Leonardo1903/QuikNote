# Product Requirements Document (PRD)

| Project Name | **Version** | **Status** | **Author** | **Last Updated** |
| :--- | :--- | :--- | :--- | :--- |
| QuikNote | 1.0 (MVP) | 🟢 Active Development | Your Name | January 14, 2026 |

---

## 1. Problem Statement
**The "Why":** Users struggle to organize their thoughts, ideas, and tasks in a single, intuitive platform. Traditional note-taking apps are cluttered or lack essential features like notebook organization and favorites. They need a lightweight, secure, and responsive note-taking solution that helps them capture, organize, and retrieve their notes effortlessly.

**The Solution:** QuikNote is a modern note-taking application that combines secure authentication with intelligent organization features. Users can create multiple notebooks for better structure, mark important notes as favorites, and enjoy dark/light themes for comfortable viewing. With Appwrite-powered backend, QuikNote ensures data security while maintaining a clean, intuitive user interface.

---

## 2. User Personas
| Persona | Role | Pain Point | Goal |
| :--- | :--- | :--- | :--- |
| **Sarah (Student)** | University Student | Struggles to organize class notes across multiple subjects; wants quick access to important concepts. | Needs a structured notebook system to quickly find notes by subject or topic. |
| **Marcus (Professional)** | Business Professional | Overwhelmed with meeting notes, ideas, and tasks scattered across different apps; loses important information. | Wants centralized note storage with favorites for quick access to critical business notes and action items. |
| **Priya (Creative)** | Writer/Designer | Needs to capture creative ideas on-the-fly but wants them organized by project; fears losing inspiration. | Needs multiple notebooks per project and ability to restore deleted notes from trash. |

---

## 3. User Stories (Functional Requirements)
*These define the scope of the MVP.*

### **Epic 1: Authentication & User Management**
- [x] As a user, I want to sign up with email and password so I can create my account.
- [x] As a user, I want to sign in with email or username for flexibility and ease of access.
- [x] As a user, I want to view and edit my profile information in a dedicated profile page.
- [x] As a user, I want secure logout functionality to protect my account.
- [x] As a user, I want to manage my account preferences and personal settings.

### **Epic 2: Note Creation & Management**
- [x] As a user, I want to create a new note with a title and content in the dashboard.
- [x] As a user, I want to edit existing notes to update or refine my thoughts.
- [x] As a user, I want to delete notes, with the ability to recover them from trash.
- [x] As a user, I want to view all my notes in a comprehensive list or grid view.
- [x] As a user, I want to search notes by title or content for quick retrieval.

### **Epic 3: Notebook Organization**
- [x] As a user, I want to create multiple notebooks to organize notes by topic or project.
- [x] As a user, I want to move notes between notebooks for better organization.
- [x] As a user, I want to rename and delete notebooks with confirmation dialog.
- [x] As a user, I want to view all notes within a specific notebook.
- [x] As a user, I want a default notebook to save notes when no notebook is selected.

### **Epic 4: Favorites**
- [x] As a user, I want to mark important notes as favorites for quick access.
- [x] As a user, I want to view all favorite notes in a dedicated favorites section.
- [x] As a user, I want to toggle favorite status with a single click.

### **Epic 5: Trash & Recovery**
- [x] As a user, I want deleted notes to go to trash instead of permanent deletion.
- [x] As a user, I want to view all deleted notes in a trash section.
- [x] As a user, I want to restore notes from trash back to their original notebooks.
- [x] As a user, I want to permanently delete notes from trash.

### **Epic 6: UI/UX & Theme Management**
- [x] As a user, I want dark and light theme options for comfortable viewing in any lighting condition.
- [x] As a user, I want my theme preference to persist across sessions.
- [x] As a user, I want clean, intuitive UI that makes creating and managing notes simple.
- [x] As a user, I want visual feedback (toast notifications) for all actions (create, update, delete, etc.).
- [x] As a user, I want responsive design that works seamlessly on desktop and mobile browsers.

---

## 4. UI/UX Wireframes
*Key interface components implemented.*

### **Landing Page**
- Hero section with value proposition and call-to-action
- Features showcase highlighting notebook organization, favorites, and theme support
- Navigation: Login, Sign Up buttons
- Benefits section explaining key features

### **Dashboard Layout (Authenticated User)**
- Header with user profile dropdown, theme toggle, and sign out button
- Sidebar navigation: Dashboard, Notebooks, Favorites, Trash
- Main content area displaying notes in grid or list view
- Create New Note button for quick note creation
- Search bar for finding notes by title or content
- Note cards showing title, preview, and timestamp
- Responsive layout that adapts to mobile and desktop viewports

### **Notebook View**
- Display notebook name and note count
- List of all notes within the selected notebook
- Option to create new note within this notebook
- Ability to rename or delete notebook with confirmation
- Back button to return to main dashboard

### **Favorites Section**
- Display all notes marked as favorite
- Quick toggle to remove notes from favorites
- Empty state message when no favorites exist
- Search functionality within favorites

### **Trash Section**
- Show deleted notes with deletion date
- Restore button to recover notes to original notebook
- Permanent delete button with confirmation dialog
- Empty trash option for batch cleanup
- Empty state message when trash is empty

---

## 5. Non-Functional Requirements
*Technical constraints and performance goals.*

1. **Performance:** 
   - Dashboard must load notes within **2 seconds**.
   - Note creation and updates must complete within **1 second**.
   - Search results must display within **500 milliseconds**.

2. **Scalability:** 
   - Appwrite database must efficiently handle users with **1,000+ notes**.
   - Support concurrent note submissions from multiple devices.
   - Efficient querying and indexing for notebook searches.

3. **Security:**
   - All authentication handled via Appwrite with secure session management.
   - User data isolated by userId to prevent cross-user access.
   - Password validation and secure storage practices.
   - Protected API routes requiring authentication.

4. **Reliability:**
   - Note data persists reliably in Appwrite with automatic backups.
   - Error handling with user-friendly error messages for failures.
   - Graceful degradation if backend is temporarily unavailable.
   - Data consistency across multiple browser tabs and devices.

5. **Accessibility:**
   - Responsive design works on desktop, tablet, and mobile browsers.
   - Clear UI labels and error messages for all interactions.
   - Keyboard navigation support for all core actions.
   - Proper ARIA labels for screen reader support.

---

## 6. Database Schema (High Level)
*See `ARCHITECTURE.md` for full details.*

### **Core Collections**

**Users**
- id (Appwrite Document ID)
- email (unique, indexed)
- name
- username (optional)
- passwordHash (encrypted by Appwrite)
- theme (light/dark)
- createdAt, updatedAt

**Notebooks**
- id (Appwrite Document ID)
- userId (indexed)
- name
- description (optional)
- color (optional)
- createdAt, updatedAt

**Notes**
- id (Appwrite Document ID)
- userId (indexed)
- notebookId (indexed)
- title
- content
- isFavorite (boolean)
- isDeleted (boolean)
- deletedAt (optional)
- createdAt, updatedAt

### **Indexes**
- `notes.userId, notes.isDeleted DESC` - Fast dashboard listing
- `notes.userId, notes.isFavorite` - Favorites query
- `notes.notebookId` - Notebook notes query
- `notebooks.userId` - User notebooks query

---

## 7. API Endpoints
*REST API structure via Appwrite.*

### **Authentication**
- `POST /api/auth/sign-up` - User registration
- `POST /api/auth/sign-in` - User login
- `POST /api/auth/sign-out` - User logout
- `GET /api/auth/user` - Get current user info

### **Users & Profiles**
- `GET /api/user/profile` - Get user profile information
- `PATCH /api/user/profile` - Update user profile
- `PATCH /api/user/theme` - Update theme preference

### **Notebooks**
- `GET /api/notebooks` - Get all user notebooks
- `POST /api/notebooks` - Create a new notebook
- `PATCH /api/notebooks/[notebookId]` - Update notebook
- `DELETE /api/notebooks/[notebookId]` - Delete notebook

### **Notes**
- `GET /api/notes` - Get all notes with filters (notebook, search)
- `GET /api/notes/favorites` - Get favorite notes
- `GET /api/notes/trash` - Get deleted notes
- `POST /api/notes` - Create a new note
- `PATCH /api/notes/[noteId]` - Update note
- `DELETE /api/notes/[noteId]` - Soft delete note (move to trash)
- `POST /api/notes/[noteId]/restore` - Restore note from trash
- `DELETE /api/notes/[noteId]/permanent` - Permanently delete note
- `PATCH /api/notes/[noteId]/favorite` - Toggle favorite status


---

## 8. Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React + Vite | Fast development and builds |
| **Language** | JavaScript | Primary development language |
| **UI Library** | shadcn/ui + Tailwind CSS | Pre-built accessible components, styling |
| **Authentication** | Appwrite Auth | Secure user authentication |
| **Database** | Appwrite Cloud Database | NoSQL storage for notes, notebooks, users |
| **File Storage** | Appwrite Storage | Store attachments and assets |
| **State Management** | React Context API | Global state for auth, notes, theme |
| **Validation** | Built-in JS validation | Client-side form validation |
| **Icons** | Lucide React | Consistent icon system |
| **Notifications** | Sonner | Toast messages for user feedback |

---

## 9. Future Roadmap (Post-MVP)
*Features we are NOT building yet, but planning for later.*

- [ ] **Rich Text Editor:** Support for formatted text, bold, italics, lists, and code blocks.
- [ ] **Note Sharing:** Share notes with other users with view/edit permissions.
- [ ] **Collaborative Editing:** Real-time collaboration on notes with multiple users.
- [ ] **Note History:** Version history and ability to restore previous note versions.
- [ ] **Attachments:** Upload and attach files, images to notes.
- [ ] **Reminders:** Set reminders for important notes.
- [ ] **Note Templates:** Pre-built templates for different note types (meeting, project, checklist).
- [ ] **Export Options:** Export notes to PDF, Markdown, or other formats.
- [ ] **Offline Support:** Works offline with sync when connection restored.
- [ ] **Mobile App:** Native iOS/Android apps with push notifications.
- [ ] **Advanced Search:** Full-text search with filters and saved searches.
- [ ] **Analytics:** Insights on note creation patterns and productivity trends.

---

## 10. Success Metrics
*How do we know we succeeded?*

### **User Activation**
1. **Onboarding:** User can sign up, create first note, and organize it in notebook within **5 minutes**.
2. **Adoption:** 80% of users create at least 5 notes within first week of signup.

### **Performance**
1. **Load Time:** Dashboard loads notes within **2 seconds** on 3G connection.
2. **Response Time:** Note creation/updates complete within **1 second** 95% of the time.

### **Reliability**
1. **Uptime:** 99.5% uptime for core features (create, read, update, delete notes).
2. **Data Persistence:** 100% of notes successfully saved and retrieved.

### **User Satisfaction**
1. **Task Completion:** 90% of users successfully create and organize notes without support.
2. **Feature Engagement:** 70% of users utilize notebooks and favorites within first month.
3. **Retention:** 50% of users remain active 30 days after signup.

---

## 11. Constraints & Assumptions

### **Constraints**
- **Appwrite Free Tier:** Storage and bandwidth limits; may need upgrade for large user base.
- **Browser Support:** Focus on modern browsers (Chrome, Firefox, Safari, Edge).
- **File Size:** Appwrite storage limits may restrict note size and attachments.

### **Assumptions**
- Users primarily access via desktop and mobile web browsers.
- Average user creates 5-50 notes per month during active use.
- Users understand notebook concepts for organization.
- Internet connection available for cloud sync.
- Users expect real-time sync across multiple devices.

---

## 12. Open Questions & Decisions Needed
*Issues to resolve before next milestone.*

- [ ] **Note Size Limits:** Should we enforce maximum note content size?
- [ ] **Notebook Depth:** Should notebooks support nested sub-notebooks?
- [ ] **Sharing Permissions:** What sharing and collaboration features for MVP?
- [ ] **Data Export:** Should we support note export in MVP?
- [ ] **Offline Mode:** Should offline support be in MVP or future release?
- [ ] **Tags Feature:** Should tags be added to organize notes further?
- [ ] **Public Beta:** When do we open to external users?
- [ ] **Monetization:** Freemium model or fully free with optional pro features?

---

## Appendix: Related Documents
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture and technical design
- [API.md](./API.md) - API surface and response formats
- [README.md](../README.md) - Project overview and quick start
