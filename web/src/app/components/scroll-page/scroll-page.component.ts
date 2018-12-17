import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'scroll-page',
  templateUrl: './scroll-page.component.html',
  styleUrls: ['./scroll-page.component.scss']
})
export class ScrollPageComponent implements OnInit {

  @ViewChild('modal') modal: ElementRef;

  items = [];

  mensagem: String = ''

  total = 0;

  numTel = 0;

  numChar = 0;

  contolePainel = false;

  contoleFim = false;

  protocol

  public validators = [this.mobileNumberAt];

  public errorMessages = {
    'mobileNumber': 'Não é um número de telefone válido'
  };

  temNumCtr = false
  temNumError = "Precisa informar ao menos um telefone"
  temCharCtr = false
  temCharError = "Precisa digitar ao menos um caractere"

  private mobileNumberAt(control: FormControl) {
    const pattern = /^[6-9]\d{10}$/;

    if (!pattern.test(control.value)) {
      return {
        'mobileNumber': true
      };
    }
    return null;
  }

  constructor() {
    $(document).ready(function () {
      var scrollLink = $('.scroll');
      // Smooth scrolling
      scrollLink.click(function (e) {
        e.preventDefault();
        var hash = $(this).attr('href')
        $('body,html').animate({
          scrollTop: $(hash).offset().top
        }, 1000);
      });

      // Troca link Ativo
      $(window).scroll(function () {
        var scrollbarLocation = $(this).scrollTop();
        scrollLink.each(function () {
          var hash = $(this).attr('href')
          var sectionOffset = $(hash).offset().top - 20;
          if (sectionOffset <= scrollbarLocation) {
            $(this).parent().addClass('active');
            $(this).parent().siblings().removeClass('active');
          }
        })
      })
    })
  }

  ngOnInit() { }

  showModal() {
    $(this.modal.nativeElement).show('modal');
  }

  closeModal(evt) {
    $(this.modal.nativeElement).hide('modal');
  }

  continuar() {
    this.calcTotal()
    this.temNumCtr = false
    this.temCharCtr = false

    if (this.numTel == 0) {
      this.temNumCtr = true
    } else if (this.numChar == 0) {
      this.temCharCtr = true
    }else{
      this.contolePainel = true;
    }
  }

  calcTotal() {
    this.numTel = this.items.length;
    this.numChar = this.mensagem.replace(" ", "").length;
    this.total = (this.numTel * .1) + ((this.numChar / 10) * .05)
    this.total = Number((this.total).toFixed(2))
  }

  mudouStateCar(event) {
    this.contoleFim = event.contoleFim
    this.contolePainel = event.contolePainel
    this.protocol = event.protocol
  }
}
