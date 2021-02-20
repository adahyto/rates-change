import { Component, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RateApiService } from "src/app/services/rate-api.service";

export interface FormRes {
  base: string;
  converted: string;
}

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
})
export class FormComponent {
  // changed this
  @Output() calcValue = new EventEmitter<FormRes>();
  ratesForm: FormGroup;
  available = [
    "AUD",
    "BRL",
    "CAD",
    "CHF",
    "CZK",
    "DKK",
    "EUR",
    "GBP",
    "HKD",
    "HUF",
    "NZD",
    "IDR",
    "INR",
    "ILS",
    "JPY",
    "NOK",
    "PLN",
    "RON",
    "SEK",
    "USD",
    "SGD",
    "ZAR",
  ];
  default = { base: "CZK", symbol: "EUR" };
  converted: FormRes;

  constructor(private fb: FormBuilder, private ratesApi: RateApiService) {
    this.ratesForm = this.fb.group({
      amount: [
        0.0,
        [Validators.min(0), Validators.minLength(0), Validators.required],
      ],
      base: this.default.base,
      symbol: this.default.symbol,
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
    this.ratesApi.getRate(base, symbol).subscribe((res) => {
      this.converted = {
        base: amount + " " + base,
        converted: Number(amount) * res.rates[symbol] + " " + symbol,
      };
    });
  }
}
