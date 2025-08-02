import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Share2, Calendar, Eye, TrendingUp, Settings, Wand2, Users, Shield, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import SmartLinkCard from './SmartLinkCard';
import ThemeCustomizer from './ThemeCustomizer';
import AnalyticsModal from './AnalyticsModal';
import ShareModal from './ShareModal';
import BrandKitMatcher from './BrandKitMatcher';
import CommunityLayer from './CommunityLayer';
import PrivacyAnalytics from './PrivacyAnalytics';
import SEOGenerator from './SEOGenerator';
import { mockUserData } from '../data/mockData';

const LinkTreePage = ({ isPreview = false }) => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showBrandKit, setShowBrandKit] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showSEO, setShowSEO] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('facebook-classic');
  const [communityBadges, setCommunityBadges] = useState({
    link_1: [{ type: 'top_fan', label: 'Top Fan' }],
    link_3: [{ type: 'first_clicker', label: 'First Clicker' }]
  });

  useEffect(() => {
    // In real app, fetch user data based on username
    if (isPreview) {
      setUserData(mockUserData.preview);
    } else {
      setUserData(mockUserData.sampleUser);
    }
  }, [username, isPreview]);

  const handleApplyBrandKit = (brandTheme) => {
    setCurrentTheme('brand-custom');
    // In real app, apply the custom brand theme
    console.log('Applying brand kit:', brandTheme);
  };

  const handleUpdateCommunitySettings = (settings) => {
    // In real app, save community settings
    console.log('Community settings updated:', settings);
  };

  const handleUpdatePrivacySettings = (settings) => {
    // In real app, save privacy settings
    console.log('Privacy settings updated:', settings);
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const themeStyles = {
    'facebook-classic': {
      background: 'bg-gray-50',
      cardBg: 'bg-white',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-600',
      accent: 'text-blue-600',
      buttonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
      buttonSecondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700'
    },
    'midnight': {
      background: 'bg-gray-900',
      cardBg: 'bg-gray-800',
      textPrimary: 'text-white',
      textSecondary: 'text-gray-300',
      accent: 'text-purple-400',
      buttonPrimary: 'bg-purple-600 hover:bg-purple-700 text-white',
      buttonSecondary: 'bg-gray-700 hover:bg-gray-600 text-gray-200'
    },
    'pastel': {
      background: 'bg-pink-50',
      cardBg: 'bg-white',
      textPrimary: 'text-gray-800',
      textSecondary: 'text-gray-500',
      accent: 'text-pink-500',
      buttonPrimary: 'bg-pink-400 hover:bg-pink-500 text-white',
      buttonSecondary: 'bg-pink-100 hover:bg-pink-200 text-pink-700'
    },
    'neon': {
      background: 'bg-black',
      cardBg: 'bg-gray-900',
      textPrimary: 'text-white',
      textSecondary: 'text-gray-300',
      accent: 'text-cyan-400',
      buttonPrimary: 'bg-cyan-500 hover:bg-cyan-600 text-black',
      buttonSecondary: 'bg-gray-800 hover:bg-gray-700 text-cyan-400'
    }
  };

  const theme = themeStyles[currentTheme];

  return (
    <div className={`min-h-screen ${theme.background} transition-all duration-300`}>
      {/* Header Controls */}
      {isPreview && (
        <div className="fixed top-4 right-4 z-50 flex flex-wrap gap-2 max-w-md">
          <Button
            onClick={() => setShowCustomizer(true)}
            size="sm"
            className={theme.buttonSecondary}
          >
            <Settings className="w-4 h-4 mr-2" />
            Customize
          </Button>
          <Button
            onClick={() => setShowBrandKit(true)}
            size="sm"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Brand Kit
          </Button>
          <Button
            onClick={() => setShowCommunity(true)}
            size="sm"
            className={theme.buttonSecondary}
          >
            <Users className="w-4 h-4 mr-2" />
            Community
          </Button>
          <Button
            onClick={() => setShowPrivacy(true)}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Shield className="w-4 h-4 mr-2" />
            Privacy
          </Button>
          <Button
            onClick={() => setShowSEO(true)}
            size="sm"
            className={theme.buttonSecondary}
          >
            <Search className="w-4 h-4 mr-2" />
            SEO
          </Button>
          <Button
            onClick={() => setShowAnalytics(true)}
            size="sm"
            className={theme.buttonSecondary}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button
            onClick={() => setShowShare(true)}
            size="sm"
            className={theme.buttonPrimary}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        {/* Cover Photo Section */}
        <div className="relative">
          <div 
            className="h-48 sm:h-64 bg-cover bg-center rounded-b-lg"
            style={{ 
              backgroundImage: `url(${userData.coverPhoto})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-20 rounded-b-lg"></div>
          </div>
          
          {/* Profile Photo - Overlapping */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage src={userData.profilePhoto} alt={userData.name} />
              <AvatarFallback className="text-2xl font-bold">
                {userData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-20 pb-8 px-4 text-center">
          <h1 className={`text-2xl font-bold ${theme.textPrimary} mb-2`}>
            {userData.name}
          </h1>
          <p className={`${theme.textSecondary} mb-2`}>
            @{userData.username}
          </p>
          
          {/* Mode Badge */}
          <Badge 
            variant="secondary" 
            className={`mb-4 ${userData.mode === 'creator' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}
          >
            {userData.mode === 'creator' ? '🎨 Creator Mode' : '💼 Business Mode'}
          </Badge>

          {/* Bio */}
          <div className={`${theme.textSecondary} max-w-md mx-auto mb-6 leading-relaxed`}>
            <p>{userData.bio}</p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-6 mb-8">
            <div className="text-center">
              <div className={`text-xl font-bold ${theme.textPrimary}`}>
                {userData.stats.totalClicks.toLocaleString()}
              </div>
              <div className={`text-sm ${theme.textSecondary}`}>Total Clicks</div>
            </div>
            <div className="text-center">
              <div className={`text-xl font-bold ${theme.textPrimary}`}>
                {userData.stats.totalViews.toLocaleString()}
              </div>
              <div className={`text-sm ${theme.textSecondary}`}>Profile Views</div>
            </div>
            <div className="text-center">
              <div className={`text-xl font-bold ${theme.textPrimary}`}>
                {userData.links.length}
              </div>
              <div className={`text-sm ${theme.textSecondary}`}>Links</div>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="px-4 pb-8">
          <h2 className={`text-lg font-semibold ${theme.textPrimary} mb-4 flex items-center`}>
            <Calendar className="w-5 h-5 mr-2" />
            Latest Links
          </h2>
          
          <div className="space-y-4">
            {userData.links.map((link, index) => (
              <SmartLinkCard 
                key={link.id} 
                link={link} 
                theme={theme}
                index={index}
                communityBadges={communityBadges[link.id] || []}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCustomizer && (
        <ThemeCustomizer 
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
          onClose={() => setShowCustomizer(false)}
        />
      )}

      {showBrandKit && (
        <BrandKitMatcher
          onApplyBrandKit={handleApplyBrandKit}
          onClose={() => setShowBrandKit(false)}
        />
      )}

      {showCommunity && (
        <CommunityLayer
          userData={userData}
          onUpdateSettings={handleUpdateCommunitySettings}
          onClose={() => setShowCommunity(false)}
        />
      )}

      {showPrivacy && (
        <PrivacyAnalytics
          onUpdateSettings={handleUpdatePrivacySettings}
          onClose={() => setShowPrivacy(false)}
        />
      )}

      {showSEO && (
        <SEOGenerator
          userData={userData}
          onClose={() => setShowSEO(false)}
        />
      )}
      
      {showAnalytics && (
        <AnalyticsModal 
          userData={userData}
          onClose={() => setShowAnalytics(false)}
        />
      )}
      
      {showShare && (
        <ShareModal 
          userData={userData}
          onClose={() => setShowShare(false)}
        />
      )}
    </div>
  );
};

export default LinkTreePage;