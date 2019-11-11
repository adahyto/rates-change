import { ratesTableData } from "../models/StorageData";

export class AddRatesTableData {
  static readonly type = "[ratesTableData] Add";

  constructor(public payload: ratesTableData) {}
}

export class DeleteRatesTableData {
  static readonly type = "[ratesTableData] Delete";

  // constructor(public id: string) {}
}

// export class UpdateRatesTableData {
//   static readonly type = "[ratesTableData] Update";

//   constructor(public payload: ratesTableData, public id: string) {}
// }
