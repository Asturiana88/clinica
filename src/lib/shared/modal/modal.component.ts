import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Output() onClose = new EventEmitter<boolean>(true)

  constructor() { }

  onExit(){
    this.onClose.emit(false)
  }

  ngOnInit(): void {
  }

}
