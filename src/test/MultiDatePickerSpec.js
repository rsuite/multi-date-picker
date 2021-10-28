import React from 'react';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dateFormat from 'date-fns/format';
import MultiDatePicker from '../MultiDatePicker';

describe('MultiDatePicker', () => {
  it('Should render a div with "rs-multi-date-picker" class', () => {
    const ref = React.createRef();
    render(<MultiDatePicker ref={ref} />);

    assert.equal(ref.current.tagName, 'DIV');
    assert.include(ref.current.className, 'rs-multi-date-picker');
  });

  it('Should render a title', () => {
    const ref = React.createRef();
    render(<MultiDatePicker ref={ref} title="Label" />);
    assert.equal(ref.current.querySelector('.label-text').textContent, 'Label ');
  });

  it('Should be disabled', () => {
    const ref = React.createRef();
    render(<MultiDatePicker ref={ref} disabled />);
    assert.include(ref.current.className, 'disabled');
    assert.include(ref.current.querySelector('.rs-picker-toggle').className, 'rs-btn-disabled');
  });

  it('Should render multiple date by value', () => {
    const ref = React.createRef();
    render(
      <MultiDatePicker
        ref={ref}
        format="dd/MM/yyyy"
        value={[new Date('2021-01-01'), new Date('2021-01-02'), new Date('2021-01-03')]}
      />
    );
    assert.equal(ref.current.querySelectorAll('.rs-tag').length, 3);

    const tags = ref.current.querySelectorAll('.rs-tag');

    assert.equal(tags[0].textContent, '01/01/2021');
    assert.equal(tags[1].textContent, '02/01/2021');
    assert.equal(tags[2].textContent, '03/01/2021');
  });

  it('Should render multiple date by defaultValue', () => {
    const ref = React.createRef();
    render(
      <MultiDatePicker
        ref={ref}
        format="dd/MM/yyyy"
        defaultValue={[new Date('2021-01-01'), new Date('2021-01-02'), new Date('2021-01-03')]}
      />
    );
    assert.equal(ref.current.querySelectorAll('.rs-tag').length, 3);

    const tags = ref.current.querySelectorAll('.rs-tag');

    assert.equal(tags[0].textContent, '01/01/2021');
    assert.equal(tags[1].textContent, '02/01/2021');
    assert.equal(tags[2].textContent, '03/01/2021');
  });

  it('Should call `onChange` callback when clicking clear button', () => {
    const ref = React.createRef();
    const onChangeSpy = sinon.spy();
    const { getByText } = render(
      <MultiDatePicker
        ref={ref}
        format="dd/MM/yyyy"
        onChange={onChangeSpy}
        defaultValue={[new Date('2021-01-01'), new Date('2021-01-02')]}
      />
    );

    userEvent.click(getByText('✕'));
    assert.isTrue(onChangeSpy.calledOnce);
    assert.equal(onChangeSpy.firstCall.firstArg.length, 0);
  });

  it('Should call `onChange` callback when clicking close button', () => {
    const ref = React.createRef();
    const onChangeSpy = sinon.spy();
    render(
      <MultiDatePicker
        ref={ref}
        format="dd/MM/yyyy"
        onChange={onChangeSpy}
        defaultValue={[new Date('2021-01-01'), new Date('2021-01-02')]}
      />
    );

    const btnClose = ref.current.querySelector('.rs-tag-icon-close');

    userEvent.click(btnClose);
    assert.isTrue(onChangeSpy.calledOnce);
    assert.equal(onChangeSpy.firstCall.firstArg.length, 1);
  });

  it('Should render the newly added date', () => {
    const ref = React.createRef();
    const onChangeSpy = sinon.spy();

    const { container, baseElement, ...rset } = render(
      <MultiDatePicker ref={ref} format="dd/MM/yyyy" onChange={onChangeSpy} />
    );

    const toggle = ref.current.querySelector('.rs-picker-toggle');

    act(() => {
      userEvent.click(toggle);
    });

    const btnToday = baseElement.querySelector('.rs-picker-menu .rs-btn-link');

    act(() => {
      userEvent.click(btnToday);
    });

    assert.equal(ref.current.querySelectorAll('.rs-tag').length, 1);
    assert.equal(
      ref.current.querySelector('.rs-tag').textContent,
      dateFormat(new Date(), 'dd/MM/yyyy')
    );

    assert.isTrue(onChangeSpy.calledOnce);
    assert.equal(onChangeSpy.firstCall.firstArg.length, 1);
  });
});
