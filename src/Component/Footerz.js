import React from 'react'
import { Col,Footer } from 'react-materialize'


const Footerz = () => {
  return(
    <Footer
      copyrights="Mizraim Martínez @2019"
      moreLinks={<a href="https://newsapi.org/" >  Power by <b> News API   </b> </a>}
      className="gray-text"
    >
      <Col m={4}>
        <h4 className="white-text ">
          News - ZIM
        </h4>
      </Col>
      <Col m={4} className="white-text ">
        <p className="grey-text text-lighten-4">
          <img
            src="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
            width="40"
            alt=""/>
          <a href="https://github.com/mizraim17" className="grey-text text-lighten-4"> @Mizraim17 </a>
        </p>
      </Col>
      <Col m={4} className="white-text ">
        <a href="https://newsapi.org/" className="grey-text text-lighten-4"> Power by <b> News API   </b> </a>
      </Col>
    </Footer>
  )
}

export default Footerz;