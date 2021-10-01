import Navbar from "./components/Navbar";
import { BrowserRouter ,Switch, Route } from 'react-router-dom'
// import MetroCard from './pages/MetroCard';
// import Fair from './pages/FairSchedule'
import { FairAndSchedule } from "./components/FairAndSchedule";
import History from './components/History'
import Login from './components/login'
import { BookTicket } from "./components/bookTicket";
import {Complaints} from './components/Complaints'
import './App.css';
import MetroCard from "./components/MetroCard";
import LogOut from "./components/LogOut";
import HomePage from "./components/HomePage";
import Home from "./components/admin/Home";
import { AdminComplaints } from "./components/admin/AdminComplaint";
import { AdminIssueCard } from "./components/admin/AdminIssueCard";


function App() {
  return (
    <div className="App">
        <BrowserRouter>

          
        
          <Switch>
            
          <Route path='/' exact component={HomePage} />
          
            <Route path='/login' exact component={Login}/>
          
           <Route path='/admin' exact component={Home} />
          
           <Route path='/replyToComplaints'  component={AdminComplaints} />
           <Route path='/issueCards'  component={AdminIssueCard} />
        

            <div>
          <Navbar />
         
            <Route path='/bookTicket' component={BookTicket} />
            <Route path='/metroCard' component={MetroCard} />
            <Route path='/fair'  component={FairAndSchedule} />
            <Route path='/complaints'  component={Complaints} />
            <Route path='/history'  component={History} />
            <Route path='/logout'  component={LogOut} />

            </div>
            
          </Switch>
          
        </BrowserRouter>

    </div>
  );
}

export default App;
