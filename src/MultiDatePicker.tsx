import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import DatePicker, { DatePickerProps } from 'rsuite/DatePicker';
import Tag from 'rsuite/Tag';
import PlusIcon from '@rsuite/icons/Plus';
import isEqual from 'date-fns/isEqual';
import dateFormat from 'date-fns/format';

import useControlled from './useControlled';

export interface MultiDatePickerProps
  extends Omit<DatePickerProps, 'onChange' | 'value' | 'defaultValue'> {
  value?: Date[];
  defaultValue?: Date[];
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  format?: string;
  title?: React.ReactNode;
  formatter?: (date: Date) => string;
  disabledDate?: (date: Date) => boolean;
  onChange?: (value: Date[], event: React.SyntheticEvent) => void;
}

const MultiDatePicker = React.forwardRef(
  (props: MultiDatePickerProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      format = 'yyyy-MM-dd',
      disabled,
      title,
      value: valueProp,
      defaultValue,
      formatter,
      disabledDate,
      onChange,
      ...rest
    } = props;

    const [value, setValue] = useControlled(valueProp, defaultValue || []);

    const handleClean = useCallback(
      (event: React.SyntheticEvent) => {
        setValue([]);
        onChange?.([], event);
      },
      [setValue, onChange]
    );

    const handleChange = useCallback(
      (date: Date, event: React.SyntheticEvent) => {
        const nextValue = [...value, date];
        setValue(nextValue);
        onChange?.(nextValue, event);
      },
      [value, setValue, onChange]
    );

    const handleDisabledDate = useCallback(
      (date: Date) => {
        if (disabledDate && disabledDate(date)) {
          return true;
        }

        if (value.some(item => isEqual(item, date))) {
          return true;
        }

        return false;
      },
      [value, disabledDate]
    );

    const handleRemove = useCallback(
      (date: Date, event: React.SyntheticEvent) => {
        const nextValue = [...value];
        nextValue.splice(nextValue.indexOf(date), 1);
        setValue(nextValue);
        onChange?.(nextValue, event);
      },
      [value, setValue, onChange]
    );

    const tags = value.map(date => {
      const text = formatter ? formatter(date) : dateFormat(date, format);
      return (
        <Tag
          closable
          key={text}
          onClose={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
            handleRemove(date, event);
          }}
        >
          {text}
        </Tag>
      );
    });

    return (
      <div className={`rs-multi-date-picker${disabled ? ' disabled' : ''}`} ref={ref}>
        {title ? <div className="label-text">{title} </div> : null}
        {tags}
        <DatePicker
          oneTap
          format={format}
          disabled={disabled}
          appearance="subtle"
          onChange={handleChange}
          value={null}
          disabledDate={handleDisabledDate}
          placeholder={<PlusIcon />}
          {...rest}
        />
        {value.length ? (
          <span
            className="rs-picker-toggle-clean"
            role="button"
            tabIndex={-1}
            onClick={handleClean}
          >
            ✕
          </span>
        ) : null}
      </div>
    );
  }
);
MultiDatePicker.displayName = 'MultiDatePicker';
MultiDatePicker.propTypes = {
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  defaultValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  onChange: PropTypes.func,
  disabledDate: PropTypes.func,
  format: PropTypes.string,
  formatter: PropTypes.func,
  disabled: PropTypes.bool,
  title: PropTypes.node
};

export default MultiDatePicker;
