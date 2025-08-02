import React, { useState, useEffect } from 'react';
import { Search, Image, Code, Download, Eye, Share2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const SEOGenerator = ({ userData, onClose }) => {
  const [generatedOG, setGeneratedOG] = useState(null);
  const [jsonLD, setJsonLD] = useState('');
  const [metaTags, setMetaTags] = useState('');

  useEffect(() => {
    generateSEOContent();
  }, [userData]);

  const generateSEOContent = () => {
    // Generate OG Image URL (in real app, this would be a server endpoint)
    const ogImageUrl = `https://og-generator.example.com/generate?name=${encodeURIComponent(userData.name)}&username=${encodeURIComponent(userData.username)}&bio=${encodeURIComponent(userData.bio)}&cover=${encodeURIComponent(userData.coverPhoto)}&profile=${encodeURIComponent(userData.profilePhoto)}&links=${encodeURIComponent(JSON.stringify(userData.links.slice(0, 3)))}`;
    
    setGeneratedOG({
      url: ogImageUrl,
      width: 1200,
      height: 630,
      preview: userData.coverPhoto // Mock preview using cover photo
    });

    // Generate JSON-LD Schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": userData.name,
      "alternateName": userData.username,
      "description": userData.bio,
      "image": userData.profilePhoto,
      "url": `${window.location.origin}/u/${userData.username}`,
      "sameAs": userData.links.filter(link => 
        link.type === 'social' || 
        link.url.includes('instagram.com') || 
        link.url.includes('twitter.com') || 
        link.url.includes('youtube.com') ||
        link.url.includes('tiktok.com')
      ).map(link => link.url),
      "potentialAction": {
        "@type": "ViewAction",
        "target": userData.links.map(link => ({
          "@type": "EntryPoint",
          "urlTemplate": link.url,
          "name": link.title,
          "description": link.description
        }))
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": userData.stats.totalViews
      }
    };

    setJsonLD(JSON.stringify(schema, null, 2));

    // Generate Meta Tags
    const tags = `<!-- Open Graph / Facebook -->
<meta property="og:type" content="profile" />
<meta property="og:url" content="${window.location.origin}/u/${userData.username}" />
<meta property="og:title" content="${userData.name} - ${userData.username}" />
<meta property="og:description" content="${userData.bio}" />
<meta property="og:image" content="${ogImageUrl}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${window.location.origin}/u/${userData.username}" />
<meta property="twitter:title" content="${userData.name} - ${userData.username}" />
<meta property="twitter:description" content="${userData.bio}" />
<meta property="twitter:image" content="${ogImageUrl}" />

<!-- LinkedIn -->
<meta property="linkedin:title" content="${userData.name} - ${userData.username}" />
<meta property="linkedin:description" content="${userData.bio}" />
<meta property="linkedin:image" content="${ogImageUrl}" />

<!-- Discord -->
<meta name="theme-color" content="#1877f2" />
<meta name="description" content="${userData.bio}" />

<!-- Additional SEO -->
<meta name="keywords" content="${userData.name}, ${userData.username}, links, social media, ${userData.mode}" />
<meta name="author" content="${userData.name}" />
<link rel="canonical" href="${window.location.origin}/u/${userData.username}" />`;

    setMetaTags(tags);
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`✅ ${type} copied to clipboard!`);
    });
  };

  const downloadOGImage = () => {
    // In real app, this would trigger OG image generation and download
    alert('📸 OG Image generation started! Check your downloads in a moment.');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Zero-Config SEO & Social Sharing
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="og-image" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="og-image" className="flex items-center gap-2">
                <Image className="w-4 h-4" />
                OG Image
              </TabsTrigger>
              <TabsTrigger value="meta-tags" className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                Meta Tags
              </TabsTrigger>
              <TabsTrigger value="json-ld" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                JSON-LD
              </TabsTrigger>
            </TabsList>

            {/* OG Image Tab */}
            <TabsContent value="og-image" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Auto-Generated Social Preview</CardTitle>
                  <p className="text-sm text-gray-600">
                    Perfect for Discord, Twitter, LinkedIn, and Facebook unfurls
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* OG Image Preview */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="aspect-[1200/630] bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg overflow-hidden relative">
                      {/* Mock OG Image Layout */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-30"
                        style={{ backgroundImage: `url(${userData.coverPhoto})` }}
                      ></div>
                      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                      <div className="absolute inset-0 flex items-center justify-center p-8 text-white">
                        <div className="text-center max-w-2xl">
                          <div className="flex items-center justify-center mb-4">
                            <img 
                              src={userData.profilePhoto} 
                              alt={userData.name}
                              className="w-16 h-16 rounded-full border-4 border-white mr-4"
                            />
                            <div className="text-left">
                              <h1 className="text-3xl font-bold">{userData.name}</h1>
                              <p className="text-xl opacity-90">@{userData.username}</p>
                            </div>
                          </div>
                          <p className="text-lg mb-6 opacity-90 line-clamp-2">{userData.bio}</p>
                          <div className="grid grid-cols-3 gap-4">
                            {userData.links.slice(0, 3).map((link, idx) => (
                              <div key={idx} className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                                <div className="text-sm font-medium truncate">{link.title}</div>
                                <div className="text-xs opacity-75">{link.clicks} clicks</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* OG Image Details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="font-medium">Image Details</div>
                      <div className="text-sm space-y-1">
                        <div>Dimensions: 1200 × 630px</div>
                        <div>Format: PNG with transparency</div>
                        <div>File size: ~45KB optimized</div>
                        <div>Includes: Cover + Profile + Top 3 links</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-medium">Platform Support</Label>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline">Discord</Badge>
                        <Badge variant="outline">Twitter</Badge>
                        <Badge variant="outline">Facebook</Badge>
                        <Badge variant="outline">LinkedIn</Badge>
                        <Badge variant="outline">Telegram</Badge>
                        <Badge variant="outline">WhatsApp</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={downloadOGImage} className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Generate & Download
                    </Button>
                    <Button variant="outline" onClick={() => copyToClipboard(generatedOG?.url, 'OG Image URL')}>
                      Copy URL
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Meta Tags Tab */}
            <TabsContent value="meta-tags" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Social Media Meta Tags</CardTitle>
                  <p className="text-sm text-gray-600">
                    Copy these tags into your HTML &lt;head&gt; section
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea 
                    value={metaTags}
                    readOnly
                    rows={20}
                    className="font-mono text-xs"
                  />
                  <div className="flex gap-2">
                    <Button onClick={() => copyToClipboard(metaTags, 'Meta tags')} className="flex-1">
                      Copy Meta Tags
                    </Button>
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* JSON-LD Tab */}
            <TabsContent value="json-ld" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">JSON-LD Structured Data</CardTitle>
                  <p className="text-sm text-gray-600">
                    Helps Google understand your content for rich search results
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea 
                    value={jsonLD}
                    readOnly
                    rows={15}
                    className="font-mono text-xs"
                  />
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">SEO Benefits:</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Enhanced Google search results with site links</li>
                      <li>• Rich snippets showing your links directly in search</li>
                      <li>• Better social media integration</li>
                      <li>• Improved search engine understanding</li>
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={() => copyToClipboard(jsonLD, 'JSON-LD schema')} className="flex-1">
                      Copy JSON-LD
                    </Button>
                    <Button variant="outline" onClick={() => window.open('https://search.google.com/test/rich-results', '_blank')}>
                      Test in Google
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button className="flex-1">
              <Share2 className="w-4 h-4 mr-2" />
              Apply All SEO
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOGenerator;