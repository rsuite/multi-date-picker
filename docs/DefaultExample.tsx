import React from 'react';
import MultiDatePicker from '../src';
import { format as dateFormat, isSameDay, subDays } from 'date-fns';

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
        <MultiDatePicker oneTap={false} format="yyyy-MM-dd hh:mm:ss" defaultValue={[new Date()]} />

        <hr />
        <h2>Formatter</h2>
        <MultiDatePicker
          oneTap={false}
          formatter={date => {
            if (isSameDay(date, new Date())) {
              return '今天';
            }
            if (isSameDay(date, subDays(new Date(), 1))) {
              return '昨天';
            }
            return dateFormat(date, 'yyyy-MM-dd');
          }}
          defaultValue={[subDays(new Date(), 2), subDays(new Date(), 1), new Date()]}
        />
      </div>
    );
  }
}

export default DefaultExample;
