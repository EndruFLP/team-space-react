import { Link, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Employees from './pages/Employees/Employees';
import styles from './App.module.css';

function App() {
	return (
		<div className={styles.shell}>
			<nav className={styles.sidebar}>
				<Link to="/">Dashboard</Link>
				<Link to="/employees">Employees</Link>
			</nav>
			<main className={styles.content}>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/employees" element={<Employees />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;

