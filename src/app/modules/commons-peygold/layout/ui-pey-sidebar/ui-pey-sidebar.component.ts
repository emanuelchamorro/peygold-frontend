import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-ui-pey-sidebar',
  templateUrl: './ui-pey-sidebar.component.html',
  styleUrls: ['./ui-pey-sidebar.component.scss']
})
export class UIPeySidebarComponent implements OnInit {

  @Input()  title: string;
  @Input()  closed = true;
  @Input()  closeable = true;
  @Output() onClose = new EventEmitter();

  constructor() { }

  /**
   * On init implementation
   */
  ngOnInit() {
  }

  /**
   * On close the side bar
   */
  close(): void {
    this.closed = true;
    this.onClose.emit();
  }
}
