import React from "react";

import Head from "next/head";

import { Game } from "src/components/Game";

export default class NecroGame extends React.Component {
  render() {
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="This description is TODO UmU" />
          <meta name="author" content="Toby, deciduously" />
          <meta name="theme-color" content="#25282C" />

          <link rel="icon" href="favicon.svg" />
          <link rel="preload" href="/fonts/DaddyTimeMonoNerd.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
          <title>NecroGame</title>
        </Head>
        <Game />
      </>
    );
  }
}
