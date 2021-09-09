import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import { Grid, IconButton } from '@material-ui/core';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  root: {
    maxWidth: 230,
    position: 'relative',
    zIndex: 1001,
  },
  media: {
    height: 100,
  },
  close: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1001,
    background: 'white',
    width: '25px',
    height: '25px'
  }
});

type ApartmentCardProps = {
  image: string
  address: string
  area: number
  rooms_number: number
  floor: number
  floor_count: number
  rent: number
  handleClose?: () => void
}

export default function ApartmentCard(props: ApartmentCardProps) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
       <IconButton className={classes.close} aria-label="close" onClick={props.handleClose}>
        <CloseIcon />
      </IconButton>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography variant="body2" component="h2">
            {props.address}
          </Typography>
          <Grid container spacing={1}>
            <Grid item container xs={6} spacing={1} alignItems='center'>
              <Grid item xs={8}><AspectRatioIcon /></Grid>
              <Grid item xs={4}>{props.area}</Grid>
            </Grid>
            <Grid item container xs={6} spacing={1} alignItems='center'>
              <Grid item xs={8}><MeetingRoomIcon /></Grid>
              <Grid item xs={4}>{props.rooms_number}</Grid>
            </Grid>
            <Grid item container xs={6} spacing={1} alignItems='center'>
              <Grid item xs={8}><KeyboardArrowUpIcon /></Grid>
              <Grid item xs={4}>{props.floor}/{props.floor_count}</Grid>
            </Grid>
            <Grid item container xs={12} spacing={1} alignItems='center' justifyContent="center">
              <Typography variant="body2" style={{ fontWeight: 600 }}>{props.rent} $</Typography>
            </Grid>
          </Grid>
          {/* <Typography variant="body2" color="textSecondary" component="p">
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
