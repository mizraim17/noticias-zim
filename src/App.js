import React, { Component } from 'react';
import {Button, Col,  Input, Row} from 'react-materialize'
import './App.css';
import News from "./Component/News";
import Footerz from "./Component/Footerz";
import Pages from "./Component/Pages";

import Loader from 'react-loader-spinner'

class App extends Component {
  state={
    word:"",
    news:[],
    today:"",
    pages:1,
    Loading:false
  }

  probe = () => {
    console.log('--------------------------')

    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('4891f314d6264426978f471d75136fd1');

    let {news}= this.state;
    newsapi.v2.everything({
      q: "apple",
      page:2
    })
      .then(response => {

        news=response.articles;
        console.log('news --->',news )
        this.setState({news})
      });
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
      page:pages,
      sortBy:'publishedAt'
    })
    .then(response => {
      news=response.articles;

      this.setState({news})
    });

  }

  topicBybutton = (e) =>{
    this.setState({Loading:true})
    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('4891f314d6264426978f471d75136fd1');

    let {news,pages}= this.state;
    let word=e.target.name;
    console.log('word====================',word);
    console.log('e.target.name',e.target.value);

    if(word){
      newsapi.v2.everything({
        q: word,
        pageSize:50,
        page:pages,
        sortBy:'publishedAt'

      })

      .then(response => {
        news=response.articles;
        console.log('button',news)
        this.setState({news,Loading:false})
      })

      .catch((err)=>{
        console.log(err)
        this.setState({Loading:false})
      })

      this.setState({word})
      console.log('word--->',word)
    }

    else {
      this.setState({Loading:false})
    }

  }

  wordSearch= (e) => {
    this.setState({word:e.target.value})
  }
  
  newsDaily = ()=> {
    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('4891f314d6264426978f471d75136fd1');
    let {news,pages} = this.state;
    // console.log('pages---------------->',pages)

    newsapi.v2.topHeadlines({
      language:'es',
      pageSize:50,
      page:pages,
      sortBy: "publishedAt"
    })
  
    .then(response => {
      news=response.articles;
      console.log("noticias =>",news )
      this.setState({news,Loading:false})
    })

    .catch((err)=>{
      console.log(err)
    })
  }

  changePages = (e) => {

    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('4891f314d6264426978f471d75136fd1');

    let {news,pages,word}= this.state;
    console.log('pages-before====================',pages);

    console.log('eeeeeeeeeeeeeee====================',e);
    pages=e;
    this.setState({pages})
    console.log('pages-after====================',pages);
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

  componentWillMount() {
    let {today}=this.state;
    today=Date()
    if(today!==''){
      this.setState({today,Loading:true})
      // console.log('today willmount',today)
    }
  }

  componentDidMount() {
    this.newsDaily()
    // this.probe()
  }
  
  render() {
    let {news,newsToday,pages,Loading} = this.state;
    return (
      <div>

        {
          Loading ?
            <div   className="Loader">
              <Loader
                type="TailSpin"
                color="#00BFFF"
                height="400"
                width="400"
              />
            </div>

            :

           <>

          <Row className="container">
            <Col m={6}  >
              <Input
                placeholder="Keywords"
                onChange={this.wordSearch}
                />
                <br/>
              <Button onClick={this.findBySubject} icon="find_in_page"  > </Button>
            </Col>
            <Col m={6}  >
              <Button onClick={this.topicBybutton} icon="public" name="mexico"  >México</Button>
              <Button onClick={this.topicBybutton} icon="laptop_mac" name="technology"  >Tech</Button>
              <Button onClick={this.topicBybutton} icon="near_me" name="cdmx" >DF</Button>
              <Button onClick={this.topicBybutton} icon="motorcycle" name="moto" >Byker </Button>
              <Button onClick={this.topicBybutton} icon="code" name="javascript" >JS </Button>
              <Button onClick={this.topicBybutton} icon="school" name="uaeh" >UAEH </Button>
              <Button onClick={this.topicBybutton} icon="remove_red_eye" name="pachuca" >pachuca </Button>
            </Col>
          </Row>
          <Row>
            <Col m={8} offset="m2"  >
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
                <Col m={8} offset="m2">
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
        </>
       }
      </div>
    );
  }
}

export default App;
