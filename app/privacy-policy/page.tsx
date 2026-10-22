import type { Metadata } from "next"
import { PageHero } from "@/components/ui"
import { privacy } from "@/lib/site"

export const metadata: Metadata = { title: privacy.title }

export default function PrivacyPage() {
  // The page's own H1 ("Privacy Policy") is the hero title; the remaining blocks are the policy text.
  const blocks = privacy.blocks.filter((b) => !(b.t === "h" && b.l === 1))
  return (
    <>
      <PageHero title={privacy.h1} crumbs={[{ label: "Home", href: "/" }, { label: privacy.h1 }]} />
      <section className="container-x py-16 md:py-24">
        <div className="prose-x mx-auto max-w-3xl">
          {blocks.map((b, i) =>
            b.t === "h" ? (
              <h2 key={i} className="!text-2xl">
                {b.x}
              </h2>
            ) : (
              <p key={i}>{b.x}</p>
            ),
          )}
        </div>
      </section>
    </>
  )
}
