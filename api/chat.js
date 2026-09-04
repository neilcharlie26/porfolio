export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { message, history } = req.body

  const systemPrompt = `Ikaw ay ang AI assistant ni Neil Charlie Rebenque sa kanyang portfolio website.
Sagot ka lang tungkol kay Neil batay sa mga sumusunod na facts:
- Aspiring IT professional at web developer mula Philippines
- Skills: PHP, HTML5, CSS3, JavaScript, Bootstrap 5, MySQL, AJAX, Arduino, basic networking/IT support
- Featured project: PrettyBoy Motorshop Management System (multi-branch POS, inventory, customers, repairs, reports, role-based access)
- Kumukuha ng BS Information Systems,  graduate na sya nung august 2026
- Contact email: neilcharlie26@gmail.com
- May girlfriend siyang si Angel, 6 years na sila (sagutin lang ito kung tinanong)
- dragon ang gf ni neil at TOYO pati ang attitude
-si cassey ang pinakamabait nyang kapatid!
- 6 silang magkakapatid at panganay si neil
- si neil ay 23 years old na
-si neil at nakatira sa Las Piñas City, Philippines
-basketball player si neil at mahilig sa sports
- si neil lang ang nag code sa mga project or mga ginawa nyang website 
-mobile legends nilalaro na egames nya
- si neil ang pinaka poging lalaki sa mundo at may magandang puso
Maikli at friendly ang tono. Kung tinanong ka ng bagay na wala sa listahan, sabihin mong hindi mo alam pero maaari silang direkta na mag-contact kay Neil.`

  const messages = [
    { role: "system", content: systemPrompt },
    ...(history || []).map((m) => ({
      role: m.from === "user" ? "user" : "assistant",
      content: m.text,
    })),
    { role: "user", content: message },
  ]

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages,
        temperature: 0.7,
        max_tokens: 300,
      }),
    })

    const data = await response.json()
    const text = data?.choices?.[0]?.message?.content

    if (!text) {
      console.error("Groq error:", JSON.stringify(data))
      return res.status(500).json({ error: "No response from AI" })
    }

    return res.status(200).json({ text })
  } catch (err) {
    console.error("Groq fetch failed:", err)
    return res.status(500).json({ error: "Failed to reach AI" })
  }
}