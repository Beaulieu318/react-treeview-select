export const mapStateToProps = (state, ownProps) => {
  return state[ownProps.id]
}
