import { connect } from 'react-redux'
import type { Connector } from 'react-redux'
import TracksProvider from '../components/TracksProvider'
import type { Props } from '../components/TracksProvider'
import { filteredTracksSelector } from '../selectors/tracks'

type OwnProps = { filter?: string }

const mapStateToProps = (state, ownProps: OwnProps) => ({
  tracks: filteredTracksSelector(state, ownProps.filter),
})

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
)

const TracksProviderContainer = connector(TracksProvider)

export default TracksProviderContainer
