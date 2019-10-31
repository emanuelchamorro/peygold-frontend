import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sc-pey-sidebar',
  templateUrl: './sc-pey-sidebar.component.html',
  styleUrls: ['./sc-pey-sidebar.component.scss']
})
export class ScPeySidebarComponent implements OnInit {

  @Input()  title: string;
  @Input()  closed = true;
  @Input()  closeable = true;
  @Output() onClose = new EventEmitter();

  constructor() { }

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
