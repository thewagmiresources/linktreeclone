import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Plus, Link, Upload, Palette, Eye, Smartphone, X, ChevronDown, ChevronUp } from 'lucide-react';

const CreatePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    bio: '',
    mode: 'creator',
    links: []
  });
  const [newLink, setNewLink] = useState({
    title: '',
    url: '',
    description: ''
  });
  const [showPreview, setShowPreview] = useState(false);
  const [isFormExpanded, setIsFormExpanded] = useState(true);

  const handleAddLink = () => {
    if (newLink.title && newLink.url) {
      setFormData(prev => ({
        ...prev,
        links: [...prev.links, {
          id: Date.now(),
          ...newLink,
          createdAt: new Date().toISOString(),
          clicks: 0,
          type: 'custom'
        }]
      }));
      setNewLink({ title: '', url: '', description: '' });
    }
  };

  const handleRemoveLink = (id) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.filter(link => link.id !== id)
    }));
  };

  const handlePreview = () => {
    // Store form data in localStorage for preview
    localStorage.setItem('previewData', JSON.stringify(formData));
    navigate('/preview');
  };

  const handlePublish = () => {
    // In real app, save to backend
    const username = formData.username || `user${Date.now()}`;
    navigate(`/u/${username}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-First Header */}
      <div className="sticky top-0 z-10 bg-white border-b px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg md:text-xl font-bold text-gray-900">
            Create Your Page
          </h1>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowPreview(!showPreview)}
              variant="outline"
              size="sm"
              className="md:hidden"
            >
              <Smartphone className="w-4 h-4 mr-1" />
              {showPreview ? 'Edit' : 'Preview'}
            </Button>
            <Button onClick={handlePublish} size="sm">
              Publish
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className={`${showPreview ? 'hidden md:grid' : 'grid'} md:grid-cols-2 gap-6 md:gap-8`}>
          {/* Mobile-First Form Section */}
          <div className="space-y-4 md:space-y-6">
            {/* Collapsible Basic Info Section - Mobile */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm md:text-base">1</span>
                    </div>
                    Basic Info
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden"
                    onClick={() => setIsFormExpanded(!isFormExpanded)}
                  >
                    {isFormExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>
              {(isFormExpanded || window.innerWidth >= 768) && (
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">Display Name</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="username" className="text-sm font-medium">Username (Optional)</Label>
                    <Input
                      id="username"
                      placeholder="your-username"
                      value={formData.username}
                      onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Leave empty for anonymous page
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell people about yourself..."
                      value={formData.bio}
                      onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                      rows={3}
                      className="mt-1 resize-none"
                    />
                  </div>

                  {/* Mobile-Optimized Mode Toggle */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Page Mode</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant={formData.mode === 'creator' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFormData(prev => ({ ...prev, mode: 'creator' }))}
                        className="h-10 text-xs md:text-sm"
                      >
                        🎨 Creator
                      </Button>
                      <Button
                        type="button"
                        variant={formData.mode === 'business' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFormData(prev => ({ ...prev, mode: 'business' }))}
                        className="h-10 text-xs md:text-sm"
                      >
                        💼 Business
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Links Section */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm md:text-base">2</span>
                  </div>
                  Add Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Mobile-Optimized Add New Link Form */}
                <div className="border rounded-lg p-3 md:p-4 bg-gray-50">
                  <div className="space-y-3">
                    <Input
                      placeholder="Link title"
                      value={newLink.title}
                      onChange={(e) => setNewLink(prev => ({ ...prev, title: e.target.value }))}
                      className="text-sm"
                    />
                    <Input
                      placeholder="https://..."
                      value={newLink.url}
                      onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                      className="text-sm"
                    />
                    <Input
                      placeholder="Description (optional)"
                      value={newLink.description}
                      onChange={(e) => setNewLink(prev => ({ ...prev, description: e.target.value }))}
                      className="text-sm"
                    />
                    <Button onClick={handleAddLink} size="sm" className="w-full h-10">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Link
                    </Button>
                  </div>
                </div>

                {/* Mobile-Optimized Existing Links */}
                <div className="space-y-2">
                  {formData.links.map((link) => (
                    <div key={link.id} className="flex items-center gap-3 p-3 border rounded-lg bg-white">
                      <Link className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{link.title}</div>
                        <div className="text-xs text-gray-500 truncate">{link.url}</div>
                      </div>
                      <Button
                        onClick={() => handleRemoveLink(link.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0 h-8 w-8 p-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mobile Action Buttons */}
            <div className="flex gap-3 pb-6 md:pb-0">
              <Button onClick={handlePreview} variant="outline" className="flex-1 h-12">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handlePublish} className="flex-1 h-12">
                Publish Page
              </Button>
            </div>
          </div>

          {/* Mobile-First Preview Section */}
          <div className={`${showPreview ? 'block' : 'hidden md:block'} md:sticky md:top-24`}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <Smartphone className="w-4 h-4 md:w-5 md:h-5" />
                  Mobile Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Mobile Phone Frame */}
                <div className="mx-auto max-w-xs">
                  <div className="bg-black rounded-3xl p-2 shadow-2xl">
                    <div className="bg-white rounded-2xl overflow-hidden h-96 md:h-[600px]">
                      {/* Mock Mobile Preview */}
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-20 md:h-32 relative">
                        <div className="absolute -bottom-6 md:-bottom-8 left-1/2 transform -translate-x-1/2">
                          <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-lg md:text-xl">
                            {formData.name ? formData.name.charAt(0) : '?'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="px-4 pt-8 md:pt-10 pb-4 text-center">
                        <h3 className="font-bold text-gray-900 text-sm md:text-base">
                          {formData.name || 'Your Name'}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-600">
                          @{formData.username || 'username'}
                        </p>
                        <Badge 
                          variant="secondary" 
                          className={`mt-2 text-xs ${formData.mode === 'creator' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}
                        >
                          {formData.mode === 'creator' ? '🎨 Creator' : '💼 Business'}
                        </Badge>
                        
                        <div className="mt-3 mb-4">
                          <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                            {formData.bio || 'Your bio will appear here...'}
                          </p>
                        </div>

                        <div className="space-y-2">
                          {formData.links.length === 0 ? (
                            <p className="text-xs text-gray-500 py-8">
                              Add links to see them here
                            </p>
                          ) : (
                            formData.links.map((link) => (
                              <div key={link.id} className="bg-gray-50 rounded-lg p-3 text-left">
                                <div className="font-medium text-xs md:text-sm text-gray-900 truncate">
                                  {link.title}
                                </div>
                                <div className="text-xs text-gray-500 truncate">
                                  {link.url}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mt-4">
                    <div className="text-xs text-gray-500">Mobile Preview</div>
                    <div className="text-xs text-gray-400">Optimized for touch</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;