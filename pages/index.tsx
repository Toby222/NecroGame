import { Model } from "../components/model";

import Head from "next/head";

import * as React from "react";

export default class extends React.Component {
  render() {
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="description" content="Survive the crash!" />
          <meta name="author" content="Toby, deciduously" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Fira+Code"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="halfmoon-variables.css"
          />
          <link rel="icon" href="favicon.svg" />
          <link rel="stylesheet" type="text/css" href="necro.css" />
          <script src="https://cdn.jsdelivr.net/gh/halfmoonui/halfmoon@1.0.4/js/halfmoon.min.js" />
          <title>NecroGame</title>
        </Head>
        <Model />
      </>
    );
  }
}
