import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import ReactHtmlParser from 'react-html-parser';

import { Layout } from '../../layouts';
import { useAPI, useToolbox } from '../../services';
import { BlogsSection } from '../Home/components';

import './Blog.scss';
import { NavLink } from 'react-router-dom';

const Blog = () => {

  const history = useHistory();

  // Get id
  const { id } = useParams();

  // Services
  const { getBlog } = useAPI();
  const { screenIsMobile } = useToolbox();
  const size = screenIsMobile();

  const [ blog, setBlog ] = useState();

  const fetchBlog = useCallback(async () => {
    const data = await getBlog(id);
    if (!data.title) history.push('/not-found');
    setBlog(data);

    document.title = 'Enjoy Jobs | '+ data.title;
  }, [getBlog, id, history]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  return blog ? (
    <Layout>
      <section className="blog">
        <div className="container">
          <NavLink to="/blogs/1" className="blog__back">
            Bekijk andere blogs
          </NavLink>
        </div>
        {
          size ? (
            <img className="blog__img-full" src={blog.image} alt="blog_image" />
          ) : (
            <div className="container">
              <div className="blog__img-wrapper">
                <img className="blog__img-wrapper__img" src={blog.image} alt="blog_image" />
              </div>
            </div>
          )
        }
        <div className="container">
          <h1 className="blog__title">
            {
              ReactHtmlParser(blog.title)
            }
          </h1>
          <div className="blog__content">
            {
              ReactHtmlParser(blog.long)
            }
          </div>
        </div>
        <BlogsSection title="Bekijk andere interessante blogs" bg={true} />
      </section>
    </Layout>
  ) : '';
};

export default Blog;