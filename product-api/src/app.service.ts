import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(id?: string): string {
    if (id != null) {
      return 'Hello ' + id;
    }
    return 'Hello World!' + id !== '' && ` id: ${id}`;
  }
}
