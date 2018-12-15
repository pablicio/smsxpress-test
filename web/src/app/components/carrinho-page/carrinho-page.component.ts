import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'carrinho-page',
  templateUrl: './carrinho-page.component.html',
  styleUrls: ['./carrinho-page.component.scss']
})
export class CarrinhoPageComponent implements OnInit {

  @Input() contolePainel: boolean
  @Input() contoleFim: boolean

  @Input() numTel: number
  @Input() numChar: number
  @Input() total: number

  @Input() telefones
  @Input() mensagem
  @Output() mudouStateCar = new EventEmitter();

  protocol

  constructor(public messageService: MessageService) { }

  ngOnInit() { 

  }

  numberParaReal(numero) {
    var formatado = "R$ " + numero.toFixed(2).replace(".", ",");
    return formatado;
  }

  cancelarEnvio() {
    this.contolePainel = false;
    this.setMudouStateCar()
  }

  confirmarEnvio() {
    this.protocol = this.hashProtocol()
    this.contoleFim = true;
    this.setMudouStateCar()

    this.messageService.sendMessage({
      telefones: this.prepareTelefones(this.telefones),
      mensagem: this.mensagem,
      protocolo: this.protocol
    }).subscribe((data) => {
      console.log(data)
    })
  }

  hashProtocol(){
    return this.gNibble() + '-' + this.gNibble() + '-' + this.gNibble()
  }

  gNibble(){
    var a = Math.floor((Math.random() * 9999) + 999);
    var b = String(a);
    b = b.substring(0, 4);
    return b
  }

  setMudouStateCar(){
    this.mudouStateCar.emit({ 
      contoleFim: this.contoleFim,
      contolePainel: this.contolePainel,
      protocol: this.protocol
    }) 
  }


  prepareTelefones(telefones){
    var telefonesStr = ''
    for(let t in telefones){
      telefonesStr += telefones[t].value + ','
    }
    return telefonesStr.slice(0, -1);
  }

}
