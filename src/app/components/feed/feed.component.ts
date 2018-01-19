import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html'
})
export class FeedComponent {
  
  @Input('numbers') numbers: any;

  constructor() {
  }

  ngAfterViewInit() {
  		console.log(this.numbers);
  	
  }

}
