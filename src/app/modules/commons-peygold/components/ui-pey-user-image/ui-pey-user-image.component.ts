import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Transaction, User} from '../../../../models';

@Component({
  selector: 'app-ui-pey-user-image',
  templateUrl: './ui-pey-user-image.component.html',
  styleUrls: ['./ui-pey-user-image.component.scss']
})
export class UIPeyUserImageComponent implements OnInit {

  @Input()
  public user: User;

  @Input()
  public editable = false;

  @Output()
  public update: EventEmitter<File> = new EventEmitter<File>();

  @Input()
  public size = 'md';

  constructor() { }

  ngOnInit() {
  }

  /**
   * Emit the user image change event
   * @param file the new file.
   */
  public emitUpdate(file: File): void {
    this.update.emit(file);
    
  }

  /**
   * On file input change
   * @param $event the change event.
   */
  public onChangeImage($event: Event): void {
    this.emitUpdate($event.target[`files`][0]);
  }
}
