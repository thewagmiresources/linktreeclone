import React, { useState } from 'react';
import { Shield, Database, Cookie, Eye, Lock, Globe, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';

const PrivacyAnalytics = ({ onUpdateSettings, onClose }) => {
  const [privacySettings, setPrivacySettings] = useState({
    clientSideOnly: true,
    enableCookies: false,
    enableDeepTracking: false,
    allowDataExport: true,
    gdprCompliant: true,
    shareWithThirdParty: false,
    anonymizeIPs: true,
    dataRetentionDays: 30
  });

  const [showDataInsights, setShowDataInsights] = useState(false);

  // Mock analytics data stored client-side
  const mockClientSideData = {
    totalPageViews: 1247,
    uniqueVisitors: 892,
    linkClicks: 2341,
    avgSessionTime: '2m 34s',
    topReferrers: ['Direct', 'Instagram', 'Twitter'],
    deviceTypes: { mobile: 68, desktop: 24, tablet: 8 },
    storageSize: '2.4 KB',
    lastUpdated: 'Real-time'
  };

  const handleSettingChange = (setting, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }));

    // Show warning when enabling server-side tracking
    if (setting === 'clientSideOnly' && !value) {
      setShowDataInsights(true);
    }
  };

  const exportClientData = () => {
    const dataToExport = {
      analytics: mockClientSideData,
      settings: privacySettings,
      exportDate: new Date().toISOString(),
      format: 'JSON'
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'linktree-analytics-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearClientData = () => {
    if (window.confirm('Are you sure you want to clear all local analytics data? This cannot be undone.')) {
      // In real app, clear localStorage/IndexedDB
      alert('✅ Local analytics data cleared');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            Privacy-First Analytics
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Privacy Status */}
          <Alert className="border-green-200 bg-green-50">
            <Shield className="w-4 h-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Privacy Protected:</strong> Your analytics are stored locally on your device by default. 
              No cookies, no tracking, GDPR & CCPA compliant out of the box.
            </AlertDescription>
          </Alert>

          {/* Current Data Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <Eye className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-blue-900">{mockClientSideData.totalPageViews.toLocaleString()}</div>
                <div className="text-sm text-blue-700">Page Views</div>
                <Badge variant="outline" className="mt-1 text-xs text-blue-600">
                  Client-side only
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <Database className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-purple-900">{mockClientSideData.storageSize}</div>
                <div className="text-sm text-purple-700">Storage Used</div>
                <Badge variant="outline" className="mt-1 text-xs text-purple-600">
                  Local device
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <Lock className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-green-900">100%</div>
                <div className="text-sm text-green-700">Privacy Score</div>
                <Badge variant="outline" className="mt-1 text-xs text-green-600">
                  GDPR Ready
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4 text-center">
                <Globe className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-orange-900">0</div>
                <div className="text-sm text-orange-700">3rd Party Shares</div>
                <Badge variant="outline" className="mt-1 text-xs text-orange-600">
                  None
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label className="font-medium flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Client-Side Analytics Only
                  </Label>
                  <p className="text-sm text-gray-500">Store all analytics data locally on visitor's device (Recommended)</p>
                </div>
                <Switch 
                  checked={privacySettings.clientSideOnly}
                  onCheckedChange={(checked) => handleSettingChange('clientSideOnly', checked)}
                />
              </div>

              {!privacySettings.clientSideOnly && (
                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <strong>Privacy Impact:</strong> Enabling server-side tracking will collect and store visitor data on our servers. 
                    This requires cookie consent and may affect GDPR compliance.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label className="font-medium flex items-center gap-2">
                    <Cookie className="w-4 h-4" />
                    Enable Cookies
                  </Label>
                  <p className="text-sm text-gray-500">Use cookies for enhanced analytics (requires consent banner)</p>
                </div>
                <Switch 
                  checked={privacySettings.enableCookies}
                  onCheckedChange={(checked) => handleSettingChange('enableCookies', checked)}
                  disabled={privacySettings.clientSideOnly}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label className="font-medium">Anonymize IP Addresses</Label>
                  <p className="text-sm text-gray-500">Remove last octet from IP addresses for privacy</p>
                </div>
                <Switch 
                  checked={privacySettings.anonymizeIPs}
                  onCheckedChange={(checked) => handleSettingChange('anonymizeIPs', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label className="font-medium">Allow Data Export</Label>
                  <p className="text-sm text-gray-500">Users can download their analytics data</p>
                </div>
                <Switch 
                  checked={privacySettings.allowDataExport}
                  onCheckedChange={(checked) => handleSettingChange('allowDataExport', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Data Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Current Storage</Label>
                  <p className="text-sm text-gray-500">Analytics data stored locally: {mockClientSideData.storageSize}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={exportClientData}>
                    Export Data
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearClientData} className="text-red-600 hover:text-red-700">
                    Clear Data
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium mb-2">Data Retention Policy</h4>
                <p className="text-sm text-gray-600 mb-2">
                  When client-side only is enabled, data stays on the visitor's device and you control retention.
                </p>
                <div className="text-xs text-gray-500">
                  • No server storage • No cross-device tracking • GDPR Article 25 compliant (Privacy by Design)
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-green-600 border-green-200">
              <Shield className="w-3 h-3 mr-1" />
              GDPR Compliant
            </Badge>
            <Badge variant="outline" className="text-blue-600 border-blue-200">
              <Lock className="w-3 h-3 mr-1" />
              CCPA Ready
            </Badge>
            <Badge variant="outline" className="text-purple-600 border-purple-200">
              <Database className="w-3 h-3 mr-1" />
              Privacy by Design
            </Badge>
            <Badge variant="outline" className="text-orange-600 border-orange-200">
              <Eye className="w-3 h-3 mr-1" />
              Zero Tracking
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button 
              onClick={() => {
                onUpdateSettings(privacySettings);
                onClose();
              }} 
              className="flex-1"
            >
              Save Privacy Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyAnalytics;