import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Calendar, ShoppingCart, Share, Play, Pause, Heart, Star, Crown, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import apiService from '../services/api';

const SmartLinkCard = ({ link, theme, index, communityBadges = [], isMobile = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleClick = async () => {
    // Track click analytics
    try {
      await apiService.trackClick({
        link_id: link.id,
        referrer: document.referrer
      });
    } catch (error) {
      console.warn('Click tracking failed:', error);
    }
    
    // Open the link
    window.open(link.url, '_blank');
  };

  const handleSecondaryAction = (action, e) => {
    e.stopPropagation();
    
    switch (action) {
      case 'calendar':
        // Mock calendar save
        alert(`📅 "${link.title}" saved to calendar!`);
        break;
      case 'cart':
        // Mock add to cart
        alert(`🛒 "${link.title}" added to cart!`);
        break;
      case 'share':
        // Use native mobile sharing if available
        if (navigator.share && isMobile) {
          navigator.share({
            title: link.title,
            text: link.description,
            url: link.url
          }).catch(() => {
            // Fallback to copying to clipboard
            navigator.clipboard.writeText(link.url);
            alert('📤 Link copied to clipboard!');
          });
        } else {
          navigator.clipboard.writeText(link.url);
          alert('📤 Link copied to clipboard!');
        }
        break;
      case 'preview':
        // Mock music preview
        setIsPlaying(!isPlaying);
        setTimeout(() => setIsPlaying(false), 15000); // 15 sec preview
        break;
    }
  };

  const getSecondaryActions = () => {
    const actions = [];
    
    if (link.type === 'event') {
      actions.push({ 
        icon: Calendar, 
        label: 'Save to Calendar', 
        action: 'calendar',
        color: 'text-blue-500'
      });
    }
    
    if (link.type === 'store' || link.type === 'product') {
      actions.push({ 
        icon: ShoppingCart, 
        label: 'Add to Cart', 
        action: 'cart',
        color: 'text-green-500'
      });
    }
    
    if (link.type === 'music' || link.type === 'audio') {
      actions.push({ 
        icon: isPlaying ? Pause : Play, 
        label: isPlaying ? 'Stop Preview' : 'Preview', 
        action: 'preview',
        color: 'text-purple-500'
      });
    }
    
    // Always include share
    actions.push({ 
      icon: Share, 
      label: 'Share', 
      action: 'share',
      color: 'text-gray-500'
    });
    
    return actions;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  const secondaryActions = getSecondaryActions();

  return (
    <Card 
      className={`${theme.cardBg} border border-gray-200 hover:shadow-lg active:scale-[0.98] transform transition-all duration-200 cursor-pointer group relative overflow-hidden touch-manipulation`}
      onClick={handleClick}
      onTouchStart={() => setShowActions(false)} // Hide actions on touch
    >
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start gap-3 md:gap-4">
          {/* Mobile-Optimized Link Icon/Image */}
          <div className="flex-shrink-0 relative">
            {link.image ? (
              <img 
                src={link.image} 
                alt={link.title}
                className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover"
              />
            ) : (
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-base md:text-lg`}>
                {link.title.charAt(0)}
              </div>
            )}
            
            {/* Music Preview Indicator */}
            {isPlaying && link.type === 'music' && (
              <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-purple-500 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            )}
          </div>

          {/* Mobile-First Link Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className={`font-semibold ${theme.textPrimary} group-hover:${theme.accent} transition-colors line-clamp-2 text-sm md:text-base leading-tight`}>
                {link.title}
              </h3>
              
              {/* Mobile Actions Menu */}
              {isMobile && secondaryActions.length > 0 ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 flex-shrink-0"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    {secondaryActions.map((action, idx) => (
                      <DropdownMenuItem
                        key={idx}
                        onClick={(e) => handleSecondaryAction(action.action, e)}
                        className="flex items-center gap-2"
                      >
                        <action.icon className={`w-4 h-4 ${action.color}`} />
                        <span className="text-sm">{action.label}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <ExternalLink className={`w-4 h-4 ${theme.textSecondary} flex-shrink-0 group-hover:${theme.accent} transition-colors`} />
              )}
            </div>
            
            {link.description && (
              <p className={`${theme.textSecondary} text-xs md:text-sm mb-3 line-clamp-2 leading-relaxed`}>
                {link.description}
              </p>
            )}

            {/* Community Badges - Mobile Optimized */}
            {communityBadges.length > 0 && (
              <div className="flex gap-1 mb-3 flex-wrap">
                {communityBadges.map((badge, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs flex items-center gap-1 px-2 py-0.5">
                    {badge.type === 'top_fan' && <Heart className="w-2.5 h-2.5 text-red-500" />}
                    {badge.type === 'first_clicker' && <Star className="w-2.5 h-2.5 text-yellow-500" />}
                    {badge.type === 'top_referrer' && <Crown className="w-2.5 h-2.5 text-purple-500" />}
                    <span className="text-xs">{badge.label}</span>
                  </Badge>
                ))}
              </div>
            )}

            {/* Mobile-First Link Metadata */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 md:gap-4 text-xs">
                <div className={`flex items-center gap-1 ${theme.textSecondary}`}>
                  <Calendar className="w-3 h-3" />
                  {formatDate(link.createdAt)}
                </div>
                <div className={`flex items-center gap-1 ${theme.textSecondary}`}>
                  <ExternalLink className="w-3 h-3" />
                  {link.clicks > 1000 ? `${(link.clicks / 1000).toFixed(1)}K` : link.clicks}
                </div>
              </div>

              {/* Link Type Badge */}
              {link.type && (
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  {link.type}
                </Badge>
              )}
            </div>

            {/* Social Auto-Import Badge */}
            {link.isAutoImported && (
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 px-2 py-0.5">
                  Auto from {link.source}
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Music Preview Progress Bar - Mobile Optimized */}
        {isPlaying && link.type === 'music' && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div className="bg-purple-500 h-1 rounded-full animate-pulse" style={{ width: '30%' }}></div>
            </div>
            <p className="text-xs text-purple-600 mt-1 flex items-center gap-1">
              <Play className="w-3 h-3" />
              Playing preview...
            </p>
          </div>
        )}

        {/* Desktop Hover Actions - Hidden on Mobile */}
        {!isMobile && secondaryActions.length > 0 && (
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:flex flex-col gap-1 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg border">
            {secondaryActions.map((action, idx) => (
              <Button
                key={idx}
                variant="ghost"
                size="sm"
                className={`h-8 w-8 p-0 ${action.color} hover:bg-gray-100`}
                onClick={(e) => handleSecondaryAction(action.action, e)}
                title={action.label}
              >
                <action.icon className="w-4 h-4" />
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SmartLinkCard;