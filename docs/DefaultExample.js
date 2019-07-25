import React from 'react';
import MultiDatePicker from '../src';

class DefaultExample extends React.Component {
  render() {
    return (
      <div className="example">
        <h2>Default</h2>
        <MultiDatePicker />
        <hr />
        <h2>Title</h2>
        <MultiDatePicker title="日期: " />
        <hr />
        <h2>Disabled</h2>
        <MultiDatePicker disabled />
        <hr />
        <h2>Default value</h2>
        <MultiDatePicker defaultValue={[new Date('2019-01-01'), new Date()]} />

        <hr />
        <h2>Date time</h2>
        <MultiDatePicker
          oneTap={false}
          format="YYYY-MM-DD hh:mm:ss"
          defaultValue={[new Date()]}
        />
      </div>
    );
  }
}

export default DefaultExample;
