import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlockChainService } from '../block-chain.service';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css']
})
export class AuditoriaComponent implements OnInit {


  escrutinioid = null;
  identificacao = null;
  resultado = null;
  isloading = false;
  votacaoTerminada = false;

  public returnValues = [];

  constructor(private route: ActivatedRoute,
              private blockchainservice: BlockChainService,
              private  router: Router) { }

  ngOnInit(): void {
    this.escrutinioid = null;
    this.identificacao = null;
    this.returnValues = [];

    this.escrutinioid = this.route.snapshot.paramMap.get('id');
    if  (this.escrutinioid && this.escrutinioid.search(/^0x[\S]{40}/) === -1 ) {
      this.escrutinioid = null;
    }

    if (this.escrutinioid) {

      this.isloading = true;
      this.blockchainservice.fechVotos(this.escrutinioid).then(
        (v) => {
          console.log('fechVotos ', v);
          this.resultado = v;
          this.isloading = false;

          const ret = localStorage.getItem('minhachave');
          if (ret) {
            this.identificacao = ret;
          }
        }
      );

      this.blockchainservice.votacaoTerminada(this.escrutinioid).then(
        (ret) => {
          if (ret){
            console.log('votacaoTerminada: ', ret);
            this.votacaoTerminada = true;
          }
        });

    }


  }



  escrutinioenter(e){

    if  (this.escrutinioid.search(/^0x[\S]{40}/) !== -1 ) {
       console.log('id: ', this.escrutinioid);
       this.router.navigate(['auditoria', this.escrutinioid]);
    }
  }

  hexToAscii(result){
    return this.blockchainservice.web3.utils.hexToAscii(result);
  }

  auditar(e){

    if  (this.identificacao.search(/^0x[\S]{40}/) !== -1 ) {
      this.isloading = true;
      this.identificacao = this.identificacao.toLowerCase();
      console.log('identificacao: ', this.identificacao);

      let contract = new this.blockchainservice.web3.eth.Contract(JSON.parse(this.blockchainservice.abi), this.escrutinioid);
      contract.getPastEvents('SavedVoto', {fromBlock: 0}).then(
        (ret:any) => {
          if (ret.length > 0 ) {
            for (let index = 0; index < ret.length; index++) {
              ret[index].returnValues.chaveUnica = ret[index].returnValues.chaveUnica.toLowerCase();
              this.returnValues.push({
                blockNumber : ret[index].blockNumber,
                transactionHash : ret[index].transactionHash,
                returnValues : ret[index].returnValues,
              });
            }
            this.isloading = false;
          }
        },
        (err) => {this.isloading = false;}
      );

    }

  }

}
