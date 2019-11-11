import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ratesTableData } from "../models/StorageData";
import {
  AddRatesTableData,
  DeleteRatesTableData,
  // UpdateRatesTableData
} from "../states/StorageData.actions";

export class StorageDataStateModel {
  ratesTable: ratesTableData[];
}

@State<StorageDataStateModel>({
  name: "ratesTable",
  defaults: {
    ratesTable: []
  }
})
export class DataStorageState {
  @Selector()
  static getUsers(state: StorageDataStateModel) {
    return state.ratesTable;
  }

  @Action(AddRatesTableData)
  add(
    { getState, patchState }: StateContext<StorageDataStateModel>,
    { payload }: AddRatesTableData
  ) {
    const state = getState();
    patchState({
      ratesTable: [...state.ratesTable, payload]
    });
  }

  @Action(DeleteRatesTableData)
  delete({ setState }: StateContext<StorageDataStateModel>) {
    setState({ ratesTable: [] });
  }

  // @Action(UpdateRatesTableData)
  // update(
  //   { getState, setState }: StateContext<StorageDataStateModel>,
  //   { payload }: UpdateRatesTableData
  // ) {
  //   const state = getState();

  //   const ratesList = [...state.ratesTable];
  //   const ratesIndex = ratesList.findIndex(item => item.id === payload.id);
  //   ratesList[ratesIndex] = payload;
  //   setState({
  //     ...state,
  //     ratesTable: ratesList
  //   });
  // }
}
