import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css']
})
export class AuditoriaComponent implements OnInit {


  escrutinioid = null;
  identificacao = null;

  constructor(private route: ActivatedRoute,
              private  router: Router) { }

  ngOnInit(): void {
    this.escrutinioid = this.route.snapshot.paramMap.get('id');
    if  (this.escrutinioid.search(/^0x[\S]{40}/) === -1 ) {
      this.escrutinioid = null;
    }
  }


  escrutinioenter(e){

    if  (this.escrutinioid.search(/^0x[\S]{40}/) !== -1 ) {
       console.log('id: ', this.escrutinioid);
       this.router.navigate(['auditoria', this.escrutinioid]);
    }
  }

  auditar(e){

    if  (this.identificacao.search(/^0x[\S]{40}/) !== -1 ) {
      console.log('identificacao: ', this.identificacao);
    }

  }

}
