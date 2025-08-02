export const mockUserData = {
  sampleUser: {
    id: "user_123",
    name: "Alex Creative",
    username: "alexcreative",
    bio: "🎨 Digital artist & content creator\n✨ Sharing my journey through art, design, and creativity\n📱 Follow me for daily inspiration!",
    profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    coverPhoto: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop",
    mode: "creator",
    theme: "facebook-classic",
    stats: {
      totalClicks: 12543,
      totalViews: 8921,
      monthlyClicks: 2341,
      weeklyClicks: 523
    },
    links: [
      {
        id: "link_1",
        title: "Latest YouTube Video: Digital Art Tutorial",
        url: "https://youtube.com/watch?v=example",
        description: "Learn how to create stunning digital illustrations using Procreate and Photoshop",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop",
        clicks: 2341,
        createdAt: "2024-12-15T10:30:00Z",
        type: "video",
        isAutoImported: true,
        source: "YouTube"
      },
      {
        id: "link_2",
        title: "Shop My Art Prints",
        url: "https://etsy.com/shop/alexcreative",
        description: "High-quality prints of my original digital artwork. Perfect for home decoration!",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200&h=200&fit=crop",
        clicks: 1876,
        createdAt: "2024-12-14T15:45:00Z",
        type: "store"
      },
      {
        id: "link_3",
        title: "Instagram: Daily Art Posts",
        url: "https://instagram.com/alexcreative",
        description: "Follow my daily art journey and behind-the-scenes content",
        image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=200&h=200&fit=crop",
        clicks: 3421,
        createdAt: "2024-12-13T09:15:00Z",
        type: "social",
        isAutoImported: true,
        source: "Instagram"
      },
      {
        id: "link_4",
        title: "Free Design Resources",
        url: "https://drive.google.com/alexcreative-resources",
        description: "Download free brushes, textures, and templates I use in my work",
        clicks: 4905,
        createdAt: "2024-12-12T12:00:00Z",
        type: "resource"
      },
      {
        id: "link_5",
        title: "Book a Commission - One-on-One Session",
        url: "https://calendly.com/alexcreative/commission",
        description: "Custom digital portraits and illustrations. Let's create something amazing together!",
        clicks: 876,
        createdAt: "2024-12-11T14:20:00Z",
        type: "event"
      },
      {
        id: "link_6",
        title: "My Latest Single: Creative Flow",
        url: "https://spotify.com/track/creative-flow",
        description: "Chill beats to inspire your creative sessions - now streaming everywhere",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
        clicks: 1234,
        createdAt: "2024-12-10T16:30:00Z",
        type: "music",
        isAutoImported: false
      }
    ],
    analytics: {
      dailyClicks: [
        { date: "2024-12-15", clicks: 234 },
        { date: "2024-12-14", clicks: 189 },
        { date: "2024-12-13", clicks: 156 },
        { date: "2024-12-12", clicks: 298 },
        { date: "2024-12-11", clicks: 167 },
        { date: "2024-12-10", clicks: 203 },
        { date: "2024-12-09", clicks: 145 }
      ],
      topReferrers: [
        { source: "Instagram", clicks: 1834, percentage: 32 },
        { source: "TikTok", clicks: 1456, percentage: 25 },
        { source: "YouTube", clicks: 1023, percentage: 18 },
        { source: "Direct", clicks: 876, percentage: 15 },
        { source: "Twitter", clicks: 587, percentage: 10 }
      ]
    }
  },
  
  preview: {
    id: "preview",
    name: "Your Name",
    username: "your-username",
    bio: "Your bio will appear here. Tell people about yourself!",
    profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    coverPhoto: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop",
    mode: "creator",
    theme: "facebook-classic",
    stats: {
      totalClicks: 0,
      totalViews: 0,
      monthlyClicks: 0,
      weeklyClicks: 0
    },
    links: [
      {
        id: "preview_1",
        title: "Add your first link",
        url: "#",
        description: "Links you add will appear here in timeline order",
        clicks: 0,
        createdAt: new Date().toISOString(),
        type: "placeholder"
      }
    ],
    analytics: {
      dailyClicks: [],
      topReferrers: []
    }
  }
};

export const themeTemplates = {
  'facebook-classic': {
    name: 'Facebook Classic',
    preview: '#1877f2',
    description: 'Clean blue and white design inspired by Facebook'
  },
  'midnight': {
    name: 'Midnight',
    preview: '#6366f1',
    description: 'Dark theme with purple accents'
  },
  'pastel': {
    name: 'Pastel',
    preview: '#f472b6',
    description: 'Soft pink and gentle colors'
  },
  'neon': {
    name: 'Neon',
    preview: '#06b6d4',
    description: 'Bold neon cyberpunk aesthetic'
  }
};

export const fontOptions = {
  webSafe: [
    { name: 'Arial', value: 'Arial, sans-serif' },
    { name: 'Helvetica', value: 'Helvetica, sans-serif' },
    { name: 'Times New Roman', value: 'Times New Roman, serif' },
    { name: 'Georgia', value: 'Georgia, serif' },
    { name: 'Verdana', value: 'Verdana, sans-serif' },
    { name: 'Courier New', value: 'Courier New, monospace' },
    { name: 'Trebuchet MS', value: 'Trebuchet MS, sans-serif' },
    { name: 'Arial Black', value: 'Arial Black, sans-serif' },
    { name: 'Impact', value: 'Impact, sans-serif' },
    { name: 'Comic Sans MS', value: 'Comic Sans MS, cursive' }
  ],
  googleFonts: [
    { name: 'Inter', value: 'Inter, sans-serif' },
    { name: 'Roboto', value: 'Roboto, sans-serif' },
    { name: 'Open Sans', value: 'Open Sans, sans-serif' },
    { name: 'Lato', value: 'Lato, sans-serif' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif' },
    { name: 'Poppins', value: 'Poppins, sans-serif' },
    { name: 'Nunito', value: 'Nunito, sans-serif' },
    { name: 'Playfair Display', value: 'Playfair Display, serif' },
    { name: 'Merriweather', value: 'Merriweather, serif' },
    { name: 'Source Code Pro', value: 'Source Code Pro, monospace' }
  ]
};