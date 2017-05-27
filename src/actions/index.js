import { items, combinations } from '../../data/index'

export function selectItem(item) {
  return {
    type: 'ITEM_SELECTED',
    payload: item.name
  }
};

function generate(state) {
  return {
    type: 'GENERATE',
    payload: state
  }
};

function summary(kcal, price) {
  return {
    type: 'SUMMARY',
    payload: {kcal: kcal, price: price}
  }
};

function errorHandle(obj) {
  return {
    type: 'ERROR',
    payload: obj
  }
};

export function makeMenu(value, state) {
  return (dispatch) => {

    let newState = state.map((item) => {
      if(!item.draw) {
        return item;
      } else {
        let arr = combinations[item.name];
        let pick = combinations[item.name][Math.floor(Math.random() * arr.length)];

        if(!(pick instanceof Array)) {
          pick = itemProperties(pick.arr, pick.string, pick.multiply, pick.pricePlus, pick.kcalPlus);
        }

        item.products = pick;
        return item;
      }
    });

    try {
      return combineValues(newState, value, dispatch);
    }
    catch(err) {
      return dispatch(errorHandle({message: 'Wystąpił błąd, spróbuj zmienić konfiguracje wyników'}));
    }
  }
};

function itemProperties(arr, string, multiply, pricePlus, kcalPlus){
  let random = arr[Math.floor(Math.random()*arr.length)],
      myKcal = random.kcal * multiply + kcalPlus,
      myPrice = random.price * multiply + pricePlus;
  return [string + random.name, myKcal, myPrice];
};

function combineValues(state, value, dispatch) {
  let price = state.reduce((sum, order) => {
    return sum + parseFloat(order.products[2]);
  }, 0);
  let kcal = state.reduce((sum, order) => {
    return sum + parseFloat(order.products[1]);
  }, 0);

  if (kcal < value.minCalories || kcal > value.maxCalories || price > value.maxPrice) {
    return dispatch(makeMenu(value, state));
  } else {
    dispatch(generate(state));
    dispatch(errorHandle(''));
    return dispatch(summary(kcal.toFixed(), price.toFixed(2)));
  }
}
