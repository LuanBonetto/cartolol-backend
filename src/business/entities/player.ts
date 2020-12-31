export default class Player {
  constructor(
    private id: string,
    private name: string,
    private image: string,
    private nickname: string,
    private lane: Lane,
    private secondaryLane: Lane | undefined = undefined,
    private team: string,
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

  public getNickname(): string {
    return this.nickname;
  }

  public getLane(): string {
    return this.lane;
  }

  public getSecondaryLane(): string | undefined {
    return this.secondaryLane;
  }

  public getTeam(): string {
    return this.team;
  }
}

export enum Lane {
  JG = "Jungler",
  MID = "Mid Laner",
  SUP = "Support",
  ADC = "Bot Laner",
  TOP = "Top Laner"
}
