import React, { Component } from 'react';

import Fetch from '../Fetch.js'
import fetchMessages from '../utils/fetchMessages'
import MessageInformation from './MessageInformation'

export default class MessageListing extends Component {
  render() {
    return (
      <div>
        <Fetch
          source={fetchMessages}
        >
          {props =>
            <MessageInformation {...props} />
            }
        </Fetch>
      </div>
    );
  }
}
