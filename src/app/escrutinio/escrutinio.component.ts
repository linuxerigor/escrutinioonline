import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockChainService } from '../block-chain.service';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-escrutinio',
  templateUrl: './escrutinio.component.html',
  styleUrls: ['./escrutinio.component.css']
})
export class EscrutinioComponent implements OnInit {

  escrutinioid = null;
  propostos = null;
  minhachave = null;
  chavesalva = false;
  submitted = false;
  vototerminado = false;

  confirm = false;


  constructor(private route: ActivatedRoute,
              public snackBar: MatSnackBar,
              private blockchainservice: BlockChainService) {
  }

  ngOnInit(): void {
    this.escrutinioid = this.route.snapshot.paramMap.get('id');
    if  (this.escrutinioid.search(/^0x[\S]{40}/) === -1 ) {
      this.escrutinioid = null;
    }

    //this.minhachave = '0x57080e4aE09Ea03A3fB82304A92D30210f055882';


    // this.blockchainservice.fechPropostos(this.escrutinioid).then(
    //   (ret) => { this.propostos = ret; },
    //   () => { console.log('error'); }
    // );

  }
  setchavesalva(){
    this.chavesalva = true;
    this.blockchainservice.fechPropostos(this.escrutinioid).then(
      (ret) => { this.propostos = ret; },
      () => { console.log('error'); }
    );
  }

  criarid(){
      this.blockchainservice.createaddress().then(
      (ret) => { this.minhachave = ret; },
      () => { console.log('error'); }
    );
  }

  confirmvoto(item: any) {

    if ( confirm('Você confirma o seu foto para: ' + item.nome)) {
      this.submitted = true;
      this.blockchainservice.votar(this.escrutinioid, this.minhachave, item.id).then(
        (ret) => {
          console.log(ret);
          this.submitted = false;
          this.vototerminado = true;
        },
        () => {
          console.log('error');
          this.submitted = false;
        }
      );
    }
  }


  sharebyclipboard(val){
      val.target.select();
      document.execCommand('copy');

      this.snackBar.open('Chave copiada', 'Fechar', {
        duration: 2000,
      });
  }


}
