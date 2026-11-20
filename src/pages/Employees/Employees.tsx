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
			<ul className={styles.list}>
				{employees.map((employee) => (
					<li key={employee.id}>
						<EmployeeCard employee={employee} />
					</li>
				))}
			</ul>
		</section>
	);
}

export default Employees;
