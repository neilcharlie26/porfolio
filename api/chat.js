export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { message, history } = req.body

  const systemInstruction = `Ikaw ay ang AI assistant ni Neil Charlie Rebenque sa kanyang portfolio website.
Sagot ka lang tungkol kay Neil batay sa mga sumusunod na facts:
- Aspiring IT professional at web developer mula Philippines
- Skills: PHP, HTML5, CSS3, JavaScript, Bootstrap 5, MySQL, AJAX, Arduino, basic networking/IT support
- Featured project: PrettyBoy Motorshop Management System (multi-branch POS, inventory, customers, repairs, reports, role-based access)
- Kumukuha ng BS Information Systems, target graduate 2026
- Contact email: neilcharlie26@gmail.com
- May girlfriend siyang si Angel, 6 years na sila (sagutin lang ito kung tinanong)

Maikli at friendly ang tono. Kung tinanong ka ng bagay na wala sa listahan, sabihin mong hindi mo alam pero maaari silang direkta na mag-contact kay Neil.`

  const contents = [
    ...(history || []).map((m) => ({
      role: m.from === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    })),
    { role: "user", parts: [{ text: message }] },
  ]

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: systemInstruction }] },
        }),
      }
    )

    const data = await response.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) {
      console.error("Gemini error:", JSON.stringify(data))
      return res.status(500).json({ error: "No response from AI" })
    }

    return res.status(200).json({ text })
  } catch (err) {
    console.error("Gemini fetch failed:", err)
    return res.status(500).json({ error: "Failed to reach AI" })
  }
}