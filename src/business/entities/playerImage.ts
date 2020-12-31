export default class PlayerImage {
  constructor(
    private id: string,
    private name: string,
    private size: number,
    private url: string
  ){}

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getSize(): number {
    return this.size;
  }

  public getUrl(): string {
    return this.url;
  }
}
