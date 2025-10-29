import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ContentProvider } from './utilis/contentContext.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <ContentProvider>
            <App/>
        </ContentProvider>
    </BrowserRouter>
)
