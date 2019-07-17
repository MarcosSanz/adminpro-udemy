import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    this.subscription = this.regresaObservable()
      .subscribe(
        // Tenemos tres opciones dentro del subscribe.
        numero => console.log('subs ', numero),
        error => console.log('Error en el obs ', error),
        () => console.log('El observador termino!')
      );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('El página se va a cerrar');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador++;
        const salida = {
          valor: contador
        };
        observer.next(salida);

        // Con 3 para el observador.
        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // IF para que provoque un error forzado.
        // if (contador === 2) {
        //   clearInterval(intervalo);
        //   observer.error('Auxilio');
        // }
      }, 1000);
    }).pipe(
      map( respuesta => respuesta.valor),
      filter( ( valor, index ) => {
        // Hacemos un filtro para los numeros impares.
        if ( ( valor % 2) === 1) {
          return true;
        } else {
          return false;
        }
      })
    );

  }

}
