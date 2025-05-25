import Navbar from './components/navbar'; 
import { ConfigProvider } from 'antd'; 
import theme from './theme'; // if you're importing a theme

function App() {
  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex flex-col items-center justify-center flex-grow bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4">
          <img src="/logo.png" alt="Pamoja" className="w-32 h-auto mb-4" />
          <h1 className="text-2xl font-bold">Pamoja Platform</h1>
        </main>
      </div>
    </ConfigProvider>
  );
}

export default App;
