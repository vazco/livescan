import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

import { Card, Header, Text, Title } from 'native-base';
import {
  View,
} from 'react-native';

export default function MessageInformation(props) {

    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        {props.data && props.data.results.map(message =>
          <Card key={message.name}>
            {message.isOk &&
              <Fragment>
                <Header>
                  <Title>
                    {message.name}
                  </Title>
                </Header>
                <Text style={{ textAlign: 'center', marginTop: 10, marginBottom: 10}}>
                  {message.type}
                </Text>
                <Text style={{ textAlign: 'center', marginBottom: 10}}>
                  {message.url}
                </Text>
              </Fragment>
            }
          </Card>
        )}
      </View>
  );
}

MessageInformation.propTypes = {
  data: PropTypes.object
}
