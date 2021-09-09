import * as React from 'react'
import ReactDOM from 'react-dom';

function createOverlayElement() {
  const el = document.createElement('div');
  el.style.position = 'absolute';
  el.style.display = 'inline-block';
  el.style.width = '9999px';
  return el;
}
  
export type Props = {
  map: google.maps.Map | null
  position: { lat: number, lng: number }
  children?: React.ReactChild
}

const OverlayContainer = (props: Props) => {
  const overlay = React.useRef<google.maps.OverlayView | null>(null)
  const el = React.useRef<Element | null>(null)

  class OverlayView extends window.google.maps.OverlayView {
    position: google.maps.LatLng | null = null;
    content: any = null;
  
    constructor(props: any) {
      super();
      props.position && (this.position = props.position);
      props.content && (this.content = props.content);
    }
  
    onAdd = () => {
      if (this.content) this.getPanes().floatPane.appendChild(this.content);
    };
  
    onRemove = () => {
      console.log(this.content.parentElement)
      if (this.content?.parentElement) {
        this.content.parentElement.removeChild(this.content);
      }
    };
  
    draw = () => {
      if (this.position) {
        const divPosition = this.getProjection().fromLatLngToDivPixel(
          this.position
        );
        this.content.style.left = divPosition.x + 'px';
        this.content.style.top = divPosition.y + 'px';
      }
    };
  }
  
  React.useEffect(() => {
    return () => {
      if (overlay.current) overlay.current.setMap(null)
    }
  }, [])

  if (props.map) {
    el.current = el.current || createOverlayElement()
    overlay.current = overlay.current || new OverlayView(
      {
        position: new google.maps.LatLng(props.position.lat, props.position.lng),
        content: el.current
      }
    )
    overlay.current.setMap(props.map)
    return ReactDOM.createPortal(props.children, el.current);
  }
  return null
}

export default OverlayContainer
