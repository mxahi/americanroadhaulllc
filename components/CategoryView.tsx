import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { BlogCard } from "./BlogCard"
import { PageHero } from "./ui"
import { categories, POSTS_PER_PAGE, posts } from "@/lib/site"

export const brand = "American Road Haul LLC"

export function newsPageCount() {
  return Math.ceil(posts.length / POSTS_PER_PAGE)
}

export function categoryTitle(label: string, page = 1, pages = 1) {
  return `${label} Archives${page > 1 ? ` - Page ${page} of ${pages}` : ""} - ${brand}`
}

/** The old blog's category archives: "News" (all posts, paginated), "Press Release" and "People and Culture". */
export function CategoryView({ category, page = 1 }: { category?: (typeof categories)[number]; page?: number }) {
  const label = category?.label ?? "News"
  const list = category ? posts.filter((p) => p.category === category.label) : posts
  const pages = category ? 1 : newsPageCount()
  const shown = category ? list : list.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)
  const base = "/category/news"
  const href = (n: number) => (n === 1 ? base : `${base}/page/${n}`)

  return (
    <>
      <PageHero
        title={label}
        crumbs={[
          { label: "Home", href: "/" },
          ...(category ? [{ label: "News", href: base }, { label }] : [{ label }]),
        ]}
      />
      <section className="container-x py-16 md:py-24">
        <div className="flex flex-wrap gap-2">
          {[{ slug: "", label: "News" }, ...categories].map((c) => {
            const on = (category?.slug ?? "") === c.slug
            return (
              <Link
                key={c.label}
                href={c.slug ? `${base}/${c.slug}` : base}
                className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                  on ? "border-accent bg-accent text-accent-ink" : "border-line hover:border-ink"
                }`}
              >
                {c.label}
              </Link>
            )
          })}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>

        {pages > 1 && (
          <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
            {page > 1 && (
              <Link href={href(page - 1)} className="btn btn-ghost" rel="prev">
                <ArrowLeft size={16} /> Previous
              </Link>
            )}
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <Link
                key={n}
                href={href(n)}
                aria-current={n === page ? "page" : undefined}
                className={`grid h-11 w-11 place-items-center rounded-lg border font-semibold transition ${
                  n === page ? "border-accent bg-accent text-accent-ink" : "border-line hover:border-ink"
                }`}
              >
                {n}
              </Link>
            ))}
            {page < pages && (
              <Link href={href(page + 1)} className="btn btn-ghost" rel="next">
                Next <ArrowRight size={16} />
              </Link>
            )}
          </nav>
        )}
      </section>
    </>
  )
}
