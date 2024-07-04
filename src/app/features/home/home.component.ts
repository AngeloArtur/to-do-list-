import { Component, signal } from '@angular/core';
import { InputAreaComponent } from './components/input-area/input-area.component';
import { IListItens } from '../../core/interface/IListItens.interface';
import { InputListItemComponent } from './components/input-list-item/input-list-item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InputAreaComponent, InputListItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public addItem:boolean = true;
  private setListenItens = signal<IListItens[]>(this.parseItens());
  public getListItems = this.setListenItens.asReadonly();

  private parseItens(){
    return JSON.parse(localStorage.getItem('@my-list') || '[]')
  }

  public getInputAddItems(value:IListItens) {
    localStorage.setItem('@my-list', JSON.stringify([...this.setListenItens(),value]));
    console.log(value)

    return this.setListenItens.set(this.parseItens())
  }

  public listItemsStage(value:'pending' | 'completed') {
    return this.getListItems().filter((res: IListItens) => {
      if(value === 'pending') return !res.checked;
      if(value === 'completed') return res.checked;

      return res;
    })
  }

  public updateItemCheckbox(newItem: {id:string, checked:boolean}) {
    this.setListenItens.update((oldValue: IListItens[]) => {
      oldValue.filter(res => {
        if(res.id === newItem.id) {
          res.checked = newItem.checked;
          console.log('check')
          return res;
        }
        return res;
      });
      return oldValue;
    });
    return localStorage.setItem('@my-list', 
      JSON.stringify(this.setListenItens()))
  }
  
  public deleteAllItems() {
    localStorage.clear();
    return this.setListenItens.set(this.parseItens());
  }
}
