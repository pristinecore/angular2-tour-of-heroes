import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: 'views/heroes.component.html',
  styleUrls: [ 'css/heroes.component.css' ]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor (
    private heroService: HeroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  gotoDetail(): void{
    let link = ['/detail', this.selectedHero.id];
    this.router.navigate(link);
  }

  add(heroName: string): void {
    heroName = heroName.trim();
    if(!heroName) {
      return;
    }

    this.heroService.create(heroName)
          .then(hero => {
            this.heroes.push(hero);
            this.selectedHero = null;
          });
  }

  delete(hero: Hero): void {
    this.heroService.delete(hero.id)
          .then(() => {
            this.heroes = this.heroes.filter(h => h !== hero);
            if (this.selectedHero === hero) {
              this.selectedHero = null;
            }
          });
  }
}
