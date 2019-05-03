import React from 'react'
import {Card ,CardTitle} from 'react-materialize'
import Moment from 'react-moment'

const News= (props) => {
  return(
    <>
      {
        props.note.urlToImage ?
          <a href={props.note.url}>
            {/*{console.log('keys--->',props.note.urlToImage)}*/}
            <Card className='large txt-news'
                  header={
                    <CardTitle responsive="true" image={props.note.urlToImage} width="100" blue-text="true">
                      <p className="txt-tit">
                        {
                          props.note.title
                        }
                      </p>
                    </CardTitle>
                  }
                  actions={
                    [
                      <Moment fromNow className="txt-comment">
                        {props.note.publishedAt}
                      </Moment>
                    ]
                  }
            >

              <p >{props.note.content}</p>
            </Card>
          </a>

          : ''
      }
    </>


  );
}

export default News