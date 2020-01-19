const path = require('path');

// create a node field
module.exports.onCreateNode = ({node, actions}) => {
    const { createNodeField } = actions;
    if(node.internal.type === 'MarkdownRemark'){
        const slug = path.basename(node.fileAbsolutePath, '.md');
        createNodeField({
            node,
            name: 'slug',
            value: slug
        });
    }
}

// create pages based on markdown file name
module.exports.createPages = async ({graphql, actions}) => {
    const { createPage } = actions;
    const blogPostTemplate = path.resolve('./src/template/blog.js');
    const res = await graphql(`
    query {
        allMarkdownRemark{
            edges{
                node{
                    fields {
                        slug
                    }
                }
            }
        }
    }`
    );

      res.data.allMarkdownRemark.edges.forEach(edge => {
          createPage({
              path: `/blog/${edge.node.fields.slug}`,
              component: blogPostTemplate,
              context: {
                  slug: edge.node.fields.slug
              }
          })
      });
}
