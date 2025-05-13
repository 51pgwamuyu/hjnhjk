

const { default: Together } = require("together-ai");



const together = new Together({
  apiKey: process.env.TOGETHER,
});
export async function POST(request) {
  try {
    const data = await request.json();
    const prompt = `You are Dr. Love, answer ${data.message} question in form of love like find connection of love in users questions and anawer it correctly`
    const response = await together.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt
        },
      ],
      model: "meta-llama/Llama-3-70b-chat-hf",
    });
    console.log(response, "together");
    if (
      response &&
      response.choices &&
      response.choices.length > 0 &&
      response.choices[0].message &&
      response.choices[0].message.content
    ) {
      const message =
        response.choices[0].message.content || "No content recieved";
        return Response.json( message );
    }
  } catch (error) {
    console.log(error, "rt");
    // res.status(500).json({ error: "Failed to get response from Llama model" });
  }
}
