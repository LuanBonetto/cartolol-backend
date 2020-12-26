import validator from 'email-validator';
import { ValidatorGateway } from '../gateways/ValidatorGateway';

export class Validator implements ValidatorGateway {
  public isValidEmail(email: string): boolean {
    return validator.validate(email)
  }

  public isValidTimestamp(timestamp: number): boolean{
    return new Date(timestamp).getDate() > 0;
  }
}
