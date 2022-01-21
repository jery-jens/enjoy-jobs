import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';


import { Layout } from '../../layouts';
import { useAPI } from '../../services';

import BlogItem from './components/BlogItem';
import { Loading } from '../../components';

import './Blogs.scss';
import { NavLink } from 'react-router-dom';

const Blogs = () => {
  document.title = 'Enjoy Jobs | Blogs';

  const history = useHistory();

  // Get id
  const { page } = useParams();

  // Services
  const { getBlogs, getBlogsPagination } = useAPI();

  const [ blog, setBlog ] = useState();
  const [ pagination, setPagination ] = useState();

  const fetchBlog = useCallback(async () => {
    const data = await getBlogs(page);
    if (!data) history.push('/not-found');
    setBlog(data);
    const paginationData = await getBlogsPagination(page);
    setPagination(paginationData);
  }, [getBlogs, page, history, getBlogsPagination]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  return blog ? (
    <Layout>
      <section className="blogs">
        <div className="container">
          <h1 className="blogs__title">
            Een overzicht van alle blogs
          </h1>
          <div className="blogs__items">
            <div className="row">
              {
                blog.length !== 0 ? blog.map((item, index) => {
                  return <div key={index} className="col-lg-6 col-12"><BlogItem blog={item} /></div>
                }) : ''
              }
            </div>
          </div>
          <div className={`d-flex blogs__pagination align-items-center w-100 ${page < 2 ? 'justify-content-end' : 'justify-content-between'}`}>
            {
              page > 1 && (
                <NavLink to={`/blogs/${parseInt(page)-1}`}>
                  Vorige
                </NavLink>
              )
            }
            {
              pagination && pagination.current === pagination.total ? (
                ''
              ) : (
                <NavLink to={`/blogs/${parseInt(page)+1}`}>
                  Volgende
                </NavLink>
              )
            }
          </div>
        </div>
      </section>
    </Layout>
  ) : <Loading />;
};

export default Blogs;