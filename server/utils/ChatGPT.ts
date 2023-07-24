import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai'

export class ChatGPT {
  private openai: OpenAIApi
  private model: string
  private role: ChatCompletionRequestMessageRoleEnum
  private temperature: number
  private maxTokens: number

  constructor(builder: ChatGPTBuilder) {
    this.openai = new OpenAIApi(builder.configuration)
    this.model = builder.model
    this.role = builder.role
    this.temperature = builder.temperature
    this.maxTokens = builder.maxTokens
  }

  public async chat(messages: string[]): Promise<string[]> {
    const { data } = await this.openai.createChatCompletion({
      model: this.model,
      temperature: this.temperature,
      max_tokens: this.maxTokens,
      messages: messages.map(message => ({ role: this.role, content: message })),
    })

    const result = data.choices.map(choice => choice?.message?.content).filter(x => x)

    return result as string[]
  }
}

export class ChatGPTBuilder {
  apiKey: string
  model = 'gpt-4'
  temperature = 0.05
  maxTokens = 512
  role: ChatCompletionRequestMessageRoleEnum = ChatCompletionRequestMessageRoleEnum.User
  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  withTemperature(temperature: number) {
    this.temperature = temperature
    return this
  }

  withMaxTokens(maxTokens: number) {
    this.maxTokens = maxTokens
    return this
  }

  withModel(model: string) {
    this.model = model
    return this
  }

  withRole(role: ChatCompletionRequestMessageRoleEnum) {
    this.role = role
    return this
  }

  get configuration() {
    return new Configuration({
      apiKey: this.apiKey,
    })
  }

  build() {
    return new ChatGPT(this)
  }
}
