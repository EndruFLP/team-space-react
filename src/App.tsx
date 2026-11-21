import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getEmployees } from './api/getEmployees';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import Employees from './pages/Employees/Employees';
import type { Employee } from './types/employee';
import styles from './App.module.css';

function App() {
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [department, setDepartment] = useState('all');

	useEffect(() => {
		getEmployees()
			.then(setEmployees)
			.catch(() => setError("Couldn't load employees."))
			.finally(() => setLoading(false));
	}, []);

	return (
		<div className={styles.shell}>
			<Sidebar employees={employees} department={department} onDepartmentChange={setDepartment} />
			<main className={styles.content}>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route
						path="/employees"
						element={
							<Employees employees={employees} loading={loading} error={error} department={department} />
						}
					/>
				</Routes>
			</main>
		</div>
	);
}

export default App;
