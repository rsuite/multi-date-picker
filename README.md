# Responsive Nav

A responsive navigation component based on rsuite navigation enhancements.

## features

- Support for removable tabs.
- Support for automatic folding options when a row can not show all options.

## Installation

```
npm install @rsuite/responsive-nav --save
```

## Usage

```js
import Nav from "@rsuite/responsive-nav";
const App = () => {
  return (
    <Nav>
      <Nav.Item eventKey="A">Item A</Nav.Item>
      <Nav.Item eventKey="B">Item B</Nav.Item>
      <Nav.Item eventKey="C">Item C</Nav.Item>
      <Nav.Item eventKey="D">Item D</Nav.Item>
      <Nav.Item eventKey="E">Item E</Nav.Item>
    </Nav>
  );
};

ReactDOM.render(<App />, mountNode);
```

## Props

`ResponsiveNav` extends all the props of [`Nav`](https://rsuitejs.com/en/components/nav) and also supports:



| Property     | Type`(Default)`  | Description                                 |
| ------------ | ---------------- | ------------------------------------------- |
| moreProps    | object           | More drop-down menu props                   |
| moreText     | React.Node       | More text displayed on the drop-down        |
| onItemRemove | (eventKey)=>void | The callback function when removing options |
| removable    | boolean          | Options can be removed                      |


## License

MIT licensed
