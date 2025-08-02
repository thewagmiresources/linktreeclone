# LinkTree Clone - API Contracts & Integration Plan

## Current Frontend Implementation Status
✅ **COMPLETED FRONTEND FEATURES:**
- Lazy account creation with anonymous pages
- Facebook-style UI with cover photo + overlapping profile photo
- Smart link cards with contextual hover actions
- 4 theme templates (Facebook Classic, Midnight, Pastel, Neon)
- Brand kit matcher with website/logo analysis
- Community layer with referrer leaderboard and badges
- Privacy-first analytics (client-side by default)
- Zero-config SEO with auto-generated OG images and JSON-LD
- Theme customization with font picker and button styles
- Analytics dashboard with charts and performance metrics
- Social sharing with native platform buttons

## API Contracts

### 1. User Management
```
POST /api/users/create-anonymous
- Body: { name, username?, bio, mode, theme }
- Response: { id, username, claimToken }

POST /api/users/claim-google
- Body: { claimToken, googleAuthCode }
- Response: { user, accessToken }

GET /api/users/:username
- Response: { user, links[], stats, theme }

PUT /api/users/:id
- Headers: Authorization
- Body: { name?, bio?, theme?, settings? }
```

### 2. Link Management
```
POST /api/links
- Headers: Authorization
- Body: { title, url, description?, type?, image? }
- Response: { link }

PUT /api/links/:id
- Headers: Authorization
- Body: { title?, url?, description?, type? }

DELETE /api/links/:id
- Headers: Authorization

GET /api/links/:id/analytics
- Headers: Authorization
- Response: { clicks, referrers, timeline }
```

### 3. Analytics & Community
```
POST /api/analytics/track-view
- Body: { userId, referrer?, userAgent? }
- Response: { success }

POST /api/analytics/track-click
- Body: { linkId, referrer?, userAgent? }
- Response: { success }

GET /api/community/:userId/referrers
- Headers: Authorization
- Response: { topReferrers[], badges[] }

POST /api/community/award-badge
- Headers: Authorization
- Body: { userId, badgeType, criteria }
```

### 4. SEO & Branding
```
POST /api/seo/generate-og-image
- Body: { userId, customization? }
- Response: { imageUrl }

POST /api/branding/analyze-website
- Body: { websiteUrl }
- Response: { colors[], fonts[], vibe, industry }

POST /api/branding/analyze-logo
- Body: { logoFile }
- Response: { colors[], dominantColor, palette }
```

## Data Models

### User Schema
```javascript
{
  id: ObjectId,
  name: String,
  username: String, // unique, optional for anonymous
  email: String?, // only after Google claim
  bio: String,
  profilePhoto: String?,
  coverPhoto: String?,
  mode: "creator" | "business",
  theme: String,
  settings: {
    privacy: {
      clientSideOnly: Boolean,
      enableCookies: Boolean,
      anonymizeIPs: Boolean
    },
    community: {
      enableReferrerLeaderboard: Boolean,
      enableBadgeRewards: Boolean,
      showPublicStats: Boolean
    }
  },
  claimToken: String?, // for anonymous -> claimed conversion
  isAnonymous: Boolean,
  createdAt: Date,
  lastActiveAt: Date
}
```

### Link Schema  
```javascript
{
  id: ObjectId,
  userId: ObjectId,
  title: String,
  url: String,
  description: String?,
  image: String?,
  type: "video" | "social" | "store" | "resource" | "event" | "music" | "custom",
  isAutoImported: Boolean,
  source: String?, // "YouTube", "Instagram", etc.
  clicks: Number,
  analytics: {
    dailyClicks: [{ date: Date, clicks: Number }],
    referrers: [{ source: String, clicks: Number }]
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Community Schema
```javascript
{
  userId: ObjectId,
  referrers: [{
    source: String,
    clicks: Number,
    firstSeen: Date,
    lastSeen: Date
  }],
  badges: [{
    type: "top_fan" | "first_clicker" | "top_referrer" | "community_champion",
    earnedAt: Date,
    criteria: Object
  }]
}
```

## Mock Data to Replace

### Frontend Mock Files:
- `/app/frontend/src/data/mockData.js` - Replace with API calls
- Mock user data in `LinkTreePage.jsx` and `CreatePage.jsx`
- Mock analytics data in `AnalyticsModal.jsx`
- Mock community data in `CommunityLayer.jsx`

### Integration Points:
1. **Page Load**: Replace `mockUserData` with `GET /api/users/:username`
2. **Link Creation**: Replace localStorage with `POST /api/links`
3. **Analytics**: Replace mock charts with real data from `GET /api/analytics`
4. **Theme Changes**: Persist via `PUT /api/users/:id`
5. **Community Features**: Real referrer tracking and badge awards

## Backend Implementation Priority:

### Phase 1: Core Functionality
1. User creation (anonymous + claimed accounts)
2. Link CRUD operations
3. Basic analytics tracking
4. Theme persistence

### Phase 2: Advanced Features  
1. Google OAuth integration
2. Community features and badges
3. SEO generators (OG images, JSON-LD)
4. Privacy-compliant analytics

### Phase 3: Smart Features
1. Brand kit analysis (website + logo)
2. Auto-import from social platforms
3. Advanced analytics with privacy controls
4. Real-time referrer tracking

## Frontend Integration Plan:

### API Client Setup:
```javascript
// Create axios instance with backend URL
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL + '/api'
});

// Replace mock data calls with real API calls
```

### Authentication Flow:
```javascript
// Anonymous creation
const createAnonymousPage = (data) => api.post('/users/create-anonymous', data);

// Google claim
const claimWithGoogle = (token) => api.post('/users/claim-google', { claimToken: token });
```

### Smart Features Integration:
- Replace brand kit analysis with real website scraping
- Implement real music preview with streaming APIs
- Connect social auto-import with platform APIs
- Real OG image generation on server

## Testing Requirements:

### Backend Testing:
- Anonymous user creation and page publishing
- Link CRUD operations with proper validation
- Analytics tracking accuracy
- Google OAuth flow
- Privacy compliance (GDPR/CCPA)
- Community features and badge system

### Frontend Integration Testing:
- Form submissions save to database
- Analytics display real data
- Theme changes persist across sessions
- Smart link actions work with real APIs
- SEO features generate actual optimized content

## Success Metrics:
- Anonymous page creation works in <2 seconds
- Real analytics data displays correctly
- Google OAuth claim process is seamless
- All smart card actions function properly
- SEO features improve actual search visibility
- Community features encourage engagement
- Privacy controls work as advertised

## Notes:
- All mock data is currently realistic and comprehensive
- Frontend is fully functional with advanced UX
- Backend needs to match the sophisticated frontend experience
- Privacy-first approach should be maintained throughout
- Community features should encourage organic growth