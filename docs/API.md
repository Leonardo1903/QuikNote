# API Documentation

| Project | **Base URL** | **Version** | **Authentication** |
| :--- | :--- | :--- | :--- |
| QuikNote API | `https://quiknote.app/api` | 1.0.0 | Appwrite Auth Session |

---

## 1. Authentication
All protected API endpoints require a valid Appwrite auth session. Authentication is handled via Appwrite Auth service with email/password credentials.

**Session Verification:**
- Client-side: `useAuth()` context provides authenticated user data and session token
- Server-side: Appwrite SDK automatically includes session in all requests

**Session Management:**
- Appwrite stores session tokens securely in browser storage
- Automatic token refresh handled by Appwrite SDK
- Manual logout clears session and local data

---

## 2. Endpoints

### A. Authentication Module

#### `POST /api/auth/sign-up`
Registers a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "secure-password",
  "name": "User Name"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Account created successfully",
  "user": {
    "id": "user_abc123",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

---

#### `POST /api/auth/sign-in`
Authenticates a user with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "secure-password"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Signed in successfully",
  "user": {
    "id": "user_abc123",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

---

#### `POST /api/auth/sign-out`
Logs out the authenticated user and clears session.

**Authentication:** Requires Appwrite session.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Signed out successfully"
}
```

---

#### `GET /api/auth/user`
Retrieves the current authenticated user's information.

**Authentication:** Requires Appwrite session.

**Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "id": "user_abc123",
    "email": "user@example.com",
    "name": "User Name",
    "theme": "light"
  }
}
```

---

### B. User Profile Module

#### `GET /api/user/profile`
Retrieves the authenticated user's profile information.

**Authentication:** Requires Appwrite session.

**Response (200 OK):**
```json
{
  "success": true,
  "profile": {
    "id": "user_abc123",
    "name": "User Name",
    "email": "user@example.com",
    "theme": "light",
    "createdAt": "2025-12-18T10:00:00.000Z"
  }
}
```

---

#### `PATCH /api/user/profile`
Updates the authenticated user's profile information.

**Authentication:** Requires Appwrite session.

**Request Body:**
```json
{
  "name": "New Name"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "profile": {
    "id": "user_abc123",
    "name": "New Name",
    "email": "user@example.com"
  }
}
```

---

#### `PATCH /api/user/theme`
Updates the user's theme preference (light/dark).

**Authentication:** Requires Appwrite session.

**Request Body:**
```json
{
  "theme": "dark"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Theme updated successfully",
  "theme": "dark"
}
```

---

### C. Notebooks Module

#### `GET /api/notebooks`
Retrieves all notebooks for the authenticated user.

**Authentication:** Requires Appwrite session.

**Response (200 OK):**
```json
{
  "success": true,
  "notebooks": [
    {
      "id": "nb_abc123",
      "name": "Personal",
      "description": "Personal notes and ideas",
      "color": "blue",
      "noteCount": 15,
      "createdAt": "2025-12-18T10:00:00.000Z"
    }
  ]
}
```

---

#### `POST /api/notebooks`
Creates a new notebook for the authenticated user.

**Authentication:** Requires Appwrite session.

**Request Body:**
```json
{
  "name": "Work Projects",
  "description": "Notes for work projects",
  "color": "green"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Notebook created successfully",
  "notebook": {
    "id": "nb_abc123",
    "name": "Work Projects",
    "description": "Notes for work projects",
    "color": "green",
    "createdAt": "2025-12-18T10:00:00.000Z"
  }
}
```

---

#### `PATCH /api/notebooks/[notebookId]`
Updates a specific notebook.

**Authentication:** Requires Appwrite session.

**Path Parameters:**
- `notebookId` - The Appwrite Document ID of the notebook

**Request Body:**
```json
{
  "name": "Updated Name",
  "color": "red"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Notebook updated successfully",
  "notebook": {
    "id": "nb_abc123",
    "name": "Updated Name",
    "color": "red"
  }
}
```

---

#### `DELETE /api/notebooks/[notebookId]`
Deletes a notebook and optionally its associated notes.

**Authentication:** Requires Appwrite session.

**Path Parameters:**
- `notebookId` - The Appwrite Document ID of the notebook

**Query Parameters:**

| Param | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| deleteNotes | boolean | No | If true, delete all notes in notebook. If false, move to default notebook. |

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Notebook deleted successfully"
}
```

---

### D. Notes Module

#### `GET /api/notes`
Retrieves all notes for the authenticated user with optional filters.

**Authentication:** Requires Appwrite session.

**Query Parameters:**

| Param | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| notebookId | string | No | Filter by notebook ID |
| search | string | No | Search by title or content |
| isDeleted | boolean | No | Include deleted notes (trash) |

**Example Request:**
```bash
GET /api/notes?notebookId=nb_abc123&search=javascript
```

**Response (200 OK):**
```json
{
  "success": true,
  "notes": [
    {
      "id": "note_abc123",
      "title": "JavaScript Async/Await",
      "content": "Learn how to use async/await for promises...",
      "notebookId": "nb_abc123",
      "isFavorite": true,
      "isDeleted": false,
      "createdAt": "2025-12-18T10:00:00.000Z",
      "updatedAt": "2025-12-18T15:30:00.000Z"
    }
  ]
}
```

---

#### `GET /api/notes/favorites`
Retrieves all favorite notes for the authenticated user.

**Authentication:** Requires Appwrite session.

**Response (200 OK):**
```json
{
  "success": true,
  "favorites": [
    {
      "id": "note_abc123",
      "title": "Important Meeting Notes",
      "content": "Discussion points...",
      "notebookId": "nb_abc123",
      "isFavorite": true,
      "createdAt": "2025-12-18T10:00:00.000Z"
    }
  ]
}
```

---

#### `GET /api/notes/trash`
Retrieves all deleted notes (trash) for the authenticated user.

**Authentication:** Requires Appwrite session.

**Response (200 OK):**
```json
{
  "success": true,
  "trash": [
    {
      "id": "note_abc123",
      "title": "Deleted Note",
      "content": "This note was deleted...",
      "notebookId": "nb_abc123",
      "isDeleted": true,
      "deletedAt": "2025-12-18T14:00:00.000Z"
    }
  ]
}
```

---

#### `POST /api/notes`
Creates a new note.

**Authentication:** Requires Appwrite session.

**Request Body:**
```json
{
  "title": "My First Note",
  "content": "This is the content of my note",
  "notebookId": "nb_abc123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Note created successfully",
  "note": {
    "id": "note_abc123",
    "title": "My First Note",
    "content": "This is the content of my note",
    "notebookId": "nb_abc123",
    "isFavorite": false,
    "createdAt": "2025-12-18T10:00:00.000Z"
  }
}
```

---

#### `PATCH /api/notes/[noteId]`
Updates a specific note.

**Authentication:** Requires Appwrite session.

**Path Parameters:**
- `noteId` - The Appwrite Document ID of the note

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content here",
  "notebookId": "nb_abc123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Note updated successfully",
  "note": {
    "id": "note_abc123",
    "title": "Updated Title",
    "content": "Updated content here",
    "notebookId": "nb_abc123",
    "updatedAt": "2025-12-18T15:30:00.000Z"
  }
}
```

---

#### `DELETE /api/notes/[noteId]`
Soft deletes a note (moves to trash).

**Authentication:** Requires Appwrite session.

**Path Parameters:**
- `noteId` - The Appwrite Document ID of the note

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Note moved to trash successfully"
}
```

---

#### `POST /api/notes/[noteId]/restore`
Restores a deleted note from trash.

**Authentication:** Requires Appwrite session.

**Path Parameters:**
- `noteId` - The Appwrite Document ID of the note

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Note restored successfully",
  "note": {
    "id": "note_abc123",
    "title": "Restored Note",
    "isDeleted": false
  }
}
```

---

#### `DELETE /api/notes/[noteId]/permanent`
Permanently deletes a note (cannot be recovered).

**Authentication:** Requires Appwrite session.

**Path Parameters:**
- `noteId` - The Appwrite Document ID of the note

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Note permanently deleted successfully"
}
```

---

#### `PATCH /api/notes/[noteId]/favorite`
Toggles the favorite status of a note.

**Authentication:** Requires Appwrite session.

**Path Parameters:**
- `noteId` - The Appwrite Document ID of the note

**Request Body:**
```json
{
  "isFavorite": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Favorite status updated",
  "isFavorite": true
}
```

---

## 3. Error Codes
The API uses standard HTTP status codes.

| Code | Meaning | Description |
| :--- | :--- | :--- |
| 200 | OK | Request succeeded. |
| 201 | Created | Resource successfully created. |
| 400 | Bad Request | Missing required fields, invalid JSON, or validation error. |
| 401 | Unauthorized | Invalid or missing session. User must sign in. |
| 403 | Forbidden | User does not have permission to access this resource. |
| 404 | Not Found | The requested resource does not exist. |
| 409 | Conflict | Resource already exists (e.g., duplicate notebook name). |
| 413 | Payload Too Large | Request body size exceeds allowed limit. |
| 429 | Too Many Requests | Rate limit exceeded. Retry after the specified time. |
| 500 | Server Error | Internal server error. Database or external service failure. |
| 503 | Service Unavailable | External service temporarily unavailable. |

---

## 4. Error Response Format
All error responses follow a consistent format:

```json
{
  "success": false,
  "error": "ErrorType",
  "message": "Human-readable error description"
}
```

**Example Errors:**

**Missing Required Field:**
```json
{
  "success": false,
  "error": "ValidationError",
  "message": "title is required"
}
```

**Resource Not Found:**
```json
{
  "success": false,
  "error": "ResourceNotFound",
  "message": "Note with ID note_abc123 does not exist"
}
```

**Unauthorized:**
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "You must be signed in to access this resource"
}
```

**Insufficient Permissions:**
```json
{
  "success": false,
  "error": "Forbidden",
  "message": "You do not have permission to modify this note"
}
```

---

## 5. Rate Limiting
*(Planned for future implementation)*

**Proposed Limits:**
- **Standard Endpoints:** 100 requests per minute per user
- **Create Note Endpoint:** 30 notes per minute per user
- **Bulk Operations:** 10 operations per minute per user

**Headers (Future):**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1702991400
```

---

## 6. Pagination
*(Planned for future implementation)*

Current endpoints return all applicable items. Future versions will support pagination for large note lists.

**Query Parameters (future):**
- `limit` (number) - Items per page (default: 50, max: 100)
- `page` (number) - Page number (1-indexed)
- `cursor` (string) - Cursor for pagination of large datasets

**Response Meta (future):**
```json
{
  "data": [...],
  "meta": {
    "total": 250,
    "page": 1,
    "limit": 50,
    "hasMore": true,
    "nextCursor": "cursor_xyz"
  }
}
```

---

## 7. Webhooks
*(Planned for future implementation)*

Future support for notifications:
- `note.created` - Triggered when a note is created
- `note.updated` - Triggered when a note is modified
- `note.deleted` - Triggered when a note is permanently deleted
- `notebook.created` - Triggered when a notebook is created
- `user.profile_updated` - Triggered when user profile changes

---

## Appendix: Related Documents
- [PRD.md](./PRD.md) - Product requirements and user stories
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture and technical design
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment and operations guide
- [README.md](../README.md) - Project overview and quick start
