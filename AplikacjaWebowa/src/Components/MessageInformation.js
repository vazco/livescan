import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

import { Header , Segment } from 'semantic-ui-react'

export default function MessageInformation(props) {

    return (
      <div className="centered_container">
        {props.data && props.data.results.map(message =>
          <Segment key={message.name} className="item" textAlign='center'>
            {message.isOk &&
              <Fragment>
                <Header as='h3'  block>
                  {message.name}
                </Header>
                <Header as='h4'>
                  {message.type}
                </Header>
                <Header as='h4'>
                  {message.url}
                </Header>
              </Fragment>
            }
          </Segment>
        )}
    </div>
  );
}

MessageInformation.propTypes = {
  data: PropTypes.object
}
