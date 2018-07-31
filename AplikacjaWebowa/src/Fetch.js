import _throttle from 'lodash/throttle'
import PropTypes from 'prop-types'
import { Component } from 'react'

const jsonify = response => (response.json ? response.json() : response)

export default class Fetch extends Component {
  static propTypes = {
    args: PropTypes.object,
    children: PropTypes.func.isRequired,
    source: PropTypes.func.isRequired,
    throttle: PropTypes.bool,
    wait: PropTypes.number
  }

  static defaultProps = {
    throttle: false,
    wait: 1000
  }

  constructor(...args) {
    super(...args)

    this.state = {
      error: null,
      data: null,
      loading: true
    }

    this.hasMounted = true
    this.fetch = this.props.throttle ? _throttle(this.fetch.bind(this), this.props.wait) : this.fetch.bind(this)
  }

  componentDidMount() {
    this.fetch()
  }

  componentDidUpdate(prevProps) {
    if (this.props.source !== prevProps.source || this.props.args !== prevProps.args) {
      this.fetch()
    }

    if (this.props.throttle !== prevProps.throttle || this.props.wait !== prevProps.wait) {
      this.fetch = this.props.throttle ? _throttle(this.fetch.bind(this), this.props.wait) : this.fetch.bind(this)
    }
  }

  fetch() {
    return this.props
      .source(this.props.args)
      .then(jsonify)
      .then(this.onSuccess, this.onError)
  }

  componentWillUnmount() {
    this.hasMounted = false
  }

  onSuccess = data => {
    if (this.hasMounted) {
      if (data && data.ExceptionMessage) {
        this.setState({ error: data, data: null, loading: false })
      } else {
        this.setState({ error: null, data, loading: false })
      }
    }
  }

  onError = error => this.hasMounted && this.setState({ error, data: null, loading: false })

  render() {
    return this.props.children({ ...this.state, onRefresh: this.fetch })
  }
}
