export default class Championship {
  constructor(
    private id: string,
    private name: string,
    private imageId: string,
  ){}

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getImageID(): string {
    return this.imageId;
  }
}
