import React, { useCallback, useEffect, useState } from 'react';
import { useAPI } from '../../../services';
import ReactHtmlParser from 'react-html-parser';

import './_BlogsSection.scss';
import { NavLink } from 'react-router-dom';

const BlogsSection = ({ title, bg }) => {
  const [ blogs, setBlogs ] = useState();

  const { getBlogs } = useAPI();

  const fetchBlogs = useCallback(async () => {
    const data = await getBlogs(1);
    setBlogs(data);
  }, [getBlogs]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <section className={`blogs-section${bg ? ' bg-tertiary' : ''}`}>
      <div className="container">
        <h1 className="blogs-section__title">{title}</h1>
        <div className="blogs-section__overview row">
          {
            blogs && blogs.map((blog, index) => {
              return index < 3 && (
                <div className={`col-lg-4 col-12 ${index === 1 ? 'd-flex' : 'd-none d-lg-flex'}`} key={index}>
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
                </div>
              )
            })
          }
        </div>
        <div className="d-flex justify-content-center blogs-section__more">
          <NavLink to="/blogs/1">
            Bekijk meer blogs
          </NavLink>
        </div>
      </div>
    </section>
  )
};

export default BlogsSection;