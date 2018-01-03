import { NgModule } from '@angular/core';
import { EditFeedComponent } from './edit-feed/edit-feed';
import { DeleteFeedComponent } from './delete-feed/delete-feed';
import { DeleteGroupComponent } from './delete-group/delete-group';
import { VoteGroupAdminComponent } from './vote-group-admin/vote-group-admin';
import { EditEventComponent } from './edit-event/edit-event';
import { DeleteEventComponent } from './delete-event/delete-event';
import { PublishEventComponent } from './publish-event/publish-event';
@NgModule({
	declarations: [EditFeedComponent,
    DeleteFeedComponent,
    DeleteGroupComponent,
    VoteGroupAdminComponent,
    EditEventComponent,
    DeleteEventComponent,
    PublishEventComponent],
	imports: [],
	exports: [EditFeedComponent,
    DeleteFeedComponent,
    DeleteGroupComponent,
    VoteGroupAdminComponent,
    EditEventComponent,
    DeleteEventComponent,
    PublishEventComponent]
})
export class ComponentsModule {}
