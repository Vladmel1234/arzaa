import React, { Component } from 'react';
import PropTypes from 'proptypes';
import './App.css';


// COMPOUND COMPONENTS

function ToggleOn({ on, children }) {
  return on ? children : null;
}
function ToggleOff({ on, children }) {
  return on ? null : children;
}
function ToggleButton({ on, toggle, ...props }) {
  return (
    <Switch on={on} onClick={toggle} {...props} />
  );
}
class Toggle extends React.Component {
  static On = ToggleOn
  static Off = ToggleOff
  static Button = ToggleButton
  static defaultProps = { onToggle: () => {} }
  state = { on: false }
  toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on),
    )
  render() {
    const children = React.Children.map(
      this.props.children,
      child =>
        React.cloneElement(child, {
          on: this.state.on,
          toggle: this.toggle,
        }),
    );
    return <div>{children}</div>;
  }
}

class App extends Component {
  render() {
    return (
      <Toggle
        onToggle={on => console.log('toggle', on)}
      >
        <Toggle.On>The button is on</Toggle.On>
        <Toggle.Off>The button is off</Toggle.Off>
        <Toggle.Button />
      </Toggle>
    );
  }
}

export default App;


// EDITION WITH CONTEXT AND HOC

// const TOGGLE_CONTEXT = '__toggle__';

// function toggleHoc(Component) {
//   function Wrapper({ innerRef, ...props }, context) {
//     const toggleContext = context[TOGGLE_CONTEXT];
//     return (
//       <Component ref={innerRef} {...props} toggle={toggleContext} />
//     );
//   }
//   Wrapper.contextTypes = {
//     [TOGGLE_CONTEXT]: PropTypes.object.isRequired
//   };
//   return Wrapper;
// }

// // main component

// class Toggle extends Component {
//   static defaultProps = { onToggle: () => {} }
//   static childContextTypes = {
//     [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
//   }
//   state = {
//     on: false
//   }

//   getChildContext() {
//     return {
//       [TOGGLE_CONTEXT]: {
//         on: this.state.on,
//         toggle: this.toggleHandler
//       }
//     };
//   }

//   toggleHandler = () => this.setState(
//     ({ on }) => ({ on: !on }),
//     () => {
//       this.props.onToggle(this.state.on);
//     }
//   )

//   render() {
//     return (
//       <div>{ this.props.children }</div>
//     );
//   }
// }

// const ToggleOn = toggleHoc(({ children, toggle: { on } }) => {
//   return on ? children : null;
// });
// const ToggleOff = toggleHoc(({ children, toggle: { on } }) => {
//   return on ? null : children;
// });

// const ToggleButton = toggleHoc(({ ...props, toggle: { toggle, on } }) => {
//   return <Switch on={on} onClick={toggle} {...props} />;
// });


// class MyToggle extends Component {
//   focus = () => this.button.focus();
//   render() {
//     const { on, toggle } = this.props.toggle;
//     return (
//       <button
//         onClick={toggle}
//         ref={button => (this.button = button)}  // eslint-disable-line
//       >
//         {on ? 'on' : 'off'}
//       </button>
//     );
//   }
// }

// const MyToggleHoce = toggleHoc(MyToggle);

// const MyEventComponent = toggleHoc(({ event, on, toggle }) => {
//   const props = { [event]: on };
//   return toggle.on && <button onClick={on} {...props}>the {event} event</button>;
// });

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <Toggle onToggle={on => (on ? this.MyToggle.focus() : null)}>
//           <ToggleOn>its on</ToggleOn>
//           <div>
//             <span><ToggleOff>its off</ToggleOff></span>
//           </div>
//           <hr />
//           <ToggleButton />
//           <hr />
//           <MyToggleHoce
//             innerRef={MyToggle => (this.MyToggle = MyToggle)} // eslint-disable-line
//           />
//           <hr />
//           <MyEventComponent
//             event="onClick"
//             on={(e) => { alert(e.type); }}
//           />
//         </Toggle>
//       </div>
//     );
//   }
// }

// export default App;


// SWITCH COMPONENT ONLY FOR UI
const Switch = ({ on, className = '', ...props }) => (
  <div className="toggle">
    <input
      className="toggle-input"
      type="checkbox"
    />
    <button
      className={`${className} toggle-btn ${on
          ? 'toggle-btn-on'
          : 'toggle-btn-off'}`}
      aria-expanded={on}
      {...props}
    />
  </div>
);
