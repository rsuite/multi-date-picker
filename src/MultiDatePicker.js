import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'rsuite/lib/DatePicker';
import Tag from 'rsuite/lib/Tag';
import Icon from 'rsuite/lib/Icon';
import { format as dateFormat, isEqual } from 'date-fns';

function getUnhandledProps(props, Component) {
  const nextProps = {};
  const keys = Object.keys(Component.propTypes);
  Object.entries(props).forEach(([key, value]) => {
    if (keys.indexOf(key) === -1) {
      nextProps[key] = value;
    }
  });
  return nextProps;
}

class MultiDatePicker extends React.Component {
  static propTypes = {
    value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    defaultValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    onChange: PropTypes.func,
    disabledDate: PropTypes.func,
    format: PropTypes.string,
    disabled: PropTypes.bool,
    title: PropTypes.node
  };

  static defaultProps = {
    format: 'YYYY-MM-DD'
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue || []
    };
  }

  getValue() {
    const { value } = this.props;
    if (typeof value === 'undefined') {
      return this.state.value;
    }
    return value;
  }
  setValue = value => {
    const { onChange } = this.props;
    if (typeof this.props.value === 'undefined') {
      this.setState({
        value
      });
    }
    onChange && onChange(value);
  };

  handleChange = date => {
    const value = [...this.state.value];
    value.push(date);
    this.setValue(value);
  };
  handleDisabledDate = date => {
    const { disabledDate } = this.props;
    const value = this.getValue();
    if (disabledDate && disabledDate(date)) {
      return true;
    }

    if (value.some(item => isEqual(item, date))) {
      return true;
    }

    return false;
  };
  handleRemove = date => {
    const value = [...this.getValue()];
    value.splice(value.indexOf(date), 1);
    this.setValue(value);
  };

  handleClean = () => {
    this.setValue([]);
  };

  renderTags = () => {
    const { format } = this.props;
    const value = this.getValue();

    return value.map(date => {
      const text = dateFormat(date, format);
      return (
        <Tag
          closable
          key={text}
          onClose={() => {
            this.handleRemove(date);
          }}
        >
          {text}
        </Tag>
      );
    });
  };

  renderCleanButton() {
    const value = this.getValue();
    if (value.length === 0) {
      return null;
    }
    return (
      <span
        className="rs-picker-toggle-clean"
        role="button"
        tabIndex="-1"
        onClick={this.handleClean}
      >
        ✕
      </span>
    );
  }
  renderLabel() {
    const { title } = this.props;
    if (title) {
      return <div className="label-text">{title} </div>;
    }
    return null;
  }
  render() {
    const { format, disabled, ...props } = this.props;
    const rest = getUnhandledProps(props, MultiDatePicker);

    return (
      <div className={`multi-date-picker ${disabled ? 'disabled' : ''}`}>
        {this.renderLabel()}
        {this.renderTags()}
        <DatePicker
          oneTap
          format={format}
          disabled={disabled}
          appearance="subtle"
          onChange={this.handleChange}
          value={null}
          disabledDate={this.handleDisabledDate}
          placeholder={<Icon icon="plus" />}
          {...rest}
        />
        {this.renderCleanButton()}
        <span className="rs-picker-toggle-caret" />
      </div>
    );
  }
}

export default MultiDatePicker;
