import { combinations } from '../../data/index';

// Choose item to not be selected in new menu draw
export function selectItem(item) {
  return {
    type: 'ITEM_SELECTED',
    payload: item.name,
  };
}

// Generate new menu
function generate(state) {
  return {
    type: 'GENERATE',
    payload: state,
  };
}

// User configuration to limit price or kcal
function summary(kcal, price) {
  return {
    type: 'SUMMARY',
    payload: { kcal, price },
  };
}

// Generate error if something went wrong durning drawing new menu
function errorHandle(obj) {
  return {
    type: 'ERROR',
    payload: obj,
  };
}

// If generated combination is not array this function modify and calculate combination to array type
function modifyCombination(combinationTypeArray, combinationDescription, weightMultiplier, pricePlus, kcalPlus) {
  const randomCombination = combinationTypeArray[Math.floor(Math.random() * combinationTypeArray.length)];
  const randomCombinationKcal = (randomCombination.kcal * weightMultiplier) + kcalPlus;
  const randomCombinationPrice = (randomCombination.price * weightMultiplier) + pricePlus;

  return [combinationDescription + randomCombination.name, randomCombinationKcal, randomCombinationPrice];
}

// Sum new menu price and kcal.
// If user configured limit, check if new menu is in between user configuration - if isn't then generate new menu.
// If everything is alright - dispatch new menu to reducer, make shure there is no error message and dispatch sum of price and kcal to reducer.
function checkNewMenu(generatedMenu, userConfiguredValues, dispatch) {
  const price = generatedMenu.reduce((sum, order) => sum + parseFloat(order.products[2]), 0);
  const kcal = generatedMenu.reduce((sum, order) => sum + parseFloat(order.products[1]), 0);

  if (kcal < userConfiguredValues.minCalories || kcal > userConfiguredValues.maxCalories || price > userConfiguredValues.maxPrice) {
    return dispatch(makeMenu(userConfiguredValues, generatedMenu));
  }

  dispatch(generate(generatedMenu));
  dispatch(errorHandle(''));
  return dispatch(summary(kcal.toFixed(), price.toFixed(2)));
}

// Pick random combination in each of food categories to new menu object.
// If combination is not an array then modify it by 'modifyCombination' function.
// Pass generated menu to 'checkNewMenu' as many times as values will be matched to user configuration.
// if error - pass error message to reducer.
export function makeMenu(userConfiguredValues, state) {
  return (dispatch) => {
    const generateNewMenu = state.map((item) => {
      if (!item.draw) return item;

      const combinationType = combinations[item.name];
      let pickedCombination = combinations[item.name][Math.floor(Math.random() * combinationType.length)];

      if (!(pickedCombination instanceof Array)) {
        pickedCombination = modifyCombination(pickedCombination.arr, pickedCombination.combinationDescription, pickedCombination.weightMultiplier, pickedCombination.pricePlus, pickedCombination.kcalPlus);
      }

      item.products = pickedCombination;
      return item;
    });

    try {
      return checkNewMenu(generateNewMenu, userConfiguredValues, dispatch);
    } catch (err) {
      return dispatch(errorHandle({ message: 'Wystąpił błąd, spróbuj zmienić konfiguracje wyników' }));
    }
  };
}
