import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Calendar, ShoppingCart, Share, Play, Pause, Heart, Star, Crown } from 'lucide-react';

const SmartLinkCard = ({ link, theme, index, communityBadges = [] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    // In real app, track click analytics
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
        // Mock share via DM
        navigator.share?.({
          title: link.title,
          text: link.description,
          url: link.url
        }) || alert(`📤 Sharing "${link.title}"`);
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
        color: 'text-blue-500 hover:text-blue-700'
      });
    }
    
    if (link.type === 'store' || link.type === 'product') {
      actions.push({ 
        icon: ShoppingCart, 
        label: 'Add to Cart', 
        action: 'cart',
        color: 'text-green-500 hover:text-green-700'
      });
    }
    
    if (link.type === 'music' || link.type === 'audio') {
      actions.push({ 
        icon: isPlaying ? Pause : Play, 
        label: isPlaying ? 'Stop Preview' : 'Preview 15s', 
        action: 'preview',
        color: 'text-purple-500 hover:text-purple-700'
      });
    }
    
    // Always include share
    actions.push({ 
      icon: Share, 
      label: 'Share via DM', 
      action: 'share',
      color: 'text-gray-500 hover:text-gray-700'
    });
    
    return actions;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const secondaryActions = getSecondaryActions();

  return (
    <Card 
      className={`${theme.cardBg} border border-gray-200 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative overflow-hidden`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Link Icon/Image */}
          <div className="flex-shrink-0 relative">
            {link.image ? (
              <img 
                src={link.image} 
                alt={link.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
            ) : (
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg`}>
                {link.title.charAt(0)}
              </div>
            )}
            
            {/* Music Preview Indicator */}
            {isPlaying && link.type === 'music' && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            )}
          </div>

          {/* Link Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className={`font-semibold ${theme.textPrimary} group-hover:${theme.accent} transition-colors line-clamp-2`}>
                {link.title}
              </h3>
              <ExternalLink className={`w-4 h-4 ${theme.textSecondary} flex-shrink-0 group-hover:${theme.accent} transition-colors`} />
            </div>
            
            {link.description && (
              <p className={`${theme.textSecondary} text-sm mb-3 line-clamp-2`}>
                {link.description}
              </p>
            )}

            {/* Community Badges */}
            {communityBadges.length > 0 && (
              <div className="flex gap-1 mb-3">
                {communityBadges.map((badge, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs flex items-center gap-1">
                    {badge.type === 'top_fan' && <Heart className="w-3 h-3 text-red-500" />}
                    {badge.type === 'first_clicker' && <Star className="w-3 h-3 text-yellow-500" />}
                    {badge.type === 'top_referrer' && <Crown className="w-3 h-3 text-purple-500" />}
                    {badge.label}
                  </Badge>
                ))}
              </div>
            )}

            {/* Link Metadata */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs">
                <div className={`flex items-center gap-1 ${theme.textSecondary}`}>
                  <Calendar className="w-3 h-3" />
                  {formatDate(link.createdAt)}
                </div>
                <div className={`flex items-center gap-1 ${theme.textSecondary}`}>
                  <ExternalLink className="w-3 h-3" />
                  {link.clicks.toLocaleString()} clicks
                </div>
              </div>

              {/* Link Type Badge */}
              {link.type && (
                <Badge variant="outline" className="text-xs">
                  {link.type}
                </Badge>
              )}
            </div>

            {/* Social Auto-Import Badge */}
            {link.isAutoImported && (
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                  Auto-imported from {link.source}
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Music Preview Progress Bar */}
        {isPlaying && link.type === 'music' && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div className="bg-purple-500 h-1 rounded-full animate-pulse" style={{ width: '30%' }}></div>
            </div>
            <p className="text-xs text-purple-600 mt-1">🎵 Playing preview...</p>
          </div>
        )}

        {/* Secondary Actions - Shown on Hover */}
        {isHovered && secondaryActions.length > 0 && (
          <div className="absolute top-4 right-4 flex flex-col gap-1 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg border">
            {secondaryActions.map((action, idx) => (
              <Button
                key={idx}
                variant="ghost"
                size="sm"
                className={`h-8 w-8 p-0 ${action.color}`}
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