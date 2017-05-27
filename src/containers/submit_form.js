import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MenuForm from './form';
import { makeMenu } from '../actions/index';

class SumbitPage extends Component {
  submit = (values) => {
    this.props.makeMenu(values, this.props.menu);
  }
  render() {
    return (
      <div className="form_main">
        <h2>Skonfiguruj wyniki:</h2>
        <MenuForm onSubmit={this.submit} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    menu: state.menu
  }
};

const mapDispatchToProps = (dispatch) => {
    return {
        makeMenu: (value, state) => dispatch(makeMenu(value, state))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SumbitPage);
