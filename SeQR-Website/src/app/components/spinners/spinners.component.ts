import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinners',
  templateUrl: './spinners.component.html',
  styleUrls: ['./spinners.component.css']
})
export class SpinnersComponent implements OnInit {
  @Input() isLoading: boolean = false;
  @Input() msg: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
