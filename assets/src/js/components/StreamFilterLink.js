import * as React from 'react'
import { NavLink } from 'react-router-dom'

const filterToPath = (filter: string) => `/${filter.toLowerCase()}`

export type Filter = 'all' | 'unarchived' | 'archived'

type Props = {
  filter: Filter,
  children?: React.Node,
}

const FilterLink = (props: Props) => (
  <NavLink
    to={filterToPath(props.filter)}
    className="stream-filter-link"
    activeClassName="stream-filter-link__selected"
  >
    {props.children}
  </NavLink>
)

FilterLink.defaultProps = {
  children: 'Link',
}

export default FilterLink
