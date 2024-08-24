import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 15 flashcards.
Both front and back should be one sentence long. Make sure the front of the card is a question and the back is the answer.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`

export async function POST(req){
    const openai = new OpenAI(process.env.OPENAI_API_KEY)
    const data = await req.text()

    const completion = await openai.chat.completions.create({
        messages: [
            {role: "system", content: systemPrompt},
            {role: "user", content: data}
        ],
        model: "gpt-4o-mini",
        response_format: {type: 'json_object'},
    })
    
    const flashcards = JSON.parse(completion.choices[0].message.content)

    return NextResponse.json(flashcards.flashcards)
}
