import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class MenuForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="minCalories">Kalorie</label>
          <Field name="minCalories" component="input" type="text" className="input" placeholder="min Kalorie"/>
          <Field name="maxCalories" component="input" type="text" className="input" placeholder="max Kalorie"/>
        </div>
        <div>
          <label htmlFor="maxPrice" className="label_second">Cena</label>
          <Field name="maxPrice" component="input" type="text" className="input" placeholder="max Cena"/>
        </div>
        <div className="form_button">

          <button type="submit" className="button">Generuj</button>
        </div>
      </form>
    );
  }
}

MenuForm = reduxForm({
  form: 'contact',
})(MenuForm);

export default MenuForm;
