import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonalService } from 'src/app/services/personal.service';


@Component({
  selector: 'app-tela-personal',
  templateUrl: './tela-personal.page.html',
  styleUrls: ['./tela-personal.page.scss'],
})
export class TelaPersonalPage implements OnInit {
  
  public selectedId = this.route.snapshot.params.id;
  public selectedPeronal;

  constructor(private route: ActivatedRoute, public personalService: PersonalService) { 

    this.personalService.getPersonalById(this.selectedId).then((user) =>{
      return this.selectedPeronal = user.data();
    })

  }

  ngOnInit() {
  }

}
