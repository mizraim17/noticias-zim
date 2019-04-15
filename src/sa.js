import {Card} from "react-materialize";

<Card className='blue-grey darken-1' textClassName='white-text' title={props.note.title}>

  <img src={props.note.urlToImage} className="circle align-center" width="50" alt=""/>
  actions={[<a href='#'>This is a link</a>]}>
  <h4>  {props.note.title}</h4>
  {props.note.content}
</Card>