import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;

  constructor(private heroeService: HeroesService) { }

  ngOnInit(): void {
      this.cargando = true;
      this.obtenerHeroes();
  }

  obtenerHeroes(){
    this.heroeService.obtenerHeroes().subscribe(resp => {
      console.log(resp); 
      this.heroes = resp;
      this.cargando = false;
     });
  }


  eliminarHeroe(heroe: HeroeModel, i: number){
    Swal.fire({
      title: 'Estas Seguro?',
      text: `Esta seguro de que quiere eliminar a ${heroe.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then((resp) => {
      if(resp.value){
        this.heroes.splice(i, 1);
        this.heroeService.eliminarHeroe(heroe.id).subscribe();
      }
    });
  }

}
