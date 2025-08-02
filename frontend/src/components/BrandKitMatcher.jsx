import React, { useState } from 'react';
import { Palette, Upload, Wand2, Eye, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';

const BrandKitMatcher = ({ onApplyBrandKit, onClose }) => {
  const [step, setStep] = useState(1);
  const [brandData, setBrandData] = useState({
    colors: [],
    fonts: [],
    logoUrl: '',
    websiteUrl: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [extractedBrand, setExtractedBrand] = useState(null);

  const handleWebsiteAnalysis = async () => {
    if (!brandData.websiteUrl) return;
    
    setIsAnalyzing(true);
    
    // Mock analysis - in real app, this would analyze the website
    setTimeout(() => {
      const mockBrandKit = {
        primaryColor: '#1877f2',
        secondaryColor: '#42a5f5',
        accentColor: '#66bb6a',
        backgroundColor: '#f5f5f5',
        textColor: '#212121',
        font: 'Inter, sans-serif',
        logoColors: ['#1877f2', '#ffffff'],
        vibe: 'Professional & Trustworthy',
        industry: 'Technology'
      };
      
      setExtractedBrand(mockBrandKit);
      setIsAnalyzing(false);
      setStep(2);
    }, 2000);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBrandData(prev => ({ ...prev, logoUrl: e.target.result }));
        
        // Mock color extraction from logo
        setTimeout(() => {
          const mockExtractedColors = ['#1877f2', '#42a5f5', '#ffffff', '#212121'];
          setBrandData(prev => ({ ...prev, colors: mockExtractedColors }));
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyBrandKit = () => {
    const customTheme = {
      name: 'My Brand',
      background: extractedBrand.backgroundColor,
      cardBg: '#ffffff',
      textPrimary: extractedBrand.textColor,
      textSecondary: '#666666',
      accent: extractedBrand.primaryColor,
      buttonPrimary: `bg-[${extractedBrand.primaryColor}] hover:bg-[${extractedBrand.secondaryColor}] text-white`,
      buttonSecondary: `bg-gray-100 hover:bg-gray-200 text-[${extractedBrand.textColor}]`,
      font: extractedBrand.font
    };
    
    onApplyBrandKit(customTheme);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5" />
            Match My Brand Kit
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {step === 1 && (
            <>
              <div className="text-center mb-6">
                <p className="text-gray-600">
                  Let's analyze your brand and create a matching theme automatically
                </p>
              </div>

              {/* Website Analysis */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Option 1: Analyze Your Website</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="https://yourbusiness.com"
                    value={brandData.websiteUrl}
                    onChange={(e) => setBrandData(prev => ({ ...prev, websiteUrl: e.target.value }))}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleWebsiteAnalysis}
                    disabled={!brandData.websiteUrl || isAnalyzing}
                    className="flex-shrink-0"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        Analyze
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  We'll extract colors, fonts, and overall vibe from your website
                </p>
              </div>

              <div className="text-center text-gray-400">OR</div>

              {/* Logo Upload */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Option 2: Upload Your Logo</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {brandData.logoUrl ? (
                    <div className="space-y-3">
                      <img 
                        src={brandData.logoUrl} 
                        alt="Logo" 
                        className="max-h-20 mx-auto"
                      />
                      <p className="text-sm text-green-600">✅ Logo uploaded! Colors extracted.</p>
                      {brandData.colors.length > 0 && (
                        <div className="flex justify-center gap-2">
                          {brandData.colors.map((color, idx) => (
                            <div 
                              key={idx}
                              className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                              style={{ backgroundColor: color }}
                              title={color}
                            ></div>
                          ))}
                        </div>
                      )}
                      <Button onClick={() => setStep(2)} className="mt-4">
                        <Palette className="w-4 h-4 mr-2" />
                        Create Theme from Logo
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                        id="logo-upload"
                      />
                      <Label htmlFor="logo-upload" className="cursor-pointer">
                        <Button variant="outline" className="pointer-events-none">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Logo
                        </Button>
                      </Label>
                      <p className="text-xs text-gray-500 mt-2">
                        We'll extract your brand colors automatically
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {step === 2 && extractedBrand && (
            <>
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">🎨 Brand Analysis Complete!</h3>
                <p className="text-gray-600">
                  Here's what we found about your brand
                </p>
              </div>

              {/* Brand Analysis Results */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Color Palette</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: extractedBrand.primaryColor }}
                      ></div>
                      <div>
                        <div className="font-medium">Primary</div>
                        <div className="text-xs text-gray-500">{extractedBrand.primaryColor}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: extractedBrand.secondaryColor }}
                      ></div>
                      <div>
                        <div className="font-medium">Secondary</div>
                        <div className="text-xs text-gray-500">{extractedBrand.secondaryColor}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: extractedBrand.accentColor }}
                      ></div>
                      <div>
                        <div className="font-medium">Accent</div>
                        <div className="text-xs text-gray-500">{extractedBrand.accentColor}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Brand Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Badge variant="outline" className="mb-2">{extractedBrand.industry}</Badge>
                      <p className="text-sm text-gray-600">{extractedBrand.vibe}</p>
                    </div>
                    <div>
                      <div className="font-medium text-sm">Recommended Font</div>
                      <div className="text-sm" style={{ fontFamily: extractedBrand.font }}>
                        {extractedBrand.font}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Theme Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Theme Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="p-6 rounded-lg border-2"
                    style={{ 
                      backgroundColor: extractedBrand.backgroundColor,
                      color: extractedBrand.textColor,
                      fontFamily: extractedBrand.font
                    }}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold"
                           style={{ backgroundColor: extractedBrand.primaryColor }}>
                        YB
                      </div>
                      <h3 className="font-bold mb-1">Your Business</h3>
                      <p className="text-sm opacity-75 mb-4">Your brand description here</p>
                      <Button 
                        className="text-white"
                        style={{ backgroundColor: extractedBrand.primaryColor }}
                      >
                        Sample Link
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={applyBrandKit} className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Apply Brand Theme
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandKitMatcher;