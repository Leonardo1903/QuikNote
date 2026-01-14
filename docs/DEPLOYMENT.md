# Deployment & Operations Guide

| Project | **Last Updated** | **Node Version** | **Package Manager** |
| :--- | :--- | :--- | :--- |
| QuikNote | January 14, 2026 | v18.17.0+ (LTS) | npm |

---

## 1. Prerequisites
Before you begin, ensure you have the following installed locally:
* **Node.js:** v18.17.0 or higher (LTS recommended)
* **npm:** v9+ (bundled with Node LTS)
* **Git:** For cloning the repository
* **Appwrite CLI (optional):** For database management ([appwrite.io](https://appwrite.io))

**Cloud Services Required:**
* **Appwrite Account:** Cloud or self-hosted instance ([appwrite.io](https://appwrite.io))
* **Vercel/Netlify Account:** For frontend deployment ([vercel.com](https://vercel.com) or [netlify.com](https://netlify.com))

---

## 2. Environment Variables
Create a `.env.local` file in the root directory. You can copy the template:

```bash
cp .env.sample .env.local
```

**Required Variables:**

| Variable | Description | Example |
| :--- | :--- | :--- |
| **Appwrite Configuration** |
| `VITE_APPWRITE_PROJECT_ID` | Appwrite project ID | `694b9a7200292350cfb9` |
| `VITE_APPWRITE_ENDPOINT` | Appwrite server endpoint | `https://cloud.appwrite.io/v1` |
| `VITE_APPWRITE_DATABASE_ID` | Database ID in Appwrite | `694b9ff700187c0d5631` |
| `VITE_APPWRITE_NOTES_COLLECTION_ID` | Notes collection ID | `notes` |
| `VITE_APPWRITE_NOTEBOOKS_COLLECTION_ID` | Notebooks collection ID | `notebooks` |
| `VITE_APPWRITE_STORAGE_BUCKET_ID` | Storage bucket ID | `696761d40007f9779065` |

---

## 3. Local Development Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/QuikNote.git
cd QuikNote
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
1. Copy `.env.sample` to `.env.local`
2. Fill in all Appwrite configuration variables from your Appwrite console

### Step 4: Start the Development Server
```bash
npm run dev
```

**Access Points:**
- **Frontend:** http://localhost:5173
- **Appwrite Console:** https://cloud.appwrite.io (or your self-hosted instance)

### Step 5: Verify Setup
1. Open http://localhost:5173
2. Sign up with a test account
3. Create a test notebook and add a note
4. Confirm you can view, edit, and delete notes
5. Test the theme toggle (dark/light mode)

---

## 4. Appwrite Setup

### Create Collections in Appwrite

Log into your Appwrite console and create the following collections:

#### Users Collection (auto-created by Appwrite Auth)
Appwrite automatically manages the users collection through its auth service.

#### Notebooks Collection
```
Collection ID: notebooks
Database: Your database
Attributes:
  - userId (String) - Required, Indexed
  - name (String) - Required
  - description (String)
  - color (String)
  - createdAt (DateTime)
  - updatedAt (DateTime)

Permissions:
  - Read: Users can read their own documents
  - Write: Users can write their own documents
  - Delete: Users can delete their own documents
```

#### Notes Collection
```
Collection ID: notes
Database: Your database
Attributes:
  - userId (String) - Required, Indexed
  - notebookId (String) - Required, Indexed
  - title (String) - Required
  - content (String)
  - tags (Array)
  - isFavorite (Boolean) - Default: false
  - isDeleted (Boolean) - Default: false
  - deletedAt (DateTime)
  - createdAt (DateTime)
  - updatedAt (DateTime)

Permissions:
  - Read: Users can read their own documents
  - Write: Users can write their own documents
  - Delete: Users can delete their own documents
```

### Create Storage Bucket (Optional)
For future file attachments:
```
Bucket ID: files
Permissions:
  - Read: Users can read their own files
  - Write: Users can write their own files
  - Delete: Users can delete their own files
```

---

## 5. Production Deployment

### Deploying to Vercel (Recommended)
Vercel provides zero-config deployment for React apps with HTTPS, CDN, and edge functions.

#### Step 1: Prepare for Deployment
1. Ensure all environment variables are set
2. Run linting and production build locally:
```bash
npm run lint
npm run build
```

#### Step 2: Deploy to Vercel

**Option A: GitHub Integration (Recommended)**
1. Push code to GitHub
2. In Vercel, click **Add New Project** and import the repo
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Install Command: `npm install`
7. Add environment variables from `.env.local` (use production Appwrite credentials)
8. Deploy

**Option B: Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel --prod
```

#### Step 3: Configure Custom Domain (Optional)
1. In Vercel project settings, add your custom domain
2. Update DNS as instructed
3. Ensure Appwrite CORS is configured to allow your domain

#### Step 4: Enable Automatic Deployments
- **Production:** Push to `main` → deploys automatically
- **Preview:** Pull requests → preview deployments with unique URLs

---

## 6. Alternative Deployment Platforms

### Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Deploy

### GitHub Pages
1. Install `gh-pages`:
```bash
npm install --save-dev gh-pages
```

2. Update `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

### Self-Hosted (Docker)
Create a `Dockerfile` in the project root:

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production image
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:
```nginx
server {
  listen 80;
  location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    try_files $uri $uri/ /index.html;
  }
}
```

Build and run:
```bash
docker build -t quiknote .
docker run -p 80:80 quiknote
```

---

## 7. Appwrite Configuration for Production

### Enable CORS
In Appwrite Console → Settings → Security:
```
Allowed Domains:
  - https://yourdomain.com
  - https://www.yourdomain.com
```

### Backup Appwrite Data
Use Appwrite CLI:
```bash
# List exports
appwrite database list

# Export database
appwrite database export --databaseId=your-db-id --exportFormat=json > backup.json
```

### Update Security Rules
Review and update collection permissions to restrict access properly:
- Ensure users can only read/write their own data
- Implement role-based access if needed

---

## 8. Post-Deployment Checklist
- [ ] **Auth:** Sign up/sign in works correctly
- [ ] **Notes:** Create, read, update, delete notes work
- [ ] **Notebooks:** Create and manage notebooks work
- [ ] **Favorites:** Mark and filter favorite notes work
- [ ] **Trash:** Delete and restore notes from trash work
- [ ] **Theme:** Dark/light theme toggle persists
- [ ] **Performance:** Lighthouse score 90+
- [ ] **Mobile:** Responsive on common devices
- [ ] **Secrets:** No secrets in frontend bundle; all envs set on platform
- [ ] **Appwrite:** Connection stable; collections accessible
- [ ] **Error Handling:** Invalid input returns proper errors
- [ ] **CORS:** Appwrite configured for your domain

---

## 9. Monitoring & Maintenance

### Performance Monitoring
- **Web Vitals:** Monitor Core Web Vitals (LCP, FID, CLS)
- **Lighthouse:** Run Lighthouse periodically (target 90+)
- **Bundle Size:** Monitor with `npm run build` output

### Error Tracking (Optional)
- **Sentry:**
```bash
npm install --save-dev @sentry/vite-plugin
```

### Appwrite Monitoring
- **Console Logs:** Check Appwrite logs for API errors
- **Activity:** Monitor collection access patterns
- **Quotas:** Track usage against plan limits

---

## 10. Backup & Disaster Recovery

### Appwrite Data Backup
```bash
# Export all collections
appwrite database export --databaseId=your-db-id --exportFormat=json > backup_$(date +%Y%m%d).json
```

### Restore (Development Only)
```bash
appwrite database import --databaseId=your-db-id --importFile=backup_20260114.json
```

### Code Repository
- **GitHub:** Primary source of truth
- **Remote Backup:** Consider mirroring to GitLab/Gitea

---

## 11. Scaling Considerations

| Metric | Free Tier Baseline | Scale Consideration |
| :--- | :--- | :--- |
| **Appwrite** | Shared resources | Upgrade to dedicated resources for production |
| **Storage** | Limited quota | Increase storage limits as user base grows |
| **Bandwidth** | Limited per month | Monitor and upgrade plan accordingly |
| **Deployment** | Standard edge locations | Add more regions for better latency |

Optimization tips:
1. Cache collections in browser local storage for faster loads
2. Implement pagination for large note lists
3. Use code splitting for large components
4. Optimize images before uploading
5. Monitor Appwrite query performance

---

## 12. Common Issues & Troubleshooting

### Issue: "Authentication Failed" (401)
- Verify Appwrite credentials in `.env.local`
- Ensure project ID matches Appwrite console
- Confirm user is properly registered

### Issue: "Collection Not Found"
- Verify all collection IDs in environment variables
- Check collections exist in Appwrite console
- Confirm database ID is correct

### Issue: "CORS Error"
- Add domain to Appwrite CORS allowed list
- Verify domain format (include https://)
- Wait a few minutes for changes to propagate

### Issue: "Build Fails"
- Run `npm run lint` and `npm run build` locally to see errors
- Ensure all env vars are set on deployment platform
- Confirm Node version is 18+ on deployment platform

### Issue: "Notes Not Loading"
- Check Appwrite connection in browser DevTools
- Verify user ID is being passed correctly to queries
- Check collection permissions in Appwrite console

### Issue: "Theme Not Persisting"
- Verify localStorage is enabled in browser
- Check for browser privacy/incognito mode limitations
- Test in regular browsing mode

---

## 13. Development Scripts Reference

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start development server (http://localhost:5173) |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## 14. Security Best Practices

### Environment Variables
- Do not commit `.env.local`
- Use distinct keys for dev vs. prod
- Store secrets on deployment platform (Vercel/Netlify secure env vars)

### Authentication
- Appwrite handles password hashing and storage
- Sessions managed by Appwrite SDK securely
- Enforce strong passwords in signup flow (future)

### API & Data
- Validate all inputs before sending to Appwrite
- Use Appwrite collection permissions for data isolation
- Monitor suspicious access patterns

### CORS & Security Headers
- Restrict Appwrite access to your domain only
- Consider CSP headers on deployment platform
- Enable HTTPS-only (default on Vercel/Netlify)

---

## Appendix: Related Documents
- [PRD.md](./PRD.md) - Product requirements and user stories
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture and technical design
- [API.md](./API.md) - Detailed API endpoint documentation
- [README.md](../README.md) - Project overview and quick start

---

## Support & Contact
For deployment issues or questions:
- **GitHub Issues:** https://github.com/yourusername/QuikNote/issues
- **Appwrite Documentation:** https://appwrite.io/docs
- **Appwrite Support:** https://appwrite.io/support
- **Vercel Support:** https://vercel.com/support
- **Netlify Support:** https://support.netlify.com
