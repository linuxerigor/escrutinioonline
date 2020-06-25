import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  escrutinioid = null;

  constructor(private  router: Router) { }

  ngOnInit(): void {
  }

  escrutinioenter(e){

    if  (this.escrutinioid.search(/^0x[\S]{40}/) !== -1 ) {
       console.log('id: ', this.escrutinioid);
       this.router.navigate(['escrutinio', this.escrutinioid]);
    }
  }
}
