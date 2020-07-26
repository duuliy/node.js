// import { WebSocketGateway,SubscribeMessage,WsResponse,WebSocketServer } from '@nestjs/platform-socket.io';
import {Observable} from 'rxjs';
import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
    OnGatewayConnection
  } from '@nestjs/websockets';
  import { Client, Server, Socket } from 'socket.io'
  import {Logger} from '@nestjs/common';


//websoket的使用

// @WebSocketGateway({ namespace:'ddd', port :4001})
@WebSocketGateway(4001)
export class WsGateway  implements OnGatewayConnection {
  @WebSocketServer() 
//   server:Server;
  wss

  private logger=new Logger('WsGateway')
 
//   @SubscribeMessage('message')
  handleConnection(client) {
    this.logger.log('new client')
    client.emit('chat message' ,'successfully')
   
  }
//   createRoom(socket: Socket, data: string): WsResponse<unknown> {
//     socket.join('aRoom');
//     socket.to('aRoom').emit('roomCreated', {room: 'aRoom'});
//     return { event: 'roomCreated', room: 'aRoom' };
//   }
//   createRoom(client: Client, data: string): WsResponse<unknown> {
//     return { event: 'roomCreated', data };
//   }
}
