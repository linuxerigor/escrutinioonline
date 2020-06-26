import { Component,  Input } from '@angular/core';

@Component({
  selector: 'app-btn-goto-etherscan',
  template: '<a role="button" href="{{url}}" target="_blank" class="btn btn-sm btn-link">'
            + '<ng-content></ng-content>'
            + '<svg id="i-link" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">'
            + '<path d="M18 8 C18 8 24 2 27 5 30 8 29 12 24 16 19 20 16 21 14 17 M14 24 C14 24 8 30 5 27 2 24 3 20 8 16 13 12 16 11 18 15" />'
            + '</svg>'
            + '</a>'
})
export class BtnGotoEtherscanComponent  {

  @Input() url: string;

  constructor() { }


}
