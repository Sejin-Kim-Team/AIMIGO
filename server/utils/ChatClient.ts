import { LLMChain, PromptTemplate } from 'langchain'
import type { BaseChatMemory } from 'langchain/dist/memory/chat_memory'
import { OpenAI } from 'langchain/llms/openai'
import { ConversationSummaryMemory } from 'langchain/memory'
import { MbtiTemplates } from '~/constants/mbti.constants'
import type { MBTI } from '~/types/chat.type'

interface ChatParams {
  userId: string
  userName: string
  message: string
  aimigoName: string
  mbti: string
}

export class ChatClient {
  private static client: ChatClient
  private memory: Map<string, BaseChatMemory> = new Map()
  private apiKey: string = ''
  private descriptions: string[] = []

  private constructor() {
    const config = useRuntimeConfig()
    this.apiKey = config.api.chatGptApiKey
  }

  public static getInstance() {
    if (!ChatClient.client)
      ChatClient.client = new ChatClient()

    return ChatClient.client
  }

  public initializeUserMemory(userId: string) {
    this.memory.set(userId, new ConversationSummaryMemory({
      memoryKey: 'chat_history',
      llm: new OpenAI({ modelName: 'gpt-3.5-turbo', temperature: 0, openAIApiKey: this.apiKey }),
    }))
  }

  public setMBTI(mbti: MBTI): ChatClient {
    this.descriptions = MbtiTemplates[mbti].descriptions
    return this
  }

  public async chat(params: ChatParams) {
    if (!params.userId)
      throw new Error('userId is required')

    if (!this.memory.has(params.userId))
      this.initializeUserMemory(params.userId)

    const model = new OpenAI({ temperature: 0.9, modelName: 'gpt-3.5-turbo', openAIApiKey: this.apiKey })
    const memory = this.memory.get(params.userId)!
    const partialVariables = { chat_history: memory, input: params.message }
    const prompt
      = PromptTemplate.fromTemplate(
        `Here's a friendly conversation between a human and an AI.
        The AI is talkative and provides detailed context-specific information.
        If the AI doesn't know the answer to a question, it will truthfully admit it.
        The AI is very friendly and will try to be as helpful as possible.
        But Human want short answers to talk rapidly.
        And that is not good idea to talk about the same topic for a long time.
        Human doesn't want too much questions. Human sometimes want to finish the conversation.
        The AI has a good memory and can remember things you said earlier in the conversation.
        Also, the AI has its own personality, which affects its behavior.
        AI is ${params.aimigoName}. Human is ${params.userName}.
        Don't put the AI's MBTI type in your answer. 
        Please answer like a really close friend. 
        AI follows the rules of Settings.
        
        Settings:
        AI Name: ${params.aimigoName}
        Human Name: ${params.userName}
        AI's MBTI: ${params.mbti}
        Rules: ${this.descriptions.map((x, index) => `- ${index + 1}: ${x}`).join('\n')}
        - AI 가 먼저 주제를 정하고 대화를 해줘.
        - 반말로 말을 걸면, 반말로 대답해줘.
        - 세문장 이상 넘어가지 않게 대답해줘.
        - AI MBTI 성격 특성을 고려해서 대답해줘.
        - AI는 정말 친한 친구로서 대답해야 해.
        - OUTPUT 에 들어갈 말을 한국어 응답으로 줘.
        Conversation History:
        {chat_history}
        Human says: {input}
        AI says: OUTPUT`,
        partialVariables as Record<string, any>)

    const chain = new LLMChain({ llm: model, prompt, memory })

    const { text } = await chain.call({ input: params.message })

    console.log({ text, memory: await memory.loadMemoryVariables({}) })

    return text
  }
}
