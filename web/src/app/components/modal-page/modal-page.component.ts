import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss']
})
export class ModalPageComponent implements OnInit {

  @Output() closeModalEvt = new EventEmitter();

  protocolo

  errorProtocolo = false

  errorMessage = ''

  telefones = []

  constructor(public messageService: MessageService) { }

  ngOnInit() { 
  
  }

  consulta() {
    this.telefones = []
    if (this.protocolo){

      this.errorProtocolo = false
      this.errorMessage = ''

      this.messageService.getMessageByProtocol(this.protocolo)
        .subscribe((data: Array<any>) => {
          console.log(data)
          if (data.length){
            this.telefones = data[0].telefones.split(',')
          }else{
            this.errorMessage = 'Protocolo inexistente, informe um protocolo válido!'
            this.errorProtocolo = true
          }
          
        })
    }else{
      this.errorMessage = 'Você deve fornecer um protocolo'
      this.errorProtocolo = true
    }
  }

  
  closeModal(){
    this.telefones = []
    this.closeModalEvt.emit('hide')
  }
}
