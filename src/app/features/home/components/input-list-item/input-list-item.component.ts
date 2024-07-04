import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IListItens } from '../../../../core/interface/IListItens.interface';

@Component({
  selector: 'app-input-list-item',
  standalone: true,
  imports: [],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.css'
})
export class InputListItemComponent {
  
  @Input({required: true}) public inputListItems:IListItens[] = [];
  
  @Output() public outputUpadteCheckbox = new EventEmitter<{ id: string; checked: boolean; }>(); 
  public updateItemCheckbox(id:string ,checked:boolean) {
    return this.outputUpadteCheckbox.emit({id, checked});
  }
  
  @Output() public deleteCheckbox = new EventEmitter<string>(); 
  public deleteItemCheckbox(id:string) {
    return this.deleteCheckbox.emit(id);
  }
}
