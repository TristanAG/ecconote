import React from 'react'

const HashWordList = ({ hashedWords }) => (

  //i need to create a copy array and only transfer 5 results... the amount the user wants

  // componentDidMount(){
  //   console.log('hello')
  // }

  //ok, so the hashword should render with the date added, and it should also not have the box

  <div style={{marginTop: '18px'}} id='hashtag-banner'>
    {
      hashedWords.slice(0).reverse().map((hashedWord, index) => (
        <p key={index} className="hash-word">

          {hashedWord}
        </p>
      ))
    }
  </div>
)

export default HashWordList
