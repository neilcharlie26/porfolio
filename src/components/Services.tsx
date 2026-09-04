import { Globe, Palette, Code2, Database, Wrench, Network, ArrowRight } from "lucide-react"
import SectionHeading from "./SectionHeading"

const services = [
  { icon: Globe, title: "Web Development", desc: "Full-stack web applications built with PHP, MySQL, HTML5, CSS3, and Bootstrap 5.", color: "var(--accent)" },
  { icon: Palette, title: "Website UI Design", desc: "Clean, modern, and responsive UI designs using Figma and Bootstrap.", color: "#f472b6" },
  { icon: Code2, title: "PHP Development", desc: "Custom PHP backend logic, APIs, and server-side scripting solutions.", color: "#818cf8" },
  { icon: Database, title: "MySQL Database Design", desc: "Efficient database schema design, queries, and optimization for web apps.", color: "#f59e0b" },
  { icon: Wrench, title: "Basic IT Support", desc: "Technical troubleshooting, hardware/software diagnosis, and PC maintenance.", color: "#22d3a0" },
  { icon: Network, title: "Basic Networking", desc: "LAN setup, WiFi configuration, cable crimping, and network troubleshooting.", color: "#fb923c" },
]

export default function Services() {
  return (
    <section id="services" className="py-24" style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading tag="What I Offer" title="What I Can Help With" centered />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, desc, color }) => (
            <div
              key={title}
              className="rounded-2xl p-6 card-hover"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-solid)" }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${color}12`, border: `1px solid ${color}25` }}>
                <Icon size={22} style={{ color }} />
              </div>
              <h4 className="text-base font-bold mb-2" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text)" }}>{title}</h4>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200 accent-glow"
            style={{ backgroundColor: "var(--accent)", color: "#060d1a" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.9")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          >
            Let&apos;s Work Together <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
