import React, { useState } from 'react';
import { X, Share2, Copy, Facebook, Twitter, MessageCircle, QrCode, Check, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';

const ShareModal = ({ userData, onClose, isMobile = false }) => {
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
      color: 'bg-blue-600 hover:bg-blue-700 text-white',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-black hover:bg-gray-800 text-white',
      url: `https://twitter.com/intent/tweet?text=Check out my links&url=${encodeURIComponent(pageUrl)}`
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-600 hover:bg-green-700 text-white',
      url: `https://wa.me/?text=Check out my links: ${encodeURIComponent(pageUrl)}`
    }
  ];

  const handleSocialShare = async (option) => {
    // Use native sharing on mobile if available
    if (navigator.share && isMobile) {
      try {
        await navigator.share({
          title: `${userData.name} - Links`,
          text: userData.bio,
          url: pageUrl
        });
        return;
      } catch (err) {
        // Fallback to opening URL
      }
    }
    
    window.open(option.url, '_blank', 'width=600,height=400');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${userData.name} - Links`,
          text: userData.bio,
          url: pageUrl
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    }
  };

  const ModalContent = () => (
    <div className="space-y-6">
      {/* Native Share - Mobile Only */}
      {isMobile && navigator.share && (
        <div>
          <Button 
            onClick={handleNativeShare}
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share via Apps
          </Button>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-500">or share manually</span>
            </div>
          </div>
        </div>
      )}

      {/* Link Sharing */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Share Link</Label>
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
            className={`flex-shrink-0 min-w-20 ${copied ? 'bg-green-50 border-green-200' : ''}`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-1" />
                Done
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Social Media Sharing */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Share on Social Media</Label>
        <div className="grid grid-cols-1 gap-3">
          {shareOptions.map((option) => (
            <Button
              key={option.name}
              onClick={() => handleSocialShare(option)}
              className={`${option.color} h-12 flex items-center justify-center gap-3`}
            >
              <option.icon className="w-5 h-5" />
              <span>Share on {option.name}</span>
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
              className="w-full h-12"
            >
              <QrCode className="w-4 h-4 mr-2" />
              Generate QR Code
            </Button>
          ) : (
            <div className="space-y-3">
              <div className="bg-white p-6 rounded-lg border-2 border-gray-200 mx-auto w-fit">
                <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-600 rounded-lg flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-white" />
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Scan to visit your page
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowQR(false)}
                  className="flex-1"
                >
                  Hide QR Code
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Preview */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-sm mb-3">Share Performance</h4>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-xl font-bold">{userData.stats.totalViews.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Total Views</div>
          </div>
          <div>
            <div className="text-xl font-bold">{userData.stats.totalClicks.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Total Clicks</div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={true} onOpenChange={onClose}>
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
          <SheetHeader className="pb-6">
            <SheetTitle className="flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Share Your Page
            </SheetTitle>
          </SheetHeader>
          <ModalContent />
          <div className="pt-6">
            <Button onClick={onClose} variant="outline" className="w-full h-12">
              Done
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

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
        
        <CardContent>
          <ModalContent />
          <div className="pt-6">
            <Button onClick={onClose} className="w-full">
              Done
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShareModal;