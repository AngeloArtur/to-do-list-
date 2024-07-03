import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { IListItens } from '../../../../core/interface/IListItens.interface';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-input-area',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './input-area.component.html',
  styleUrl: './input-area.component.css'
})
export class InputAreaComponent {
  private cdr = inject(ChangeDetectorRef);
  @ViewChild('inputText') public inputText!: ElementRef;
  
  @Input({required: true}) public inputListItems:IListItens[] = [];
  @Output() public outputAddListItem = new EventEmitter<IListItens>();
  
  public focusAndAddItem(value:string) {
    if (value) {
      this.cdr.detectChanges();
      this.inputText.nativeElement.value = '';

      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const id = `ID ${timestamp}`;

      this.outputAddListItem.emit({
        id,
        checked: false,
        value,
      });

      return this.inputText.nativeElement.focus();
    }
  }
}
