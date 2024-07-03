import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IListItens } from '../../../../core/interface/IListItens.interface';

@Component({
  selector: 'app-input-list-item',
  standalone: true,
  imports: [],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.css'
})
export class InputListItemComponent {
  
  @ViewChild('inputText') public inputText!: ElementRef;
  @Input({required: true}) public inputListItems:IListItens[] = [];
}
