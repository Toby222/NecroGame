import * as React from "react";

import Document, { Html, Head, Main, NextScript } from "next/document";

// Custom document for data-set-preferred-theme-onload
// Otherwise standard
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="auto-scaling-disabled">
        <Head />
        <body data-set-preferred-theme-onload="true">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
