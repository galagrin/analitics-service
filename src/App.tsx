import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { HomePage } from './pages/HomePage';
import { HistoryPage } from './pages/HistoryPage';
import { GeneratorPage } from './pages/GeneratorPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/history" element={<HistoryPage />} />
                    <Route path="/generator" element={<GeneratorPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
