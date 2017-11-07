import React from 'react';
import DataSelectField from '../components/DataSelectField'
import ApiTiles from '../components/ApiTiles'
import ConnectionTiles from '../components/ConnectionTiles'

class ApiContainer extends React.Component {

  showSettings (event) {
    event.preventDefault();
  }

  constructor(props) {
    super(props);
    this.state = {
      endpoint_keys: ['', '', '', '', ''],
      endpoint_values: ['', '', '', '', ''],
      parameterConnection: ['', '', '', '', ''],
      selectedApiUrl: '',
      fetchError: false,
      loading: false
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.getActiveApi = this.getActiveApi.bind(this);
    this.fetchStockData = this.fetchStockData.bind(this);
    this.fetchWeatherData = this.fetchWeatherData.bind(this);
  }

  fetchStockData(apiUrlString) {
    this.setState({ loading: true })
    fetch(apiUrlString)
    .then(response => response.json())
    .then(body => {
      var endpoint_keys = ['open', 'high', 'low', 'close', 'volume'];
      var last_refreshed = Object.values(body)[0]["3. Last Refreshed"];
      var stock_history = Object.values(body)[1];
      var current_stock_value = Object.values(stock_history)[1];
      this.setState({
        endpoint_keys: endpoint_keys,
        endpoint_values: Object.values(current_stock_value)
      })
    })
  }

  fetchWeatherData(apiUrlString) {
    this.setState({ loading: true })
    fetch(apiUrlString)
    .then(response => response.json())
    .then(body => {
      var endpoint_keys = ['conditions', 'fahrenheit', 'humidity', 'cloudiness', 'wind speed'];
      var endpoint_values = this.state.endpoint_values;
      endpoint_values[0] = (body.weather[0].main);
      endpoint_values[1] = (((Math.round(body.main.temp) - 273) + 32).toFixed(0)+'°F');
      endpoint_values[2] = ((body.main.humidity)+'%');
      endpoint_values[3] = ((body.clouds.all)+'%');
      endpoint_values[4] = ((body.wind.speed)+'m/s');
      this.setState({
        endpoint_keys: endpoint_keys,
        endpoint_values: endpoint_values
      })
    })
  }

  handleSelect(selectedItem) {
    if(typeof(selectedItem)!="string") {
      selectedItem = selectedItem.target.value
    }
    fetch(`/api/v1/users/${this.props.currentUser.handle}/products/${this.props.currentUser.current_product_name}`, {
      credentials: "same-origin",
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ active_api: selectedItem })
    })
    if(selectedItem === "real-time-stock-data") {
      let selectedApiUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=L2S772FW0QB5CQM0"
      this.setState({ selectedApiUrl: selectedItem })
      this.fetchStockData(selectedApiUrl);
    } else if (selectedItem === "weather") {

      let selectedApiUrl = "http://api.openweathermap.org/data/2.5/weather?q=Boston,us&appid=aa3957e7e64baafee029f61847cde20c"
      this.setState({ selectedApiUrl: selectedItem })
      console.log('set selectedApiUrl state to ' + selectedItem);
      this.fetchWeatherData(selectedApiUrl);
    }
  }

  getActiveApi(nextUser) {
    fetch(`/api/v1/users/${nextUser.handle}/products/${nextUser.current_product_name}`)
    .then(response => response.json())
    .then(body => {
      this.setState({
        active_api: body.active_api
      })
      this.handleSelect(body.active_api);
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.currentUser != this.props.currentUser) {
      this.getActiveApi(nextProps.currentUser);
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className='container-info'>
          <div>
            <i className="fa fa-database fa-2x" id="box-icon" aria-hidden="true"></i>
            <div className='container-title'>Data | </div>
            <div className='container-search'>
              <i className="fa fa-power-off fa-2x" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <DataSelectField
          value={this.state.selectedApiUrl}
          handleSelect={this.handleSelect}
        />
        <ApiTiles
          className='api-list'
          keys={this.state.endpoint_keys}
          values={this.state.endpoint_values}
        />
        <ConnectionTiles
          className='connection-tile-list'
          connections={this.state.parameterConnection}
        />
      </div>
    )
  }
}

export default ApiContainer;
