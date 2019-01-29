import React from 'react';
import MultiDatePicker from '../src';

class DefaultExample extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="example">
        <h2>Default</h2>
        <MultiDatePicker />
      </div>
    );
  }
}

export default DefaultExample;
