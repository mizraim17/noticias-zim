import React from 'react';
import {Pagination,Row,Col} from 'react-materialize'

const  Pages= (props) => {
  return(
    <Row>
      {/*{console.log('props--------',props)}*/}
      <Col m={6} offset="m4">
        <Pagination
          activePage={1}
          maxButtons={8}
          onSelect={props.clic}
        />
      </Col>
    </Row>
  )
}

export default Pages