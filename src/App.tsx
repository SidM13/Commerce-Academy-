import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';

const Courses = lazy(() => import('./pages/Courses'));
const Subjects = lazy(() => import('./pages/Subjects'));
const About = lazy(() => import('./pages/About'));
const DirectorLibrary = lazy(() => import('./pages/DirectorLibrary'));
const VisionMission = lazy(() => import('./pages/VisionMission'));
const Enquiry = lazy(() => import('./pages/Enquiry'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Privacy })));
const Terms = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Terms })));
const NotFound = lazy(() => import('./pages/Legal').then((m) => ({ default: m.NotFound })));

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="about" element={<About />} />
          <Route path="director-library" element={<DirectorLibrary />} />
          <Route path="vision-mission" element={<VisionMission />} />
          <Route path="enquiry" element={<Enquiry />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
