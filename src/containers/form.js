import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

// Form containter with 'redux-form' library - to handle user configuration values
class MenuForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="minCalories">Kalorie</label>
          <Field name="minCalories" component="input" type="text" className="form--input" placeholder="min Kalorie"/>
          <Field name="maxCalories" component="input" type="text" className="form--input" placeholder="max Kalorie"/>
        </div>
        <div>
          <label htmlFor="maxPrice" className="form--labelSecond">Cena</label>
          <Field name="maxPrice" component="input" type="text" className="form--input" placeholder="max Cena"/>
        </div>
        <div className="form--buttonContainer">

          <button type="submit" className="form--button">Generuj</button>
        </div>
      </form>
    );
  }
}

MenuForm = reduxForm({
  form: 'userConfiguration',
})(MenuForm);

export default MenuForm;
