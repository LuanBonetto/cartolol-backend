export default class Team {
  constructor(
    private id: string,
    private name: string,
    private image: string,
    private championship: string,
  ){}

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getImage(): string {
    return this.image;
  }

  public getChampionship(): string {
    return this.image;
  }
}
