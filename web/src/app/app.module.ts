import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ScrollPageComponent } from './components/scroll-page/scroll-page.component';
import { ModalPageComponent } from './components/modal-page/modal-page.component';
import { SobrePageComponent } from './components/sobre-page/sobre-page.component';
import { CarrinhoPageComponent } from './components/carrinho-page/carrinho-page.component';
import { EnvioSmsPageComponent } from './components/envio-sms-page/envio-sms-page.component';
import { MessageService } from './services/message.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ScrollPageComponent,
    ModalPageComponent,
    SobrePageComponent,
    CarrinhoPageComponent,
    EnvioSmsPageComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    TagInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
