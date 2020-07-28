import * as React from 'react'

const WORDS = ['stinky', 'stinmkly', 'shtomky', 'UwU', 'OwO', 'ÙwÚ', 'ÒwÓ', 'Nya', 'plz', 'pls', 'OmO', 'UmU', 'ÓmÒ', 'ÚmÙ']

export default class extends React.Component {
  render () {
    return (
      <>
        <head>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Fira+Code' />
          <link rel='stylesheet' type='text/css' href='impact.css' />
          <title>{Math.random() > 0.5 ? 'You' : 'U'} {Math.random() > 0.5 ? 'are' : 'r'} {WORDS[Math.floor(Math.random() * 3)]}</title>
        </head>
        <p>
          Rem{Math.random() > 0.5 ? 'em' : ''}ber {Math.random() > 0.5 ? 'to' : '2'} ta{Math.random() > 0.5 ? 'ke' : 'ek'} {Math.random() > 0.5 ? 'yo' : ''}ur meds<br />
          {WORDS[Math.floor(Math.random() * WORDS.length)]}
        </p>
      </>
    )
  }
}
