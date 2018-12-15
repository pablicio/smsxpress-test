import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import * as $ from 'jquery'
import { FormControl } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'scroll-page',
  templateUrl: './scroll-page.component.html',
  styleUrls: ['./scroll-page.component.scss']
})
export class ScrollPageComponent implements OnInit {

  @ViewChild('modal') modal: ElementRef;

  items = ['8399181177'];

  telefones = []

  mensagem: String = ''

  total = 0;

  numTel = 0;

  numChar = 0;

  contolePainel = false;

  public validators = [this.mobileNumberAt];

  public errorMessages = {
    'mobileNumber': 'Não é um número de telefone válido'
  };

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

      // Active link switching
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

  ngOnInit() {

  }


  showModal() {
    $(this.modal.nativeElement).show('modal');
  }

  closeModal() {
    $(this.modal.nativeElement).hide('modal');
    this.telefones = []
  }

  consulta(){
    this.telefones = ['83991811774', '83991814445', '83991899992'];
  }

  continuar() {
    this.contolePainel = true;
    this.calcTotal()
  }

  calcTotal(){

    this.numTel = this.items.length;

    this.numChar = this.mensagem.replace(" ", "").length;

    this.total = (this.numTel * .1) + ((this.numChar / 10) * .05)

    this.total = Number((this.total).toFixed(2))
  }

  numberParaReal(numero) {
    var formatado = "R$ " + numero.toFixed(2).replace(".", ",");
    return formatado;
  }

  cancelarEnvio() {
    this.contolePainel = false;
  }

  confirmarEnvio() {
    this.telefones = ['83991811774', '83991814445', '83991899992'];
  }

}
