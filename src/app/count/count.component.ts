import {
  Component,
  OnInit,
  Input,
  Output
} from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss']
})
export class CountComponent implements OnInit {
  @Input() init: number = null;
  @Output() countDown = new EventEmitter();
  public counter: number;
  public finish: string = 'Temps écoulé !';

  constructor() { }

  ngOnInit() {
    this.start();
  }

  start(){
    this.counter = this.init;
    this.count();
  };

  count() {
    setTimeout(()=> {
      this.counter--;
      this.countDown.emit(this.counter);
      this.countProcess();
    }, 100);
  };

  countProcess(){
    if(this.counter === 0){
      const p = document.querySelector('h2');
      p.style.fontSize = '10em';
      p.innerHTML = this.finish;
     }else{
      this.count();
    }
  }



}
