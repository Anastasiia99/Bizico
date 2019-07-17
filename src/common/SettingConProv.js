import React from "react";

const SettingContext = React.createContext(null);
const SettingsContextConsumer = SettingContext.Consumer;

class SettingConProv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: localStorage.getItem("mode") || "day"
    };
  }

  changeMode = () => {
    const newMode = this.state.mode === "day" ? "night" : "day";
    this.setState({
      mode: newMode
    });
    localStorage.setItem("mode", newMode);
  };

  render() {
    const values = { ...this.state, changeMode: this.changeMode };
    return (
      <SettingContext.Provider value={values}>
        {this.props.children}
      </SettingContext.Provider>
    );
  }
}

export { SettingConProv, SettingsContextConsumer, SettingContext };
