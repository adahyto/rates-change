import { FormRes } from "./../form/form.component";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"]
})
export class TableComponent {
  @Input() elements: [FormRes];
  displayedColumns: string[] = ["base", "converted"];
}
