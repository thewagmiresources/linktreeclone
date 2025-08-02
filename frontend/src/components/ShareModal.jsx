import React, { useState } from 'react';
import { X, Share2, Copy, Facebook, Twitter, MessageCircle, QrCode, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

const ShareModal = ({ userData, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  
  const pageUrl = `${window.location.origin}/u/${userData.username}`;
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link');
    }
  };

  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-black hover:bg-gray-800',
      url: `https://twitter.com/intent/tweet?text=Check out my links&url=${encodeURIComponent(pageUrl)}`
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-600 hover:bg-green-700',
      url: `https://wa.me/?text=Check out my links: ${encodeURIComponent(pageUrl)}`
    }
  ];

  const handleSocialShare = (url) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share Your Page
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Link Sharing */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Share Link</Label>
            <div className="flex gap-2">
              <Input 
                value={pageUrl} 
                readOnly 
                className="text-sm"
              />
              <Button 
                onClick={handleCopyLink}
                variant="outline" 
                size="sm"
                className="flex-shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Social Media Sharing */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Share on Social Media</Label>
            <div className="grid grid-cols-3 gap-3">
              {shareOptions.map((option) => (
                <Button
                  key={option.name}
                  onClick={() => handleSocialShare(option.url)}
                  className={`${option.color} text-white flex flex-col items-center p-4 h-auto`}
                >
                  <option.icon className="w-6 h-6 mb-2" />
                  <span className="text-xs">{option.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* QR Code */}
          <div>
            <Label className="text-sm font-medium mb-3 block">QR Code</Label>
            <div className="text-center">
              {!showQR ? (
                <Button 
                  onClick={() => setShowQR(true)}
                  variant="outline" 
                  className="w-full"
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  Generate QR Code
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 mx-auto w-fit">
                    <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-600 rounded-lg flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Scan to visit your page
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowQR(false)}
                  >
                    Hide QR Code
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Stats Preview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-sm mb-2">Share Performance</h4>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold">{userData.stats.totalViews.toLocaleString()}</div>
                <div className="text-xs text-gray-500">Total Views</div>
              </div>
              <div>
                <div className="text-lg font-bold">{userData.stats.totalClicks.toLocaleString()}</div>
                <div className="text-xs text-gray-500">Total Clicks</div>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <Button onClick={onClose} className="w-full">
            Done
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShareModal;