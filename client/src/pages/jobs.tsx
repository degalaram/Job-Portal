
import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Navbar } from '@/components/job-portal/navbar';
import {
  Search,
  MapPin,
  Users,
  Calendar,
  CheckCircle,
  Eye,
  Linkedin,
  Mail,
  Youtube,
  X,
  Trash2,
  Instagram
} from 'lucide-react';
import { FaWhatsapp, FaTelegram } from 'react-icons/fa';
import type { Job, Company } from '@shared/schema';
import { getCompanyLogoFromUrl } from '@/utils/skillImages';

type JobWithCompany = Job & { company: Company };

// Footer component updated to display "Ram Job Portal 2025 All rights reserved"
const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Ram Job Portal</h3>
            <p className="text-gray-300 mb-4">
              Your gateway to amazing career opportunities. Connect with top companies and find your dream job.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/jobs" className="text-gray-300 hover:text-white transition-colors">Browse Jobs</a></li>
              <li><a href="/companies" className="text-gray-300 hover:text-white transition-colors">Companies</a></li>
              <li><a href="/courses" className="text-gray-300 hover:text-white transition-colors">Courses</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Social Media & Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center md:text-left">Connect With Us</h3>
            <div className="flex justify-center md:justify-start space-x-4 mb-4">
              <a
                href="https://www.linkedin.com/in/ramdegala/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#0077B5] hover:bg-[#005A8D] rounded-full transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a
                href="mailto:ramdegala9@gmail.com"
                className="p-2 bg-[#EA4335] hover:bg-[#C53929] rounded-full transition-colors"
                title="Gmail"
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.youtube.com/@yourchannel" // Replace with actual YouTube URL
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#FF0000] hover:bg-[#CC0000] rounded-full transition-colors"
                title="YouTube"
              >
                <Youtube className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.twitter.com/yourhandle" // Replace with actual Twitter URL
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#1DA1F2] hover:bg-[#1488D8] rounded-full transition-colors"
                title="Twitter"
              >
                <X className="w-5 h-5 text-white" />
              </a>
            </div>
            <p className="text-gray-300 text-sm text-center md:text-left">
              Email: ramdegala9@gmail.com
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8 text-center">
          <p className="text-gray-400">&copy; 2025 Ram Job Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};


  const getCompanyLogo = (company: Company) => {
    // First, check if company already has a logo URL stored
    if (company.logo && company.logo.trim()) {
      return company.logo;
    }

    // Use the enhanced logo analysis function from utils
    return getCompanyLogoFromUrl(company.website, company.linkedinUrl, company.name);
  };



