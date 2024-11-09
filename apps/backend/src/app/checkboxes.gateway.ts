import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ cors: '*' })
export class CheckBoxesGateway {
  @WebSocketServer() server;
  checkboxes: [{ id: number; isChecked: boolean }];

  constructor() {
    // @ts-expect-error dsewq
    this.checkboxes = [];
    for (let index = 0; index < 990; index++) {
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
  handleEvent(@MessageBody() data: number): number {
    const indexOfSearch = this.checkboxes.findIndex(({ id }) => id === data);
    const searchedItem = this.checkboxes[indexOfSearch];
    this.checkboxes.splice(indexOfSearch, 1, {
      id: data,
      isChecked: !searchedItem.isChecked,
    });
    this.server.emit('checkbox_clicked', this.checkboxes);
    return data;
  }
}
