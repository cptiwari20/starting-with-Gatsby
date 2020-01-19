import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby";

import Layout from "../components/layout"
import SEO from "../components/seo"

const About = () => {
    const data = useStaticQuery(graphql`
    query blogs{
        allMarkdownRemark{
          edges{
            node{
              frontmatter{
                title
                author
              }
              html
              excerpt
            }
          }
        }
      }
    `);
const allData = data.allMarkdownRemark.edges;
// const { frontmatter, html, exerpt } = [0].node;

return(
  <Layout>
    <SEO title="About Page" />
    {allData.map(post => {
    const { frontmatter, html, exerpt } = post.node;
        return <div key={post}>
            <h1>{exerpt}</h1>
            <p>{frontmatter.title} by {frontmatter.author}</p>
            {{html}}
        </div>
    })}
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)}

export default About
