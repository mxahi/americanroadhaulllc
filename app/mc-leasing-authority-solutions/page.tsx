import type { Metadata } from "next"
import { ServicePage } from "@/components/ServicePage"
import { img, services } from "@/lib/site"

const s = services[1].data

export const metadata: Metadata = { title: s.pageTitle }

export default function McLeasingPage() {
  return <ServicePage s={s} photo={img("2026/06/7-factoring-9-scaled-qlublibieuixy2mdevo7or28wwmj4zlfp1xdolwt1c-1.jpg")} />
}
