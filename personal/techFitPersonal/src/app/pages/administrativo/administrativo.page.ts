import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { AdministrativoService } from 'src/app/services/administrativo.service';

@Component({
  selector: 'app-administrativo',
  templateUrl: './administrativo.page.html',
  styleUrls: ['./administrativo.page.scss'],
})
export class AdministrativoPage implements OnInit {

  public personais;

  constructor( private admService: AdministrativoService) { 
  }

  ngOnInit() {
    this.getPersonalNA();
  }

  public async getPersonalNA() {
    debugger
    this.personais = await this.admService.getAllPersonal()
    debugger
    console.log(this.personais);
  }

  public confirmaCad(personal) {
    this.admService.aprovaPersonal(personal).then(() =>{
      this.ngOnInit();
    });
  }

  public reprovaCad(personal) {
    this.admService.reprovarPersonal(personal).then(() =>{
      this.ngOnInit();
    });
  }

}
