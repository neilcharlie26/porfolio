import { useState } from "react"
import { Globe, Terminal, Database, Network, Wrench, Lightbulb } from "lucide-react"
import SectionHeading from "./SectionHeading"

const categories = [
  {
    id: "web",
    label: "Web Dev",
    icon: Globe,
    color: "var(--accent)",
    skills: [
      { name: "HTML5", level: 85 },
      { name: "CSS3", level: 80 },
      { name: "JavaScript", level: 70 },
      { name: "PHP", level: 75 },
      { name: "Bootstrap 5", level: 80 },
    ],
  },
  {
    id: "programming",
    label: "Programming",
    icon: Terminal,
    color: "#818cf8",
    skills: [
      { name: "C++", level: 65 },
      { name: "Arduino", level: 60 },
    ],
  },
  {
    id: "database",
    label: "Database",
    icon: Database,
    color: "#f59e0b",
    skills: [
      { name: "MySQL", level: 75 },
      { name: "DB Management", level: 70 },
      { name: "phpMyAdmin", level: 75 },
    ],
  },
  {
    id: "networking",
    label: "Networking",
    icon: Network,
    color: "#22d3a0",
    skills: [
      { name: "LAN Setup", level: 70 },
      { name: "WiFi Setup", level: 65 },
      { name: "Troubleshooting", level: 70 },
      { name: "Cable Crimping", level: 75 },
      { name: "Router Config", level: 60 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: Wrench,
    color: "#f472b6",
    skills: [
      { name: "VS Code", level: 85 },
      { name: "XAMPP", level: 80 },
      { name: "GitHub", level: 70 },
      { name: "Figma", level: 65 },
      { name: "Canva", level: 75 },
      { name: "Adobe PS", level: 60 },
      { name: "MS Office", level: 80 },
    ],
  },
  {
    id: "soft",
    label: "Soft Skills",
    icon: Lightbulb,
    color: "#fb923c",
    skills: [
      { name: "Critical Thinking", level: 80 },
      { name: "Problem Solving", level: 80 },
      { name: "Communication", level: 75 },
      { name: "Teamwork", level: 85 },
      { name: "Adaptability", level: 80 },
      { name: "Time Management", level: 75 },
      { name: "Attention to Detail", level: 82 },
      { name: "Works Under Pressure", level: 78 },
    ],
  },
]

export default function Skills() {
  const [active, setActive] = useState("web")
  const cat = categories.find((c) => c.id === active)!

  return (
    <section id="skills" className="py-24" style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading tag="Expertise" title="Technical Skills" subtitle="A categorized overview of my technical knowledge and tools." centered />

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-10 mb-12">
          {categories.map(({ id, label, icon: Icon, color }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: active === id ? "var(--accent-dim)" : "var(--bg-card)",
                border: `1px solid ${active === id ? "var(--accent)" : "var(--border-solid)"}`,
                color: active === id ? "var(--accent)" : "var(--text-muted)",
              }}
            >
              <Icon size={14} style={{ color: active === id ? color : "var(--text-dim)" }} />
              {label}
            </button>
          ))}
        </div>

        {/* Active category content */}
        <div
          className="rounded-2xl p-8"
          style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-solid)" }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cat.color}15`, border: `1px solid ${cat.color}30` }}>
              <cat.icon size={20} style={{ color: cat.color }} />
            </div>
            <h3 className="text-xl font-bold" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text)" }}>{cat.label}</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cat.skills.map(({ name, level }) => (
              <div key={name}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium" style={{ color: "var(--text)" }}>{name}</span>
                  <span className="text-xs font-mono" style={{ color: "var(--text-muted)", fontFamily: "JetBrains Mono, monospace" }}>{level}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--bg-card-2)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${level}%`,
                      background: `linear-gradient(90deg, ${cat.color}, ${cat.color}80)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech badges row */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {["PHP", "MySQL", "HTML5", "CSS3", "JavaScript", "Bootstrap 5", "C++", "Arduino", "GitHub", "VS Code", "Figma", "XAMPP"].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: "var(--accent-dim)", border: "1px solid var(--border)", color: "var(--accent)", fontFamily: "JetBrains Mono, monospace" }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
