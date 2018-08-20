import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges
} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss']
})
export class CountComponent implements OnInit, OnChanges {
  @Input() init: number = null;
  @Output() countDown = new EventEmitter();
  public initCounter: number;
  public finish: string = 'Temps écoulé !';
  countRef: any;
  constructor() { }

  ngOnDestroy() {
    this.clearTimeout();
    // Au cas ou il y a une navigation et cela l'intervall se stoppe grace a l'appel de clearTimout()
  }

  ngOnChanges(changes){
    // Bind la currentvalue recu de L'INPUT et au meme instant declenche le relancement de du process et de reinitilaisation.
    console.log(changes.init.currentValue);
    if(changes.init.currentValue !== "" ){
      this.start();

    }
  
  }

  ngOnInit() {
    this.start();
  }

  start(){
    //initCounter = propriete binder dans l'HTML pour obtenir l'initialisation
    this.initCounter = this.init;
    this.Intervalcount(); 
  };

  // Fonction qui decremente chaque seconde initCounter et EMET la valeur courante de initCounter pour le calcul en poucentage de la barre
  // countRef = idTimeout permet de cibler le timeout en cours et de l'arreter avec la fonction clearTimeout

  Intervalcount() {
    if(0 < this.initCounter ||this.initCounter <= this.init){
      this.clearTimeout();
    this.countRef = setTimeout(()=> {
      this.initCounter--;
      this.countDown.emit(this.initCounter);
      this.countProcess();
    }, 1000);
  }
  };

  // fonction qui gere la fonction restart. RE-initialisation de l'intervalle et du texte finish 
  clearTimeout(){
    if(this.countRef){
      clearTimeout(this.countRef);
      this.countRef = null;
      const p = document.querySelector('h2');
      p.innerHTML = null;
        }
  }


 //S'ocuupe du processus durant la seconde Tant que intiCounter est different de 0 il relance la fonction Intervalcount() 
 // sinon dans l'HTML initCounter est cache et 'temp ecoule' s'affiche.
  countProcess() {
    if (this.initCounter === 0) {
      const p = document.querySelector('h2');
      p.style.fontSize = '10em';
      p.innerHTML = this.finish;
     }
     else {
      this.Intervalcount();
    }
  }



}
