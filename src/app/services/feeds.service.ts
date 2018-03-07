import { ApiService } from './../api/services/api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class FeedsService {

  constructor(private api: ApiService) {

  }

  getFeeds(feeds_type, owner_guid, offset) {
    return this.api.getFeeds({ "feeds_type": feeds_type, "owner_guid": owner_guid, "offset": offset, "limit": 10 }).pipe();
  }

  getFeed(guid){
    return this.api.getFeed(guid);
  }

  getComments(postGuid: number, offset: number, limit: number) {
    return this.api.getComments({ type: null, postGuid: postGuid, offset: offset, limit: limit });
  }

  putComment(post_guid, comment, images) {
    return this.api.createComment({ post_guid: post_guid, comment: comment, images: images });
  }

  putFeed(content, friends, location, privacy, mood, images, owner_guid, type) {
    if (images == null) {
      return this.api.createFeed({ content: content, friends: friends, location: location, privacy: privacy, mood: mood, owner_guid: owner_guid, type: type });
    } else {
      return this.api.createFeed({ content: content, friends: friends, location: location, privacy: privacy, mood: mood, images: images, owner_guid: owner_guid, type: type });

    }
  }
}
