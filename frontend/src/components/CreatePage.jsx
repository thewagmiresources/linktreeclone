import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Plus, Link, Upload, Palette, Eye } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Link Page
          </h1>
          <p className="text-gray-600">
            Build a beautiful page to share all your important links
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Display Name</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="username">Username (Optional)</Label>
                  <Input
                    id="username"
                    placeholder="your-username"
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty for anonymous page
                  </p>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell people about yourself..."
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                  />
                </div>

                {/* Mode Toggle */}
                <div>
                  <Label>Page Mode</Label>
                  <div className="flex gap-2 mt-2">
                    <Button
                      type="button"
                      variant={formData.mode === 'creator' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, mode: 'creator' }))}
                    >
                      🎨 Creator Mode
                    </Button>
                    <Button
                      type="button"
                      variant={formData.mode === 'business' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, mode: 'business' }))}
                    >
                      💼 Business Mode
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Links Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  Add Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add New Link Form */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="grid gap-3">
                    <Input
                      placeholder="Link title"
                      value={newLink.title}
                      onChange={(e) => setNewLink(prev => ({ ...prev, title: e.target.value }))}
                    />
                    <Input
                      placeholder="https://..."
                      value={newLink.url}
                      onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                    />
                    <Input
                      placeholder="Description (optional)"
                      value={newLink.description}
                      onChange={(e) => setNewLink(prev => ({ ...prev, description: e.target.value }))}
                    />
                    <Button onClick={handleAddLink} size="sm" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Link
                    </Button>
                  </div>
                </div>

                {/* Existing Links */}
                <div className="space-y-2">
                  {formData.links.map((link) => (
                    <div key={link.id} className="flex items-center gap-3 p-3 border rounded-lg bg-white">
                      <Link className="w-4 h-4 text-gray-400" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{link.title}</div>
                        <div className="text-xs text-gray-500 truncate">{link.url}</div>
                      </div>
                      <Button
                        onClick={() => handleRemoveLink(link.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button onClick={handlePreview} variant="outline" className="flex-1">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handlePublish} className="flex-1">
                Publish Page
              </Button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg p-6 min-h-96">
                  {/* Mini Preview */}
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl">
                      {formData.name ? formData.name.charAt(0) : '?'}
                    </div>
                    <h3 className="font-bold text-gray-900">
                      {formData.name || 'Your Name'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      @{formData.username || 'username'}
                    </p>
                    <Badge 
                      variant="secondary" 
                      className={`mt-2 ${formData.mode === 'creator' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}
                    >
                      {formData.mode === 'creator' ? '🎨 Creator' : '💼 Business'}
                    </Badge>
                  </div>
                  
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600">
                      {formData.bio || 'Your bio will appear here...'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {formData.links.length === 0 ? (
                      <p className="text-xs text-gray-500 text-center py-4">
                        Add links to see them here
                      </p>
                    ) : (
                      formData.links.map((link) => (
                        <div key={link.id} className="bg-white rounded-lg p-3 border text-xs">
                          <div className="font-medium text-gray-900 truncate">
                            {link.title}
                          </div>
                          <div className="text-gray-500 truncate">
                            {link.url}
                          </div>
                        </div>
                      ))
                    )}
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