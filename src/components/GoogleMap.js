import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './GoogleMap.css'
import PropTypes from 'prop-types';

const AnyReactComponent = ({ center, lat, lng, text }) => (
  <div
    className="mark-circle"
    style={{
      backgroundColor:
        center[0] === Number(lat) && center[1] === Number(lng)
          ? "blue"
          : "green",
    }}
  >
    {text}
  </div>
);
 
class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.MapApi = {}
    this.map = null
    this.polygonOptions = {}
    this.polygon = null
  }
  static defaultProps = {
    defaultCenter: {
      lat: 30.67,
      lng: 104.06,
    },
    zoom: 11,
  };
  
  static propTypes = {
    zoom: PropTypes.number,
    defaultCenter: PropTypes.object,
    center: PropTypes.array,
    places: PropTypes.array,
    updateCenter: PropTypes.func,
    updatePlaces: PropTypes.func
  }
  
  handleClick = ({ x, y, lat, lng, event }) => {
    const place = {lat: lat.toFixed(3), lng: lng.toFixed(3)}
    this.props.updateCenter([Number(lat.toFixed(3)), Number(lng.toFixed(3))])
    this.props.updatePlaces(1, place)
  };

  onMouseDown = (e) => {
    if(e.button === 2) {
      e.preventDefault()
      if(this.polygon) {
        this.polygon.setMap(null)
        this.polygon = null
      }
      debugger
      this.createPolygon()
      this.props.updatePlaces()
    }
  }
  
  // 可根据的一系列 markers 在地图上生成一个 polygon
  createPolygon = () => {
      const path = []
      this.props.places.forEach((p, i) => {
        path.push(new this.MapApi.LatLng(Number(p.lat), Number(p.lng)))
      })
      // 多边形参数
      const polygonOptions = {
        paths: path,
        fillColor: "#FF8C00", // 填充色
        fillOpacity: 0.3, // 填充色透明度
        strokeColor: "#f00", // 线条颜色 黑色
        strokeOpacity: 0.7, // 透明度 70%
        strokeWeight: 0 // 宽度 5像素
      };
      this.polygonOptions = {...polygonOptions}
      const polygon1 = new this.MapApi.Polygon(polygonOptions);
      polygon1.setMap(this.map); // 设置显示到map上
      console.log(this.map)
      this.polygon = polygon1
  }
  
  // 改变刚刚生成的 polygon 的 fill color
  onClick = () => {
    if (this.polygon) {
      this.polygon.setMap(null)
      this.polygon = null
      const polygonOptions = {
        ...this.polygonOptions,
        fillColor: "#00FF7F",
      }
      const polygon2 = new this.MapApi.Polygon(polygonOptions)
      polygon2.setMap(this.map);
      this.polygon = polygon2
    } else {
      return false
    }
  }
   
  handleApiLoaded = (map, maps) => {
    this.map = map
    this.MapApi = maps
  }
  
  render() {
    return (
      <div style={{ height: "70vh", width: "70%", position: 'relative' }} onMouseDown={this.onMouseDown}>
        <button 
          className="button"
          onClick={this.onClick}
        >点我</button>
        <GoogleMapReact
          center={this.props.center}
          defaultCenter={this.props.defaultCenter}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded = {({map, maps}) =>  this.handleApiLoaded(map, maps)}
          onClick={this.handleClick}
        >
          {this.props.places.map((p, index) => {
            return (
              <AnyReactComponent
                center={this.props.center}
                key ={index.toString()}
                lat={p.lat}
                lng={p.lng}
                text={`M${index}`}
                p={p}
              />
            )
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap