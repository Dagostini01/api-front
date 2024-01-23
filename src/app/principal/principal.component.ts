import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Empresa } from '../model/Empresa';
import { EmpresaService } from '../service/empresa.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [NgIf, CommonModule, FormsModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

  empresa = new Empresa();

  btnCadastro:boolean = true

  tabela:boolean = true

  empresas:Empresa[] = [];

  constructor(private service:EmpresaService) {}

  selecionar():void{
    this.service.selecionar()
    .subscribe(retorno => this.empresas = retorno);
  }

  cadastrar():void{
    this.service.cadastrar(this.empresa)
    .subscribe(retorno => {
      this.empresas.push(retorno);
      this.empresa = new Empresa();
      alert("Empresa cadastrada com sucesso!")
    });
  }

  selecionarCliente(posicao:number):void{
    this.empresa = this.empresas[posicao];
    this.btnCadastro = false
    this.tabela = false;;
  }

  editar():void{
    this.service.editar(this.empresa)
    .subscribe(retorno => {
      let posicao = this.empresas.findIndex(obj => {
        return obj.id == retorno.id;
      })
      this.empresas[posicao] = retorno;
      this.btnCadastro = true;
      this.tabela = true;
      this.empresa = new Empresa();
      alert('Cliente alterado com sucesso!');
    })
  }

  remover(): void {
    if (this.empresa.id) {
      this.service.remover(this.empresa.id)
        .subscribe(() => {
          let posicao = this.empresas.findIndex(obj => {
            return obj.id == this.empresa.id;
          });
          this.empresas.splice(posicao, 1);
          this.empresa = new Empresa();
          this.btnCadastro = true;
          this.tabela = true;
          alert('Cliente removido com sucesso!');
        });
    } else {
      alert('Selecione um cliente para remover.');
    }
  }

  cancelar():void{
    this.empresa = new Empresa();
    this.btnCadastro = true;
    this.tabela = true;
  }


  ngOnInit() {
    this.selecionar();
  }

}
