
import { Injectable } from '@angular/core';

@Injectable()
export abstract class MessageService {

  abstract info(message?: string, title?: string): void;
  abstract success(message?: string, title?: string): void;
  abstract warning(message?: string, title?: string): void;
  abstract error(message?: string, title?: string): void;
  abstract show(message?: string, title?: string): void;

}