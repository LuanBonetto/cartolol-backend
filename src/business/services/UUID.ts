import { v4 as uuidv4 } from 'uuid';
import { UUIDGeneratorGateway } from '../gateways/UUIDGeneratorGateway';

export class UUIDGenerator implements UUIDGeneratorGateway {
  public generateUUID():string {
    return uuidv4();
  }
}
