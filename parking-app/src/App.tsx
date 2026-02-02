import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Pricing } from './pages/Pricing';
import { Contact } from './pages/Contact';
import { Location } from './pages/Location';
import { ClientPanel } from './pages/ClientPanel';
import { Offer } from './pages/Offer';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cennik" element={<Pricing />} />
          <Route path="oferta" element={<Offer />} />
          <Route path="kontakt" element={<Contact />} />
          <Route path="lokalizacja" element={<Location />} />
          <Route path="panel" element={<ClientPanel />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
