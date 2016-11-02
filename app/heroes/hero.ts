export class Hero {
  id: number;
  name: string;

  constructor (public argId: number, public argName: string) {
    this.id = argId;
    this.name = argName;
  }
}
