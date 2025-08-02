import React, { useState } from 'react';
import { X, Palette, Type, MousePointer, Smartphone } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';
import { themeTemplates, fontOptions } from '../data/mockData';

const ThemeCustomizer = ({ currentTheme, onThemeChange, onClose, isMobile = false }) => {
  const [selectedFont, setSelectedFont] = useState('Inter, sans-serif');
  const [buttonStyle, setButtonStyle] = useState('rounded');
  const [shadowIntensity, setShadowIntensity] = useState('medium');

  const CustomizerContent = () => (
    <ScrollArea className={isMobile ? "h-[70vh]" : "max-h-[80vh]"}>
      <div className="space-y-6 pr-4">
        {/* Theme Templates */}
        <div>
          <Label className="text-base font-semibold mb-4 block">Theme Templates</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{template.name}</div>
                      <div className="text-xs text-gray-500 truncate">{template.description}</div>
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

        {/* Font Selection - Mobile Optimized */}
        <div>
          <Label className="text-base font-semibold mb-4 flex items-center gap-2">
            <Type className="w-4 h-4" />
            Font Family
          </Label>
          
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Popular Fonts</Label>
              <div className="grid grid-cols-2 gap-2">
                {fontOptions.googleFonts.slice(0, 6).map((font) => (
                  <Button
                    key={font.value}
                    variant={selectedFont === font.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFont(font.value)}
                    className="text-xs h-10 justify-start"
                    style={{ fontFamily: font.value }}
                  >
                    {font.name}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">All Fonts</Label>
              <Select value={selectedFont} onValueChange={setSelectedFont}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <div className="px-2 py-1 text-xs font-medium text-gray-500">Web Safe</div>
                  {fontOptions.webSafe.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      <span style={{ fontFamily: font.value }}>{font.name}</span>
                    </SelectItem>
                  ))}
                  <div className="px-2 py-1 text-xs font-medium text-gray-500 border-t mt-1 pt-2">Google Fonts</div>
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

        {/* Button Styles - Mobile Optimized */}
        <div>
          <Label className="text-base font-semibold mb-4 flex items-center gap-2">
            <MousePointer className="w-4 h-4" />
            Button Styles
          </Label>
          
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-3 block">Corner Style</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={buttonStyle === 'rounded' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setButtonStyle('rounded')}
                  className="rounded-lg h-10"
                >
                  Rounded
                </Button>
                <Button
                  variant={buttonStyle === 'sharp' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setButtonStyle('sharp')}
                  className="rounded-none h-10"
                >
                  Sharp
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Shadow Intensity</Label>
              <div className="grid grid-cols-2 gap-2">
                {['none', 'light', 'medium', 'heavy'].map((intensity) => (
                  <Button
                    key={intensity}
                    variant={shadowIntensity === intensity ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setShadowIntensity(intensity)}
                    className={`h-10 text-xs ${
                      intensity === 'none' ? 'shadow-none' :
                      intensity === 'light' ? 'shadow-sm' :
                      intensity === 'medium' ? 'shadow-md' : 'shadow-lg'
                    }`}
                  >
                    {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Preview */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center gap-2 mb-3">
            <Smartphone className="w-4 h-4" />
            <Label className="text-sm font-medium">Mobile Preview</Label>
          </div>
          <div className="bg-white rounded-lg p-4 space-y-3">
            <div 
              className="font-semibold text-lg"
              style={{ fontFamily: selectedFont }}
            >
              Sample Heading
            </div>
            <p 
              className="text-gray-600 text-sm"
              style={{ fontFamily: selectedFont }}
            >
              This is how your content will look on mobile devices.
            </p>
            <Button 
              size="sm"
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
      </div>
    </ScrollArea>
  );

  if (isMobile) {
    return (
      <Sheet open={true} onOpenChange={onClose}>
        <SheetContent side="bottom" className="h-[95vh]">
          <SheetHeader className="pb-4">
            <SheetTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Customize Theme
            </SheetTitle>
          </SheetHeader>
          <CustomizerContent />
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1 h-12">
              Cancel
            </Button>
            <Button onClick={onClose} className="flex-1 h-12">
              Apply Changes
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Customize Theme
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <CustomizerContent />
          <div className="flex gap-3 pt-6 border-t">
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