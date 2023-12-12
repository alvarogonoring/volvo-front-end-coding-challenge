import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Car } from 'src/interfaces/Car';
import Cars from '../mocks/cars.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isMobile = false;
  cars: Car[] = Cars;
  filteredCars!: Car[];
  slideInitialPage = 0;
  slideLastPage = 4;
  isPreviousButtonDisabled = false;
  isNextButtonDisabled = false;
  private _filter = '';

  constructor(private renderer: Renderer2, private ref: ElementRef) { }

  ngOnInit(): void {
    this.checkResolution();

    this.renderer.listen('window', 'resize', () => {
      this.checkResolution();
    })

    this.filteredCars = Cars.slice(this.slideInitialPage, this.slideLastPage)
    this.isPreviousButtonDisabled = true
  }

  get filter(): string {
    return this._filter;
  }

  set filter(value: string) {
    this._filter = value;

    if (value.length >= 3) {
      this.filteredCars = Cars.filter(car => car.bodyType.includes(value))
    }

    if (!value) {
      this.filteredCars = Cars.slice(0, 4)
    }
  }

  public checkResolution() {
    const screenWidth = window.innerWidth;

    this.isMobile = screenWidth < 1150;
    this.filteredCars = this.isMobile ? this.cars : Cars.slice(this.slideInitialPage, this.slideLastPage)
  }

  public previousCar() {
    this.slideInitialPage -= 1
    this.slideLastPage -= 1
    this.filteredCars = Cars.slice(this.slideInitialPage, this.slideLastPage)

    if (this.slideInitialPage === 0) {
      this.isPreviousButtonDisabled = true
    }

    if (this.slideLastPage !== Cars.length) {
      this.isNextButtonDisabled = false
    }
  }

  public nextCar() {
    this.slideInitialPage += 1
    this.slideLastPage += 1
    this.filteredCars = Cars.slice(this.slideInitialPage, this.slideLastPage)

    if (this.slideInitialPage !== 0) {
      this.isPreviousButtonDisabled = false
    }

    if (this.slideLastPage === Cars.length) {
      this.isNextButtonDisabled = true
    }
  }
}
