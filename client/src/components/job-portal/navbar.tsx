
import { useState } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { 
  Briefcase, 
  Menu, 
  X, 
  User, 
  LogOut,
  BookOpen,
  FolderOpen,
  Phone,
  Plus,
  Building,
  FileText,
  Linkedin,
  Twitter,
  Youtube,
  Mail,
  Trash2
} from 'lucide-react';
import { Link } from 'wouter';

// Component to show deleted posts count
function DeletedPostsCounter({ userId }: { userId?: string }) {
  const { data: deletedPosts = [] } = useQuery({
    queryKey: ['deleted-posts-count', userId],
    queryFn: async () => {
      if (!userId) return [];
      try {
        const response = await apiRequest('GET', `/api/deleted-posts/user/${userId}`);
        if (!response.ok) return [];
        return response.json();
      } catch {
        return [];
      }
    },
    enabled: !!userId,
    staleTime: 5000,
    refetchInterval: 10000,
  });

  if (!deletedPosts || deletedPosts.length === 0) return null;

  return (
    <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[16px] h-4 flex items-center justify-center">
      {deletedPosts.length}
    </span>
  );
}

export function Navbar() {
  const [, navigate] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // SECURITY: Core navigation items - DO NOT REMOVE OR MODIFY
  // This application requires Jobs section for core functionality
  // Removing Jobs section will break the application and violate security requirements
  const navItems = [
    { label: 'Jobs', path: '/jobs', icon: Briefcase, required: true }, // MANDATORY: Jobs section cannot be removed
    { label: 'Add Jobs', path: '/admin/jobs', icon: Plus, protected: true }, // PROTECTED: OTP secured
    { label: 'Companies', path: '/companies', icon: Building },
    { label: 'Courses', path: '/courses', icon: BookOpen },
    { label: 'Projects', path: '/projects', icon: FolderOpen },
    { label: 'Contact Us', path: '/contact', icon: Phone },
  ];

  // HARDCODED SECURITY CHECK: Verify Jobs section exists
  const jobsItem = navItems.find(item => item.path === '/jobs');
  if (!jobsItem || !jobsItem.required) {
    throw new Error('SECURITY VIOLATION: Jobs section is mandatory and cannot be removed');
  }

  return (
    <nav className="bg-background shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/jobs')}
            data-testid="logo"
          >
            <Briefcase className="w-8 h-8 text-theme-primary mr-2" />
            <span className="text-xl font-bold text-foreground">JobPortal</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                onClick={() => navigate(item.path)}
                className={`text-theme-muted hover:text-theme-primary ${item.label === 'Add Jobs' ? 'text-blue-600 hover:text-blue-700 font-semibold bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-md' : ''}`}
                data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center" data-testid="user-menu">
                  <div className="w-8 h-8 bg-theme-primary rounded-full flex items-center justify-center mr-2">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden md:block text-sm font-medium text-foreground">
                    {user.fullName || 'User'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => navigate('/profile')}
                      data-testid="profile-menu-item"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Account Details
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => navigate('/my-applications')}
                      data-testid="my-applications-menu-item"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      My Applications
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => navigate('/deleted-posts')}
                      data-testid="deleted-posts-menu-item"
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Deleted Posts
                      </div>
                      <DeletedPostsCounter userId={user?.id} />
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => navigate('/deleted-companies')}
                      data-testid="deleted-companies-menu-item"
                    >
                      <Building className="w-4 h-4 mr-2" />
                      Deleted Companies
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      data-testid="sign-out-menu-item"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden ml-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full justify-start text-theme-muted hover:text-theme-primary ${item.label === 'Add Jobs' ? 'text-blue-600 hover:text-blue-700 font-semibold bg-blue-50 dark:bg-blue-900/20' : ''}`}
                  data-testid={`mobile-nav-${item.label.toLowerCase().replace(' ', '-')}`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              ))}
              <a
                href="/my-applications"
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                My Applications
              </a>
              <a
                href="/deleted-posts"
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Deleted Posts
              </a>
            </div>
          </div>
        )}
      </div>
      </nav>
  );
}
