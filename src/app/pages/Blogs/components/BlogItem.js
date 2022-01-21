import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { NavLink } from 'react-router-dom';

const BlogItem = ({ blog }) => {
  return (
    <div className="blogs-section__overview--item">
      <div className="blogs-section__overview--item__img">
        <img src={blog.image} alt={`blog-image_${blog.id}`} />
      </div>
      <div className="blogs-section__overview--item__wrapper">
        <a className="blogs-section__overview--item__title" href={`/blog/${blog.id}`}>
          <h5>
            {
              ReactHtmlParser(blog.title)
            }
          </h5>
        </a>
        {
          ReactHtmlParser(blog.short)
        }
        <NavLink className="blogs-section__overview--item__more" to={`/blog/${blog.id}`}>
          Lees meer...
        </NavLink>
      </div>
    </div>
  );
};

export default BlogItem;
