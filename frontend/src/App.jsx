import './App.css';
import Innlegg from './components/Innlegg/Innlegg'
import LoginForm from './components/Innlegg/LoginForm';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <LoginForm></LoginForm>
      <Button variant="secondary">My button</Button>
    </div>
  );
}

export default App;
