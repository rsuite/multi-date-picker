import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import bindElementResize, { unbind } from 'element-resize-event';
import { Nav, Dropdown, Icon, DOMHelper as _ } from 'rsuite';

const iconStyle = {
  fontSize: 12,
  marginLeft: 4,
  width: 12
};

function getUnhandledProps(props) {
  const nextProps = {};
  const keys = Object.keys(ResponsiveNav.propTypes);
  Object.entries(props).forEach(([key, value]) => {
    if (keys.indexOf(key) === -1) {
      nextProps[key] = value;
    }
  });
  return nextProps;
}

class ResponsiveNav extends React.Component {
  static propTypes = {
    removable: PropTypes.bool,
    onItemRemove: PropTypes.func,
    activeKey: PropTypes.string,
    children: PropTypes.node,
    moreText: PropTypes.node,
    moreProps: PropTypes.object
  };

  static defaultProps = {
    moreText: 'More'
  };
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      contentWidth: 0,
      itemWidthList: [],
      moreWidth: 0
    };
  }
  componentDidMount() {
    if (this.wrapper) {
      this.handleResize();
      bindElementResize(this.wrapper, this.handleResize);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.moreItem && this.state.moreWidth === 0) {
      this.setState({
        moreWidth: _.getWidth(ReactDOM.findDOMNode(this.moreItem))
      });
    }

    if (prevProps.children.length !== this.props.children.length) {
      this.handleResize();
    }
  }
  componentWillUnmount() {
    if (this.wrapper) {
      unbind(this.wrapper);
    }
  }

  handleResize = () => {
    const items = this.wrapper.querySelectorAll('.rs-nav-item');
    const width = _.getWidth(this.wrapper);
    let contentWidth = 0;
    let itemWidthList = [];

    items.forEach(element => {
      let w = _.getWidth(element);
      contentWidth += w;
      itemWidthList.push(w);
    });

    this.setState({
      width,
      contentWidth,
      itemWidthList
    });
  };

  handleRemove = (eventKey, event) => {
    event.stopPropagation();

    const { onItemRemove } = this.props;
    onItemRemove && onItemRemove(eventKey);
  };

  wrapper = null;

  bindWrapperRef = ref => {
    this.wrapper = ref;
  };
  moreItem = null;

  bindMoreItemRef = ref => {
    this.moreItem = ref;
  };

  renderPlaceholder() {
    const { children, removable } = this.props;
    const rest = getUnhandledProps(this.props);
    const styles = {
      height: 0,
      overflow: 'hidden'
    };
    return (
      <div ref={this.bindWrapperRef} style={styles}>
        <Nav {...rest}>
          {removable
            ? children.map((item, key) =>
                React.cloneElement(item, {
                  key,
                  children: this.renderIcon(item)
                })
              )
            : children}
        </Nav>
      </div>
    );
  }
  renderChildren() {
    const { width, contentWidth, itemWidthList, moreWidth } = this.state;
    const { children, activeKey, removable, moreText, moreProps } = this.props;
    let items = [];
    if (contentWidth <= width) {
      items = children;
    } else {
      let rangeWidth = 0;
      let dropdownItems = [];

      React.Children.forEach(children, (child, index) => {
        let itemWidth = itemWidthList[index];
        rangeWidth += itemWidth;
        if (rangeWidth < width) {
          items.push(child);
        } else {
          dropdownItems.push(child);
        }
      });

      if (dropdownItems.length) {
        dropdownItems.splice(0, 0, items.pop());

        let k = 0;
        for (let i = 0; i < items.length; i++) {
          k += itemWidthList[i];
        }

        if (moreWidth + k > width) {
          dropdownItems.splice(0, 0, items.pop());
        }

        if (items[items.length - 1]) {
          dropdownItems.splice(0, 0, items[items.length - 1]);
        }

        const activeItem = dropdownItems.find(
          item => item.props.eventKey === activeKey
        );

        if (activeItem) {
          items.splice(items.length - 1, 1, activeItem);
        }

        items.push(
          <Dropdown
            {...moreProps}
            title={moreText}
            key="more"
            ref={this.bindMoreItemRef}
          >
            {dropdownItems.map((child, index) => {
              const {
                children: itemChildren,
                classPrefix,
                eventKey,
                ...itemRest
              } = child.props;
              return (
                <Dropdown.Item
                  key={eventKey || index}
                  eventKey={eventKey}
                  {...itemRest}
                >
                  {itemChildren}
                </Dropdown.Item>
              );
            })}
          </Dropdown>
        );
      }
    }

    if (removable) {
      return items.map((item, key) => {
        if (item.type.displayName === 'NavItem') {
          return React.cloneElement(item, {
            key,
            children: this.renderIcon(item)
          });
        }
        return item;
      });
    }

    return items;
  }
  renderIcon(item) {
    const { activeKey } = this.props;
    const { eventKey } = item.props;

    let nextIconStyle = iconStyle;
    if (activeKey === eventKey) {
      nextIconStyle = Object.assign(
        {
          color: '#f44336'
        },
        iconStyle
      );
    }

    return (
      <React.Fragment>
        {item.props.children}{' '}
        <Icon
          onClick={this.handleRemove.bind(this, eventKey)}
          icon="close"
          style={nextIconStyle}
        />
      </React.Fragment>
    );
  }

  render() {
    const { activeKey } = this.props;
    const rest = getUnhandledProps(this.props);

    return (
      <div>
        {this.renderPlaceholder()}
        <Nav activeKey={activeKey} {...rest}>
          {this.renderChildren()}
        </Nav>
      </div>
    );
  }
}

ResponsiveNav.Item = Nav.Item;

export default ResponsiveNav;
