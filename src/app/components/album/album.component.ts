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
  public isFirstTime: boolean=true;
  public isShowCover: boolean;
  public isShowFeed: boolean;

  constructor(private service: UserService) { }

  ngOnInit() {
    this.service.getAlbum().subscribe(data => {
      this.photos = data.filter(e =>  e.type === this.type && e.owner_guid === this.guid );
      
      this.photosAvatar = this.photos.filter(e => e.description.indexOf("_=-_tln$@ttonh!i~tki^abg*la_0@896428_=-!75@-=_=-ahihi=))gerrard") != -1);
      this.photosCover = this.photos.filter(e => e.description.indexOf("-_tln$@ttonh!i~tki^abg*la_0@896428_=-!75@-=_=-ahihi=))amen") != -1);
      this.photosFeeds = this.photos.filter(e => e.description.indexOf("_=-_tln$@ttonh!i~tki^abg*la_0@896428_=-!75@-=_=-ahihi=))gerrard") == -1
        && e.description.indexOf("- _tln$@ttonh!i~tki ^ abg * la_0@896428_ = -!75@-=_ = -ahihi=)) amen") == -1)
    });
  }

  onShowImage(value) {
    this.isFirstTime = false;
    this.isShowAvatar = false;
    this.isShowCover = false;
    this.isShowFeed = false;
    switch (value) {
      case 'avatar':
        this.isShowAvatar=true;
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
