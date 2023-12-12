import { Component, Input } from '@angular/core';
import { Car } from 'src/interfaces/Car';

@Component({
  selector: 'app-car-box',
  templateUrl: './car-box.component.html',
  styleUrls: ['./car-box.component.css']
})
export class CarBoxComponent {
  @Input() car!: Car
}
