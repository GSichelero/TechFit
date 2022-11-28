import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AlunosService } from 'src/app/services/alunos.service';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public usuario;
  public alunos;

  constructor( public firebaseService: FirebaseService 
    , public router: Router
    , private alunosService: AlunosService ) {

      this.usuario = this.alunosService. getUsuarioAutenticado().pipe(filter(usuario => usuario != undefined)).subscribe(usuario => {
        this.alunosService.getAlunosVinculados(usuario.cadastro.id).subscribe(ped => {
          this.alunos = ped;
        });
      })
      
    }

  ngOnInit() {
  }

  public treinoAluno(aluno){
    //const PersonalInfo = {id:p.cadastro.id, nome: p.cadastro.nome}
    this.router.navigate(['/listagem/semanas', aluno.pedido.treino])

  }

}
