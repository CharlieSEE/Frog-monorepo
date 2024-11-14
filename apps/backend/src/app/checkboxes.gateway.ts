import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import type { CheckboxObject } from '@frog-monorepo/shared-types';

@WebSocketGateway({ cors: '*' })
export class CheckBoxesGateway {
  @WebSocketServer() server;
  checkboxes: CheckboxObject[];
  CHECKBOXES_COUNT = 990;

  constructor() {
    this.checkboxes = [];
    for (let index = 0; index < this.CHECKBOXES_COUNT; index++) {
      this.checkboxes.push({
        id: index,
        isChecked: false,
      });
    }
  }

  @SubscribeMessage('connected')
  handleEvent2(@ConnectedSocket() socket) {
    socket.emit('sync_checkboxes', this.checkboxes);
  }

  @SubscribeMessage('checkbox_clicked')
  handleEvent(@MessageBody() changedCheckboxId: number): number {
    const indexOfSearch = this.checkboxes.findIndex(
      ({ id }) => id === changedCheckboxId
    );
    const searchedItem = this.checkboxes[indexOfSearch];
    this.checkboxes.splice(indexOfSearch, 1, {
      id: changedCheckboxId,
      isChecked: !searchedItem.isChecked,
    });
    this.server.emit('checkbox_clicked', this.checkboxes);
    return changedCheckboxId;
  }
}
