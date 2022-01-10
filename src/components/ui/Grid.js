import { useEffect, useState, useMemo, useCallback } from 'react'
import { useTable } from 'react-table'
import API from '../../services/API'
import { isBlank, isEmpty, isNull } from '../../utils/helpers'
import Input from './Input'

const Grid = props => {

  let { 
    url, 
    sortable=true,
    filterable=true,
    defaultSort=[], 
    cols=[], 
    pageSize,
    searchPlaceholder='Search...'
  } = props

  // grid states
  const [state, setState] = useState([])
  const [c, setColumns] = useState([])
  const [sort, setSort] = useState(defaultSort)
  const [filters, setFilters] = useState([])
  const [page, setPage] = useState(1)
  const [limit] = useState(pageSize)
  const [count] = useState()
  const [pagerInfo, setPagerInfo] = useState()
  const [loading, setLoading] = useState(false)

  // memorize grid data
  const data = useMemo(() => state, [state])

  // memorize grid columns
  const columns = useMemo(() => c, [c])

  // useTable properties
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data, manualSortBy: true, manualFilters: true, manualPagination: true })

  const handleOnSortChange = column => {
    if (!column.sortable) return

    let dir = isNull(column.sortDirection) || column.sortDirection === 'desc' ? 'asc' : 'desc'
    setSort({ dir: dir, field: column.id })
  }

  const handleOnFilterChange = filterValue => {
    let filter = { logic: 'or', filters: [] }

    if (!isBlank(filterValue)) {
      for (let column of columns) {
        if (!column.filterable || isBlank(filterValue)) {
          continue
        }
  
        if (column.type === 'string') {
          filter.filters.push({ field: column.property, operator: column.operator || 'contains', value: filterValue })
        } else if (column.type === 'number') {
          filter.filters.push({ field: column.property, operator: column.operator || 'eq', value: filterValue })
        }
      }
    }
    
    setPage(1)
    setFilters(!isEmpty(filter.filters) ? [filter] : [])
  }

  const hasNext = useCallback(() => !isEmpty(data) && data.length === limit, [data, limit])()
  const hasPrevious = useCallback(() => page > 1, [page])()

  const getQueryParameters = useCallback(() => {
    let qs = {}

    if (!isEmpty(sort)) {
      qs.sort = JSON.stringify(sort instanceof Array ? sort : [sort])
    }

    if (!isEmpty(filters)) {
      qs.filters = JSON.stringify(filters instanceof Array ? filters : [filters])
    }

    if (limit) {
      qs.limit = limit
    
      if (page) {
        qs.offset = (page - 1) * limit
      }
    }

    return qs
  }, [sort, page, limit, filters])

  const fetchData = useCallback(async () => {
    let qs = getQueryParameters()

    setLoading(true)
    API.get(url, { qs: qs }).then(data => {
      // update grid data state
      setState(data)
      
      if (qs.limit) {
        // update grid pager state
        if (data.length === 0) {
          setPagerInfo('0 items')
          return
        }
        
        let text = data.length > 1 ? 'items' : 'item'
        setPagerInfo(
          `${qs.offset + 1} 
           ${qs.offset +  data.length === qs.offset + 1 ? '' : data.length > 0 ? `- ${qs.offset +  data.length}` : ''} 
           ${count > 0 ? 'of ' + count : ''} ${text}`
         )
      }
    }).then(() => setLoading(false))
  }, [url, getQueryParameters]) // eslint-disable-line

  // fetch grid data
  useEffect(() => fetchData(), [fetchData])

  // translate given grid columns
  useEffect(() => {
    let columnsState = cols.map(col => ({ 
      ...col,
      header: col.title, 
      accessor: col.property,
      type: col.type || 'string',
      sortable: sortable ? !isNull(col.sortable) ? col.sortable : true : false,
      filterable: filterable ? !isNull(col.filterable) ? col.filterable : true : false,
      sortDirection: sort.field === col.property ? sort.dir : null,
      operator: col.operator
    }))
    // update columns state
    setColumns(columnsState)
  }, [cols, sort, sortable, filterable])

  return (
    <div className='ui-grid' data-loading={loading}>
      { 
        loading && ( 
          <div className='loader'>
            <i className='fas fa-circle-notch fa-spin' />
          </div>
        )
      }
      { 
        filterable && 
          <div data-filterable>
            <Input placeholder={searchPlaceholder} onchange={(property, value) => handleOnFilterChange(value)} />
          </div> 
      }
      <table {...getTableProps()}>
        <thead>
          {
            headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} >
                {
                  headerGroup.headers.map((column, key) => (
                    <th {...column.getHeaderProps({ style: { width: column.width, minWidth: column.minWidth } })} key={key}>
                      <div onClick={() => handleOnSortChange(column)} data-sortable={column.sortable}>
                        <span>{ column.render('header') }</span>
                        {
                          (column.sortable && column.sortDirection) && (
                            <span className={`sort-arrow ${column.sortDirection}`}>
                              {
                                column.sortDirection === 'asc' ? (
                                  <i className='fas fa-sort-up' />
                                ) : column.sortDirection === 'desc' ? (
                                  <i className='fas fa-sort-down' />
                                ) : null
                              }
                            </span>
                          )
                        }
                      </div>
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {
                    row.cells.map((cell, key) => {
                      return (
                        <td key={key}>
                          { cell.render('Cell') }
                        </td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {
        limit && (
          <div className='ui-grid-footer'>
            <div className='ui-grid-pagination'>
              <button onClick={() => setPage(1)} disabled={!hasPrevious} title='Go to the first page'>
                <i className='fas fa-step-backward' />
              </button>
    
              <button onClick={() => setPage(page - 1)} disabled={!hasPrevious} title='Go to the previous page'>
                <span>Previous</span>
              </button>
              
              <div className='page'>
                <span>{page}</span>
              </div>
    
              <button onClick={() => setPage(page + 1)} disabled={!hasNext} title='Go to the next page'>
                <span>Next</span>
              </button>
    
              { 
                count > 0 && 
                  <button onClick={() => setPage(Math.ceil(count / limit))} disabled={!hasNext} title='Go to the last page'>
                    <i className='fas fa-step-forward' />
                  </button>
              }
            </div>
            <div className='pager-info'>{pagerInfo}</div>
          </div>
        )
      }
    </div>
  )
}

export default Grid
