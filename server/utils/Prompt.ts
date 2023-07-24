interface PromptOption {
  option: string
  text: string
}

/*

* */

export class PromptBuilder {
  private headers: string[]
  private options: PromptOption[]
  private contents: string[]

  private footers: string[]

  constructor() {
    this.headers = []
    this.options = []
    this.footers = []
    this.contents = []
  }

  public addDefaultHeaders(): PromptBuilder {
    this.headers = [
      '---',
      'Write code for the topic below.',
      'Be sure to keep the options below.',
    ]
    return this
  }

  public addDefaultOptions(): PromptBuilder {
    this.options = [
      { option: 'Style', text: 'Precise' },
      { option: 'Reader level', text: 'Expert' },
      { option: 'Length', text: '3 Pages' },
      { option: 'Perspective', text: 'Developer' },
      { option: 'Language', text: 'Korean' },
    ]
    return this
  }

  public addDefaultFooters(): PromptBuilder {
    this.footers = ['So lets get started.', '---']
    return this
  }

  public addHeader(header: string): PromptBuilder {
    this.headers.push(header)
    return this
  }

  public addOption(option: string, text: string): PromptBuilder {
    this.options.push({ option, text })
    return this
  }

  public addContent(content: string): PromptBuilder {
    this.contents.push(content)
    return this
  }

  public build(): Prompt {
    return new Prompt(this.headers, this.options, this.contents, this.footers)
  }
}
export class Prompt {
  private readonly headers: string[]
  private readonly options: PromptOption[]
  private readonly contents: string[]
  private readonly footers: string[]

  constructor(headers: string[], options: PromptOption[], contents: string[], footers: string[]) {
    this.headers = headers
    this.options = options
    this.footers = footers
    this.contents = contents
  }

  public getFullPrompt(): string {
    const result: string[] = []

    result.push(this.headers.join('\n'))
    result.push(this.options.map(x => `- ${x.option}: ${x.text}`).join('\n'))
    result.push(this.footers.join('\n'))
    result.push(this.contents.join('\n'))
    result.push('{END}')

    return result.join('\n')
  }

  public getFullContents(): string {
    return this.contents.join('\n')
  }

  public getHeaders(): string[] {
    return this.headers
  }

  public getOptions(): PromptOption[] {
    return this.options
  }

  public getContents(): string[] {
    return this.contents
  }

  public getFooters(): string[] {
    return this.footers
  }

  public toJSON(): object {
    return {
      headers: this.headers,
      options: this.options,
      contents: this.contents,
      footers: this.footers,
    }
  }
}
