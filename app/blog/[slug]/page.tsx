import Image from "next/image"
import Link from "next/link"
import { ArrowLeftIcon, TwitterIcon, FacebookIcon, LinkedinIcon } from "lucide-react"
import { getPostBySlug, getAllPosts } from "@/lib/mdx"
import { notFound } from "next/navigation"
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

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Get related posts (excluding current post)
  const allPosts = await getAllPosts()
  const relatedPosts = allPosts.filter((p) => p.slug !== params.slug).slice(0, 2)

  return (
    <>
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="text-3xl font-display font-bold">
            The Editorial
          </Link>
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

      <article className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeftIcon className="mr-2" size={16} />
          Back to all posts
        </Link>

        <div className={`category-badge mb-4 ${getCategoryStyle(params.slug)}`}>{getCategoryName(params.slug)}</div>

        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">{post.frontmatter.title}</h1>

        <div className="flex items-center mb-8">
          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
            <Image
              src={`/thoughtful-artist.png?height=100&width=100&query=portrait of ${post.frontmatter.author}`}
              alt={post.frontmatter.author}
              fill
              className="object-cover author-avatar"
            />
          </div>
          <div>
            <div className="font-medium text-lg">{post.frontmatter.author}</div>
            <div className="text-muted-foreground">
              {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
          <div className="ml-auto flex space-x-2">
            <button className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
              <TwitterIcon size={18} />
            </button>
            <button className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
              <FacebookIcon size={18} />
            </button>
            <button className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
              <LinkedinIcon size={18} />
            </button>
          </div>
        </div>

        <div className="relative w-full aspect-[16/9] mb-10 overflow-hidden rounded-xl">
          <Image
            src={
              post.frontmatter.featuredImage || `/placeholder.svg?height=600&width=1200&query=${post.frontmatter.title}`
            }
            alt={post.frontmatter.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="prose dark:prose-invert prose-lg max-w-none article-dropcap">
          {/* This is where your MDX content would be rendered */}
          <p className="text-xl leading-relaxed">{post.frontmatter.excerpt}</p>

          <p className="mt-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
            tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae
            erat.
          </p>

          <h2>Example Heading</h2>

          <p>
            Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
            Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet.
          </p>

          <div className="article-highlight">
            Website performance directly impacts user experience and conversion rates. Optimizing your site speed is not
            just a technical concern—it's a business imperative.
          </div>

          <p>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque,
            auctor sit amet aliquam vel, ullamcorper sit amet ligula. Curabitur non nulla sit amet nisl tempus convallis
            quis ac lectus.
          </p>

          <h2>Another Important Point</h2>

          <p>
            Cras ultricies ligula sed magna dictum porta. Praesent sapien massa, convallis a pellentesque nec, egestas
            non nisi. Curabitur aliquet quam id dui posuere blandit.
          </p>
        </div>

        <div className="border-t border-b border-border my-12 py-8">
          <div className="flex items-center">
            <div className="relative w-16 h-16 rounded-full overflow-hidden mr-6">
              <Image
                src={`/thoughtful-artist.png?height=100&width=100&query=portrait of ${post.frontmatter.author}`}
                alt={post.frontmatter.author}
                fill
                className="object-cover author-avatar"
              />
            </div>
            <div>
              <div className="font-medium text-lg mb-1">Written by {post.frontmatter.author}</div>
              <p className="text-muted-foreground">
                Technical writer and web developer specializing in modern frontend technologies.
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-12">
          <h3 className="text-2xl font-display font-bold mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group">
                <div className="relative w-full aspect-video mb-3 overflow-hidden rounded-lg">
                  <Image
                    src={
                      relatedPost.frontmatter.featuredImage ||
                      `/placeholder.svg?height=300&width=500&query=${relatedPost.frontmatter.title || "/placeholder.svg"}`
                    }
                    alt={relatedPost.frontmatter.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h4 className="text-lg font-display font-bold mb-2 group-hover:text-muted-foreground transition-colors">
                  {relatedPost.frontmatter.title}
                </h4>
                <div className="text-sm text-muted-foreground">
                  {new Date(relatedPost.frontmatter.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 bg-muted rounded-xl p-8">
          <h3 className="text-2xl font-display font-bold mb-4 text-center">Subscribe to our newsletter</h3>
          <p className="text-muted-foreground mb-6 text-center">Get the latest posts delivered right to your inbox.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-medium transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </article>
    </>
  )
}
