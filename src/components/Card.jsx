import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import "./card.css"
import { useNavigate } from 'react-router-dom';
export default function MultiActionAreaCard({btn,title,content,path}) {
    const navigate=useNavigate()
  return (
    <Card sx={{ maxWidth: 345 , textAlign:"center", backgroundColor:"#F5EFE7"}}>
      <CardActionArea>
        <CardContent className='cardcontent'>
            <h2>{title}</h2>
            <p>{content}</p>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained"  sx={{margin:" 1vh auto", backgroundColor:"#3E5879"}} onClick={()=>navigate(`/${path}`)}> 
          {btn}
        </Button>
      </CardActions>
    </Card>
  );
}