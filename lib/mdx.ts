// This is a simplified version of what you might use to fetch MDX posts
// In a real app, you'd need to actually read and parse the MDX files

export type Frontmatter = {
  title: string
  date: string
  author: string
  excerpt: string
  featuredImage?: string
}

export type Post = {
  slug: string
  frontmatter: Frontmatter
  content: string
}

// Sample data representing 3 migrated WordPress posts
// Making this synchronous to avoid any promise issues
export async function getAllPosts(): Promise<Post[]> {
  // In a real implementation, you would read these from the filesystem
  // For now, we're returning mock data synchronously
  return [
    {
      slug: "getting-started-with-next-js",
      frontmatter: {
        title: "Getting Started with Next.js",
        date: "2023-04-15",
        author: "Jane Smith",
        excerpt:
          "Next.js is a powerful React framework that makes building fast, SEO-friendly websites easier than ever. In this guide, we'll explore the basics of Next.js and how it can transform your development workflow.",
        featuredImage: "/nextjs-code-in-focus.png",
      },
      content: "# Full content would go here",
    },
    {
      slug: "mastering-css-grid-layout",
      frontmatter: {
        title: "Mastering CSS Grid Layout",
        date: "2023-03-22",
        author: "Alex Johnson",
        excerpt:
          "CSS Grid has revolutionized web layout design. Learn how to create complex, responsive layouts with this powerful CSS feature that's now supported in all modern browsers.",
        featuredImage: "/css-grid-visualization.png",
      },
      content: "# Full content would go here",
    },
    {
      slug: "improving-website-performance",
      frontmatter: {
        title: "Improving Website Performance",
        date: "2023-02-10",
        author: "Mike Chen",
        excerpt:
          "Website performance directly impacts user experience and conversion rates. Discover practical techniques to optimize your site speed, from image optimization to code splitting and caching strategies.",
        featuredImage: "/website-speed-optimization-flowchart.png",
      },
      content: "# Full content would go here",
    },
  ]
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts()
  return posts.find((post) => post.slug === slug) || null
}
