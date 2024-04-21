import { Component, signal } from '@angular/core';
import { InputAreaComponent } from './components/input-area/input-area.component';
import { IListItens } from '../../core/interface/IListItens.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InputAreaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public addItem:boolean = true;
  private setListenItens = signal<IListItens[]>([this.parseItens()]);
  getListItens = this.setListenItens.asReadonly();

  private parseItens(){
    return JSON.parse(localStorage.getItem('@my-list') || '[]')
  }

  public getInputItens(value:IListItens) {
    localStorage.setItem('@my-list', JSON.stringify([value]))
    console.log(value)
  }
}
