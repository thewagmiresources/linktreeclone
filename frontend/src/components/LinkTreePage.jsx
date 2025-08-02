import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Share2, Calendar, Eye, TrendingUp, Settings, Wand2, Users, Shield, Search, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import SmartLinkCard from './SmartLinkCard';
import ThemeCustomizer from './ThemeCustomizer';
import AnalyticsModal from './AnalyticsModal';
import ShareModal from './ShareModal';
import BrandKitMatcher from './BrandKitMatcher';
import CommunityLayer from './CommunityLayer';
import PrivacyAnalytics from './PrivacyAnalytics';
import SEOGenerator from './SEOGenerator';
import { mockUserData } from '../data/mockData';
import apiService from '../services/api';

const LinkTreePage = ({ isPreview = false }) => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showBrandKit, setShowBrandKit] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showSEO, setShowSEO] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
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

  const mobileMenuItems = [
    { icon: Settings, label: 'Customize', action: () => setShowCustomizer(true) },
    { icon: Wand2, label: 'Brand Kit', action: () => setShowBrandKit(true), highlight: true },
    { icon: Users, label: 'Community', action: () => setShowCommunity(true) },
    { icon: Shield, label: 'Privacy', action: () => setShowPrivacy(true), green: true },
    { icon: Search, label: 'SEO', action: () => setShowSEO(true) },
    { icon: TrendingUp, label: 'Analytics', action: () => setShowAnalytics(true) },
    { icon: Share2, label: 'Share', action: () => setShowShare(true), primary: true }
  ];

  return (
    <div className={`min-h-screen ${theme.background} transition-all duration-300`}>
      {/* Mobile-First Header Controls */}
      {isPreview && (
        <>
          {/* Mobile Floating Action Button */}
          <div className="fixed top-4 right-4 z-50 md:hidden">
            <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
              <SheetTrigger asChild>
                <Button 
                  size="sm"
                  className="rounded-full w-12 h-12 shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Page Controls</h3>
                </div>
                
                <div className="space-y-3">
                  {mobileMenuItems.map((item, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`w-full justify-start h-12 text-left ${
                        item.highlight ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600' :
                        item.green ? 'bg-green-600 text-white border-green-600 hover:bg-green-700' :
                        item.primary ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' :
                        'hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        item.action();
                        setShowMobileMenu(false);
                      }}
                    >
                      <item.icon className="w-4 h-4 mr-3" />
                      {item.label}
                    </Button>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Quick Stats</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-bold text-lg">{userData.stats.totalClicks.toLocaleString()}</div>
                      <div className="text-gray-500">Total Clicks</div>
                    </div>
                    <div>
                      <div className="font-bold text-lg">{userData.stats.totalViews.toLocaleString()}</div>
                      <div className="text-gray-500">Profile Views</div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Controls - Hidden on Mobile */}
          <div className="fixed top-4 right-4 z-50 hidden md:flex flex-wrap gap-2 max-w-md">
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
        </>
      )}

      {/* Mobile-Optimized Container */}
      <div className="max-w-md mx-auto md:max-w-2xl">
        {/* Mobile-First Cover Photo Section */}
        <div className="relative">
          <div 
            className="h-32 sm:h-40 md:h-48 lg:h-64 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${userData.coverPhoto})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>
          
          {/* Mobile-Optimized Profile Photo */}
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
            <Avatar className="w-20 h-20 md:w-32 md:h-32 border-4 border-white shadow-lg">
              <AvatarImage src={userData.profilePhoto} alt={userData.name} />
              <AvatarFallback className="text-xl md:text-2xl font-bold">
                {userData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Mobile-First Profile Info */}
        <div className="pt-12 md:pt-20 pb-6 md:pb-8 px-4 text-center">
          <h1 className={`text-xl md:text-2xl font-bold ${theme.textPrimary} mb-2`}>
            {userData.name}
          </h1>
          <p className={`${theme.textSecondary} mb-3 text-sm md:text-base`}>
            @{userData.username}
          </p>
          
          {/* Mode Badge */}
          <Badge 
            variant="secondary" 
            className={`mb-4 text-xs ${userData.mode === 'creator' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}
          >
            {userData.mode === 'creator' ? '🎨 Creator Mode' : '💼 Business Mode'}
          </Badge>

          {/* Mobile-Optimized Bio */}
          <div className={`${theme.textSecondary} max-w-sm mx-auto mb-6 leading-relaxed text-sm md:text-base`}>
            <p>{userData.bio}</p>
          </div>

          {/* Mobile-First Stats */}
          <div className="flex justify-center gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="text-center">
              <div className={`text-lg md:text-xl font-bold ${theme.textPrimary}`}>
                {userData.stats.totalClicks > 1000 ? 
                  `${(userData.stats.totalClicks / 1000).toFixed(1)}K` : 
                  userData.stats.totalClicks.toLocaleString()
                }
              </div>
              <div className={`text-xs md:text-sm ${theme.textSecondary}`}>Clicks</div>
            </div>
            <div className="text-center">
              <div className={`text-lg md:text-xl font-bold ${theme.textPrimary}`}>
                {userData.stats.totalViews > 1000 ? 
                  `${(userData.stats.totalViews / 1000).toFixed(1)}K` : 
                  userData.stats.totalViews.toLocaleString()
                }
              </div>
              <div className={`text-xs md:text-sm ${theme.textSecondary}`}>Views</div>
            </div>
            <div className="text-center">
              <div className={`text-lg md:text-xl font-bold ${theme.textPrimary}`}>
                {userData.links.length}
              </div>
              <div className={`text-xs md:text-sm ${theme.textSecondary}`}>Links</div>
            </div>
          </div>
        </div>

        {/* Mobile-First Links Section */}
        <div className="px-4 pb-6 md:pb-8">
          <h2 className={`text-base md:text-lg font-semibold ${theme.textPrimary} mb-4 flex items-center`}>
            <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Latest Links
          </h2>
          
          <div className="space-y-3 md:space-y-4">
            {userData.links.map((link, index) => (
              <SmartLinkCard 
                key={link.id} 
                link={link} 
                theme={theme}
                index={index}
                communityBadges={communityBadges[link.id] || []}
                isMobile={window.innerWidth < 768}
              />
            ))}
          </div>
        </div>

        {/* Mobile Pull-to-Refresh Indicator */}
        <div className="text-center pb-8 md:hidden">
          <div className={`text-xs ${theme.textSecondary} flex items-center justify-center gap-2`}>
            <div className="w-1 h-1 bg-current rounded-full animate-pulse"></div>
            <span>Pull to refresh</span>
            <div className="w-1 h-1 bg-current rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* All Modals - Mobile Optimized */}
      {showCustomizer && (
        <ThemeCustomizer 
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
          onClose={() => setShowCustomizer(false)}
          isMobile={window.innerWidth < 768}
        />
      )}

      {showBrandKit && (
        <BrandKitMatcher
          onApplyBrandKit={handleApplyBrandKit}
          onClose={() => setShowBrandKit(false)}
          isMobile={window.innerWidth < 768}
        />
      )}

      {showCommunity && (
        <CommunityLayer
          userData={userData}
          onUpdateSettings={handleUpdateCommunitySettings}
          onClose={() => setShowCommunity(false)}
          isMobile={window.innerWidth < 768}
        />
      )}

      {showPrivacy && (
        <PrivacyAnalytics
          onUpdateSettings={handleUpdatePrivacySettings}
          onClose={() => setShowPrivacy(false)}
          isMobile={window.innerWidth < 768}
        />
      )}

      {showSEO && (
        <SEOGenerator
          userData={userData}
          onClose={() => setShowSEO(false)}
          isMobile={window.innerWidth < 768}
        />
      )}
      
      {showAnalytics && (
        <AnalyticsModal 
          userData={userData}
          onClose={() => setShowAnalytics(false)}
          isMobile={window.innerWidth < 768}
        />
      )}
      
      {showShare && (
        <ShareModal 
          userData={userData}
          onClose={() => setShowShare(false)}
          isMobile={window.innerWidth < 768}
        />
      )}
    </div>
  );
};

export default LinkTreePage;