import { Component, OnInit } from '@angular/core';
import { BlockChainService } from '../block-chain.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { first, take } from 'rxjs/operators';

@Component({
  selector: 'app-criar-escrutinio',
  templateUrl: './criar-escrutinio.component.html',
  styleUrls: ['./criar-escrutinio.component.css']
})
export class CriarEscrutinioComponent implements OnInit {

  dynamicForm: FormGroup;
  submitted = false;
  smartcontract = null;
  error = false;

  constructor(private formBuilder: FormBuilder,
              private blockchainservice: BlockChainService) { }

  ngOnInit(): void {
    this.dynamicForm = this.formBuilder.group({
      numbervotantes: ['', [Validators.required, Validators.min(2)]],
      numberOfTickets: ['', [Validators.required, Validators.min(2)]],
      tickets: new FormArray([])
    });
  }

  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.tickets as FormArray; }

  onChangeTickets(e) {
    const numberOfTickets = e.target.value || 0;
    if (this.t.length < numberOfTickets) {
        for (let i = this.t.length; i < numberOfTickets; i++) {
            this.t.push(this.formBuilder.group({
                name: ['', [Validators.required, Validators.maxLength(30)]],
            }));
        }
    } else {
        for (let i = this.t.length; i >= numberOfTickets; i--) {
            this.t.removeAt(i);
        }
    }
}

onSubmit() {
    this.submitted = true;
    if (this.dynamicForm.invalid) {
        return;
    }

    console.log(this.dynamicForm.value);
    this.blockchainservice.criarcontract(this.dynamicForm.value)
    .then(
      (smartcontract) => {
        console.log('@@@@@@@: ',smartcontract);
        this.smartcontract = smartcontract;
        this.submitted = false;
      },
      () => {
        console.log("Task Errored!");
        this.submitted = false;
        this.error  = true;
      }
    );
}



}
