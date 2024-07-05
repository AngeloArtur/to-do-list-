import { Component, signal } from '@angular/core';
import { InputAreaComponent } from './components/input-area/input-area.component';
import { IListItens } from '../../core/interface/IListItens.interface';
import { InputListItemComponent } from './components/input-list-item/input-list-item.component';
import Swal from 'sweetalert2';

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

  private updateLocalStorage() {
    return localStorage.setItem('@my-list', 
      JSON.stringify(this.setListenItens()));
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
    this.updateLocalStorage();
  }

  public deleteItem(id:string) {
    Swal.fire({
      title: "Você tem certeza?",
      text: "Não é possível reverter essa ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2fbf71",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, delete o item"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deletado!",
          text: "A task foi deletada",
          icon: "success"
        });
        this.setListenItens.update((oldValue:IListItens[]) => {
          return oldValue.filter((res) => res.id !== id);
        });
      }
    });
    this.updateLocalStorage();
  }

  public deleteAllItems() {
    Swal.fire({
      title: "Você tem certeza?",
      text: "Não é possível reverter essa ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2fbf71",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, delete tudo"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deletado!",
          text: "Todas as tasks foram deletadas.",
          icon: "success"
        });
        localStorage.clear();
        return this.setListenItens.set(this.parseItens());
      }
    });
  }
}
