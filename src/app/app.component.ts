import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "rates";
  saved = [];

  onSave(value: number) {
    this.saved.push(value);
  }
}
