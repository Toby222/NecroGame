import { Model } from '../components/model'

import Head from 'next/head'

import * as React from 'react'

export default class extends React.Component {
  render() {
    return (
      <>
        <Head>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <meta name='description' content='Survive the crash!' />
          <meta name='author' content='Toby, deciduously' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Fira+Code' />
          <link rel='stylesheet' type='text/css' href='impact.css' />
          <title>IMPACT</title>
          {process.env.NODE_ENV === 'production'
            ? <script type='text/javascript'>{'(function(e,r,n,t,s){var a=[];e[s]=function(){a.push(arguments)};e[s].queue=a;  var o=[];var i=[];var c=true;var p=void 0;if(window.PerformanceObserver&&  window.PerformanceObserver.supportedEntryTypes&&(  PerformanceObserver.supportedEntryTypes.indexOf("longtask")>=0||  PerformanceObserver.supportedEntryTypes.indexOf("element")>=0)){  p=new PerformanceObserver(function(e){e.getEntries().forEach(function(e){  switch(e.entryType){case"element":i.push(e);break;case"longtask":o.push(e);break;  default:break}})});p.observe({entryTypes:["longtask","element"]})}e[s+"lt"]={  longTasks:o,timingElements:i,inPageLoad:c,observer:p};if(t){var u=r.createElement(n);  u.async=1;u.src=t;var f=r.getElementsByTagName(n)[0];f.parentNode.insertBefore(u,f)}})(window,document,"script","//cdn.sematext.com/rum.js","strum");window.strum(\'config\', { token: \'' + process.env.LOGS_TOKEN + '\', \'receiverUrl\': \'https://rum-receiver.eu.sematext.com\' });'}</script>
            : <></>}
        </Head>
        <Model/>
      </>
    )
  }
}
