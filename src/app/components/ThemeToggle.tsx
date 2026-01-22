import { Moon, Sun, Eye, Palette } from 'lucide-react';
import { useTheme, ThemeMode } from '@/app/contexts/ThemeContext';
import { Button } from '@/app/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themeOptions: { value: ThemeMode; label: string; icon: React.ReactNode; description: string }[] = [
    {
      value: 'light',
      label: 'Light Mode',
      icon: <Sun className="h-4 w-4" />,
      description: 'Default bright theme'
    },
    {
      value: 'dark',
      label: 'Dark Mode',
      icon: <Moon className="h-4 w-4" />,
      description: 'Easy on the eyes'
    },
    {
      value: 'deuteranopia',
      label: 'Deuteranopia',
      icon: <Eye className="h-4 w-4" />,
      description: 'Red-green colorblind'
    },
    {
      value: 'protanopia',
      label: 'Protanopia',
      icon: <Eye className="h-4 w-4" />,
      description: 'Red-blind friendly'
    },
    {
      value: 'tritanopia',
      label: 'Tritanopia',
      icon: <Eye className="h-4 w-4" />,
      description: 'Blue-yellow colorblind'
    },
  ];

  const currentTheme = themeOptions.find(option => option.value === theme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className={`relative rounded-lg transition-all ${
            theme === 'dark' 
              ? 'hover:bg-gray-800 text-gray-300' 
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          {theme === 'dark' ? (
            <Moon className="h-5 w-5" />
          ) : theme === 'light' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Palette className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className={`w-64 ${
          theme === 'dark' 
            ? 'bg-gray-900 border-gray-800 text-white' 
            : 'bg-white border-gray-200'
        }`}
        style={{ zIndex: 9999 }}
      >
        <DropdownMenuLabel className={theme === 'dark' ? 'text-gray-300' : ''}>
          Theme Options
        </DropdownMenuLabel>
        <DropdownMenuSeparator className={theme === 'dark' ? 'bg-gray-800' : ''} />
        
        {themeOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setTheme(option.value)}
            className={`flex items-start gap-3 cursor-pointer py-3 ${
              theme === 'dark'
                ? 'hover:bg-gray-800 focus:bg-gray-800'
                : 'hover:bg-gray-100 focus:bg-gray-100'
            } ${
              theme === option.value
                ? theme === 'dark'
                  ? 'bg-gray-800'
                  : 'bg-gray-100'
                : ''
            }`}
          >
            <div className="mt-0.5">{option.icon}</div>
            <div className="flex-1">
              <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {option.label}
                {theme === option.value && (
                  <span className="ml-2 text-xs text-green-600 dark:text-green-400">✓</span>
                )}
              </div>
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {option.description}
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
