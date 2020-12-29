export interface MailGateway {
  send(text: string, subject: string, to: Array<string>, html: string): Promise<void>
}
