import React, { Component } from 'react';
import {Button, Col,  Input, Row} from 'react-materialize'
import './App.css';
import News from "./Component/News";

class App extends Component {
  state={
    word:"",
    news:[],
    today:""
  }
  
  consumirAPi = () => {
    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('4891f314d6264426978f471d75136fd1');
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
    newsapi.v2.topHeadlines({
      // sources: 'bbc-news',
       q: 'economia',
      //  category: 'business',
        language: 'es',
      // country: 'mx'
    }).then(response => {
      console.log('germany',response)
      /*
        {
          status: "ok",
          articles: [...]
        }
      */
    });
// To query /v2/everything
// You must include at least one q, source, or domain
    newsapi.v2.everything({
      q: 'bitcoin',
      sources: 'bbc-news,the-verge',
      domains: 'bbc.co.uk, techcrunch.com',
      from: '2019-04-20',
      to: '2019-02-20',
      language: 'en',
      sortBy: 'relevancy',
      page: 2
    })
      .then(response => {
        console.log(response);

      });
// To query sources
// All options are optional
    newsapi.v2.sources({
      category: 'technology',
      language: 'en',
      country: 'us'
    }).then(response => {
      console.log(response);
      
    });
  }

  findBySubject = () =>{
    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('4891f314d6264426978f471d75136fd1');

    let {word,news}= this.state;
    newsapi.v2.everything({
      q: word
    })
      .then(response => {
        console.log(response);
        news=response.articles;
        this.setState({news})
      });
  }

  wordSearch= (e) => {
    this.setState({word:e.target.value})
  }
  
  newsDay = ()=> {
    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('4891f314d6264426978f471d75136fd1');
    let {newsToday} = this.state;
    
    newsapi.v2.everything({
    q:'tecnología',
    language: 'es',
    sortBy: 'publishedAt',
    page: 3
  })
  
  .then(response => {
    console.log('response-----',response);
    newsToday=response.articles;
    this.setState({newsToday})
  });
}
  
  componentWillMount() {
    let {today}=this.state;
    today=Date()
    if(today!==''){
      this.setState({today})
      console.log('today willmount',today)
    }
  }
 
  componentDidMount() {
    this.newsDay()
  }
  
  render() {
    let {news,newsToday} = this.state;
    return (
      <div>
        <Row>
          <Col m={9}>
            <Input
              placeholder="Search News"
              onChange={this.wordSearch}
              />
              <br/>
            <Button onClick={this.findBySubject} icon="find_in_page"  >consumir</Button>
          </Col>
        </Row>
        <Row>
          <Col m={9}>
            {
              news.map((el,i)=>{
                return(
                  <News
                    note={el}
                    key={i}
                  />
                )
              })
            }
          </Col>
        </Row>
        {
          newsToday?
            <Row>
              <Col m={9}>
                {
                  newsToday.map((el,i)=>{
                    return(
                      <News
                        note={el}
                        key={i}
                      />
                    )
                  })
                }
              </Col>
            </Row>
            :
            ''
        }
       
      </div>
    );
  }
}

export default App;
