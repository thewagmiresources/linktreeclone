# 🚀 LinkTree Clone - Jimat Hosting Deployment Guide

## 📋 What You'll Need:
- Jimat hosting account with cpanel access
- MySQL database (create in cpanel)
- Domain/subdomain pointing to your hosting

## 🔧 Step 1: Setup Database in cpanel

### 1.1 Create MySQL Database:
1. Login to cpanel
2. Go to **MySQL Databases**
3. Create new database: `linktree_db`
4. Create database user with password
5. Add user to database with **ALL PRIVILEGES**
6. Note down: database name, username, password

### 1.2 Database Configuration:
```
Database Host: localhost (usually)
Database Name: yourusername_linktree_db
Database Username: yourusername_linktree_user  
Database Password: your_secure_password
```

## 📁 Step 2: Upload PHP Backend

### 2.1 File Structure on Your Hosting:
```
public_html/
├── api/                    (upload backend-php files here)
│   ├── index.php
│   ├── install.php
│   ├── .htaccess
│   ├── config/
│   │   └── database.php
│   └── classes/
│       └── LinkTree.php
├── uploads/               (create this folder, set permissions 755)
└── (your frontend files)
```

### 2.2 Upload Steps:
1. Create `api` folder in public_html
2. Upload all backend-php files to the `api` folder
3. Create `uploads` folder in public_html
4. Set uploads folder permissions to 755

### 2.3 Configure Database:
Edit `api/config/database.php`:
```php
private $host = "localhost";
private $db_name = "yourusername_linktree_db";  // Your actual DB name
private $username = "yourusername_linktree_user"; // Your actual DB user
private $password = "your_actual_password";       // Your actual DB password
```

## 🎯 Step 3: Install & Test Backend

### 3.1 Run Installation:
Visit: `https://yourdomain.com/api/install.php`

This will:
- ✅ Test database connection
- ✅ Create all required tables
- ✅ Insert sample data
- ✅ Show API endpoints

### 3.2 Test API:
Visit: `https://yourdomain.com/api/users/alexcreative`

Should return JSON with user data.

## 🌐 Step 4: Configure Frontend

### 4.1 Update Backend URL:
Edit `frontend/.env`:
```
REACT_APP_BACKEND_URL=https://yourdomain.com
```

### 4.2 Upload Frontend:
Upload React build files to `public_html/`

## 📱 Step 5: API Integration

### 5.1 Available Endpoints:

#### User Management:
```
POST /api/users/create-anonymous
GET /api/users/{username}
PUT /api/users/{username}
```

#### Link Management:
```
POST /api/links
PUT /api/links/{id}
DELETE /api/links/{id}
```

#### Analytics:
```
POST /api/analytics/track-view
POST /api/analytics/track-click
GET /api/analytics/{userId}
```

#### File Upload:
```
POST /api/upload
```

### 5.2 Sample API Calls:

#### Create Anonymous User:
```javascript
const response = await fetch('https://yourdomain.com/api/users/create-anonymous', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Creator',
    username: 'johncreator',
    bio: 'Digital creator sharing my journey',
    mode: 'creator'
  })
});
```

#### Add Link:
```javascript
const response = await fetch('https://yourdomain.com/api/links', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'johncreator',
    title: 'My Portfolio',
    url: 'https://johnportfolio.com',
    description: 'Check out my latest work',
    type: 'custom'
  })
});
```

#### Track Click:
```javascript
const response = await fetch('https://yourdomain.com/api/analytics/track-click', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    link_id: 123,
    referrer: document.referrer
  })
});
```

## 🔐 Step 6: Security Setup

### 6.1 .htaccess Security (already included):
- CORS headers
- Security headers
- File upload limits
- Compression
- Caching

### 6.2 Additional Security:
1. Remove `install.php` after installation
2. Set strong database passwords
3. Enable SSL certificate in cpanel
4. Regular backups

## 📊 Step 7: Database Structure

### Tables Created:
1. **users** - User profiles and settings
2. **links** - User links and metadata  
3. **analytics** - Click and view tracking
4. **community_badges** - Achievement system

### Key Features:
- ✅ Anonymous user creation
- ✅ Link management (CRUD)
- ✅ Click/view analytics
- ✅ File uploads
- ✅ Community badges
- ✅ Theme settings
- ✅ Mobile-optimized

## 🛠️ Troubleshooting

### Common Issues:

#### "Connection error":
- Check database credentials
- Ensure database user has proper permissions
- Verify database name format (usually: username_dbname)

#### "404 Not Found":
- Check .htaccess file is uploaded
- Verify mod_rewrite is enabled (usually enabled on shared hosting)

#### "Permission denied" on uploads:
- Set uploads folder permissions to 755
- Check PHP file upload settings

#### CORS errors:
- Verify .htaccess CORS headers
- Check frontend REACT_APP_BACKEND_URL

### Test Commands:
```bash
# Test database connection
curl https://yourdomain.com/api/

# Test user creation
curl -X POST https://yourdomain.com/api/users/create-anonymous \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","bio":"Test bio"}'

# Test user retrieval
curl https://yourdomain.com/api/users/testuser
```

## 🎉 Success Checklist:

- [ ] Database created and configured
- [ ] PHP files uploaded to /api/ folder
- [ ] Uploads folder created with proper permissions
- [ ] install.php runs successfully
- [ ] API endpoints return JSON responses
- [ ] Frontend .env updated with backend URL
- [ ] Sample user "alexcreative" loads correctly
- [ ] Link creation and deletion works
- [ ] Analytics tracking functions
- [ ] File uploads work (if needed)

## 📈 Features Included:

### ✅ Core Features:
- Anonymous user creation
- Facebook-style profile layout
- Smart link cards with hover actions
- Mobile-first responsive design
- Real-time analytics
- Community badges system

### ✅ Advanced Features:
- Theme customization (4 templates)
- Privacy-first analytics
- SEO optimization
- File upload support
- Click tracking
- Referrer analytics

### ✅ Mobile Features:
- Touch-optimized interface
- Native sharing integration
- Bottom sheet modals
- Thumb-friendly navigation
- PWA-ready design

## 💡 Next Steps:

1. **Test Everything**: Use the sample data to test all features
2. **Customize Themes**: Add your own color schemes
3. **Add Integrations**: Social media auto-import (optional)
4. **Monitor Analytics**: Track user engagement
5. **Scale Up**: Add more advanced features as needed

## 🆘 Support:

If you encounter issues:
1. Check cpanel error logs
2. Verify PHP version (7.4+ recommended)
3. Ensure all file permissions are correct
4. Test API endpoints individually

Your LinkTree clone is now ready for production on shared hosting! 🚀