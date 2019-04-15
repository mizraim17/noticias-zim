import React from 'react'
import {Card ,CardTitle} from 'react-materialize'


const News= (props) => {
  return(
    <Card className='large'
          header={
            <CardTitle responsive="true" image={props.note.urlToImage} width="100" blue-text="true" >
              <p className="txt-tit">
              {
                props.note.title
              }
              </p>
            </CardTitle>}
          actions={[<a href={props.note.url}>Noticia Completa</a>]}>
      <p >{props.note.content}</p>
    </Card>

  );
}

export default News