'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { 
  Calendar,
  Users,
  Send,
  Edit,
  Trash2,
  ArrowLeft
} from 'lucide-react';

export default function NewsletterBlogDetailPage({ params }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data, error } = await supabase
          .from('newsletter_blogs')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) throw error;

        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBlog();
    }
  }, [params.id, supabase]);

  const handleEdit = () => {
    router.push(`/newsletter-blogs/${params.id}/edit`);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this newsletter blog?')) return;

    try {
      const { error } = await supabase
        .from('newsletter_blogs')
        .delete()
        .eq('id', params.id);

      if (error) throw error;

      router.push('/newsletter-blogs');
      router.refresh();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleBack = () => {
    router.push('/newsletter-blogs');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
        <div className="text-red-600 text-center mb-4">
          <h2 className="text-xl font-semibold">Error Loading Blog</h2>
          <p>{error}</p>
        </div>
        <Button onClick={handleBack} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to List
        </Button>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Newsletter Blog Not Found</h2>
          <p className="text-gray-600">The requested newsletter blog could not be found.</p>
        </div>
        <Button onClick={handleBack} className="mt-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to List
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button onClick={handleBack} variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">{blog.name}</h1>
          <Badge variant={blog.status === 'active' ? 'default' : 'secondary'}>
            {blog.status}
          </Badge>
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleEdit} variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button onClick={handleDelete} variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 whitespace-pre-wrap">{blog.description || 'No description provided.'}</p>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduling</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Frequency</p>
                  <p className="font-medium">{blog.frequency}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center">
                <Send className="h-5 w-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Last Sent</p>
                  <p className="font-medium">
                    {blog.last_sent_at 
                      ? format(new Date(blog.last_sent_at), 'MMM d, yyyy h:mm a')
                      : 'Never sent'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscribers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Total Subscribers</p>
                  <p className="font-medium">{blog.subscriber_count || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 bg-gray-50 min-h-[200px]">
            {blog.content_preview ? (
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content_preview }}
              />
            ) : (
              <p className="text-gray-500 italic">No content preview available.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}