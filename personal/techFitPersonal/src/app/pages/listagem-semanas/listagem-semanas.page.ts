import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem-semanas',
  templateUrl: './listagem-semanas.page.html',
  styleUrls: ['./listagem-semanas.page.scss'],
})
export class ListagemSemanasPage implements OnInit {

  Semanas = [
    {id: "AKOPDADFNSDFON", nome: "SEMANA 01"},
    {id: "ASDFNAODNFAOSD", nome: "SEMANA 02"},
    {id: "FADFNADSPFNSDF", nome: "SEMANA 03"},
  ];
  constructor(private route: Router) { }

  ngOnInit() {
  }
}
