import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceImpl implements MessageService {

  private timeOut: number
  private closeButton: boolean
  private enableHtml: boolean
  private positionClass: string

  private toastClass: string
  private toastIconClass: string
  private toastClasses: Map<string, string> = new Map()

  private icon: string

  constructor(private toastr: ToastrService) {
    this.timeOut = 6000;
    this.closeButton = true;
    this.enableHtml = true;
    this.positionClass = 'toast-bottom-right';

    this.toastClass = "alert";
    this.toastIconClass = "alert-with-icon"
    this.toastClasses.set("info", "alert-info")
      .set("success", "alert-success")
      .set("warning", "alert-warning")
      .set("error", "alert-danger")
      .set("show", "alert-primary")

    this.icon = '<span class="now-ui-icons ui-1_bell-53"></span>'
  }

  info(message?: string, title?: string) {
    this.showNotification("info", message, title);
  }

  success(message?: string, title?: string) {
    this.showNotification("success", message, title);
  }

  warning(message?: string, title?: string) {
    this.showNotification("warning", message, title);
  }

  error(message?: string, title?: string) {
    this.showNotification("error", message, title);
  }

  show(message?: string, title?: string) {
    this.showNotification("show", message, title);
  }

  private showNotification(type: string, message?: string, title?: string) {
    let toastClass: string = this.toastClass + " " + this.toastClasses.get(type)
    if (this.icon)
      toastClass += " " + this.toastIconClass

    if (this.toastr[type])
      this.toastr[type](this.icon + " " + message, title, {
        timeOut: this.timeOut,
        closeButton: this.closeButton,
        enableHtml: this.enableHtml,
        toastClass: toastClass,
        positionClass: this.positionClass
      });
  }
}
