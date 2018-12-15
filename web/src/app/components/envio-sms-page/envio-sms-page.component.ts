import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'envio-sms-page',
  templateUrl: './envio-sms-page.component.html',
  styleUrls: ['./envio-sms-page.component.scss']
})
export class EnvioSmsPageComponent implements OnInit {

  @Input() contoleFim: boolean;

  @Input() protocol: boolean;

  constructor() { }

  ngOnInit() { }

  voltar() {
    location.reload();
  }

}
