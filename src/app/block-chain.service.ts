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
  private abi = '[{"inputs":[{"internalType":"bytes32[]","name":"propostoNome","type":"bytes32[]"},{"internalType":"uint256","name":"participantes_","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"chaveUnica","type":"address"},{"indexed":false,"internalType":"uint256","name":"proposto","type":"uint256"}],"name":"SavedVoto","type":"event"},{"inputs":[{"internalType":"address","name":"chaveUnica","type":"address"}],"name":"audityVoto","outputs":[{"internalType":"uint256","name":"Voto_","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLimiteParticipantes","outputs":[{"internalType":"uint256","name":"participantes_","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalVotos","outputs":[{"internalType":"uint256","name":"totalVotos_","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"}],"name":"proposalNameByPos","outputs":[{"internalType":"bytes32","name":"propostosName_","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"}],"name":"proposalVotesByPos","outputs":[{"internalType":"uint256","name":"totalVotos_","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPropostos","outputs":[{"internalType":"uint256","name":"totalPropostos_","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"votacaoTerminada","outputs":[{"internalType":"bool","name":"votacaoterminada_","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"chaveUnica","type":"address"},{"internalType":"uint256","name":"proposto","type":"uint256"}],"name":"voto","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
  private bytecode = '60806040523480156100115760006000fd5b50604051610985380380610985833981810160405260408110156100355760006000fd5b81019080805160405193929190846401000000008211156100565760006000fd5b8382019150602082018581111561006d5760006000fd5b825186602082028301116401000000008211171561008b5760006000fd5b8083526020830192505050908051906020019060200280838360005b838110156100c35780820151818401525b6020810190506100a7565b50505050905001604052602001805190602001909291905050505b806000600050819090905550600060016000508190909055506000600090505b82518110156101d85760036000506040518060800160405280838152602001858481518110151561012b57fe5b60200260200101516000191681526020016000815260200160011515815260200150908060018154018082558091505060019003906000526020600020906004020160005b909190919091506000820151816000016000509090556020820151816001016000509060001916905560408201518160020160005090905560608201518160030160006101000a81548160ff02191690831515021790555050505b80806001019150506100fe565b505b50506101e1565b610795806101f06000396000f3fe60806040523480156100115760006000fd5b506004361061008d5760003560e01c8063ce2cd50e1161005c578063ce2cd50e14610165578063d23879e4146101be578063d8fe0d9c146101dc578063fe664d00146102275761008d565b80639270103f14610093578063a5ac6b19146100b5578063a8688eff14610104578063ba8b1bf3146101225761008d565b60006000fd5b61009b610245565b604051808215151515815260200191505060405180910390f35b610102600480360360408110156100cc5760006000fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061026f565b005b61010c610666565b6040518082815260200191505060405180910390f35b61014f600480360360208110156101395760006000fd5b8101908080359060200190929190505050610676565b6040518082815260200191505060405180910390f35b6101a86004803603602081101561017c5760006000fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506106ad565b6040518082815260200191505060405180910390f35b6101c6610705565b6040518082815260200191505060405180910390f35b610209600480360360208110156101f35760006000fd5b8101908080359060200190929190505050610718565b60405180826000191660001916815260200191505060405180910390f35b61022f61074f565b6040518082815260200191505060405180910390f35b600060006000505460016000505410156102645760009050805061026b565b6001905080505b5b90565b6000600050546001600050541015156102f3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f566f746163616f207465726d696e6164612e000000000000000000000000000081526020015060200191505060405180910390fd5b60036000508181548110151561030557fe5b906000526020600020906004020160005b5060030160009054906101000a900460ff16151561039f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260158152602001807f43616e64696461646f206e616f206578697374652e000000000000000000000081526020015060200191505060405180910390fd5b600260005060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160009054906101000a900460ff1615151561046d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f566f6365206a6120766f746f752e00000000000000000000000000000000000081526020015060200191505060405180910390fd5b6001600260005060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160006101000a81548160ff02191690831515021790555081600260005060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600260005060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060010160005081909090555060016003600050828154811015156105bb57fe5b906000526020600020906004020160005b5060020160008282825054019250508190909055506001600160008282825054019250508190909055507fd80791c98aa9e365572a326bf8d5ec4b53e9293e10d0a20222114dbbac8f1d1b8282604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15b5050565b6000600060005054905080505b90565b600060036000508281548110151561068a57fe5b906000526020600020906004020160005b5060020160005054905080505b919050565b6000600260005060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060010160005054905080505b919050565b6000600360005080549050905080505b90565b600060036000508281548110151561072c57fe5b906000526020600020906004020160005b5060010160005054905080505b919050565b6000600160005054905080505b9056fea26469706673582212206b80f624648a3dccfcf6de6e8e90c6cd56c13b0619fac117d4988f563111fda364736f6c634300060a0033';

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
                from: chave, // this.account,
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


  votacaoTerminada(c) {

    return new Promise((resolve, reject) => {

      let contract = new this.web3.eth.Contract(JSON.parse(this.abi), c);
      contract.methods.votacaoTerminada().call({from: this.account}).then(
          (t) => {
            resolve(t);
          },
          (e) => {
            reject('Algum erro aconteceu');
          }
      );

    });

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
            console.log(form);
            let nomes = form.tickets;
            let args = [];

            nomes.forEach(element => {
                args.push(element.name);
            });
            //args.push(form.numbervotantes.toString());
            console.log('array 1',args);
            args = [args.map((arg) => this.web3.utils.asciiToHex(arg))];
            args.push(form.numbervotantes);
            console.dir(args);

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
