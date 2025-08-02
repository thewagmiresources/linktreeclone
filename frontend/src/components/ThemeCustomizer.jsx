import React, { useState } from 'react';
import { X, Palette, Type, MousePointer } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { themeTemplates, fontOptions } from '../data/mockData';

const ThemeCustomizer = ({ currentTheme, onThemeChange, onClose }) => {
  const [selectedFont, setSelectedFont] = useState('Inter, sans-serif');
  const [buttonStyle, setButtonStyle] = useState('rounded');
  const [shadowIntensity, setShadowIntensity] = useState('medium');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Customize Theme
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Theme Templates */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Theme Templates</Label>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(themeTemplates).map(([key, template]) => (
                <Card 
                  key={key}
                  className={`cursor-pointer transition-all ${
                    currentTheme === key 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => onThemeChange(key)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: template.preview }}
                      ></div>
                      <div>
                        <div className="font-medium text-sm">{template.name}</div>
                        <div className="text-xs text-gray-500">{template.description}</div>
                      </div>
                    </div>
                    {currentTheme === key && (
                      <Badge className="mt-2 text-xs">Active</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Font Selection */}
          <div>
            <Label className="text-base font-semibold mb-3 flex items-center gap-2">
              <Type className="w-4 h-4" />
              Font Family
            </Label>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Web Safe Fonts</Label>
                <Select value={selectedFont} onValueChange={setSelectedFont}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.webSafe.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        <span style={{ fontFamily: font.value }}>{font.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Google Fonts</Label>
                <Select value={selectedFont} onValueChange={setSelectedFont}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.googleFonts.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        <span style={{ fontFamily: font.value }}>{font.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Button Styles */}
          <div>
            <Label className="text-base font-semibold mb-3 flex items-center gap-2">
              <MousePointer className="w-4 h-4" />
              Button Styles
            </Label>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Corner Style</Label>
                <div className="flex gap-2">
                  <Button
                    variant={buttonStyle === 'rounded' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setButtonStyle('rounded')}
                    className="rounded-lg"
                  >
                    Rounded
                  </Button>
                  <Button
                    variant={buttonStyle === 'sharp' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setButtonStyle('sharp')}
                    className="rounded-none"
                  >
                    Sharp
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Fill Style</Label>
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    className="pointer-events-none"
                  >
                    Filled
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="pointer-events-none"
                  >
                    Outline
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Shadow Intensity</Label>
                <div className="flex gap-2">
                  {['none', 'light', 'medium', 'heavy'].map((intensity) => (
                    <Button
                      key={intensity}
                      variant={shadowIntensity === intensity ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setShadowIntensity(intensity)}
                      className={
                        intensity === 'none' ? 'shadow-none' :
                        intensity === 'light' ? 'shadow-sm' :
                        intensity === 'medium' ? 'shadow-md' : 'shadow-lg'
                      }
                    >
                      {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <Label className="text-sm font-medium mb-2 block">Preview</Label>
            <div className="space-y-2">
              <div 
                className="font-semibold text-lg"
                style={{ fontFamily: selectedFont }}
              >
                Sample Heading Text
              </div>
              <p 
                className="text-gray-600"
                style={{ fontFamily: selectedFont }}
              >
                This is how your content will look with the selected font.
              </p>
              <Button 
                className={`${
                  buttonStyle === 'rounded' ? 'rounded-lg' : 'rounded-none'
                } ${
                  shadowIntensity === 'none' ? 'shadow-none' :
                  shadowIntensity === 'light' ? 'shadow-sm' :
                  shadowIntensity === 'medium' ? 'shadow-md' : 'shadow-lg'
                }`}
                style={{ fontFamily: selectedFont }}
              >
                Sample Button
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={onClose} className="flex-1">
              Apply Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeCustomizer;