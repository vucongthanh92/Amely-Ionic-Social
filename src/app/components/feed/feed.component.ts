import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html'
})
export class FeedComponent {
  
  @Input('contents') contents: any;

  constructor() {
  }

  ngAfterViewInit() {
  	
  }

}
