import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EmitService {

  private emitter;

  constructor() {
    this.emitter = new EventEmitter ( );
  }

  subscribeToServiceEmitter ( obj, callback ) {
    return this.emitter.subscribe ( b => callback ( obj, b ) );
  }

  emitThisData ( data ) {
    this.emitter.emit ( data );
  }
}
