import React from 'react'
import {Card ,CardTitle} from 'react-materialize'


const News= (props) => {
  return(
    <a href={props.note.url}>
      {/*{console.log('keys--->',props.note.urlToImage)}*/}
      <Card className='large'
            header={
              <CardTitle responsive="true" image={props.note.urlToImage} width="100" blue-text="true" >
                <p className="txt-tit">
                {
                  props.note.title
                }
                </p>
              </CardTitle>
            }
      >
        <p >{props.note.content}</p>
      </Card>
    </a>

  );
}

export default News