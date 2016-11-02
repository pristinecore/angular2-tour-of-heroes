import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: 'views/hero-detail.component.html',
  styleUrls: [ 'css/hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {

  @Input()
  hero: Hero;

  // To inject necessary services, HeroService, ActivateRoute, and Location
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  // To get a specified hero by ID within OnInit lifecycle
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.heroService.getHero(id)
        .then(hero => this.hero = hero);
    });
  }

  // To go back one step back
  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }
}
