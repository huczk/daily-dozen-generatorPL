import { combinations } from '../../data/index';

export function selectItem(item) {
  return {
    type: 'ITEM_SELECTED',
    payload: item.name,
  };
}

function generate(state) {
  return {
    type: 'GENERATE',
    payload: state,
  };
}

function summary(kcal, price) {
  return {
    type: 'SUMMARY',
    payload: { kcal, price },
  };
}

function errorHandle(obj) {
  return {
    type: 'ERROR',
    payload: obj,
  };
}

function itemProperties(combinationTypeArray, combinationDescription, weightMultiplier, pricePlus, kcalPlus) {
  const randomCombination = combinationTypeArray[Math.floor(Math.random() * combinationTypeArray.length)];
  const randomCombinationKcal = (randomCombination.kcal * weightMultiplier) + kcalPlus;
  const randomCombinationPrice = (randomCombination.price * weightMultiplier) + pricePlus;

  return [combinationDescription + randomCombination.name, randomCombinationKcal, randomCombinationPrice];
}

function combineValues(generatedMenu, userConfiguredValues, dispatch) {
  const price = generatedMenu.reduce((sum, order) => sum + parseFloat(order.products[2]), 0);
  const kcal = generatedMenu.reduce((sum, order) => sum + parseFloat(order.products[1]), 0);

  if (kcal < userConfiguredValues.minCalories || kcal > userConfiguredValues.maxCalories || price > userConfiguredValues.maxPrice) {
    return dispatch(makeMenu(userConfiguredValues, generatedMenu));
  }

  dispatch(generate(generatedMenu));
  dispatch(errorHandle(''));
  return dispatch(summary(kcal.toFixed(), price.toFixed(2)));
}

export function makeMenu(userConfiguredValues, state) {
  return (dispatch) => {
    const generateNewMenu = state.map((item) => {
      if (!item.draw) return item;

      const combinationType = combinations[item.name];
      let pickedCombination = combinations[item.name][Math.floor(Math.random() * combinationType.length)];

      if (!(pickedCombination instanceof Array)) {
        pickedCombination = itemProperties(pickedCombination.arr, pickedCombination.combinationDescription, pickedCombination.weightMultiplier, pickedCombination.pricePlus, pickedCombination.kcalPlus);
      }

      item.products = pickedCombination;
      return item;
    });

    try {
      return combineValues(generateNewMenu, userConfiguredValues, dispatch);
    } catch (err) {
      return dispatch(errorHandle({ message: 'Wystąpił błąd, spróbuj zmienić konfiguracje wyników' }));
    }
  };
}
