import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from 'services/store';
import { App } from 'app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <HashRouter>
      <App demo={true} />
    </HashRouter>
  </Provider>
)

reportWebVitals()
