export interface ValidatorGateway {
  isValidEmail(email: string): boolean
  isValidTimestamp(timestamp: number): boolean
}
