import React from 'react'
import AllNews from '../../content/pages/news/AllNews'
import newsBlogs from '../../content/pages/news/newsBlogs.js'
import './News.scss'

function News() {
  return (
    <div className='section-news' id='section-news'>
      <AllNews blogs={newsBlogs.blogs}/>
    </div>
  )
}

export default News