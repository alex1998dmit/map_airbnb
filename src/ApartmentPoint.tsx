import { makeStyles } from "@material-ui/styles"

type ApartmentPonitProps = {
  price: number
  onClick: () => void
}

const styles = makeStyles({
  root:{
    background: 'white',
    borderRadius: '12px',
    padding: '8px',
    width: '60px',
    zIndex: 1000,
    position: 'relative'
    // border: 'none'
  }
})

const ApartmentPoint = (props: ApartmentPonitProps) => {
  const classes = styles()
  return (
    <div className={classes.root} onClick={props.onClick}>
      {props.price} $
    </div>
  )
}

export default ApartmentPoint
