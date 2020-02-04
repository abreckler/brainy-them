import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../withRoot'
import Layout from '../components/layout/index'
import BoardItem from '../components/board/boardItem'
import { graphql } from 'gatsby'

const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
    index: {
        margin: '0 auto',
    },
})

class Index extends React.Component {
    render() {
        const { classes, data: { allBoards, allPosts } } = this.props
        const { currentPage } = this.props.pageContext
        return (
            <Layout title="Boards">
                <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '1760px', margin: '0 auto' }}>
                    {
                        allBoards.edges.map(item => {
                            let postsInfo = item.node.posts
                            return <BoardItem data={{ postsInfo, ...item }} />
                        })
                    }
                </div>

            </Layout>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(Index))

export const query = graphql`
   query {
    allPosts {
        edges {
          node {
            name
            slug
          }
        }
    }
    allBoards {
      edges {
        node {
          slug
          created_time
          cover_image
          source_url
          name
          tags
        }
      }
    }
  }
`
