import React, { Component } from 'react';
import {Button, Col,  Input, Row} from 'react-materialize'
import './App.css';
import News from "./Component/News";
import Footerz from "./Component/Footerz";
import Pages from "./Component/Pages";

class App extends Component {
  state={
    word:"",
    news:[],
    today:"",
    pages:1
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
      sortBy: 'relevanwordSearchcy',
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

    let {word,news,pages}= this.state;
    newsapi.v2.everything({
      q: word,
      page:pages
    })
    .then(response => {

      news=response.articles;
      this.setState({news})
    });

  }

  topicBybutton = (e) =>{



    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('4891f314d6264426978f471d75136fd1');

    let {news,pages}= this.state;
    console.log('pages====================',pages);
    let word=e.target.name;

    if(word){
      newsapi.v2.everything({
        q: word,
        page:pages
      })

        .then(response => {
          news=response.articles;
          this.setState({news})
        });

      this.setState({word})
      console.log('word--->',word)
    }

  }

  wordSearch= (e) => {
    this.setState({word:e.target.value})
  }
  
  newsDaily = ()=> {
    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('4891f314d6264426978f471d75136fd1');
    let {news,pages} = this.state;
    console.log('pages---------------->',pages)

    newsapi.v2.topHeadlines({
      sources:'google-news',
      sortBy: 'publishedAt',
    })
  
    .then(response => {
      news=response.articles;
      this.setState({news})
    })

      .catch((err)=>{
        console.log(err)
      })
  }
  
  componentWillMount() {
    let {today}=this.state;
    today=Date()
    if(today!==''){
      this.setState({today})
      console.log('today willmount',today)
    }
  }

  changePages = (e) => {

    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('4891f314d6264426978f471d75136fd1');

    let {news,pages,word}= this.state;
    console.log('pages====================',pages);

    this.setState({pages:e})

    newsapi.v2.everything({
      q: word,
      page:pages
    })

    .then(response => {
      news=response.articles;
      this.setState({news})
    })

    .catch((err)=>{
      console.log(err)
    })

  }


  componentDidMount() {
    this.newsDaily()
  }
  
  render() {
    let {news,newsToday,pages} = this.state;
    return (
      <div>
        <Row>
          <Col m={6}  >
            <Input
              placeholder="Keywords"
              onChange={this.wordSearch}
              />
              <br/>
            <Button onClick={this.findBySubject} icon="find_in_page"  >Search</Button>
          </Col>
          <Col m={6}  >
            <Button onClick={this.topicBybutton} icon="laptop_mac" name="technology"  >Tech</Button>
            <Button onClick={this.topicBybutton} icon="near_me" name="cdmx" >DF</Button>
            <Button onClick={this.topicBybutton} icon="motorcycle" name="motorcycle " >Byker </Button>
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
                        no={i}
                      />
                    )
                  })
                }
              </Col>
            </Row>
            :
            ''
        }
        <Pages
          clic={this.changePages}
          page={pages}
        />
      <Footerz
      />
      </div>
    );
  }
}

export default App;
