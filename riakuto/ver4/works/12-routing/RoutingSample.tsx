import type { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from 'components/templates/Home';
import About from 'components/templates/About';
import StaffProfile from 'components/templates/StaffProfile';
import { PostList, Post } from 'features/blog';

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="about" element={<About />} />
      <Route path="staff">
        <Route path=":id" element={<StaffProfile />} />
      </Route>
      <Route path="blog">
        <Route path="" element={<PostList />} />
        <Route path="post/*" element={<Post />} />
      </Route>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
