import React from 'react';
import { X, TrendingUp, Eye, MousePointer, Calendar, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const AnalyticsModal = ({ userData, onClose }) => {
  const { stats, analytics } = userData;

  // Calculate percentage changes (mock data for demo)
  const clicksChange = '+12%';
  const viewsChange = '+8%';
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Analytics Dashboard
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MousePointer className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Total Clicks</span>
                </div>
                <div className="text-2xl font-bold">{stats.totalClicks.toLocaleString()}</div>
                <Badge variant="outline" className="text-xs text-green-600 bg-green-50">
                  {clicksChange} this week
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">Profile Views</span>
                </div>
                <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
                <Badge variant="outline" className="text-xs text-green-600 bg-green-50">
                  {viewsChange} this week
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium">Monthly Clicks</span>
                </div>
                <div className="text-2xl font-bold">{stats.monthlyClicks.toLocaleString()}</div>
                <Badge variant="outline" className="text-xs text-blue-600 bg-blue-50">
                  This month
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Weekly Clicks</span>
                </div>
                <div className="text-2xl font-bold">{stats.weeklyClicks.toLocaleString()}</div>
                <Badge variant="outline" className="text-xs text-green-600 bg-green-50">
                  This week
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Daily Clicks Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Daily Clicks (Last 7 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.dailyClicks.map((day, index) => {
                    const maxClicks = Math.max(...analytics.dailyClicks.map(d => d.clicks));
                    const percentage = (day.clicks / maxClicks) * 100;
                    
                    return (
                      <div key={day.date} className="flex items-center gap-3">
                        <div className="text-sm font-medium w-16">
                          {new Date(day.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-sm font-medium w-12 text-right">
                          {day.clicks}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Top Referrers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Referrers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.topReferrers.map((referrer, index) => (
                    <div key={referrer.source} className="flex items-center gap-3">
                      <div className="flex items-center gap-2 flex-1">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium">{referrer.source}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-gray-600">
                          {referrer.clicks.toLocaleString()}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {referrer.percentage}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Link Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Link Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userData.links
                  .sort((a, b) => b.clicks - a.clicks)
                  .slice(0, 5)
                  .map((link, index) => {
                    const maxClicks = Math.max(...userData.links.map(l => l.clicks));
                    const percentage = (link.clicks / maxClicks) * 100;
                    
                    return (
                      <div key={link.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate mb-1">
                            {link.title}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <div className="text-sm font-medium">
                              {link.clicks.toLocaleString()} clicks
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          #{index + 1}
                        </Badge>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1">
              Export Data
            </Button>
            <Button onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsModal;