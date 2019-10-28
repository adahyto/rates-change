import { Component, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RateApiService } from "src/app/rate-api.service";

export interface FormRes {
  base: string;
  converted: string;
}

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent {
  @Output() calcValue = new EventEmitter<any>();
  ratesForm: FormGroup;
  available = [
    "CZK",
    "PLN",
    "USD",
    "GBP",
    "CHF",
    "SEK",
    "RON",
    "HUF",
    "AUD",
    "JPY",
    "DKK"
  ];
  default = { base: "CZK", symbol: "USD" };
  converted: FormRes;

  constructor(private fb: FormBuilder, private ratesApi: RateApiService) {
    this.ratesForm = this.fb.group({
      amount: [
        0.0,
        [Validators.min(0), Validators.minLength(0), Validators.required]
      ],
      base: this.default.base,
      symbol: this.default.symbol
    });
  }

  run() {
    this.convert(
      this.ratesForm.value.amount,
      this.ratesForm.value.base,
      this.ratesForm.value.symbol
    );
  }

  dispatch() {
    this.calcValue.emit(this.converted);
  }

  convert(amount: string, base: string, symbol: string) {
    this.ratesApi.getRate(base, symbol).subscribe(res => {
      this.converted = {
        base: amount + " " + base,
        converted: Number(amount) * res.rates[symbol] + " " + symbol
      };
    });
  }
}
