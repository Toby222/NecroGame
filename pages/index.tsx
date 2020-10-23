import { Game } from "../components/Game";

import Head from "next/head";

import * as React from "react";

export default class extends React.Component {
  render() {
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="This description is TODO UmU" />
          <meta name="author" content="Toby, deciduously" />
          <link rel="icon" href="favicon.svg" />
          <link rel="stylesheet" type="text/css" href="halfmoon.css" />
          <link rel="stylesheet" type="text/css" href="necro.css" />
          {/* TODO: Replace with non-cdn version somehow */}
          <script src="https://cdn.jsdelivr.net/npm/halfmoon@1.1.0/js/halfmoon.min.js" />
          <title>NecroGame</title>
        </Head>
        <Game />
      </>
    );
  }
}
