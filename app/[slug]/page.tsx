import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays } from "lucide-react"
import { BlogCard } from "@/components/BlogCard"
import { CommentForm } from "@/components/CommentForm"
import { CtaLink, PageHero, Pic } from "@/components/ui"
import { categories, posts, siteUrl, type Post } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  return post ? { title: `${post.title} - American Road Haul LLC` } : {}
}

function Body({ blocks, slug }: { blocks: Post["body"]; slug: string }) {
  return (
    <div className="prose-x">
      {blocks.map((b, i) => {
        if (b.t === "h") return <h3 key={i}>{b.x}</h3>
        if (b.t === "q")
          return (
            <blockquote key={i}>
              {b.x}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(b.x)}&url=${encodeURIComponent(`${siteUrl}/${slug}/`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-sm font-semibold text-accent hover:underline"
              >
                Tweet
              </a>
            </blockquote>
          )
        if (b.t === "li") return <p key={i}>{b.x}</p>
        return <p key={i}>{b.x}</p>
      })}
    </div>
  )
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const idx = posts.findIndex((p) => p.slug === slug)
  if (idx < 0) notFound()
  const post = posts[idx]
  const cat = categories.find((c) => c.label === post.category)
  const related = [1, 2, 3, 4].map((n) => posts[(idx + n) % posts.length])

  return (
    <>
      <PageHero
        title={post.title}
        crumbs={[{ label: "Home", href: "/" }, { label: "News", href: "/category/news" }, { label: post.category }]}
      />
      <article className="container-x py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <span className="flex items-center gap-2">
              <CalendarDays size={16} className="text-accent" /> {post.date}
            </span>
            <span aria-hidden>/</span>
            <Link href={cat ? `/category/news/${cat.slug}` : "/category/news"} className="eyebrow !px-2.5 !py-1 !text-[11px]">
              {post.category}
            </Link>
          </div>
          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl shadow-[var(--shadow)]">
            <Pic src={post.cover} sizes="(min-width: 768px) 768px, 100vw" priority />
          </div>
          <Body blocks={post.body} slug={post.slug} />
          <p className="mt-10 text-sm text-muted">
            Tags:{" "}
            <Link href={cat ? `/category/news/${cat.slug}` : "/category/news"} className="font-semibold text-ink hover:text-accent">
              {post.category}
            </Link>
          </p>
          <CommentForm title={post.title} />
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
            <Link href="/category/news" className="btn btn-ghost">
              <ArrowLeft size={16} /> News
            </Link>
            <CtaLink href="/contact-us">Contact Us</CtaLink>
          </div>
        </div>
      </article>
      <section className="container-x pb-20">
        <h2 className="font-display text-2xl font-semibold md:text-3xl">Related news</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </>
  )
}
