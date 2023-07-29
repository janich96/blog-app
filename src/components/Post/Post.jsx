import React from 'react';
import './Post.css';

function Post({ arr }) {
  if (arr) {
    return (
      arr.map(item => {
        return (
          <article className='post'>
            <img 
              className='post__img' 
              src={item.img} 
              srcSet={item.img_2x} 
              alt='post avatar' 
            />
            <p className='post__tag'>{item.tags}</p>
            <p className='post__title'>{item.title}</p>
            <p className='post__author'>{item.autor}</p>
            <p className='post__date'>{item.date}</p>
            <p className='post__views'>{item.views} views</p>
            <p className='post__text'>{item.text}</p>
          </article>
        )
      })
    )
  }
}

export default Post;