const initialState = [
  { name: 'straczkowe', products: '', draw: true, img: '01', display: 'Strączkowe' },
  { name: 'jagody', products: '', draw: true, img: '02', display: 'Jagody' },
  { name: 'owoce', products: '', draw: true, img: '03', display: 'Owoce' },
  { name: 'kapusta', products: '', draw: true, img: '04', display: 'Kapusta' },
  { name: 'zielenina', products: '', draw: true, img: '05', display: 'Zielenina' },
  { name: 'warzywa', products: '', draw: true, img: '06', display: 'Warzywa' },
  { name: 'orzechy', products: '', draw: true, img: '07', display: 'Orzechy' },
  { name: 'pelnoziarniste', products: '', draw: true, img: '08', display: 'Pełnoziarniste' },
  { name: 'siemieOstropest', products: '', draw: true, img: '09', display: 'Siemię i ostropest' },
  { name: 'ziolaPrzyprawy', products: '', draw: true, img: '10', display: 'Zioła i przyprawy' },
  { name: 'suplementy', products: '', draw: true, img: '11', display: 'Suplementy' },
  { name: 'napoje', products: '', draw: true, img: '12', display: 'Napoje' },
  { name: 'ruch', products: '', draw: true, img: '13', display: 'Ruch' },
];

export default function (state = initialState, action) {
  switch (action.type) {
    case 'ITEM_SELECTED':
      return state.map((item) => {
        if (item.name === action.payload) {
          item.draw = !item.draw;
          return item;
        }
        return item;
      });
    case 'GENERATE':
      return action.payload;
    case 'DEFAULT_STATE':
      return state;
    default:
      return state;
  }
}
