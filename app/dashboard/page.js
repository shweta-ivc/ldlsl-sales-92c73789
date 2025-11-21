'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Mail, Calendar, BarChart } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [blogsCount, setBlogsCount] = useState(0);
  const [subscribersCount, setSubscribersCount] = useState(0);
  const [scheduledCount, setScheduledCount] = useState(0);
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // Fetch total blogs count
      const { count: blogsCount } = await supabase
        .from('newsletter_blogs')
        .select('*', { count: 'exact', head: true });

      setBlogsCount(blogsCount || 0);

      // Fetch scheduled blogs count
      const { count: scheduledCount } = await supabase
        .from('newsletter_blogs')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'scheduled');

      setScheduledCount(scheduledCount || 0);

      // Fetch recent blogs
      const { data: blogs } = await supabase
        .from('newsletter_blogs')
        .select('id, title, status, published_at')
        .order('created_at', { ascending: false })
        .limit(5);

      setRecentBlogs(blogs || []);
    };

    fetchDashboardData();
  }, [supabase]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={() => router.push('/newsletter-blogs/create')}>
          Create New Blog
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogsCount}</div>
            <p className="text-xs text-muted-foreground">Newsletter blogs created</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscribersCount}</div>
            <p className="text-xs text-muted-foreground">Active subscribers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledCount}</div>
            <p className="text-xs text-muted-foreground">Posts scheduled</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Blogs</CardTitle>
            <CardDescription>Your latest newsletter blogs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBlogs.map((blog) => (
                <div 
                  key={blog.id} 
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted cursor-pointer"
                  onClick={() => router.push(`/newsletter-blogs/${blog.id}`)}
                >
                  <div>
                    <h3 className="font-medium">{blog.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {blog.published_at ? `Published: ${new Date(blog.published_at).toLocaleDateString()}` : 'Draft'}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    blog.status === 'published' ? 'bg-green-100 text-green-800' :
                    blog.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {blog.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => router.push('/newsletter-blogs')}
            >
              <BarChart className="mr-2 h-4 w-4" />
              View All Blogs
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => router.push('/newsletter-blogs/create')}
            >
              <Mail className="mr-2 h-4 w-4" />
              Schedule New Post
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}