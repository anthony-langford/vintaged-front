import React from 'react'
import PropTypes from 'prop-types'

// Import components
import ProductCard from './ProductCard'

export default function ProductCardsList({
  wines,
  sortBy,
  sortDirection,
  filters
}) {
  // Filter by store-specific inventory data if possible
  let filteredWines = wines.slice(0, 20);

  // Iterate through filters and filter if any are selected
  for (const key in filters) {
    if (filters[key].length > 0) {
      filteredWines = filteredWines.filter(wine => {
        return filters[key].indexOf(wine[key]) > -1
      })
    }
  }

  // Sort wines by selected sorting method
  if (sortDirection === 'ascending') {
    filteredWines.sort((a, b) => (a[sortBy] >= b[sortBy]) ? 1 : -1);
  } else {
    filteredWines.sort((a, b) => (a[sortBy] < b[sortBy]) ? 1 : -1);
  }

  return (
    <div
      label="ProductCardsList"
      css={`
        display: flex;
        flex-flow: row wrap;
      `}
    >
      { filteredWines.map(wine => <ProductCard wine={wine} key={wine.id}/>)}
    </div>
  )
}

// Static type checking for props
ProductCardsList.propTypes = {
  wines: PropTypes.array.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  filters: PropTypes.object
}
