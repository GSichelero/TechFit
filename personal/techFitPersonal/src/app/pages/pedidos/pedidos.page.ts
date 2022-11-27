import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { AlunosService } from 'src/app/services/alunos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  public usuario;
  public pedidos;

  constructor(private alunoService: AlunosService) { 

    this.usuario = this.alunoService. getUsuarioAutenticado().pipe(filter(usuario => usuario != undefined)).subscribe(usuario => {
      this.pedidos = this.alunoService.getAllPedidos(usuario.cadastro.id).subscribe(ped => {
        console.log(ped);
        this.pedidos = ped;
        debugger
      });
    })

  }

  ngOnInit() {
  }


  public aceitarPedido(pedido){
    const user = this.alunoService.getUsuarioAutenticado().value
    this.alunoService.vincularAluno(user.cadastro.id, pedido).then(()=>{
      this.alunoService.descartarPedido(user.cadastro.id, pedido).then(()=>{
        this.ngOnInit();
      })

    })
    
  }

  public negarPedido(pedido){
    const user = this.alunoService.getUsuarioAutenticado().value
    this.alunoService.descartarPedido(user.cadastro.id, pedido)
  }

}
