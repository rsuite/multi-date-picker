# Multi DatePicker

A date picker that can select multiple dates


## Installation

```
npm install @rsuite/multi-date-picker --save
```

## Usage

```js
import DatePicker from '@rsuite/multi-date-picker';
import '@rsuite/multi-date-picker/lib/styles.less'

const App = () => {
  return (
    <DatePicker />
  );
};

ReactDOM.render(<App />, mountNode);
```

## Props

`MultiDatePicker` extends all the props of [`DatePicker`](https://rsuitejs.com/en/components/date-picker), with different support:


| Property     | Type`(Default)` | Description                       |
| ------------ | --------------- | --------------------------------- |
| value        | Date[]          | Value (Controlled)                |
| defaultValue | Date[]          | Default value                     |
| onChange     | (Date[])=>void  | Callback fired when value changed |


## License

MIT licensed
