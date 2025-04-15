import Link from "next/link"
import Image from "next/image"
import { getAllPosts } from "@/lib/mdx"
import { ThemeToggle } from "@/components/theme-toggle"

// Helper function to get category styling
function getCategoryStyle(slug: string) {
  if (slug.includes("next-js")) return "category-development"
  if (slug.includes("css")) return "category-design"
  if (slug.includes("performance")) return "category-performance"
  return "category-development"
}

// Helper function to get category name
function getCategoryName(slug: string) {
  if (slug.includes("next-js")) return "Development"
  if (slug.includes("css")) return "Design"
  if (slug.includes("performance")) return "Performance"
  return "Development"
}

export default async function Home() {
  // Fetch data in the Server Component
  const posts = await getAllPosts()

  // Make sure we have posts before destructuring
  if (!posts || posts.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-display font-bold text-gray-900">No posts found</h1>
      </div>
    )
  }

  const [featuredPost, ...regularPosts] = posts

  return (
    <>
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-display font-bold">The Editorial</h1>
          <div className="flex items-center space-x-6">
            <Link href="#" className="text-muted-foreground hover:text-foreground font-medium">
              About
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground font-medium">
              Archive
            </Link>
            <ThemeToggle />
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-full font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Featured Post - Hero Style */}
        <div className="mb-16">
          <Link href={`/blog/${featuredPost.slug}`} className="block">
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src={
                  featuredPost.frontmatter.featuredImage ||
                  "/placeholder.svg?height=600&width=1200&query=featured blog post" ||
                  "/placeholder.svg"
                }
                alt={featuredPost.frontmatter.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 featured-post-gradient"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <div className={`category-badge mb-4 ${getCategoryStyle(featuredPost.slug)}`}>
                  {getCategoryName(featuredPost.slug)}
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 leading-tight">
                  {featuredPost.frontmatter.title}
                </h2>
                <p className="text-lg text-white/90 mb-4 max-w-3xl">{featuredPost.frontmatter.excerpt}</p>
                <div className="flex items-center mt-6">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src={`/thoughtful-artist.png?height=100&width=100&query=portrait of ${featuredPost.frontmatter.author}`}
                      alt={featuredPost.frontmatter.author}
                      fill
                      className="object-cover author-avatar"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{featuredPost.frontmatter.author}</div>
                    <div className="text-sm text-white/80">
                      {new Date(featuredPost.frontmatter.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Main Content */}
          <div className="md:w-2/3">
            <h2 className="text-2xl font-display font-bold mb-8 pb-4 border-b border-border">Latest Articles</h2>
            <div className="space-y-12">
              {regularPosts.map((post) => (
                <article key={post.slug} className="post-card bg-card rounded-xl overflow-hidden border border-border">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="md:flex">
                      <div className="md:w-2/5 relative h-60 md:h-auto">
                        <Image
                          src={
                            post.frontmatter.featuredImage ||
                            `/placeholder.svg?height=400&width=600&query=blog post about ${post.frontmatter.title || "/placeholder.svg"}`
                          }
                          alt={post.frontmatter.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-3/5">
                        <div className={`category-badge mb-3 ${getCategoryStyle(post.slug)}`}>
                          {getCategoryName(post.slug)}
                        </div>
                        <h3 className="text-2xl font-display font-bold mb-3 leading-snug">{post.frontmatter.title}</h3>
                        <p className="text-muted-foreground mb-4 line-clamp-3">{post.frontmatter.excerpt}</p>
                        <div className="flex items-center mt-4">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden mr-3">
                            <Image
                              src={`/thoughtful-artist.png?height=100&width=100&query=portrait of ${post.frontmatter.author}`}
                              alt={post.frontmatter.author}
                              fill
                              className="object-cover author-avatar"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{post.frontmatter.author}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:w-1/3">
            <div className="bg-muted rounded-xl p-6 mb-8">
              <h3 className="text-xl font-display font-bold mb-4">Subscribe to our newsletter</h3>
              <p className="text-muted-foreground mb-4">Get the latest posts delivered right to your inbox.</p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-display font-bold mb-4">Popular Topics</h3>
              <div className="flex flex-wrap gap-2">
                <Link href="#" className="category-badge category-development">
                  Development
                </Link>
                <Link href="#" className="category-badge category-design">
                  Design
                </Link>
                <Link href="#" className="category-badge category-performance">
                  Performance
                </Link>
                <Link href="#" className="category-badge bg-muted text-muted-foreground">
                  JavaScript
                </Link>
                <Link href="#" className="category-badge bg-muted text-muted-foreground">
                  React
                </Link>
                <Link href="#" className="category-badge bg-muted text-muted-foreground">
                  UX
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
