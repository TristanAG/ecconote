import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Moment from 'moment'
import MediaQuery from 'react-responsive'
import About from './components/About'
import HomepageHeader from './components/HomepageHeader'
import NoteForm from './components/NoteForm'
import Note from './components/Note'
import HashWordList from './components/HashWordList'
import './css/normalize.css';
import './css/skeleton.css';
import './css/style.css';

class App extends React.Component {
  constructor(props){
    super(props)
    this.addHashWord = this.addHashWord.bind(this)
    this.addNote = this.addNote.bind(this)
    this.state = {
      notes: [
        {
          id: 0,
          content: `where are you going playstation ultra 64 infinite reverie vaporwave dreamcast 1999 aol snick new game nintendo vhs everything will be ok sleeping in aesthetic you've got mail remember summer days lost cartridge nightdrive the future is now vcr where am i meme powerglove regular scheduled programming mallsoft relax satisfaction guaranteed crystal pepsi im dreaming `,
          tags: [
            '#pepsi',
            '#crystal',
            '#playstation'
          ]
        }
      ],
      hashedWords: [
        '#pepsi',
        '#crystal',
        '#playstation'
      ]
    }
  }

  addNote(note, hashWords){
    this.setState((prevState) => ({
      notes: prevState.notes.concat({
        id: Math.random(),
        date: Moment(Date.now()).format('MMM Do, h:mm a'),
        content: note,
        tags: hashWords
      })
    }))
  }

  addHashWord(hashWord) {
    console.log('in add hashWord', hashWord)
    this.setState((prevState) => ({
      hashedWords: prevState.hashedWords.concat(hashWord)
    }))
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <HomepageHeader/>
              <div className='container' style={{marginTop: '23px'}}>
                <h4>e c c o  n o t e</h4>
                <h6><i>write notes with #tags</i></h6>
                <div id="main-nav">
                  <Link to="/" className="page-link">new</Link>
                  <Link to="/history" className="page-link">history</Link>
                  <Link to="/about" className="page-link">about</Link>
                </div>
              </div>
              <div className="container" style={{ marginTop: "15px"}}>

                <MediaQuery maxWidth={550}>
                  <div className="row" id="hashed-word-list-mobile">
                    <HashWordList hashedWords={this.state.hashedWords} />
                  </div>
                </MediaQuery>

                <div className="row">
                  <div className="columns eight">
                    {/* <NoteForm addHashWord={this.addHashWord} addNote={this.addNote}/> */}
                    <Route exact path={process.env.PUBLIC_URL + '/'} render={() => (
                      <NoteForm addHashWord={this.addHashWord} addNote={this.addNote} />
                    )}
                    />
                    <Route exact path={process.env.PUBLIC_URL + '/history'} render={() => (
                      <Note notes={this.state.notes} />
                    )} />
                    <Route exact path={process.env.PUBLIC_URL + '/about'} component={About} />
                  </div>
                  <MediaQuery minWidth={550}>
                    <div className="columns four" id="hashed-word-list-full">
                      <HashWordList hashedWords={this.state.hashedWords} />
                    </div>
                  </MediaQuery>
                </div>
              </div>
            </div>
        </BrowserRouter>
      </div>
    )
  }
}


export default App;
