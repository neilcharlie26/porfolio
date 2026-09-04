import { useEffect, useRef, useState } from "react"
import { ArrowUp, ChevronDown, MessageCircle, RotateCcw, Sparkles, X } from "lucide-react"

type Message = { from: "assistant" | "user"; text: string }

const suggestions = ["Who is Neil?", "What can Neil build?", "Tell me about his best project", "How can I contact him?"]

function AssistantMark({ size = 22 }: { size?: number }) {
  return <span aria-hidden="true" className="gemini-mark shrink-0" style={{ width: size, height: size }} />
}

function getLocalResponse(question: string) {
  const normalized = question.toLowerCase()

  if (normalized.includes("who") || normalized.includes("about") ) {
    return "Neil Charlie Rebenque is an aspiring IT professional and web developer from the Philippines. He focuses on practical, user-friendly technology solutions and is open to opportunities."
  }
  if (normalized.includes("build") || normalized.includes("skill") || normalized.includes("technology") || normalized.includes("tech")) {
    return "Neil works with PHP, HTML5, CSS3, JavaScript, Bootstrap 5, MySQL, AJAX, Arduino, and basic networking and IT support tools."
  }
  if (normalized.includes("project") || normalized.includes("best") || normalized.includes("motorshop") || normalized.includes("motorcycle")) {
    return "His featured project is the PrettyBoy Motorshop Management System, a multi-branch platform for POS, inventory, customers, repairs, reports, and role-based access."
  }
  if (normalized.includes("contact") || normalized.includes("email") || normalized.includes("reach")) {
    return "You can contact Neil at neilcharlie26@gmail.com, or use the Contact section on this page for his social links and contact details."
  }
  if (normalized.includes("education") || normalized.includes("study") || normalized.includes("graduate")) {
    return "Neil is pursuing a BS in Information Systems and is expected to graduate in 2026. He is continuously learning through academic and personal projects."
  }
  if (normalized.includes("girlfriend") || normalized.includes("gf") || normalized.includes("angel") || normalized.includes("relationship") || normalized.includes("dating") || normalized.includes("single")) {
    return "Yes, Neil has a girlfriend named Angel. They've been together for 6 years. Wag nyona balakin dragon yung GF nya"
  }

  return "I can tell you about Neil, his skills, projects, education, or how to contact him. Try asking about one of those topics."
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const [error, setError] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 180) }, [open])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages, typing])

  const sendMessage = async (value: string) => {
  const text = value.trim()
  if (!text || typing) return
  const nextMessages: Message[] = [...messages, { from: "user", text }]
  setMessages(nextMessages)
  setInput("")
  setError("")
  setTyping(true)

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, history: messages }),
    })

    if (!response.ok) throw new Error("Request failed")

    const data = await response.json()
    setMessages((current) => [...current, { from: "assistant", text: data.text }])
  } catch (err) {
    setMessages((current) => [...current, { from: "assistant", text: getLocalResponse(text) }])
  } finally {
    setTyping(false)
  }
}

  const resetChat = () => {
    setMessages([])
    setTyping(false)
    setInput("")
    setError("")
    inputRef.current?.focus()
  }

  return (
    <>
      {!open && (
        <button type="button" onClick={() => setOpen(true)} className="group fixed bottom-5 right-5 z-50 flex h-14 items-center gap-2.5 overflow-hidden rounded-full border border-white/10 bg-[#101218] px-4 text-white shadow-[0_16px_48px_rgba(0,0,0,.34)] transition-all duration-300 hover:-translate-y-1 hover:pr-5 sm:bottom-6 sm:right-6" aria-label="Open Neil AI assistant">
          <AssistantMark size={24} />
          <span className="max-w-0 whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover:max-w-28 group-hover:opacity-100">Ask Neil</span>
          <MessageCircle size={18} className="opacity-70 group-hover:hidden" />
        </button>
      )}

      {open && (
          <section className="fixed inset-x-3 bottom-3 z-50 flex h-[min(650px,calc(100dvh-24px))] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#101218] text-[#e3e3e3] shadow-[0_28px_90px_rgba(0,0,0,.48)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[620px] sm:w-[430px]" aria-label="Neil portfolio assistant">
          <header className="flex h-16 shrink-0 items-center justify-between px-5">
            <div className="flex items-center gap-2.5"><AssistantMark /><div><h2 className="text-[15px] font-semibold leading-tight text-white">Neil Assistant</h2><p className="text-[11px] text-[#9aa0a6]">Portfolio assistant</p></div></div>
            <div className="flex items-center gap-1">
              <button type="button" onClick={resetChat} className="rounded-full p-2.5 text-[#9aa0a6] transition hover:bg-white/10 hover:text-white" aria-label="New conversation"><RotateCcw size={17} /></button>
              <button type="button" onClick={() => setOpen(false)} className="rounded-full p-2.5 text-[#9aa0a6] transition hover:bg-white/10 hover:text-white" aria-label="Close assistant"><X size={19} /></button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-5 pb-4">
            {messages.length === 0 ? (
              <div className="flex min-h-full flex-col justify-center py-4">
                <AssistantMark size={36} />
                <h3 className="gemini-text mt-5 text-[30px] font-medium tracking-tight">Hello, I'm Neil's assistant</h3>
                <p className="mt-2 max-w-sm text-[15px] leading-6 text-[#aeb4bc]">I can help you explore Neil's work, skills, experience, and the ideas behind his projects.</p>
                <div className="mt-7 grid grid-cols-2 gap-2.5">
                  {suggestions.map((suggestion, index) => (
                    <button key={suggestion} type="button" onClick={() => sendMessage(suggestion)} className="group min-h-24 rounded-2xl border border-white/[.06] bg-[#1b1d23] p-3.5 text-left text-[13px] leading-5 text-[#d6d9de] transition hover:border-[#7c9eff]/40 hover:bg-[#22252c]">
                      <Sparkles size={15} className={`mb-3 ${index % 2 ? "text-[#f3a6c8]" : "text-[#8ab4f8]"}`} />{suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6 pt-3">
                {messages.map((message, index) => (
                  <div key={`${message.text}-${index}`} className={`flex gap-3 ${message.from === "user" ? "justify-end" : "justify-start"}`}>
                    {message.from === "assistant" && <AssistantMark size={22} />}
                    <div className={message.from === "user" ? "max-w-[82%] rounded-[22px] bg-[#282a2f] px-4 py-3 text-[14px] leading-6" : "max-w-[86%] text-[14px] leading-6 text-[#d9dce1]"}>{message.text}</div>
                  </div>
                ))}
                {typing && <div className="flex items-center gap-3"><AssistantMark size={22} /><div className="flex gap-1.5">{[0, 1, 2].map((dot) => <span key={dot} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#8ab4f8]" style={{ animationDelay: `${dot * 120}ms` }} />)}</div></div>}
                {error && <div className="ml-9 rounded-2xl border border-[#f28b82]/25 bg-[#f28b82]/10 px-3.5 py-3 text-xs leading-5 text-[#f6aea8]">{error}</div>}
                <div ref={bottomRef} />
              </div>
            )}
          </div>

          <div className="shrink-0 px-4 pb-4">
            <div className="rounded-[24px] border border-white/[.08] bg-[#1b1d23] p-2 shadow-inner">
              <div className="flex items-end gap-2">
                <input ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && sendMessage(input)} placeholder="Ask about Neil's portfolio" className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-[#858b94]" aria-label="Message Neil AI" />
                <button type="button" onClick={() => sendMessage(input)} disabled={!input.trim() || typing} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#a8c7fa] text-[#062e6f] transition hover:bg-[#c2d7fa] disabled:bg-[#33363d] disabled:text-[#777d87]" aria-label="Send message"><ArrowUp size={18} strokeWidth={2.4} /></button>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-[#7f858e]"><span>Answers use Neil's portfolio</span><ChevronDown size={11} /></div>
          </div>
        </section>
      )}
    </>
  )
}
