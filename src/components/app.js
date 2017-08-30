import React, { Component } from 'react';

import MenuList from '../containers/menu_list';
import SumbitPage from '../containers/submit_form';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1 className="main--title">🥗 Daily Dozen - generator składników*</h1>
        <hr className="line" />
        <SumbitPage />
        <hr className="line" />
        <MenuList />
        <hr className="line" />
        <div className="main--description">
          <p>Po losowaniu można zaznaczyć wybraną kategorię, dzięki czemu przy następnym losowaniu wybrana kategoria nie jest losowana ponownie.</p>
          <p>* Na podstawie książki "Jak nie umrzeć przedwcześnie. Cała prawda o zdrowym żywieniu", autorstwa - Gene Stone, Michael Greger.</p>
        </div>
      </div>
    );
  }
}
