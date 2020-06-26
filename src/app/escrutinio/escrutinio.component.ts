import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockChainService } from '../block-chain.service';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  vototerminadoret = null;
  votacaoTerminada = false;
  error = false;

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


    const ret = localStorage.getItem('minhachave');
    if (ret) {
      this.minhachave = ret;
    }

    this.blockchainservice.votacaoTerminada(this.escrutinioid).then(
      (ret) => {
        if (ret){
          console.log('votacaoTerminada: ', ret);
          this.votacaoTerminada = true;
        }
      });

    //this.minhachave = '0x57080e4aE09Ea03A3fB82304A92D30210f055882';


    // this.blockchainservice.fechPropostos(this.escrutinioid).then(
    //   (ret) => { this.propostos = ret; },
    //   () => { console.log('error'); }
    // );

  }
  setchavesalva(){
    this.chavesalva = true;


    this.blockchainservice.votacaoTerminada(this.escrutinioid).then(
      (ret) => {
        if (ret){
          console.log('votacaoTerminada: ', ret);
          this.votacaoTerminada = true;
        }else{

          this.blockchainservice.fechPropostos(this.escrutinioid).then(
            (ret) => { this.propostos = ret; },
            (e) => { console.log('error', e); this.error = true; }
          );

        }
      },
      (e) => { console.log('error', e); this.error = true; }
    );


  }

  carregarid() {

    const promptValue = prompt('Entre com sua chave de identificação', '');
    if (promptValue != null) {
      console.log(promptValue);
      if (promptValue.search(/^0x[\S]{40}/) !== -1 ) {
        this.minhachave = promptValue;
        localStorage.setItem('minhachave', promptValue);
      }
    }

  }

  criarid(){
      this.blockchainservice.createaddress().then(
      (ret) => {
        this.minhachave = ret;
        localStorage.setItem('minhachave', this.minhachave);

      },
      (e) => { console.log('error', e); this.error = true;}
    );
  }

  confirmvoto(item: any) {

    if(this.vototerminado) return false;

    if ( confirm('Você confirma o seu voto para: ' + item.nome)) {
      this.submitted = true;
      this.blockchainservice.votar(this.escrutinioid, this.minhachave, item.id).then(
        (ret) => {
          console.log(ret);
          this.submitted = false;
          this.vototerminado = true;
          this.vototerminadoret = ret;
        },
        (e) => {
          console.log('error', e);
          this.submitted = false;
          this.error = true;
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
