import styles from './Employees.module.css';
import type { Employee } from '../../types/employee';
import { getEmployees } from '../../api/getEmployees';
import { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import EmployeeCard from '../../components/EmployeeCard';

function Employees() {
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [query, setQuery] = useState('');

	const normalizedQuery = query.trim().toLocaleLowerCase();
	const visibleEmployees = employees.filter((employee) => {
		const name = `${employee.firstName} ${employee.lastName}`.toLowerCase();

		return name.includes(normalizedQuery);
	});

	useEffect(() => {
		getEmployees()
			.then(setEmployees)
			.catch(() => setError("Couldn't load employees."))
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		return <p>{error}</p>;
	}

	if (employees.length === 0) {
		return <p>There are no employees</p>;
	}

	return (
		<section>
			<h2 className={styles.title}>Employees</h2>
			<input
				type="search"
				className={styles.search}
				placeholder="Search employees..."
				value={query}
				onChange={(event) => setQuery(event.target.value)}
			/>
			{visibleEmployees.length === 0 ? (
				<p className={styles.empty}>No employees found.</p>
			) : (
				<ul className={styles.list}>
					{visibleEmployees.map((employee) => (
						<li key={employee.id}>
							<EmployeeCard employee={employee} />
						</li>
					))}
				</ul>
			)}
		</section>
	);
}

export default Employees;
