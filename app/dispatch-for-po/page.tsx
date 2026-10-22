import type { Metadata } from "next"
import { ServicePage } from "@/components/ServicePage"
import { img, services } from "@/lib/site"

const s = services[0].data

export const metadata: Metadata = { title: s.pageTitle }

export default function DispatchForPoPage() {
  return <ServicePage s={s} photo={img("2026/06/6-dispatch-scaled-qlubshaf3m2i1yhtpe5lohqbis9j869rnk40thkow0-1.jpg")} />
}
