import React, { Component } from 'react';
import PropTypes from 'proptypes';
import './App.css';

const TOGGLE_CONTEXT = '__toggle__';

function toggleHoc(Componenta) {
  function Wrapper({ innerRef, ...props }, context) {
    const toggleContext = context[TOGGLE_CONTEXT];
    return (
      <Componenta ref={innerRef} {...props} toggle={toggleContext} />
    );
  }
  Wrapper.contextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired
  };
  return Wrapper;
}

// main component

class Toggle extends Component {
  static defaultProps = { onToggle: () => {} }
  static childContextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
  }
  state = {
    on: false
  }

  getChildContext() {
    return {
      [TOGGLE_CONTEXT]: {
        on: this.state.on,
        toggle: this.toggleHandler
      }
    };
  }

  toggleHandler = () => this.setState(
    ({ on }) => ({ on: !on }),
    () => {
      this.props.onToggle(this.state.on);
    }
  )

  render() {
    return (
      <div>{ this.props.children }</div>
    );
  }
}
// function toggleStateHoc(Componenta) {
//   class StateWrapper extends Component {
//     state = {
//       open: false
//     }

//     toggle = () => {
//       this.setState({ open: !this.state.open });
//     }
//     render() {
//       return <Componenta open={this.state.open} toggle={this.toggle} />;
//     }
//   }
//   return StateWrapper;
// }

// const MyownHoc = toggleStateHoc(({ open, toggle }) => (
//   <div>
//     <button onClick={toggle}>{!open ? 'open' : 'hide'}</button>
//     {open && <div>Now You See Me mu hahaha</div>}
//   </div>
// ));


const ToggleOn = toggleHoc(({ children, toggle: { on } }) => {
  return on ? children : null;
});
const ToggleOff = toggleHoc(({ children, toggle: { on } }) => {
  return on ? null : children;
});

const ToggleButton = toggleHoc(({ ...props, toggle: { toggle, on } }) => {
  return <Switch on={on} onClick={toggle} {...props} />;
});


class MyToggle extends Component {
  focus = () => this.button.focus();
  render() {
    const { on, toggle } = this.props.toggle;
    return (
      <button
        onClick={toggle}
        ref={button => (this.button = button)}
      >
        {on ? 'on' : 'off'}
      </button>
    );
  }
}

const MyToggleHoce = toggleHoc(MyToggle);

const MyEventComponent = toggleHoc(({ event, on, toggle }) => {
  const props = { [event]: on };
  return toggle.on && <button onClick={on} {...props}>the {event} event</button>;
});

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


class App extends Component {
  render() {
    return (
      <div className="App">
        <Toggle onToggle={on => (on ? this.MyToggle.focus() : null)}>
          <ToggleOn>its on</ToggleOn>
          <div>
            <span><ToggleOff>its off</ToggleOff></span>
          </div>
          <hr />
          <ToggleButton />
          <hr />
          <MyToggleHoce innerRef={MyToggle => (this.MyToggle = MyToggle)} />
          <hr />
          <MyEventComponent
            event="onClick"
            on={(e) => { alert(e.type); }}
          />
        </Toggle>
        {/* <MyownHoc /> */}
      </div>
    );
  }
}

export default App;
// const compose = (...fns) => (...args) => {
//   fns.forEach(fn => fn && fn(...args));
// };

// class Toggle extends Component {
//   static defaultProps = { onToggle: () => {} }
//   state = {
//     on: false
//   }


//   getTogglerProps = ({ onClick, ...props } = {}) => ({
//     ...props,
//     onClick: compose(this.switchHandler, onClick),
//     'aria-expended': this.state.on,
//   })

//   switchHandler = () => (
//     this.setState(
//       ({ on }) => ({ on: !on }),
//       () => { this.props.onToggle(this.state.on); }
//     )
//   )

//   render() {
//     return (
//       this.props.render({
//         on: this.state.on,
//         getTogglerProps: this.getTogglerProps
//       })
//     );
//   }
// }

// export default class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <Toggle
//           render={
//             ({ on, getTogglerProps }) => (
//               <div className="Toggler">
//                 <Switch on={on} {...getTogglerProps()} />
//                 <div>{on ? 'on' : 'off'}</div>
//                 <hr />
//                 <button {...getTogglerProps({
//                  onClick: () => alert('hi')
//                 })}
//                 >
//                   {on ? 'on' : 'off'}
//                 </button>
//               </div>
//             )
//         }
//           onToggle={on => console.log('the state is', on)}
//         />
//       </div>
//     );
//   }
// }

// export default class App extends Component {
// state = {
//   upperValue: ' ',
//   lowerValue: ' '
// }

// onChange = ({ target }) => this.setState({
//   lowerValue: target.value.toLowerCase(),
//   upperValue: target.value.toUpperCase()
// })

// toLowerCase = ({ target }) => this.setState(() => ({ lowerValue: target.value.toLowerCase() }))

// toUpperCase = ({ target }) => this.setState(() => ({ upperValue: target.value.toUpperCase() }))

// render() {
//   return (
//     <div>
//       <label htmlFor="a">
//        Upper:
//        <input id="a" value={this.state.upperValue} onChange={this.onChange} />
//         {this.state.upperValue}
//       </label>
//       <hr />
//       <label htmlFor="b">
//        Lower:
//        <input id="b" value={this.state.lowerValue} onChange={this.onChange} />
//         {this.state.lowerValue}
//       </label>
//     </div>
//   );
// }
// }
