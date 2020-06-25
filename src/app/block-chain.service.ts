import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlockChainService {


  public web3: Web3;
  private account = '0x9D1C9b265b3e75ac8b18E9499DaFafb4E98F91f5';
  private private_key = '0x98A30D59674809961391AF064C1391C7A25C9C9142D4EE885815E8D2D7FAE05C';
  private abi = '[{"inputs":[{"internalType":"bytes32[]","name":"propostoNome","type":"bytes32[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"participantes","outputs":[{"internalType":"bool","name":"votado","type":"bool"},{"internalType":"address","name":"chaveUnica","type":"address"},{"internalType":"uint256","name":"voto","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"}],"name":"proposalNameByPos","outputs":[{"internalType":"bytes32","name":"propostosName_","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"}],"name":"proposalVotesByPos","outputs":[{"internalType":"uint256","name":"totalVotos_","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"propostos","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"bytes32","name":"nome","type":"bytes32"},{"internalType":"uint256","name":"votoTotal","type":"uint256"},{"internalType":"bool","name":"existe","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalParticipantes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPropostos","outputs":[{"internalType":"uint256","name":"totalPropostos_","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalVotos","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"votacaoTerminada","outputs":[{"internalType":"bool","name":"votacaoterminada_","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"chaveUnica","type":"address"},{"internalType":"uint256","name":"proposto","type":"uint256"}],"name":"voto","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
  private bytecode = '60806040523480156100115760006000fd5b50604051610a2e380380610a2e833981810160405260208110156100355760006000fd5b81019080805160405193929190846401000000008211156100565760006000fd5b8382019150602082018581111561006d5760006000fd5b825186602082028301116401000000008211171561008b5760006000fd5b8083526020830192505050908051906020019060200280838360005b838110156100c35780820151818401525b6020810190506100a7565b505050509050016040526020015050505b8060018251038151811015156100e657fe5b602002602001015160001c6000600050819090905550600060016000508190909055506000600090505b60018251038110156101ed5760036000506040518060800160405280838152602001848481518110151561014057fe5b60200260200101516000191681526020016000815260200160011515815260200150908060018154018082558091505060019003906000526020600020906004020160005b909190919091506000820151816000016000509090556020820151816001016000509060001916905560408201518160020160005090905560608201518160030160006101000a81548160ff02191690831515021790555050505b8080600101915050610110565b505b506101f5565b61082a806102046000396000f3fe60806040523480156100115760006000fd5b50600436106100985760003560e01c80639270103f116100675780639270103f146101d5578063a5ac6b19146101f7578063ba8b1bf314610246578063d23879e414610289578063d8fe0d9c146102a757610098565b80632fffcf961461009e57806362dea1211461013557806370e3606414610153578063766a79c01461017157610098565b60006000fd5b6100e1600480360360208110156100b55760006000fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506102f2565b60405180841515151581526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828152602001935050505060405180910390f35b61013d61034f565b6040518082815260200191505060405180910390f35b61015b610358565b6040518082815260200191505060405180910390f35b61019e600480360360208110156101885760006000fd5b8101908080359060200190929190505050610361565b6040518085815260200184600019166000191681526020018381526020018215151515815260200194505050505060405180910390f35b6101dd6103ba565b604051808215151515815260200191505060405180910390f35b6102446004803603604081101561020e5760006000fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506103e7565b005b6102736004803603602081101561025d5760006000fd5b8101908080359060200190929190505050610773565b6040518082815260200191505060405180910390f35b6102916107aa565b6040518082815260200191505060405180910390f35b6102d4600480360360208110156102be5760006000fd5b81019080803590602001909291905050506107bd565b60405180826000191660001916815260200191505060405180910390f35b60026000506020528060005260406000206000915090508060000160009054906101000a900460ff16908060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160005054905083565b60006000505481565b60016000505481565b60036000508181548110151561037357fe5b906000526020600020906004020160005b915090508060000160005054908060010160005054908060020160005054908060030160009054906101000a900460ff16905084565b600060006000505460036000508054905010156103dc576000905080506103e3565b6001905080505b5b90565b60006000505460016000505410151561046b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f566f746163616f207465726d696e6164612e000000000000000000000000000081526020015060200191505060405180910390fd5b60036000508181548110151561047d57fe5b906000526020600020906004020160005b5060030160009054906101000a900460ff161515610517576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260158152602001807f43616e64696461646f206e616f206578697374652e000000000000000000000081526020015060200191505060405180910390fd5b600260005060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160009054906101000a900460ff161515156105e5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f566f6365206a6120766f746f752e00000000000000000000000000000000000081526020015060200191505060405180910390fd5b6001600260005060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160006101000a81548160ff02191690831515021790555081600260005060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600260005060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600101600050819090905550600160036000508281548110151561073357fe5b906000526020600020906004020160005b5060020160008282825054019250508190909055506001600160008282825054019250508190909055505b5050565b600060036000508281548110151561078757fe5b906000526020600020906004020160005b5060020160005054905080505b919050565b6000600360005080549050905080505b90565b60006003600050828154811015156107d157fe5b906000526020600020906004020160005b5060010160005054905080505b91905056fea2646970667358221220fd51cdaeddb20559d8eed536db9c2f165669e003ada4f401b9c4b804971af03f64736f6c634300060a0033';

  candidatos =  [];
  smartcontract = null;

  constructor() {
    this.web3 = new Web3("https://rinkeby.infura.io/v3/22cf9040f39f48f49fe25f7f6303e18d");
  }




  createaddress(){
    return new Promise((resolve, reject) => {
        const ret = this.web3.eth.accounts.create('b1C98D3Fe3a9d4F37d1a153467729bE4D8E7b1C98D3Fe3a9d4F37d1a153467729bE4D8E7b1C98D3Fe3a9d4F37d1a153467729bE4D8E7b1C98D3Fe3a9d4F37d1a153467729bE4D8E7b1C98D3Fe3a9d4F37d1a153467729bE4D8E7');
        resolve(ret.address);
    });
  }


  votar(c, chave, proposto){
    return new Promise((resolve, reject) => {
            console.log('Acessando Smart Contract ',c);
            console.log('Chave do votante ',chave);
            console.log('Voto ',proposto);

            this.web3.eth.accounts.wallet.create(1);
            //var myself = this.web3.eth.accounts.privateKeyToAccount(this.private_key);
            let contract = new this.web3.eth.Contract(JSON.parse(this.abi), c);
            //this.web3.eth.handleRevert = true;
            const contractFunction = contract.methods.voto(chave, proposto);

            // this.web3.eth.getTransactionCount(this.account).then(
            //   (ret) => {
            let gas = this.web3.utils.toHex(800000); //await transaction.estimateGas({from: PUBLIC_KEY});
            let options = {
                from: this.account,
                to: c,
                data: contractFunction.encodeABI(),
                gas : gas
            };

            this.web3.eth.accounts.signTransaction(options, this.private_key).then(
              (ret) => {
                        console.dir(ret);
                        //this.resultadodavotacao = ret.transactionHash;
                        try {
                              this.web3.eth.sendSignedTransaction( ret.rawTransaction ).on('receipt', (rr) => {
                                    console.log(rr);
                                    resolve(rr);
                                    // voto concluido
                                    //this.fechPropostos(c);
                                  })
                                  .once('sending', function(payload){ console.log('sending',payload) })
                                  .once('sent', function(payload){ console.log('sent',payload) })
                                  .once('transactionHash', function(hash){ console.log('transactionHash',hash) })
                                  .on('error', function(error){ console.log('error',error); reject('Erro no seu foto'); })
                                  .then(function(receipt){
                                    console.log('then(function(receipt',receipt);
                                    //this.fechPropostos(c);
                                  });
                        } catch (e) {
                          console.log('error sendSignedTransaction', e);
                          reject('Erro no seu foto');
                        }
              },
              (error) => {
                console.log('Error signTransaction',error);
                reject('Erro no seu foto');
              }
            );


            //   },
            //   (error) => {
            //     console.error(error);
            //     reject('Erro no seu foto');
            //   }
            // );

    });

  }


  votacaoTerminada() {

  }

  fechVotos(c){

    let contract = new this.web3.eth.Contract(JSON.parse(this.abi),c);
    contract.methods.totalPropostos().call({from: this.account}).then(
      (t) => {

              for (let index = 0; index < t; index++) {
                contract.methods.proposalVotesByPos(index).call({from: this.account}).then(
                  (result) => {
                    console.log('votos',result);
                    this.candidatos[index].votos = result;
                  }
                );
              }
      });

  }

  fechPropostos(c){

    return new Promise((resolve, reject) => {
        let contract = new this.web3.eth.Contract(JSON.parse(this.abi),c);
        contract.methods.totalPropostos().call({from: this.account}).then(
          (t) => {
                  let candidatos = [];

                  for (let index = 0; index < t; index++) {
                    contract.methods.proposalNameByPos(index).call({from: this.account}).then(
                      (result) => {
                        const nome = this.web3.utils.hexToAscii(result);
                        console.log(nome);
                        candidatos.push({id: index, nome: nome.replace(/\0/g, '')});
                        console.log(candidatos.length, t);
                        if (candidatos.length == t) {
                          console.log('disparado');
                          resolve(candidatos);
                        }
                      }
                    );
                  }


          },
          () => {
            reject(false);
          });
    });
  }



  criarcontract(form: any){
    return new Promise((resolve, reject) => {
          //const criarcontract(form: any) = new Promise(function(resolve, reject) {
          //const promise = new Promise<number>((resolve, reject) => {
          //criarcontract(form: any): Promise<any[]>(resolve, reject) => {
            console.log(form);
            let nomes = form.tickets;
            let args = [];

            nomes.forEach(element => {
                args.push(element.name);
            });
            args.push(form.numbervotantes);
            console.log('array',args);
            args = [args.map((arg) => this.web3.utils.asciiToHex(arg))];
            console.log('array',args);

            //deploy
            let contract = new this.web3.eth.Contract(JSON.parse(this.abi));
            let transaction: any = contract.deploy({data: '0x' + this.bytecode, arguments: args});
            let gas = this.web3.utils.toHex(800000); //await transaction.estimateGas({from: PUBLIC_KEY});
            let options = {
                to  : transaction._parent._address,
                data: transaction.encodeABI(),
                gas : gas
            };

            this.web3.eth.accounts.signTransaction(options, this.private_key).then(
              (signedhandle:any) => {
                console.dir(signedhandle);

                this.web3.eth.sendSignedTransaction(signedhandle.rawTransaction).then(
                  (handle:any) => {
                    console.dir(handle);
                    console.log(`contract deployed at address ${handle.contractAddress}`);
                    this.smartcontract = handle.contractAddress;
                    resolve(this.smartcontract);
                  },
                  (e) => { console.log('sendSignedTransaction on error',e); reject(false);}
                );

              },
              (e) => { console.log('signTransaction on error',e); reject(false);}
            );

    });

  }


  // criarcontract2() {
  //   let args = ['Candidato 1', 'Candidato 2', '9'];
  //   this.deploy([args.map((arg) => this.web3.utils.asciiToHex(arg))]);
  // }

  // deploy(contractArgs) {
  //   console.log('deploy()',contractArgs);
  //   let contract = new this.web3.eth.Contract(JSON.parse(this.abi));
  //   let handle = this.send(contract.deploy({data: "0x" + this.bytecode, arguments: contractArgs}));
  //   console.dir(handle);
  // }
  send(transaction) {
    let gas = this.web3.utils.toHex(800000); //await transaction.estimateGas({from: PUBLIC_KEY});
    let options = {
        to  : transaction._parent._address,
        data: transaction.encodeABI(),
        gas : gas
    };

    this.web3.eth.accounts.signTransaction(options, this.private_key).then(
      (signedhandle:any) => {
        console.dir(signedhandle);

        this.web3.eth.sendSignedTransaction(signedhandle.rawTransaction).then(
          (handle:any) => {
            console.dir(handle);
            console.log(`contract deployed at address ${handle.contractAddress}`);
            this.smartcontract = handle.contractAddress;
          },
          (e) => { console.log('sendSignedTransaction on error',e)}
        );

      },
      (e) => { console.log('signTransaction on error',e)}
    );
  }


}