const getExperienceBadgeColor = (level: string) => {
  switch (level) {
    case 'fresher': return 'bg-green-500 text-white';
    case 'experienced': return 'bg-blue-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

export default function Jobs() {
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  const [user, setUser] = useState<any>(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Track deleted jobs persistently in localStorage to prevent them from showing again
  const getLocallyDeletedJobs = (): Set<string> => {
    try {
      const stored = localStorage.getItem(`deletedJobs_${user?.id}`);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  };

  const [locallyDeletedJobs, setLocallyDeletedJobs] = useState<Set<string>>(() => getLocallyDeletedJobs());

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = () => {
      try {
        const userString = localStorage.getItem('user');
        if (!userString || userString === 'null' || userString === 'undefined') {
          console.log('User not found in localStorage, redirecting to login');
          navigate('/login');
          return;
        }
        
        const parsedUser = JSON.parse(userString);
        if (!parsedUser || !parsedUser.id) {
          console.log('Invalid user data, redirecting to login');
          navigate('/login');
          return;
        }
        
        setUser(parsedUser);
        setIsAuthChecked(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  const { data: allJobs = [], isLoading, error: jobsError, refetch } = useQuery({
    queryKey: ['jobs', user?.id],
    queryFn: async () => {
      console.log(`[FETCH] Fetching jobs for user ${user?.id}`);
      const response = await apiRequest('GET', '/api/jobs', null, {
        'user-id': user?.id || ''
      });
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const jobs = await response.json();
      console.log(`[FETCH] Received ${jobs.length} jobs for user ${user?.id}:`, jobs.map((j: any) => j.id));
      
      // CRITICAL: Ensure locally deleted jobs are filtered out
      const locallyDeletedJobs = getLocallyDeletedJobs();
      const filteredJobs = jobs.filter((job: any) => !locallyDeletedJobs.has(job.id));
      
      if (filteredJobs.length !== jobs.length) {
        console.log(`[FETCH] Filtered out ${jobs.length - filteredJobs.length} locally deleted jobs`);
      }
      
      return filteredJobs;
    },
    staleTime: 0, // Always consider data stale for immediate updates
    gcTime: 30 * 1000, // 30 seconds for faster updates
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: isAuthChecked && !!user?.id,
  });

  // Refetch jobs when component mounts or tab becomes active
  useEffect(() => {
    if (isAuthChecked && user?.id) {
      refetch();
    }
  }, [refetch, isAuthChecked, user?.id]);

  // Listen for page visibility changes to refresh when coming back from deleted posts
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && isAuthChecked && user?.id) {
        console.log('[JOBS] Page became visible, refreshing jobs data');
        // Clear localStorage cache and refetch
        const deletedJobsKey = `deletedJobs_${user.id}`;
        const storedDeleted = localStorage.getItem(deletedJobsKey);
        if (storedDeleted) {
          try {
            const deletedJobs = JSON.parse(storedDeleted);
            setLocallyDeletedJobs(new Set(deletedJobs));
          } catch (error) {
            console.log('Error parsing deleted jobs from localStorage:', error);
          }
        }
        refetch();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isAuthChecked, user?.id, refetch]);

  const { data: applications = [] } = useQuery({
    queryKey: ['applications/user', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const response = await apiRequest('GET', `/api/applications/user/${user.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }
      return response.json();
    },
    enabled: isAuthChecked && !!user?.id,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 3,
  });

  useEffect(() => {
    console.log('Applications data updated:', applications);
    if (Array.isArray(applications) && applications.length > 0) {
      const appliedJobIds = applications.map((app: any) => app.jobId);
      console.log('Setting applied job IDs:', appliedJobIds);
      setAppliedJobs(appliedJobIds);
    } else {
      console.log('No applications found, resetting applied jobs');
      setAppliedJobs([]);
    }
  }, [applications]);

  // Additional effect to handle real-time updates for applied jobs
  useEffect(() => {
    if (isAuthChecked && user?.id) {
      // Force refresh of applications when jobs data changes
      queryClient.invalidateQueries({ queryKey: ['applications/user', user?.id] });
      
      // Also ensure we get fresh applications data
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: ['applications/user', user?.id] });
      }, 100);
    }
  }, [allJobs, isAuthChecked, user?.id, queryClient]);

  // Effect to ensure applied jobs state is always in sync
  useEffect(() => {
    if (Array.isArray(applications) && applications.length >= 0) {
      const currentAppliedIds = applications.map((app: any) => app.jobId);
      
      // Only update if there's a real difference
      const hasChanged = appliedJobs.length !== currentAppliedIds.length || 
        appliedJobs.some(id => !currentAppliedIds.includes(id)) ||
        currentAppliedIds.some(id => !appliedJobs.includes(id));
        
      if (hasChanged) {
        console.log('Syncing applied jobs state:', currentAppliedIds);
        setAppliedJobs(currentAppliedIds);
      }
    }
  }, [applications, appliedJobs]);

  // Effect to sync locally deleted jobs from localStorage on mount and user change
  useEffect(() => {
    if (user?.id) {
      const storedDeletedJobs = getLocallyDeletedJobs();
      if (storedDeletedJobs.size > 0) {
        console.log(`Loading ${storedDeletedJobs.size} locally deleted jobs for user ${user.id}:`, [...storedDeletedJobs]);
        setLocallyDeletedJobs(storedDeletedJobs);
      }
    }
  }, [user?.id]);

  // Effect to handle tab changes and ensure deleted jobs remain hidden
  useEffect(() => {
    if (user?.id && locallyDeletedJobs.size > 0) {
      console.log(`Tab changed to ${activeTab}. Ensuring ${locallyDeletedJobs.size} deleted jobs remain hidden.`);
      // Force a re-filter by updating the query cache
      queryClient.setQueryData(['jobs', user.id], (oldJobs: any) => {
        if (Array.isArray(oldJobs)) {
          const filteredJobs = oldJobs.filter(job => !locallyDeletedJobs.has(job.id));
          console.log(`Filtered out ${oldJobs.length - filteredJobs.length} deleted jobs from cache`);
          return filteredJobs;
        }
        return oldJobs;
      });
    }
  }, [activeTab, locallyDeletedJobs, user?.id, queryClient]);

  // Application mutation
  const applyMutation = useMutation({
    mutationFn: async (jobId: string) => {
      if (!user?.id) {
        throw new Error('User not logged in');
      }
      const response = await apiRequest('POST', '/api/applications', {
        userId: user.id,
        jobId: jobId,
      });
      if (!response.ok) {
        throw new Error('Failed to submit application');
      }
      return response.json();
    },
    onSuccess: (data, jobId) => {
      // Immediately add to applied jobs for instant UI update
      setAppliedJobs(prev => [...prev, jobId]);
      queryClient.invalidateQueries({ queryKey: ['applications/user', user?.id] });
      toast({
        title: 'Application submitted!',
        description: 'Your job application has been submitted successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Application failed',
        description: error.message || 'Failed to submit application',
        variant: 'destructive',
      });
    },
  });

  // Remove application mutation
  const removeApplicationMutation = useMutation({
    mutationFn: async (jobId: string) => {
      if (!user?.id) {
        throw new Error('User not logged in');
      }
      // Find the application for this job and user
      const application = applications.find((app: any) => app.jobId === jobId && app.userId === user.id);
      if (!application) {
        throw new Error('Application not found');
      }
      
      const response = await apiRequest('DELETE', `/api/applications/${application.id}`);
      if (!response.ok) {
        throw new Error('Failed to remove application');
      }
      return response.json();
    },
    onSuccess: (data, jobId) => {
      // Immediately remove from applied jobs for instant UI update
      setAppliedJobs(prev => prev.filter(id => id !== jobId));
      queryClient.invalidateQueries({ queryKey: ['applications/user', user?.id] });
      toast({
        title: 'Application removed',
        description: 'Your job application has been removed successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Remove failed',
        description: error.message || 'Failed to remove application',
        variant: 'destructive',
      });
    },
  });



  // Persist deleted jobs to localStorage whenever it changes
  useEffect(() => {
    if (user?.id && locallyDeletedJobs.size > 0) {
      localStorage.setItem(`deletedJobs_${user.id}`, JSON.stringify([...locallyDeletedJobs]));
    }
  }, [locallyDeletedJobs, user?.id]);

  const deleteJobMutation = useMutation({
    mutationFn: async ({ jobId, userId }: { jobId: string; userId: string }) => {
      if (!userId) {
        throw new Error('User not logged in');
      }

      console.log(`Attempting to delete job ${jobId} for user ${userId}`);

      try {
        // Use the correct delete endpoint and send userId in the request body
        const response = await apiRequest('POST', `/api/jobs/${jobId}/delete`, { userId });

        if (!response.ok) {
          let errorMessage = 'Failed to delete job';
          
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorData.message || errorMessage;
          } catch {
            errorMessage = `Server error: ${response.status}`;
          }

          throw new Error(errorMessage);
        }

        const result = await response.json();
        console.log('Delete job success:', result);
        return result;
      } catch (error) {
        console.error('Delete job API error:', error);
        throw error;
      }
    },
    onMutate: async ({ jobId, userId }) => {
      // Cancel any outgoing refetches to avoid optimistic updates being overwritten
      await queryClient.cancelQueries({ queryKey: ['jobs', userId] });
      
      // Add to locally deleted jobs set immediately and persist it
      setLocallyDeletedJobs(prev => {
        const newSet = new Set([...prev, jobId]);
        localStorage.setItem(`deletedJobs_${userId}`, JSON.stringify([...newSet]));
        return newSet;
      });
      
      // Snapshot the previous value
      const previousJobs = queryClient.getQueryData(['jobs', userId]);
      
      // Optimistically remove the job from the UI immediately
      queryClient.setQueryData(['jobs', userId], (oldJobs: any) => {
        if (Array.isArray(oldJobs)) {
          const filteredJobs = oldJobs.filter(job => job.id !== jobId);
          console.log(`Optimistically removed job ${jobId}. Remaining: ${filteredJobs.length}`);
          return filteredJobs;
        }
        return oldJobs;
      });
      
      // Optimistically remove from applied jobs
      setAppliedJobs(prev => prev.filter(id => id !== jobId));
      
      // Return context object with the snapshotted value
      return { previousJobs, jobId };
    },
    onSuccess: (data, variables) => {
      console.log('Delete job confirmed on server:', variables.jobId);
      
      // Ensure the job remains in the locally deleted set and persist it
      setLocallyDeletedJobs(prev => {
        const newSet = new Set([...prev, variables.jobId]);
        localStorage.setItem(`deletedJobs_${variables.userId}`, JSON.stringify([...newSet]));
        return newSet;
      });
      
      // Force update all related queries to exclude deleted job
      queryClient.setQueryData(['jobs', variables.userId], (oldJobs: any) => {
        if (Array.isArray(oldJobs)) {
          return oldJobs.filter(job => job.id !== variables.jobId);
        }
        return oldJobs;
      });
      
      // Remove from applications cache as well
      queryClient.setQueryData(['applications/user', variables.userId], (oldApps: any) => {
        if (Array.isArray(oldApps)) {
          return oldApps.filter(app => app.jobId !== variables.jobId);
        }
        return oldApps;
      });
      
      // Invalidate and refetch all related queries to ensure consistency
      queryClient.removeQueries({ queryKey: ['jobs', variables.userId] });
      queryClient.invalidateQueries({ queryKey: ['deleted-posts', variables.userId] });
      
      toast({
        title: 'Job deleted successfully',
        description: 'The job has been permanently removed from your view.',
      });
    },
    onError: (error: any, variables, context) => {
      console.error('Delete job error:', error);
      
      // Remove from locally deleted jobs on error and update localStorage
      setLocallyDeletedJobs(prev => {
        const newSet = new Set(prev);
        newSet.delete(variables.jobId);
        if (newSet.size > 0) {
          localStorage.setItem(`deletedJobs_${variables.userId}`, JSON.stringify([...newSet]));
        } else {
          localStorage.removeItem(`deletedJobs_${variables.userId}`);
        }
        return newSet;
      });
      
      // Rollback optimistic update on error
      if (context?.previousJobs) {
        queryClient.setQueryData(['jobs', variables.userId], context.previousJobs);
      }
      
      toast({
        title: 'Delete failed',
        description: error.message || 'Failed to delete job',
        variant: 'destructive',
      });
    },
  });

  // Show loading while checking authentication
  if (!isAuthChecked) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error if API fails
  if (jobsError && isAuthChecked) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Connection Error</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Failed to connect to the server. Please try again later.</p>
            <button 
              onClick={() => refetch()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              data-testid="button-retry"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filteredJobs = Array.isArray(allJobs) ? allJobs.filter((job: JobWithCompany) => {
    // CRITICAL: First and most important filter - never show locally deleted jobs
    if (locallyDeletedJobs.has(job.id)) {
      console.log(`Filtering out locally deleted job: ${job.id} - ${job.title}`);
      return false;
    }

    const matchesSearch = searchTerm === '' ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = locationFilter === '' ||
      job.location.toLowerCase().includes(locationFilter.toLowerCase());

    const now = new Date();
    const closingDate = new Date(job.closingDate);
    const isExpired = closingDate < now;

    switch (activeTab) {
      case 'fresher':
        return matchesSearch && matchesLocation && job.experienceLevel === 'fresher' && !isExpired;
      case 'experienced':
        return matchesSearch && matchesLocation && job.experienceLevel === 'experienced' && !isExpired;
      case 'expired':
        return matchesSearch && matchesLocation && (isExpired || !job.isActive);
      default:
        return matchesSearch && matchesLocation && !isExpired && job.isActive;
    }
  }) : [];


  const handleDeleteJob = (e: React.MouseEvent, jobId: string) => {
    e.stopPropagation();
    if (!user || !user.id) {
      navigate('/login');
      return;
    }
    if (window.confirm('Are you sure you want to delete this job? It will be moved to deleted posts and can be restored within 5 days.')) {
      // Perform deletion and let the success handler manage UI updates
      deleteJobMutation.mutate({ jobId, userId: user.id });
    }
  };

  const handleJobClick = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleApplyJob = (e: React.MouseEvent, job: JobWithCompany) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }

    const isApplied = appliedJobs.includes(job.id);
    
    if (isApplied) {
      // Remove application
      removeApplicationMutation.mutate(job.id);
    } else {
      // Apply for job
      if (job.applyUrl) {
        window.open(job.applyUrl, '_blank');
        // Still track the application internally
        applyMutation.mutate(job.id);
      } else {
        // Fallback to internal application tracking
        applyMutation.mutate(job.id);
      }
    }
  };

  const handleShare = (e: React.MouseEvent, job: JobWithCompany, platform: string) => {
    e.stopPropagation();
    const jobUrl = `${window.location.origin}/jobs/${job.id}`;
    const text = `Check out this job: ${job.title} at ${job.company.name}`;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + jobUrl)}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(jobUrl)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'instagram':
        // Instagram doesn't have direct link sharing, so copy to clipboard
        navigator.clipboard.writeText(jobUrl);
        alert('Link copied to clipboard! You can paste it on Instagram.');
        break;
      case 'gmail':
        window.location.href = `mailto:?subject=${encodeURIComponent(job.title)}&body=${encodeURIComponent(text + ' ' + jobUrl)}`;
        break;
      default:
        navigator.clipboard.writeText(jobUrl);
        alert('Link copied to clipboard!');
    }
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading jobs...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      {/* Job Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search jobs, companies, skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="search-jobs"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-10"
                  data-testid="search-location"
                />
              </div>
            </div>
            <Button data-testid="search-button">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Job Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Mobile: 2x2 Grid Layout */}
          <div className="block sm:hidden mb-6">
            <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'all' 
                    ? 'bg-primary text-primary-foreground shadow' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
                data-testid="tab-all-jobs"
              >
                All Jobs
              </button>
              <button
                onClick={() => setActiveTab('fresher')}
                className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'fresher' 
                    ? 'bg-primary text-primary-foreground shadow' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
                data-testid="tab-fresher-jobs"
              >
                Fresher Jobs
              </button>
              <button
                onClick={() => setActiveTab('experienced')}
                className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'experienced' 
                    ? 'bg-primary text-primary-foreground shadow' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
                data-testid="tab-experienced-jobs"
              >
                Experienced Jobs
              </button>
              <button
                onClick={() => setActiveTab('expired')}
                className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'expired' 
                    ? 'bg-primary text-primary-foreground shadow' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
                data-testid="tab-expired-jobs"
              >
                Expired Jobs
              </button>
            </div>
          </div>

          {/* Desktop: Horizontal Layout */}
          <TabsList className="hidden sm:grid w-full grid-cols-4 mb-4 sm:mb-6 md:mb-8 h-auto p-1">
            <TabsTrigger value="all" data-testid="tab-all-jobs-desktop" className="text-sm px-3 py-2">All Jobs</TabsTrigger>
            <TabsTrigger value="fresher" data-testid="tab-fresher-jobs-desktop" className="text-sm px-3 py-2">Fresher Jobs</TabsTrigger>
            <TabsTrigger value="experienced" data-testid="tab-experienced-jobs-desktop" className="text-sm px-3 py-2">Experienced Jobs</TabsTrigger>
            <TabsTrigger value="expired" data-testid="tab-expired-jobs-desktop" className="text-sm px-3 py-2">Expired Jobs</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              {filteredJobs.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="text-gray-400 mb-4">
                      <Users className="w-12 h-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                    <p className="text-gray-600">
                      {activeTab === 'expired'
                        ? 'No expired jobs in your search criteria.'
                        : 'Try adjusting your search criteria or check back later for new opportunities.'}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredJobs.map((job: JobWithCompany) => {
                  const isApplied = appliedJobs.includes(job.id);
                  const isExpired = new Date(job.closingDate) < new Date();

                  return (
                    <Card
                      key={job.id}
                      className="hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 border-l-blue-500 w-full"
                      onClick={() => handleJobClick(job.id)}
                      data-testid={`job-card-${job.id}`}
                    >
                      <CardContent className="p-3 sm:p-4 md:p-6">
                        {/* Header with Company Logos */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-3 flex-1">
                            {/* Left Company Logo */}
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                              <img 
                                src={getCompanyLogo(job.company)} 
                                alt={job.company.name}
                                className="w-8 h-8 sm:w-12 sm:h-12 object-contain rounded"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  // Fallback to UI Avatars if Clearbit fails
                                  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company.name)}&background=3B82F6&color=ffffff&size=128&font-size=0.5`;
                                  if (target.src !== fallbackUrl) {
                                    target.src = fallbackUrl;
                                  } else {
                                    // If even UI Avatars fails, show letter avatar
                                    const parent = target.parentElement;
                                    if (parent) {
                                      parent.innerHTML = `<div class="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center"><span class="text-sm sm:text-lg font-bold text-blue-600">${job.company.name.charAt(0).toUpperCase()}</span></div>`;
                                    }
                                  }
                                }}
                              />
                            </div>

                            {/* Job Info */}
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2 leading-tight">
                                {job.title}
                              </CardTitle>
                              <p className="text-blue-600 dark:text-blue-400 font-medium mb-1 text-sm sm:text-base">{job.company.name}</p>
                              <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-1">
                                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                                <span className="truncate">{job.location}</span>
                              </div>
                              <div className="text-green-600 font-semibold text-sm sm:text-base md:text-lg">
                                {job.salary}
                              </div>
                            </div>
                          </div>

                          {/* Right Company Logo - Larger */}
                          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ml-4">
                            <img 
                              src={getCompanyLogo(job.company)} 
                              alt={job.company.name}
                              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain rounded-lg"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                // Fallback to UI Avatars if Clearbit fails
                                const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company.name)}&background=3B82F6&color=ffffff&size=128&font-size=0.5`;
                                if (target.src !== fallbackUrl) {
                                  target.src = fallbackUrl;
                                } else {
                                  // If even UI Avatars fails, show letter avatar
                                  const parent = target.parentElement;
                                  if (parent) {
                                    parent.innerHTML = `<div class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-blue-100 rounded-xl flex items-center justify-center"><span class="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">${job.company.name.charAt(0).toUpperCase()}</span></div>`;
                                  }
                                }
                              }}
                            />
                          </div>
                        </div>

                        {/* Experience & Closing Date - Mobile Optimized */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3 text-xs sm:text-sm text-gray-600">
                          <div className="flex items-center">
                            <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                            <span>{job.experienceMin}-{job.experienceMax} years</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                            <span>Closes: {new Date(job.closingDate).toLocaleDateString('en-GB')}</span>
                          </div>
                        </div>

                        {/* Skills Section - Mobile Responsive */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                          {job.skills.split(',').slice(0, 4).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1">
                              {skill.trim()}
                            </Badge>
                          ))}
                          {job.skills.split(',').length > 4 && (
                            <Badge variant="outline" className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1">
                              +{job.skills.split(',').length - 4} more
                            </Badge>
                          )}
                        </div>

                        {/* Bottom Section Layout */}
                        <div className="pt-3 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            {/* Left Side: Social Media Icons (4 icons) */}
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <button
                                onClick={(e) => handleShare(e, job, 'whatsapp')}
                                className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-gray-700 rounded-full transition-colors"
                                title="Share on WhatsApp"
                                data-testid={`share-whatsapp-${job.id}`}
                              >
                                <FaWhatsapp className="w-3 h-3 sm:w-4 sm:h-4" />
                              </button>
                              <button
                                onClick={(e) => handleShare(e, job, 'telegram')}
                                className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-full transition-colors"
                                title="Share on Telegram"
                                data-testid={`share-telegram-${job.id}`}
                              >
                                <FaTelegram className="w-3 h-3 sm:w-4 sm:h-4" />
                              </button>
                              <button
                                onClick={(e) => handleShare(e, job, 'instagram')}
                                className="p-1 text-pink-600 hover:bg-pink-50 dark:hover:bg-gray-700 rounded-full transition-colors"
                                title="Share on Instagram"
                                data-testid={`share-instagram-${job.id}`}
                              >
                                <Instagram className="w-3 h-3 sm:w-4 sm:h-4" />
                              </button>
                              <button
                                onClick={(e) => handleShare(e, job, 'gmail')}
                                className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded-full transition-colors"
                                title="Share via Gmail"
                                data-testid={`share-gmail-${job.id}`}
                              >
                                <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                              </button>
                            </div>

                            {/* Right Side: Action Buttons */}
                            <div className="flex flex-wrap items-center justify-end gap-1 sm:gap-2 flex-1">
                              {/* View Details Button */}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleJobClick(job.id);
                                }}
                                className="text-xs h-6 sm:h-7 px-1 sm:px-2"
                                data-testid={`view-details-${job.id}`}
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                View Details
                              </Button>

                              {/* Apply Button - placed between View Details and Experience Badge */}
                              {!isExpired ? (
                                <Button
                                  size="sm"
                                  onClick={(e) => handleApplyJob(e, job)}
                                  className={`text-xs h-6 sm:h-7 px-1 sm:px-2 ${
                                    isApplied 
                                      ? "bg-green-600 hover:bg-green-700" 
                                      : "bg-blue-600 hover:bg-blue-700"
                                  }`}
                                  data-testid={`apply-now-${job.id}`}
                                >
                                  {isApplied ? "Applied" : "Apply Now"}
                                </Button>
                              ) : (
                                <span className="text-xs text-gray-500">Expired</span>
                              )}

                              {/* Experience Badge */}
                              <Badge className={`${getExperienceBadgeColor(job.experienceLevel)} px-1 sm:px-2 py-0.5 sm:py-1 text-xs font-medium`}>
                                {job.experienceLevel === 'fresher' ? 'Fresher' : 'Experienced'}
                              </Badge>

                              {/* Delete Button */}
                              {!isExpired && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => handleDeleteJob(e, job.id)}
                                  className="text-xs h-6 sm:h-7 px-1 sm:px-2 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                                  data-testid={`delete-job-${job.id}`}
                                  title="Delete Job"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
