import React from 'react';
import EffectSelectField from '../components/EffectSelectField'
import Slider from './Slider'

class EffectContainer extends React.Component {
  showSettings(event) {
    event.preventDefault();
  }

  constructor(props) {
    super(props)
    this.state = {
      sliderValue_1: 0,
      sliderValue_2: 0,
      sliderValue_3: 0,
      sliderValue_4: 0,
      sliderValue_5: 0,
      lastKeyPressedTime: 0,
      active_effect: '',
      effect_parameter_1_name: '',
      effect_parameter_2_name: '',
      effect_parameter_3_name: '',
      effect_parameter_4_name: '',
      effect_parameter_5_name: ''
    }
    this.handleSlider_1 = this.handleSlider_1.bind(this);
    this.handleSlider_2 = this.handleSlider_2.bind(this);
    this.handleSlider_3 = this.handleSlider_3.bind(this);
    this.handleSlider_4 = this.handleSlider_4.bind(this);
    this.handleSlider_5 = this.handleSlider_5.bind(this);
    this.getActiveEffect = this.getActiveEffect.bind(this);
    this.postSliderValuesToFetch = this.postSliderValuesToFetch.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  getActiveEffect(nextUser) {
    this.props.handleLoading(true);
    let formPayload = [];
    fetch(`/api/v1/users/${nextUser.handle}/products/${nextUser.current_product_name}`)
    .then(response => response.json())
    .then(body => {
      this.setState({
        active_effect: body.active_effect
      })
      return fetch(`/api/v1/effects/${body.active_effect}`)
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        effect_parameter_1_name: body.parameter_1_name,
        effect_parameter_2_name: body.parameter_2_name,
        effect_parameter_3_name: body.parameter_3_name,
        effect_parameter_4_name: body.parameter_4_name,
        effect_parameter_5_name: body.parameter_5_name,
      })
      formPayload = [body.effect_name, body.parameter_1_name, body.parameter_2_name, body.parameter_3_name, body.parameter_4_name, body.parameter_5_name]
      return fetch(`/api/v1/users/${nextUser.handle}/products/${nextUser.current_product_name}/effect_settings/${body.effect_name}`)
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        sliderValue_1: body.parameter_1,
        sliderValue_2: body.parameter_2,
        sliderValue_3: body.parameter_3,
        sliderValue_4: body.parameter_4,
        sliderValue_5: body.parameter_5
      })
      this.props.handleEffectChange(formPayload);
      this.props.handleLoading(false);
    })
  }

  postSliderValuesToFetch() {
    if (Date.now() - this.state.lastKeyPressedTime > 500) {
      this.props.handleLoading(true);
      let formPayload = {
        parameter_1: this.state.sliderValue_1,
        parameter_2: this.state.sliderValue_2,
        parameter_3: this.state.sliderValue_3,
        parameter_4: this.state.sliderValue_4,
        parameter_5: this.state.sliderValue_5
      };
      fetch(`/api/v1/users/${this.props.currentUser.handle}/products/${this.props.currentUser.current_product_name}/effect_settings/${this.state.active_effect}`, {
        credentials: "same-origin",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ formPayload })
      })
      .then(response => { this.props.handleLoading(false) })
    }
  }

  handleSlider_1(sliderValue_1) {
    this.setState({
      lastKeyPressedTime: Date.now(),
      sliderValue_1: sliderValue_1
    })
    setTimeout(() => this.postSliderValuesToFetch(), 500);
  }

  handleSlider_2(sliderValue_2) {
    this.setState({
      lastKeyPressedTime: Date.now(),
      sliderValue_2: sliderValue_2
    })
    setTimeout(() => this.postSliderValuesToFetch(), 500);
  }

  handleSlider_3(sliderValue_3) {
    this.setState({
      lastKeyPressedTime: Date.now(),
      sliderValue_3: sliderValue_3
    })
    setTimeout(() => this.postSliderValuesToFetch(), 500);
  }

  handleSlider_4(sliderValue_4) {
    this.setState({
      lastKeyPressedTime: Date.now(),
      sliderValue_4: sliderValue_4
    })
    setTimeout(() => this.postSliderValuesToFetch(), 500);
  }

  handleSlider_5(sliderValue_5) {
    this.setState({
      lastKeyPressedTime: Date.now(),
      sliderValue_5: sliderValue_5
    })
    setTimeout(() => this.postSliderValuesToFetch(), 500);
  }

  handleSelect(selectedItem) {
    this.props.handleLoading(true);
    let active_effect = selectedItem.target.value
    let effectPayload = [
      selectedItem.target.value,
      this.state.effect_parameter_1_name,
      this.state.effect_parameter_2_name,
      this.state.effect_parameter_3_name,
      this.state.effect_parameter_4_name,
      this.state.effect_parameter_5_name
    ]
    this.props.handleEffectChange(effectPayload);
    fetch(`/api/v1/users/${this.props.currentUser.handle}/products/${this.props.currentUser.current_product_name}`, {
      credentials: "same-origin",
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ active_effect })
    })
    .then(response => {
      this.getActiveEffect(this.props.currentUser)
      this.props.handleLoading(false);
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.currentUser != this.props.currentUser) {
      this.getActiveEffect(nextProps.currentUser);
    }
  }

  render () {
    return (
      <div className={this.props.className}>
        <div>
          <i className="fa fa-sliders fa-2x" id="box-icon" aria-hidden="true"></i>
          <div className='container-title'>Effects</div>
          <EffectSelectField
            value={this.state.active_effect}
            handleSelect={this.handleSelect}
          />
        </div>

        <div id="Components">
          <div className="Component">
            <div className="Component-slider">
              <Slider
                onChange={ this.handleSlider_1 }
                value={this.state.sliderValue_1}
                radius={ 60 }
                border={ 5 }
                min={ -50 }
                max={ 50 }
                angle={ Math.PI / 4 }
                origin={ 0.5 }
                start={ 0 }
                fixedSliderValue={+this.state.sliderValue_1.toFixed(2)}
                label={this.state.effect_parameter_1_name}
                id='top-left-slider'
              />
              <Slider
                onChange={ this.handleSlider_2 }
                value={ this.state.sliderValue_2 }
                radius={ 60 }
                border={ 5 }
                min={ -50 }
                max={ 50 }
                angle={ Math.PI / 4 }
                origin={ 0.5 }
                start={ 0 }
                fixedSliderValue={+this.state.sliderValue_2.toFixed(2)}
                label={this.state.effect_parameter_2_name}
                id='top-right-slider'
              />
            </div>
            <div className="Component-slider">
              <Slider
                onChange={ this.handleSlider_3 }
                value={ this.state.sliderValue_3 }
                radius={ 60 }
                border={ 5 }
                min={ -50 }
                max={ 50 }
                angle={ Math.PI / 4 }
                origin={ 0.5 }
                start={ 0 }
                fixedSliderValue={+this.state.sliderValue_3.toFixed(2)}
                label={this.state.effect_parameter_3_name}
              />
              <Slider
                onChange={ this.handleSlider_4 }
                value={ this.state.sliderValue_4 }
                radius={ 60 }
                border={ 5 }
                min={ -50 }
                max={ 50 }
                angle={ Math.PI / 4 }
                origin={ 0.5 }
                start={ 0 }
                fixedSliderValue={+this.state.sliderValue_4.toFixed(2)}
                label={this.state.effect_parameter_4_name}
              />
              <Slider
                onChange={ this.handleSlider_5 }
                value={ this.state.sliderValue_5 }
                radius={ 60 }
                border={ 5 }
                min={ -50 }
                max={ 50 }
                angle={ Math.PI / 4 }
                origin={ 0.5 }
                start={ 0 }
                fixedSliderValue={+this.state.sliderValue_5.toFixed(2)}
                label={this.state.effect_parameter_5_name}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EffectContainer;
