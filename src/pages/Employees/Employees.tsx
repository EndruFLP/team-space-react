import { useState } from 'react';
import EmployeeCard from '../../components/EmployeeCard';
import Spinner from '../../components/Spinner';
import type { Employee } from '../../types/employee';
import styles from './Employees.module.css';

interface EmployeesProps {
	employees: Employee[];
	loading: boolean;
	error: string | null;
	department: string;
}

function Employees({ employees, loading, error, department }: EmployeesProps) {
	const [query, setQuery] = useState('');
	const [page, setPage] = useState(1);
	const pageSize = 12;

	const normalizedQuery = query.trim().toLowerCase();
	const visibleEmployees = employees.filter((employee) => {
		const name = `${employee.firstName} ${employee.lastName}`.toLowerCase();
		const matchesName = name.includes(normalizedQuery);
		const matchesDepartment = department === 'all' || employee.company.department === department;

		return matchesName && matchesDepartment;
	});

	const pageCount = Math.max(1, Math.ceil(visibleEmployees.length / pageSize));
	const currentPage = Math.min(page, pageCount);
	const pageEmployees = visibleEmployees.slice((currentPage - 1) * pageSize, currentPage * pageSize);

	const [filterKey, setFilterKey] = useState(`${department}|${query}`);
	const currentFilterKey = `${department}|${query}`;
	if (currentFilterKey !== filterKey) {
		setFilterKey(currentFilterKey);
		setPage(1);
	}

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
				<>
					<ul className={styles.list}>
						{pageEmployees.map((employee) => (
							<li key={employee.id}>
								<EmployeeCard employee={employee} />
							</li>
						))}
					</ul>
					<div className={styles.pagination}>
						<button
							type="button"
							className={styles.pageButton}
							onClick={() => setPage(currentPage - 1)}
							disabled={currentPage === 1}
						>
							Previous
						</button>
						<span>
							{currentPage} / {pageCount}
						</span>
						<button
							type="button"
							className={styles.pageButton}
							onClick={() => setPage(currentPage + 1)}
							disabled={currentPage === pageCount}
						>
							Next
						</button>
					</div>
				</>
			)}
		</section>
	);
}

export default Employees;
