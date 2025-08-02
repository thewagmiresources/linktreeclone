import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ExternalLink, Calendar, Eye } from 'lucide-react';

const LinkCard = ({ link, theme, index }) => {
  const handleClick = () => {
    // In real app, track click analytics
    window.open(link.url, '_blank');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card 
      className={`${theme.cardBg} border border-gray-200 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group`}
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Link Icon/Image */}
          <div className="flex-shrink-0">
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

            {/* Link Metadata */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs">
                <div className={`flex items-center gap-1 ${theme.textSecondary}`}>
                  <Calendar className="w-3 h-3" />
                  {formatDate(link.createdAt)}
                </div>
                <div className={`flex items-center gap-1 ${theme.textSecondary}`}>
                  <Eye className="w-3 h-3" />
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
      </CardContent>
    </Card>
  );
};

export default LinkCard;