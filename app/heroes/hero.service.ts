import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {

  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private heroesUrl: string = 'app/heroes'; // URL to Web API

  constructor(private http: Http) {}

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
            .then(heroes => heroes.find(hero => hero.id === id));
  }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
              .toPromise()
              .then(response => response.json().data as Hero[])
              .catch(this.handleError);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise<Hero[]>(resolve =>
      setTimeout(resolve, 2000))
      .then(() => this.getHeroes());
  }

  update(hero: Hero): Promise<Hero> {
    const update_url = this.heroesUrl+'/'+hero.id;
    return this.http
            .put(update_url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
  }

  create(heroName: string): Promise<Hero> {
    return this.http
            .post(this.heroesUrl, JSON.stringify({name: heroName}), {headers: this.headers})
            .toPromise()
            .then(response => response.json().data as Hero)
            .catch(this.handleError);
  }

  delete(heroId: number): Promise<void> {
    const url = `${this.heroesUrl}/${heroId}`;
    return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
