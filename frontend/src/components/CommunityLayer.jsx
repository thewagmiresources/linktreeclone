import React, { useState } from 'react';
import { Users, Trophy, Star, Heart, Crown, Award, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

const CommunityLayer = ({ userData, onUpdateSettings, onClose }) => {
  const [communitySettings, setCommunitySettings] = useState({
    enableReferrerLeaderboard: true,
    enableBadgeRewards: true,
    showPublicStats: false,
    autoRewardTopFans: true
  });

  // Mock community data
  const mockCommunityData = {
    topReferrers: [
      { 
        id: 1, 
        name: 'Sarah M.', 
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b372?w=100&h=100&fit=crop&crop=face',
        referrals: 47, 
        source: 'Instagram',
        badge: 'Top Referrer',
        joined: '2024-12-10'
      },
      { 
        id: 2, 
        name: 'Mike R.', 
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        referrals: 32, 
        source: 'Twitter',
        badge: 'Community Champion',
        joined: '2024-12-12'
      },
      { 
        id: 3, 
        name: 'Emma L.', 
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        referrals: 28, 
        source: 'Discord',
        badge: 'Early Supporter',
        joined: '2024-12-08'
      },
      { 
        id: 4, 
        name: 'Alex K.', 
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        referrals: 19, 
        source: 'LinkedIn',
        badge: 'Loyal Fan',
        joined: '2024-12-13'
      }
    ],
    recentActivity: [
      { action: 'share', user: 'Sarah M.', timestamp: '2 hours ago', platform: 'Instagram' },
      { action: 'click', user: 'Mike R.', timestamp: '4 hours ago', link: 'Portfolio Website' },
      { action: 'badge_earned', user: 'Emma L.', timestamp: '1 day ago', badge: 'Early Supporter' },
      { action: 'referral', user: 'Alex K.', timestamp: '2 days ago', count: 5 }
    ],
    totalCommunityMembers: 156,
    thisWeekGrowth: 23
  };

  const badgeTypes = [
    { type: 'top_fan', icon: Heart, label: 'Top Fan', color: 'text-red-500', description: 'Most engaged visitor' },
    { type: 'first_clicker', icon: Star, label: 'First Clicker', color: 'text-yellow-500', description: 'First to click new links' },
    { type: 'top_referrer', icon: Crown, label: 'Top Referrer', color: 'text-purple-500', description: 'Brings the most visitors' },
    { type: 'community_champion', icon: Award, label: 'Community Champion', color: 'text-blue-500', description: 'Active community member' },
    { type: 'early_supporter', icon: Trophy, label: 'Early Supporter', color: 'text-green-500', description: 'Been here from the start' }
  ];

  const handleSettingChange = (setting, value) => {
    setCommunitySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Community Dashboard
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Community Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{mockCommunityData.totalCommunityMembers}</div>
                <div className="text-sm text-gray-500">Community Members</div>
                <Badge variant="outline" className="mt-2 text-xs text-green-600">
                  +{mockCommunityData.thisWeekGrowth} this week
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">
                  {mockCommunityData.topReferrers.reduce((sum, ref) => sum + ref.referrals, 0)}
                </div>
                <div className="text-sm text-gray-500">Total Referrals</div>
                <Badge variant="outline" className="mt-2 text-xs text-blue-600">
                  This month
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{badgeTypes.length}</div>
                <div className="text-sm text-gray-500">Badge Types</div>
                <Badge variant="outline" className="mt-2 text-xs text-purple-600">
                  Active rewards
                </Badge>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Top Referrers Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Top Referrers Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockCommunityData.topReferrers.map((referrer, index) => (
                    <div key={referrer.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-sm">
                        #{index + 1}
                      </div>
                      
                      <img 
                        src={referrer.avatar} 
                        alt={referrer.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      
                      <div className="flex-1">
                        <div className="font-medium text-sm">{referrer.name}</div>
                        <div className="text-xs text-gray-500">
                          via {referrer.source} • {referrer.referrals} referrals
                        </div>
                      </div>
                      
                      <Badge variant="outline" className="text-xs">
                        {referrer.badge}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Badge System */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Badge Rewards System</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {badgeTypes.map((badge) => (
                    <div key={badge.type} className="flex items-center gap-3 p-3 rounded-lg border">
                      <badge.icon className={`w-6 h-6 ${badge.color}`} />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{badge.label}</div>
                        <div className="text-xs text-gray-500">{badge.description}</div>
                      </div>
                      <Badge variant={badge.type === 'top_referrer' ? 'default' : 'outline'} className="text-xs">
                        {badge.type === 'top_referrer' ? 'Active' : 'Available'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Community Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Community Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockCommunityData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div className="flex-1 text-sm">
                      <span className="font-medium">{activity.user}</span>
                      {activity.action === 'share' && (
                        <span> shared your page on {activity.platform}</span>
                      )}
                      {activity.action === 'click' && (
                        <span> clicked on "{activity.link}"</span>
                      )}
                      {activity.action === 'badge_earned' && (
                        <span> earned the "{activity.badge}" badge</span>
                      )}
                      {activity.action === 'referral' && (
                        <span> brought {activity.count} new visitors</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{activity.timestamp}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Community Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Community Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Enable Referrer Leaderboard</Label>
                    <p className="text-sm text-gray-500">Track and display top referrers privately</p>
                  </div>
                  <Switch 
                    checked={communitySettings.enableReferrerLeaderboard}
                    onCheckedChange={(checked) => handleSettingChange('enableReferrerLeaderboard', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Badge Rewards System</Label>
                    <p className="text-sm text-gray-500">Automatically award badges to active community members</p>
                  </div>
                  <Switch 
                    checked={communitySettings.enableBadgeRewards}
                    onCheckedChange={(checked) => handleSettingChange('enableBadgeRewards', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Show Public Stats</Label>
                    <p className="text-sm text-gray-500">Display community size on your public page</p>
                  </div>
                  <Switch 
                    checked={communitySettings.showPublicStats}
                    onCheckedChange={(checked) => handleSettingChange('showPublicStats', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Auto-Reward Top Fans</Label>
                    <p className="text-sm text-gray-500">Automatically give badges to most engaged visitors</p>
                  </div>
                  <Switch 
                    checked={communitySettings.autoRewardTopFans}
                    onCheckedChange={(checked) => handleSettingChange('autoRewardTopFans', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button 
              onClick={() => {
                onUpdateSettings(communitySettings);
                onClose();
              }} 
              className="flex-1"
            >
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityLayer;