import Image from 'next/image';
import Link from 'next/link';
import { allPosts } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock } from 'lucide-react';

export default function BlogPage() {
  const featuredPost = allPosts[0];
  const otherPosts = allPosts.slice(1);
  const featuredPostImage = PlaceHolderImages.find(p => p.id === featuredPost.imageUrl);
  const featuredPostAuthorImage = PlaceHolderImages.find(p => p.id === featuredPost.authorAvatarUrl);

  return (
    <div className="bg-transparent animate-slide-in-from-bottom">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold tracking-tight">Just Hands Blog</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Stories, insights, and updates from our community of volunteers and NGOs.
          </p>
        </div>

        {/* Featured Post */}
        <section className="mb-12">
          <Card className="grid md:grid-cols-2 overflow-hidden border-border/80">
            <CardHeader className="p-0">
              <Link href="#">
                 <div className="relative aspect-video">
                  {featuredPostImage && (
                    <Image
                      src={featuredPostImage.imageUrl}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                      data-ai-hint={featuredPostImage.imageHint}
                    />
                  )}
                 </div>
              </Link>
            </CardHeader>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <Badge variant="outline" className="w-fit mb-2">Featured</Badge>
              <h2 className="text-lg font-bold mb-2">
                <Link href="#" className="hover:text-primary transition-colors">
                  {featuredPost.title}
                </Link>
              </h2>
              <p className="text-sm text-muted-foreground mb-4">{featuredPost.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  {featuredPostAuthorImage && (
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={featuredPostAuthorImage.imageUrl} alt={featuredPost.author} data-ai-hint={featuredPostAuthorImage.imageHint} />
                      <AvatarFallback>{featuredPost.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <span>{featuredPost.author}</span>
                </div>
                 <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{featuredPost.readingTime} min read</span>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Post Grid */}
        <section>
            <h2 className="text-xl font-bold mb-6">More Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherPosts.map(post => {
                    const postImage = PlaceHolderImages.find(p => p.id === post.imageUrl);
                    const authorImage = PlaceHolderImages.find(p => p.id === post.authorAvatarUrl);

                    return (
                        <Card key={post.id} className="flex flex-col group">
                             <CardHeader className="p-0 relative overflow-hidden rounded-t-2xl">
                                <Link href="#">
                                <div className="aspect-video w-full relative">
                                    {postImage && (
                                    <Image
                                        src={postImage.imageUrl}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        data-ai-hint={postImage.imageHint}
                                    />
                                    )}
                                </div>
                                </Link>
                            </CardHeader>
                            <CardContent className="p-4 flex-1 flex flex-col">
                                <h3 className="text-sm font-bold mb-2 flex-1">
                                    <Link href="#" className="hover:text-primary transition-colors">{post.title}</Link>
                                </h3>
                                 <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                                    <div className="flex items-center gap-2">
                                    {authorImage && (
                                        <Avatar className="h-6 w-6">
                                        <AvatarImage src={authorImage.imageUrl} alt={post.author} data-ai-hint={authorImage.imageHint} />
                                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <span>{post.author}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        <span>{post.readingTime} min read</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </section>

      </div>
    </div>
  );
}
