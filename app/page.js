'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, Users, FileText } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Newsletter Blogs Manager
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Streamline your newsletter blog management with scheduling, subscriber tracking, and analytics all in one place.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/dashboard">Get Started</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/newsletter-blogs">View Blogs</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <BookOpen className="h-10 w-10 text-blue-600 mb-2" />
                  <CardTitle>Blog Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Create, edit, and organize all your newsletter blogs in one centralized location.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Calendar className="h-10 w-10 text-green-600 mb-2" />
                  <CardTitle>Scheduling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Schedule newsletters for future delivery and manage your publishing timeline efficiently.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-purple-600 mb-2" />
                  <CardTitle>Subscriber Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Track subscriber engagement and manage your audience with detailed analytics.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <FileText className="h-10 w-10 text-orange-600 mb-2" />
                  <CardTitle>Content Creation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Write and format your newsletter content with our intuitive editor tools.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to streamline your newsletter workflow?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl">
                  Join thousands of content creators managing their newsletters with our platform.
                </p>
              </div>
              <Button className="mt-4" asChild>
                <Link href="/register">Create Account</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}