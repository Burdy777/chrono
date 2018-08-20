import { Component, OnInit, HostListener, ElementRef, Renderer } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  progress:number;
  init = 10;
  constructor(
    private el:ElementRef,
    private render:Renderer
  ) {

  }

ngOnInit(): void {
  this.progress = 100;
}

random(min, max) {
  return Math.round(Math.random() * (max - min + 1)) + min;
};

decrementBar(event) {
  let currentNumber = (this.init - event) / this.init * 100;
  this.progress = 100 - currentNumber;
  console.log(this.progress)
}

}
