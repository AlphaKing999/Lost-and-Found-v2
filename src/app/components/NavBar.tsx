import { Link, useLocation } from 'react-router-dom';
import { Search, Plus, Shield, Home, Package2, MessageSquare, Bell, ChevronDown } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { ThemeToggle } from '@/app/components/ThemeToggle';
import { NotificationBell } from '@/app/components/NotificationBell';
import { useTheme } from '@/app/contexts/ThemeContext';
import { motion } from 'motion/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

export function NavBar() {
  const location = useLocation();
  const { getColor } = useTheme();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <motion.nav 
      className="backdrop-blur-xl shadow-sm sticky top-0 z-50 border-b"
      style={{
        backgroundColor: `${getColor('bgCard')}e6`,
        borderColor: getColor('border')
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group cursor-pointer">
              <motion.div 
                className="text-white p-2.5 rounded-xl mr-3 shadow-md group-hover:shadow-lg transition-shadow"
                style={{
                  background: `linear-gradient(to bottom right, ${getColor('accent1')}, ${getColor('accent1Light')})`
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Package2 className="h-6 w-6" />
              </motion.div>
              <div>
                <span 
                  className="text-xl font-bold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})`
                  }}
                >
                  Lost & Found
                </span>
                <div className="text-xs" style={{ color: getColor('textTertiary') }}>School Portal</div>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <Link to="/" className="cursor-pointer">
              <Button 
                variant={isActive('/') ? 'default' : 'ghost'}
                size="sm"
                className="rounded-lg"
                style={isActive('/') ? {
                  background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})`,
                  color: 'white'
                } : {
                  color: getColor('textSecondary')
                }}
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            
            <Link to="/items" className="cursor-pointer">
              <Button 
                variant={isActive('/items') || location.pathname.startsWith('/item/') ? 'default' : 'ghost'}
                size="sm"
                className="rounded-lg"
                style={isActive('/items') || location.pathname.startsWith('/item/') ? {
                  background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})`,
                  color: 'white'
                } : {
                  color: getColor('textSecondary')
                }}
              >
                <Search className="h-4 w-4 mr-2" />
                Browse
              </Button>
            </Link>
            
            <Link to="/submit" className="cursor-pointer">
              <Button 
                variant={isActive('/submit') ? 'default' : 'ghost'}
                size="sm"
                className="rounded-lg"
                style={isActive('/submit') ? {
                  background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Dark')})`,
                  color: 'white'
                } : {
                  color: getColor('textSecondary')
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Report
              </Button>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant={isActive('/claims') || isActive('/notifications') || isActive('/security') ? 'default' : 'ghost'}
                  size="sm"
                  className="rounded-lg cursor-pointer"
                  style={isActive('/claims') || isActive('/notifications') || isActive('/security') ? {
                    background: `linear-gradient(to right, ${getColor('accent2')}, ${getColor('accent2Light')})`,
                    color: 'white'
                  } : {
                    color: getColor('textSecondary')
                  }}
                >
                  More
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-48"
                style={{
                  backgroundColor: getColor('bgCard'),
                  borderColor: getColor('border')
                }}
              >
                <Link to="/claims" className="cursor-pointer">
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    style={{
                      color: getColor('textPrimary')
                    }}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" style={{ color: getColor('accent2') }} />
                    Claims Portal
                  </DropdownMenuItem>
                </Link>
                <Link to="/notifications" className="cursor-pointer">
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    style={{
                      color: getColor('textPrimary')
                    }}
                  >
                    <Bell className="h-4 w-4 mr-2" style={{ color: getColor('accent1') }} />
                    Notifications
                  </DropdownMenuItem>
                </Link>
                <Link to="/security" className="cursor-pointer">
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    style={{
                      color: getColor('textPrimary')
                    }}
                  >
                    <Shield className="h-4 w-4 mr-2" style={{ color: getColor('accent1') }} />
                    Security & Privacy
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/admin" className="cursor-pointer">
              <Button 
                variant={isActive('/admin') ? 'default' : 'ghost'}
                size="sm"
                className="rounded-lg"
                style={isActive('/admin') ? {
                  background: `linear-gradient(to right, ${getColor('accent2')}, ${getColor('accent2Light')})`,
                  color: 'white'
                } : {
                  color: getColor('textSecondary')
                }}
              >
                <Shield className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </Link>

            <div className="ml-2 pl-2 border-l flex items-center gap-2" style={{ borderColor: getColor('border') }}>
              <NotificationBell />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}