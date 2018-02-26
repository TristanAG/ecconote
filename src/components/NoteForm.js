import React from 'react'
import { Redirect } from 'react-router-dom'

class NoteForm extends React.Component {
  constructor(props){
    super(props)
    this.getKey = this.getKey.bind(this)
    this.startAddHashWord = this.startAddHashWord.bind(this)
    this.startAddNote = this.startAddNote.bind(this)
    this.checkNote = this.checkNote.bind(this)
    this.hashWord = ''
    this.recording = false

    this.state = {
      newHashWord: '',
      hashWords: [],
      toHistory: false,
      active: false
    }
  }

  startAddHashWord(hashWord) {
    this.props.addHashWord(hashWord)
    this.setState((prevState) => ({
      hashWords: prevState.hashWords.concat(hashWord)
    }))
  }

  startAddNote(e) {
    e.preventDefault()
    const note = e.target.elements.note.value;
    this.props.addNote(note, this.state.hashWords)
    e.target.elements.note.value = ''
    this.setState((prevState) => ({
      hashWords: [],
      toHistory: true
    }))
  }

  checkNote(e){
    if(e.target.value.length >= 1){
      this.setState(() => ({
        active: true
      }))
    }else{
      this.setState(() => ({
        active: false
      }))
    }
  }

  getKey(e) {
    const key = e.key
    const validCharacter = /^[a-zA-Z0-9_.-]{1}$/.test(key)

    if(this.recording && validCharacter){
      this.hashWord += key
    }

    if(this.recording && !validCharacter){
      this.recording = false
      this.startAddHashWord('#'.concat(this.hashWord))
      this.hashWord = ''
    }

    if(key === '#' && !this.recording){
      this.recording = true
    }
  }

  render() {
    if(this.state.toHistory === true){
      return <Redirect to={process.env.PUBLIC_URL + '/history'} />
    }

    return (
      <div>
        <form onSubmit={this.startAddNote}>
          <textarea
            name="note"
            onKeyPress={this.getKey}
            onKeyUp={this.checkNote}
            placeholder="use #tags while you write so #ecconote can be helpful"
          />
          <br />
          {this.state.active && <button type="submit">save note</button>}
        </form>
      </div>
    )
  }
}

export default NoteForm
