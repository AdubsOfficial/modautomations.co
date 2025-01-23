import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { ArrowLeft, Clock, Tag, ArrowRight } from 'lucide-react';
import { getPostBySlug, blogPosts } from '../data/blogPosts';

function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getPostBySlug(slug || '');

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <PageTransition to="/blog" className="text-[#00A3FF] hover:text-[#00A3FF]/80">
            Return to Blog
          </PageTransition>
        </div>
      </div>
    );
  }

  const relatedPosts = post.relatedPosts.map(id => 
    blogPosts.find(p => p.id === id)
  ).filter(Boolean);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 tech-grid opacity-20"></div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-[#00A3FF]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <PageTransition to="/" className="flex items-center hover:text-[#00A3FF] transition-colors">
              <img src="/logo.svg" alt="MOD Automations" className="w-8 h-8" />
              <span className="ml-2 text-xl font-bold tracking-tight">MOD Automations</span>
            </PageTransition>
            <div className="hidden md:flex items-center space-x-8">
              <PageTransition to="/" className="hover:text-[#00A3FF] transition-colors tracking-wide">
                Home
              </PageTransition>
              <PageTransition to="/blog" className="hover:text-[#00A3FF] transition-colors tracking-wide">
                Blog
              </PageTransition>
              <PageTransition to="/services" className="hover:text-[#00A3FF] transition-colors tracking-wide">
                Services
              </PageTransition>
            </div>
          </div>
        </div>
      </nav>

      {/* Header Image */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img
          src={post.headerImage.url}
          alt={post.headerImage.alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-200">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {post.readTime} read
              </div>
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                {post.category}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <PageTransition
                to="/blog"
                className="inline-flex items-center text-[#00A3FF] hover:text-[#00A3FF]/80 mb-8"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </PageTransition>

              <article className="prose prose-invert prose-lg max-w-none">
                <div className="gradient-border p-8 rounded-lg backdrop-blur-sm mb-8">
                  <div 
                    className="markdown-content"
                    dangerouslySetInnerHTML={{ 
                      __html: post.content
                        .replace(/^# (.*$)/gm, '<h1 class="text-4xl font-bold mb-6">$1</h1>')
                        .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
                        .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-6 mb-3">$1</h3>')
                        .replace(/^\- (.*$)/gm, '<li class="ml-4">$1</li>')
                        .replace(/^\d\. (.*$)/gm, '<li class="ml-4">$1</li>')
                        .replace(/!\[(.*?)\]\((.*?)\)\n\*(.*?)\*/gm, '<div class="my-8"><img src="$2" alt="$1" class="w-full rounded-lg" /><p class="text-sm text-gray-400 mt-2 text-center">$3</p></div>')
                        .split('\n').join('<br />')
                    }}
                  />
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-24">
                {/* Related Posts */}
                <div className="gradient-border p-6 rounded-lg backdrop-blur-sm mb-8">
                  <h3 className="text-xl font-bold mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      relatedPost && (
                        <PageTransition
                          key={relatedPost.id}
                          to={`/blog/${relatedPost.slug}`}
                          className="block p-4 rounded-lg hover:bg-[#00A3FF]/5 transition-colors"
                        >
                          <h4 className="font-medium mb-2">{relatedPost.title}</h4>
                          <div className="flex items-center text-sm text-gray-400">
                            <Clock className="w-4 h-4 mr-2" />
                            {relatedPost.readTime} read
                          </div>
                        </PageTransition>
                      )
                    ))}
                  </div>
                </div>

                {/* Related Services */}
                <div className="gradient-border p-6 rounded-lg backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-4">Related Services</h3>
                  <div className="space-y-4">
                    {post.relatedServices.map((service) => (
                      <PageTransition
                        key={service}
                        to="/services"
                        className="flex items-center justify-between p-4 rounded-lg hover:bg-[#00A3FF]/5 transition-colors"
                      >
                        <span className="font-medium">{service.charAt(0).toUpperCase() + service.slice(1)}</span>
                        <ArrowRight className="w-4 h-4" />
                      </PageTransition>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;