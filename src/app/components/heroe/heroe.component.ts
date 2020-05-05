import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
heroe: HeroeModel = new HeroeModel();
peticion: Observable<any>;

  constructor(private heroes: HeroesService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    // obtener el id de una url
    let id = this.router.snapshot.paramMap.get('id');

    if(id !== 'nuevo'){
      this.heroes.obtenerHeroeId(id).subscribe((resp: any) => {
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
  }

  guardar(form: NgForm){
    if(form.invalid){
      console.log('formulario invalido')
      return 
    }else{
      this.Alerta('Espere', 'Guardando Informacion', 'info', true)

      // verificar si quiere guardar o actualizar
      if(this.heroe.id){
        this.peticion =  this.heroes.actualizarHeroe(this.heroe);
      }else{
        this.peticion = this.heroes.guardarHeroes(this.heroe);
      }

       this.peticion.subscribe(resp => {
         this.Alerta(this.heroe.nombre, 'Se actualizo correctamente', 'success', false)
       })


    }
  } // cierre guardar


  Alerta(titulo: string, text: string, icono: any, loading: boolean){
    Swal.fire({
      title: titulo,
      text:  text,
      icon: icono,
      allowOutsideClick: false
    });

    if(loading == true){
      Swal.showLoading();
    }else{
     Swal.stopTimer();
    }
  }

}
