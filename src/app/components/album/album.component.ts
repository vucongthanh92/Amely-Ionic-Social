import { CustomService } from './../../services/custom.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { Photo } from '../../api/models/photo';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html'
})
export class AlbumComponent implements OnInit {
  @Input("guid") guid;
  @Input("type") type;

  public photosAvatar: Array<Photo>;
  public photosCover: Array<Photo>;
  public photosFeeds: Array<Photo>;
  public photos: Array<Photo>;

  public isShowAvatar: boolean;
  public isFirstTime: boolean = true;
  public isShowCover: boolean;
  public isShowFeed: boolean = true;

  constructor(private service: UserService, private customService: CustomService) { }

  ngOnInit() {
    this.service.getAlbum().subscribe(data => {
      this.photos = data.filter(e => e.owner_guid === this.guid);
      this.photosAvatar = this.photos.filter(e => JSON.parse(e.description).post == this.customService.content_change_avatar);
      this.photosCover = this.photos.filter(e => JSON.parse(e.description).post == this.customService.content_change_cover);
      this.photosFeeds = this.photos.filter(e => JSON.parse(e.description).post != this.customService.content_change_cover
        || JSON.parse(e.description).post != this.customService.content_change_avatar)
    });
  }

  onShowImage(value) {
    this.isFirstTime = false;
    this.isShowAvatar = false;
    this.isShowCover = false;
    this.isShowFeed = false;
    switch (value) {
      case 'avatar':
        this.isShowAvatar = true;
        break;
      case 'cover':
        this.isShowCover = true;
        break;
      case 'feed':
        this.isShowFeed = true;
        break;
    }
  }
}
