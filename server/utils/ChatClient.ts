import type { BaseChatMemory } from 'langchain/dist/memory/chat_memory'
import { ConversationSummaryMemory } from 'langchain/memory'
import { OpenAI } from 'langchain/llms/openai'
import { LLMChain, PromptTemplate } from 'langchain'
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

  private initializeUserMemory(userId: string) {
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

    const prompt
      = PromptTemplate.fromTemplate(`The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.
  Settings:
  Human: {userName}
  AI: {aimigoName}
  MBTI: {mbti}
  Rules: {rules}
  Current conversation:
  {chat_history}
  Human: {input}
  AI:`)

    const memory = this.memory.get(params.userId)!

    const chain = new LLMChain({ llm: model, prompt, memory })
    const { text } = await chain.call({
      input: params.message,
      rules: this.descriptions.map((x, index) => `- ${index + 1}: ${x}`),
    })

    console.log({ text, memory: await memory.loadMemoryVariables({}) })

    return text
  }
}
