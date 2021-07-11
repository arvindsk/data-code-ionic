import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-collect-data',
  templateUrl: './collect-data.component.html',
  styleUrls: ['./collect-data.component.scss'],
  providers: [MessageService],
})
export class CollectDataComponent implements OnInit, AfterViewInit {


  @Input() activeIndex: -1;
  @Output() tabOpened: EventEmitter<any> = new EventEmitter();
  @Output() tabClosed: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  ngAfterViewInit() {

  }

  ngOnInit(): void {
     }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  onTabOpen(event: any): void {
    this.tabOpened.emit(event.index);
  }

  onTabClose(event: any): void {
    this.tabClosed.emit(event.index);
  }



}

