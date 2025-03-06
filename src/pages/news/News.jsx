import React from 'react'
import AllNews from '../../content/pages/news/AllNews'
import newsBlogs from '../../content/pages/news/newsBlogs.js'
import './News.scss'

function News() {
  return (
    <div className='section-news' id='section-news'>
      <div className='section-news-header'>
        <h1>News</h1>
        <p>I am Anuka Kipshidze (ანუკა ყიფშიძე), a musician, producer, sound designer, and multi-instrumentalist from Tbilisi, Georgia.</p>
      </div>
      <AllNews blogs={newsBlogs.blogs}/>
    </div>
  )
}

export default News