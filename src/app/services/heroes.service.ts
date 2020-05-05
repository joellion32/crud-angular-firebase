import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
url: string = "https://crud-angular-63ddf.firebaseio.com";

  constructor(private http: HttpClient) { }


  obtenerHeroes(){
    return this.http.get<HeroeModel>(`${this.url}/heroes.json`)
    .pipe(
      map((this.crearArreglo))
    )
  }


  guardarHeroes(heroe: HeroeModel){
    return this.http.post(`${this.url}/heroes.json`, heroe)
    .pipe(
      map((resp: any) => {
       heroe.id = resp.name;
       return heroe; 
      })
    );
  }


 obtenerHeroeId(id: string){
  return this.http.get(`${this.url}/heroes/${id}.json`);
}



  actualizarHeroe(heroe: HeroeModel){
    const heroeTemp = {
     ...heroe 
    }
    
// eliminar el id
    delete heroeTemp.id;


    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }
  

  eliminarHeroe(id: string){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }



  // para convertir la iformacion y guardarla en un objeto
  private crearArreglo(ObjHeroes: object){
    const heroes: HeroeModel[] = [];


    if(ObjHeroes == null){ return []}

    Object.keys(ObjHeroes).forEach(key => {
      const heroe: HeroeModel = ObjHeroes[key];
      heroe.id = key;

      heroes.push(heroe);
    });

   return heroes;
  }
}
